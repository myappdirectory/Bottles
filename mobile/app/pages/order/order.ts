import {Page, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataService} from '../../services/data';

@Page({
	templateUrl: 'build/pages/order/order.html'
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
		this.dataService.getItem(this._moduleRef, this.orderID, 'currentOrder');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoHome() {
		this.nav.setRoot(HomePage);
	}
}
