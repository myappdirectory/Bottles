import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {CartPage} from '../cart/cart';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel, CategoryLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/product/product.html',
	pipes: [MapToIterable, CategoryLabel]
})
export class ProductPage {
	public appData: any;
	public productID: any;
	public _moduleRef = 'product';
	public _cartRef = 'cart';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.productID = this.navParams.get('productID');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.productID, 'selectedProduct');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoCart() {
		this.nav.push(CartPage);
	}
}
