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
    var ProductPage;
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
            ProductPage = (function () {
                function ProductPage(dataService, fb) {
                    this.dataService = dataService;
                    this.fb = fb;
                    this._moduleRef = 'product';
                    this._categoryRef = 'category';
                    this.mode = 'list';
                    this.form = fb.group({
                        _ref: [""],
                        code: ["", common_1.Validators.required],
                        name: ["", common_1.Validators.required],
                        category_id: ["", common_1.Validators.required],
                        image: ["", common_1.Validators.required],
                        price: ["", common_1.Validators.required],
                        description: ["", common_1.Validators.required],
                        status: ["", common_1.Validators.required]
                    });
                    this.list = {
                        title: 'Manage Product',
                        fields: [
                            { code: 'name', title: 'Name', type: 'text', 'formatter': '' },
                            { code: 'code', title: 'Code', type: 'text', 'formatter': '' },
                            { code: 'category_id', title: 'Category', type: 'text', 'formatter': '' },
                            { code: 'image', title: 'Image', type: 'image', 'formatter': '' },
                            { code: 'price', title: 'Price', type: 'text', 'formatter': '' },
                            { code: 'status', title: 'Status', type: 'text', 'formatter': 'StatusLabel' }
                        ]
                    };
                }
                ProductPage.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dataService.observable$.subscribe(function (res) {
                        _this.app = res;
                    });
                    this.dataService.getItems(this._moduleRef, 'listItems');
                    this.dataService.getItems(this._categoryRef, 'categories');
                };
                ProductPage.prototype.addNew = function () {
                    this.selectedItem = {};
                    this.mode = 'edit';
                };
                ProductPage.prototype.editItem = function (id) {
                    if (this.app.listItems[id]) {
                        this.selectedItem = this.app.listItems[id];
                        this.selectedItem._ref = id;
                        this.mode = 'edit';
                    }
                };
                ProductPage.prototype.cancelEdit = function () {
                    this.selectedItem = null;
                    this.mode = 'list';
                };
                ProductPage.prototype.saveItem = function () {
                    if (this.form.valid) {
                        var data = this.form.value;
                        this.dataService.saveItem(this._moduleRef, data);
                        this.selectedItem = null;
                        this.mode = 'list';
                    }
                };
                ProductPage.prototype.deleteItem = function (id) {
                    var result = confirm("Do you want to delete this item?");
                    if (result) {
                        this.dataService.deleteItem(this._moduleRef, id);
                    }
                };
                ProductPage.prototype.saveImage = function (event, model, identifier) {
                    var _this = this;
                    var file = event.target.files[0];
                    if (file && file.type.match('image.*')) {
                        this.dataService.uploadImage(file, identifier).then(function (imageUrl) {
                            if (imageUrl) {
                                _this.selectedItem[model] = imageUrl;
                            }
                        });
                    }
                };
                ProductPage = __decorate([
                    core_1.Component({
                        templateUrl: 'app/pages/product/product.html',
                        directives: [material_1.MdInput, material_1.MdCheckbox, common_2.ControlMessages, common_2.ConfirmDelete],
                        pipes: [custom_pipes_1.MapToIterable, custom_pipes_1.LocationLabel, custom_pipes_1.StatusLabel]
                    }), 
                    __metadata('design:paramtypes', [data_1.DataService, common_1.FormBuilder])
                ], ProductPage);
                return ProductPage;
            }());
            exports_1("ProductPage", ProductPage);
        }
    }
});
//# sourceMappingURL=product.js.map