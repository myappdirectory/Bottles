import {Page, NavController, NavParams} from 'ionic-angular';
import {ListingPage} from '../listing/listing';
import {CartPage} from '../cart/cart';
import {DataService} from '../../services/data';
import {MapToIterable, StatusLabel} from '../../pipes/custom';

@Page({
	templateUrl: 'build/pages/home/home.html',
	pipes: [MapToIterable, StatusLabel]
})
export class HomePage {
	public appData: any;
	public _moduleRef = 'category';
	
	constructor(private nav: NavController, private navParams: NavParams, public dataService: DataService) {}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.appData = res;
		});
		this.dataService.getConfig();
		this.dataService.getActiveItems(this._moduleRef, 'categories');
	}
	
	doRefresh(refresher) {
		refresher.complete();
		this.ngOnInit();		
	}
	
	viewProducts(id) {
		this.nav.push(ListingPage, {'categoryID': id});
	}

	gotoCart() {
		this.nav.push(CartPage);
	}
}
