import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductPage} from '../product/product';
import {CartPage} from '../cart/cart';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/listing/listing.html',
	pipes: [MapToIterable, StatusLabel]
})
export class ListingPage {
	public appData: any;
	public categoryID: any;
	public _moduleRef = 'product';
	public _categoryRef = 'category';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.categoryID = this.navParams.get('categoryID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getCart('cart');
		this.dataService.getItem(this._categoryRef, this.categoryID, 'selectedCategory');
		if(this.categoryID != 'all') {
			this.dataService.getItemsByFilter(this._moduleRef, 'products', {key: 'category_id', value: this.categoryID});
		} else {
			this.dataService.getActiveItems(this._moduleRef, 'products');
		}
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	viewProduct(id) {
		this.nav.push(ProductPage, {'productID': id});
	}
	
	swichSelection(ref) {
		this.appData.cart = this.appData.cart ? this.appData.cart : {};
		if(this.appData.cart[ref]) {
			delete this.appData.cart[ref];			
		} else {
			this.appData.cart[ref] = {'_ref': ref, 'name': this.appData.products[ref].name, 'price': this.appData.products[ref].price, 'image': this.appData.products[ref].image};
		}
	}
	
	saveCart() {
		this.dataService.saveCart(this.appData.cart);
	}
	
	gotoCart() {
		this.nav.push(CartPage);
	}
}
