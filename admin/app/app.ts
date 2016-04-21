import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {DataService} from './services/data/data';
import {LoginPage} from './pages/login/login';
import {DashboardPage} from './pages/dashboard/dashboard';
import {CustomerPage} from './pages/customer/customer';
import {CategoryPage} from './pages/category/category';
import {ProductPage} from './pages/product/product';
import {OrderPage} from './pages/order/order';
import {AdminPage} from './pages/admin/admin';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
	providers: [ROUTER_DIRECTIVES, DataService],
	directives: [ROUTER_DIRECTIVES, LoginPage]
})

@RouteConfig([
	{path:'/', name: 'Dashboard', component: DashboardPage},
	{path:'/customer', name: 'Customer', component: CustomerPage},
	{path:'/category', name: 'Category', component: CategoryPage},
	{path:'/product', name: 'Product', component: ProductPage},
	{path:'/order', name: 'Order', component: OrderPage},
	{path:'/admin', name: 'Admin', component: AdminPage}
])

export class AppComponent {
	public app: any;
	public menu: any;
	
	constructor(public dataService: DataService, public router: Router) {
		this.menu = [
			{'title' : 'Dashboard', 'component' : 'Dashboard', 'path' : '/', 'class': 'dashboard'},
			{'title' : 'Customer', 'component' : 'Customer', 'path' : '/customer', 'class': 'people'},
			{'title' : 'Category', 'component' : 'Category', 'path' : '/category', 'class': 'category'},
			{'title' : 'Product', 'component' : 'Product', 'path' : '/product', 'class': 'product'},
			{'title' : 'Order', 'component' : 'Order', 'path' : '/order', 'class': 'order'},
			{'title' : 'Admin', 'component' : 'Admin', 'path' : '/admin', 'class': 'people'}
		];
	}
	
	ngOnInit() {
		this.dataService.observable$.subscribe(res => {
			this.app = res;
		});
		this.dataService.initialize();
	}
	
	isMenuActive(instruction: any[]): boolean {
		return this.router.isRouteActive(this.router.generate(instruction));
	}
	
	closeAlert() {
		this.dataService.closeAlert();
	}
	
	logout() {
		this.dataService.logout();
	}
}