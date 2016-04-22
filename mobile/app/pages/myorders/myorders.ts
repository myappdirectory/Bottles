import {Page, NavController, NavParams} from 'ionic-angular';
import {OrderPage} from '../order/order';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/myorders/myorders.html',
	pipes: [MapToIterable, StatusLabel]
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
	
	viewOrder(id) {
		this.nav.push(OrderPage, {'orderID': id});
	}
}
