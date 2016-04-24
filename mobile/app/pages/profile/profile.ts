import {Page, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data';
import {ValidationService} from '../../services/validation';
import {ControlMessages} from '../../directives/common';
import {CartPage} from '../cart/cart';

@Page({
	templateUrl: 'build/pages/profile/profile.html',
	directives: [ControlMessages]
})
export class ProfilePage {
	public profileForm: any;
	public appData: any;
	public _moduleRef = 'users';
	public formData = {};
	
	constructor(private nav: NavController, private navParams: NavParams, public dataService: DataService, public fb:FormBuilder) {
		this.appData = this.dataService.appData;
		this.profileForm = fb.group({
			_ref: [""],
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			phone: ["", Validators.required],
			location: ["", Validators.required]
		});
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
			this.formData = this.appData.profile ? this.appData.profile : {};
		});
		this.dataService.getItem(this._moduleRef, this.appData.auth.uid, 'profile');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	gotoCart() {
		this.nav.push(CartPage);
	}
	
	saveProfileImage(event) {
		this.dataService.showLoading();
		var file = event.target.files[0];
		var uid = this.appData.auth.uid.replace(/[^a-zA-Z0-9]/g, '');
		if(file && file.type.match('image.*')) {
			this.dataService.uploadImage(file, uid).then((imageUrl) => {
				var data = {'_ref': this.appData.auth.uid, 'image': imageUrl};
				this.dataService.saveItem(this._moduleRef, data);
				this.dataService.hideLoading();
			});
		}
	}
	
	saveProfile() {
		if(this.profileForm.valid) {
			var data = this.profileForm.value;
			this.dataService.saveUser(data);
		}
	}
}
