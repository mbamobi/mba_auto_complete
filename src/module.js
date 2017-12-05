"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var auto_complete_component_1 = require("./components/auto-complete/auto-complete.component");
var AutoCompleteComponentModule = (function () {
    function AutoCompleteComponentModule() {
    }
    AutoCompleteComponentModule = __decorate([
        core_1.NgModule({
            declarations: [
                auto_complete_component_1.AutoCompleteComponent
            ],
            imports: [
                ionic_angular_1.IonicPageModule.forChild(auto_complete_component_1.AutoCompleteComponent),
            ],
            providers: [],
            exports: [
                auto_complete_component_1.AutoCompleteComponent
            ]
        })
    ], AutoCompleteComponentModule);
    return AutoCompleteComponentModule;
}());
exports.AutoCompleteComponentModule = AutoCompleteComponentModule;
