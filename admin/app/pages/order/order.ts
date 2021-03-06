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
			uid: ["", Validators.required],
			user_name: ["", Validators.required],
			user_email: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
			user_phone: ["", Validators.required],
			user_address: ["", Validators.required],
			user_location: ["", Validators.required],
			ordered_items: ["", Validators.required],
			convinient_day: ["", Validators.required],
			convinient_time: ["", Validators.required],
			comment: [""],
			grand_total: [""],
			status: ["", Validators.required]
		});
		this.updateform = fb.group({
			comment: [""]
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
		this.selectedItem.ordered_items = {};
		for(var i in $event.target.selectedOptions) {
			var option = $event.target.selectedOptions[i];
			var product = this.app.products[option.value];
			if(product) {
				var data = {'_ref': option.value, 'image': product.image, 'name': product.name, 'price': product.price};
				this.selectedItem.ordered_items[option.value] = data;
			}			
		}
	}
	
	saveItem() {
		if(this.form.valid) {
			var data = this.form.value;
			data.code = Math.random().toString(16).slice(-4)+Math.random().toString(16).slice(-2);
			var comment = data.comment;
			delete data.comment;
			this.dataService.saveItem(this._moduleRef, data).then((res) => {
				var orderID = data._ref ? data._ref : res.key();
				if(!data._ref) {
					this.dataService.saveItem(this._moduleRef+'/'+orderID+'/history', {'message': 'New Order has been created'});
				}
				if(comment) {
					this.dataService.saveItem(this._moduleRef+'/'+orderID+'/history', {'message': comment});
				}
			});
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