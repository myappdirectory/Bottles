import {Page, NavController, NavParams} from 'ionic-angular';
import {CheckoutPage} from '../checkout/checkout';
import {DataService} from '../../services/data';
import {MapToIterable} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/cart/cart.html',
	pipes: [MapToIterable]
})
export class CartPage {
	public appData: any;
	public _moduleRef = 'cart';
	
	constructor(private nav: NavController, navParams: NavParams, public dataService: DataService) {}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getCart('cart');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	isValid(product) {
		return (typeof(product) == 'object') ? true: false;
	}
	
	removeItem(ref) {
		this.dataService.deleteItem(this._moduleRef, this.appData.auth.uid + '/' + ref);
	}
	
	orderNow() {
		this.nav.push(CheckoutPage);
	}
	
}
