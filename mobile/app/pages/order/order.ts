import {Page, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom';
import {CartPage} from '../cart/cart';

@Page({
	templateUrl: 'build/pages/order/order.html',
	pipes: [MapToIterable, StatusLabel, LocationLabel]
})
export class OrderPage {
	public appData: any;
	public orderID: any;
	public showSuccess: any;
	public _moduleRef = 'order';
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService) {
		this.orderID = this.navParams.get('orderID');
		this.showSuccess = this.navParams.get('showSuccess');
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getItem(this._moduleRef, this.orderID, 'selectedOrder');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoCart() {
		this.nav.push(CartPage);
	}
	
	gotoHome() {
		this.nav.setRoot(HomePage);
	}
	
	cancelOrder() {
		var data = {'_ref': this.orderID, 'status': '4'};
		this.dataService.saveItem(this._moduleRef, data);
	}
}
