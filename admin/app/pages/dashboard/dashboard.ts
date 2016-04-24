import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data/data';
import {ValidationService} from '../../services/validation/validation';
import {MdInput, MdCheckbox} from '../../directives/material/material';
import {ControlMessages, ConfirmDelete} from '../../directives/common/common';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom.pipes';

@Component({
    templateUrl: 'app/pages/dashboard/dashboard.html',
	directives: [MdInput, MdCheckbox, ControlMessages, ConfirmDelete],
	pipes: [MapToIterable, LocationLabel, StatusLabel]
})

export class DashboardPage {
	public app: any;
	public _orderRef = 'order';
	public _userRef = 'users';
	
	public orderList: any;
	public userList: any;
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.orderList = {
			title: 'Recent Orders',
			fields : [
				{code: 'code', title: 'Code', type: 'text', 'formatter': ''},
				{code: 'uid', title: 'Customer', type: 'user', 'formatter': ''},
				{code: 'user_email', title: 'Contact Email', type: 'text', 'formatter': ''},
				{code: 'user_name', title: 'Contact Nmae', type: 'text', 'formatter': ''},
				{code: 'ordered_items', title: 'Ordered Items', type: 'ordered_items', 'formatter': ''},
				{code: 'grand_total', title: 'Grand Total', type: 'text', 'formatter': ''},
				{code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel'}
			]
		};
		
		this.userList = {
			title: 'Recent Customer',
			fields : [
				{code: 'image', title: 'Image', type: 'image', 'formatter': ''},
				{code: 'firstname', title: 'First name', type: 'text', 'formatter': ''},
				{code: 'lastname', title: 'Last ame', type: 'text', 'formatter': ''},
				{code: 'email', title: 'Email', type: 'text', 'formatter': ''},
				{code: 'location', title: 'Location', type: 'text', 'formatter': 'LocationLabel'},
				{code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel'}
			]
		};
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
		this.dataService.getLimitedItems(this._orderRef, 'orders', 10);
		this.dataService.getLimitedItems(this._userRef, 'users', 10);
	}
}