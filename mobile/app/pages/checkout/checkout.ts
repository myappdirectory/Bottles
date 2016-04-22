import {Page, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {OrderPage} from '../order/order';
import {DataService} from '../../services/data';
import {ValidationService} from '../../services/validation';
import {MapToIterable} from '../../pipes/custom';
import {ControlMessages} from '../../directives/common';

@Page({
	templateUrl: 'build/pages/checkout/checkout.html',
	directives: [ControlMessages],
	pipes: [MapToIterable]
})
export class CheckoutPage {
	public appData: any;
	public savingID: any;
	public _moduleRef = 'order';
	public _cartRef = 'cart';
	public _userRef = 'users';
	public form: any;
	
	constructor(private nav: NavController, public navParams: NavParams, public dataService: DataService, public fb:FormBuilder) {		
		this.appData = this.dataService.appData;
		this.form = fb.group({
			user_name: ["", Validators.compose([Validators.required])],
			user_email: ["", Validators.compose([Validators.required])],
			user_phone: ["", Validators.compose([Validators.required])],
			user_address: ["", Validators.compose([Validators.required])],
			convinient_day: ["", Validators.compose([Validators.required])],
			convinient_time: ["", Validators.compose([Validators.required])],
		});
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	placeOrder() {
		if(this.form.valid) {
			var data = this.form.value;
			data.uid = this.appData.auth.uid;
			data.ordered_items = this.appData.cart;
			data.status = '1';
			delete data.ordered_items._ref;			
			this.dataService.saveItem(this._moduleRef, data).then((res) => {
				var orderID = res.key();
				this.appData.profile.phone = this.appData.profile.phone ? this.appData.profile.phone : data.user_phone;
				this.appData.profile.address = this.appData.profile.address ? this.appData.profile.address : data.user_address;
				this.dataService.deleteItem(this._cartRef, this.appData.auth.uid);
				this.dataService.saveItem(this._userRef, this.appData.profile).then((res) => {					
					this.nav.setRoot(OrderPage, {'orderID': orderID, 'showSuccess': true});
				})				
			});
		}
	}
}
