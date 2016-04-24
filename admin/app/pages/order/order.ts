import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {DataService} from '../../services/data/data';
import {ValidationService} from '../../services/validation/validation';
import {MdInput, MdCheckbox} from '../../directives/material/material';
import {ControlMessages, ConfirmDelete} from '../../directives/common/common';
import {MapToIterable, StatusLabel, LocationLabel} from '../../pipes/custom.pipes';

@Component({
    templateUrl: 'app/pages/order/order.html',
	directives: [MdInput, MdCheckbox, ControlMessages, ConfirmDelete],
	pipes: [MapToIterable, LocationLabel, StatusLabel]
})

export class OrderPage {
	public app: any;
	public _moduleRef = 'order';
	public _userRef = 'users';
	public _productRef = 'product';
	public mode = 'list';
	public selectedItem: any;
	
	public form: any;
	public list: any;
	
	constructor(public dataService: DataService, public fb:FormBuilder) {
		this.form = fb.group({
			_ref: [""],
			code: [""],
			uid: ["", Validators.required],
			user_name: ["", Validators.required],
			user_email: ["", Validators.required],
			user_phone: ["", Validators.required],
			user_address: ["", Validators.required],
			ordered_items: ["", Validators.required],
			convinient_day: ["", Validators.required],
			convinient_time: ["", Validators.required],
			grand_total: ["", Validators.required],
			status: ["", Validators.required]
		});
		this.list = {
			title: 'Manage Order',
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
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
		this.dataService.getItems(this._moduleRef, 'listItems');
		this.dataService.getActiveItems(this._userRef, 'users');
		this.dataService.getActiveItems(this._productRef, 'products');
	}
	
	addNew() {
		this.selectedItem = {};
		this.mode = 'edit';
	}
	
	editItem(id) {
		if(this.app.listItems[id]) {
			this.selectedItem = this.app.listItems[id];
			this.selectedItem._ref = id;
			this.mode = 'edit';
		}
	}
	
	cancelEdit() {
		this.selectedItem = null;
		this.mode = 'list';
	}
	
	updateItems($event) {
		console.log($event.target.selectedOptions);
	}
	
	saveItem() {
		if(this.form.valid) {
			var data = this.form.value;console.log(data);return false;
			this.dataService.saveItem(this._moduleRef, data);
			this.selectedItem = null;
			this.mode = 'list';
		}
	}
	
	deleteItem(id) { 
		var result = confirm("Do you want to delete this item?");
		if(result) {
			this.dataService.deleteItem(this._moduleRef, id);
		}
	}
	
	saveImage(event, model, identifier) {
		var file = event.target.files[0];
		if(file && file.type.match('image.*')) {
			this.dataService.uploadImage(file, identifier).then((imageUrl) => {
				if(imageUrl) {
					this.selectedItem[model] = imageUrl;
				}
			});
		}
	}
}