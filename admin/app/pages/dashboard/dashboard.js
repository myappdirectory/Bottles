System.register(['angular2/core', 'angular2/common', '../../services/data/data', '../../directives/material/material', '../../directives/common/common', '../../pipes/custom.pipes'], function(exports_1, context_1) {
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
    var core_1, common_1, data_1, material_1, common_2, custom_pipes_1;
    var DashboardPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (custom_pipes_1_1) {
                custom_pipes_1 = custom_pipes_1_1;
            }],
        execute: function() {
            DashboardPage = (function () {
                function DashboardPage(dataService, fb) {
                    this.dataService = dataService;
                    this.fb = fb;
                    this._orderRef = 'order';
                    this._userRef = 'users';
                    this.orderList = {
                        title: 'Recent Orders',
                        fields: [
                            { code: 'code', title: 'Code', type: 'text', 'formatter': '' },
                            { code: 'uid', title: 'Customer', type: 'user', 'formatter': '' },
                            { code: 'user_email', title: 'Contact Email', type: 'text', 'formatter': '' },
                            { code: 'user_name', title: 'Contact Nmae', type: 'text', 'formatter': '' },
                            { code: 'ordered_items', title: 'Ordered Items', type: 'ordered_items', 'formatter': '' },
                            { code: 'grand_total', title: 'Grand Total', type: 'text', 'formatter': '' },
                            { code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel' }
                        ]
                    };
                    this.userList = {
                        title: 'Recent Customer',
                        fields: [
                            { code: 'image', title: 'Image', type: 'image', 'formatter': '' },
                            { code: 'firstname', title: 'First name', type: 'text', 'formatter': '' },
                            { code: 'lastname', title: 'Last ame', type: 'text', 'formatter': '' },
                            { code: 'email', title: 'Email', type: 'text', 'formatter': '' },
                            { code: 'location', title: 'Location', type: 'text', 'formatter': 'LocationLabel' },
                            { code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel' }
                        ]
                    };
                }
                DashboardPage.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                    this.dataService.getLimitedItems(this._orderRef, 'orders', 10);
                    this.dataService.getLimitedItems(this._userRef, 'users', 10);
                };
                DashboardPage = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/dashboard/dashboard.html',
                        directives: [material_1.MdInput, material_1.MdCheckbox, common_2.ControlMessages, common_2.ConfirmDelete],
                        pipes: [custom_pipes_1.MapToIterable, custom_pipes_1.LocationLabel, custom_pipes_1.StatusLabel]
                    }), 
                    __metadata('design:paramtypes', [data_1.DataService, common_1.FormBuilder])
                ], DashboardPage);
                return DashboardPage;
            }());
            exports_1("DashboardPage", DashboardPage);
        }
    }
});
//# sourceMappingURL=dashboard.js.map