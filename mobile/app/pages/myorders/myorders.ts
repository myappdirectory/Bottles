import {Page, NavController, NavParams} from 'ionic-angular';
import {OrderPage} from '../order/order';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom';
import {CartPage} from '../cart/cart';

@Page({
	templateUrl: 'build/pages/myorders/myorders.html',
	pipes: [MapToIterable, StatusLabel, LocationLabel]
})
export class MyordersPage {
	public appData: any;
	public _moduleRef = 'order';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.appData = this.dataService.appData;
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItemsByFilter(this._moduleRef, 'orders', {key: 'uid', value: this.appData.auth.uid});
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoCart() {
		this.nav.push(CartPage);
	}
	
	viewOrder(id) {
		this.nav.push(OrderPage, {'orderID': id});
	}
}
