import {Page, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data';
import {ValidationService} from '../../services/validation';
import {ControlMessages} from '../../directives/common';
import {MapToIterable} from '../../pipes/custom';
import {HomePage} from '../home/home';

@Page({
	templateUrl: 'build/pages/signup/signup.html',
	directives: [ControlMessages],
	pipes: [MapToIterable]
})
export class SignupPage {
	public appData: any;
	public signupForm: any;
	
	constructor(private nav: NavController, navParams: NavParams, public dataService: DataService, public fb:FormBuilder) {
		this.appData = this.dataService.appData;
		this.signupForm = fb.group({
			firstname: ["", Validators.required],
			lastname: ["", Validators.required],
			email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
			password: ["", Validators.compose([Validators.required, ValidationService.passwordValidator])],
			phone: ["", Validators.required],
			location: [""]
		});
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
	}
	
	signUp() {
		if(this.signupForm.valid) {
			var data = this.signupForm.value;
			this.dataService.saveUser(data).then((res:any) => {
				if(res && res.uid) {
					this.nav.setRoot(HomePage);
				}
			});
		}
	}
}
