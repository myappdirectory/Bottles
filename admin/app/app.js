System.register(['angular2/core', 'angular2/router', './services/data/data', './pages/login/login', './pages/dashboard/dashboard', './pages/customer/customer', './pages/category/category', './pages/product/product', './pages/order/order', './pages/admin/admin'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, data_1, login_1, dashboard_1, customer_1, category_1, product_1, order_1, admin_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (dashboard_1_1) {
                dashboard_1 = dashboard_1_1;
            },
            function (customer_1_1) {
                customer_1 = customer_1_1;
            },
            function (category_1_1) {
                category_1 = category_1_1;
            },
            function (product_1_1) {
                product_1 = product_1_1;
            },
            function (order_1_1) {
                order_1 = order_1_1;
            },
            function (admin_1_1) {
                admin_1 = admin_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(dataService, router) {
                    this.dataService = dataService;
                    this.router = router;
                    this.menu = [
                        { 'title': 'Dashboard', 'component': 'Dashboard', 'path': '/', 'class': 'dashboard' },
                        { 'title': 'Customer', 'component': 'Customer', 'path': '/customer', 'class': 'people' },
                        { 'title': 'Category', 'component': 'Category', 'path': '/category', 'class': 'category' },
                        { 'title': 'Product', 'component': 'Product', 'path': '/product', 'class': 'product' },
                        { 'title': 'Order', 'component': 'Order', 'path': '/order', 'class': 'order' },
                        { 'title': 'Admin', 'component': 'Admin', 'path': '/admin', 'class': 'people' }
                    ];
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                    this.dataService.initialize();
                };
                AppComponent.prototype.isMenuActive = function (instruction) {
                    return this.router.isRouteActive(this.router.generate(instruction));
                };
                AppComponent.prototype.closeAlert = function () {
                    this.dataService.closeAlert();
                };
                AppComponent.prototype.logout = function () {
                    this.dataService.logout();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        providers: [router_1.ROUTER_DIRECTIVES, data_1.DataService],
                        directives: [router_1.ROUTER_DIRECTIVES, login_1.LoginPage]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Dashboard', component: dashboard_1.DashboardPage },
                        { path: '/customer', name: 'Customer', component: customer_1.CustomerPage },
                        { path: '/category', name: 'Category', component: category_1.CategoryPage },
                        { path: '/product', name: 'Product', component: product_1.ProductPage },
                        { path: '/order', name: 'Order', component: order_1.OrderPage },
                        { path: '/admin', name: 'Admin', component: admin_1.AdminPage }
                    ]), 
                    __metadata('design:paramtypes', [data_1.DataService, router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map