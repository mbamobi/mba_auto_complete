"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var noop_1 = require("rxjs/util/noop");
var rxjs_1 = require("rxjs");
// searchbar default options
var defaultOpts = {
    cancelButtonText: 'Cancel',
    showCancelButton: false,
    debounce: 250,
    placeholder: 'Pesquisar',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'off',
    type: 'search',
    value: '',
    noItems: '',
    clearOnEdit: false,
    clearInput: true,
    clearOnSelect: true
};
var AutoCompleteComponent = (function () {
    /**
     * create a new instace
     */
    function AutoCompleteComponent() {
        this.hideListOnSelection = true;
        this.onTouchedCallback = noop_1.noop;
        this.onChangeCallback = noop_1.noop;
        this.showListChanged = false;
        this.keyword = '';
        this.suggestions = [];
        this._showList = false;
        this.itemSelected = new core_1.EventEmitter();
        this.itemsShown = new core_1.EventEmitter();
        this.itemsHidden = new core_1.EventEmitter();
        this.ionAutoInput = new core_1.EventEmitter();
        this.autoFocus = new core_1.EventEmitter();
        this.autoBlur = new core_1.EventEmitter();
        this.options = {};
        // set default options
        this.defaultOpts = defaultOpts;
    }
    AutoCompleteComponent_1 = AutoCompleteComponent;
    Object.defineProperty(AutoCompleteComponent.prototype, "showList", {
        get: function () {
            return this._showList;
        },
        set: function (value) {
            if (this._showList === value) {
                return;
            }
            this._showList = value;
            this.showListChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteComponent.prototype.writeValue = function (value) {
        if (value !== this.selection) {
            this.selection = value || null;
            this.formValue = this.getFormValue(this.selection);
            this.keyword = this.getLabel(this.selection);
        }
    };
    AutoCompleteComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    AutoCompleteComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    AutoCompleteComponent.prototype.updateModel = function () {
        this.onChangeCallback(this.formValue);
    };
    AutoCompleteComponent.prototype.ngAfterViewChecked = function () {
        if (this.showListChanged) {
            this.showListChanged = false;
            this.showList ? this.itemsShown.emit() : this.itemsHidden.emit();
        }
    };
    /**
     * get items for auto-complete
     */
    AutoCompleteComponent.prototype.getItems = function () {
        var _this = this;
        var result;
        if (this.showResultsFirst && this.keyword.trim() === '') {
            this.keyword = '';
        }
        else if (this.keyword.trim() === '') {
            this.suggestions = [];
            return;
        }
        if (typeof this.dataProvider === 'function') {
            result = this.dataProvider(this.keyword);
        }
        else {
            result = this.dataProvider.getResults(this.keyword);
        }
        // if result is instanceof Subject, use it asObservable
        if (result instanceof rxjs_1.Subject) {
            result = result.asObservable();
        }
        if (result instanceof Promise) {
            result = rxjs_1.Observable.fromPromise(result);
        }
        // if query is async
        if (result instanceof rxjs_1.Observable) {
            result
                .subscribe(function (results) {
                _this.suggestions = results;
                _this.showItemList();
            }, function (error) { return console.error(error); });
        }
        else {
            this.suggestions = result;
            this.showItemList();
        }
        // emit event
        this.ionAutoInput.emit(this.keyword);
    };
    /**
     * show item list
     */
    AutoCompleteComponent.prototype.showItemList = function () {
        this.showList = true;
    };
    /**
     * hide item list
     */
    AutoCompleteComponent.prototype.hideItemList = function () {
        this.showList = this.alwaysShowList;
    };
    /**
     * select item from list
     *
     * @param event
     * @param selection
     **/
    AutoCompleteComponent.prototype.select = function (selection) {
        this.keyword = this.getLabel(selection);
        this.formValue = this.getFormValue(selection);
        this.hideItemList();
        // emit selection event
        this.updateModel();
        if (this.hideListOnSelection) {
            this.hideItemList();
        }
        // emit selection event
        this.itemSelected.emit(selection);
        this.selection = selection;
        console.log(this.defaultOpts.clearOnSelect);
        if (this.defaultOpts.clearOnSelect) {
            this.clearValue(true);
        }
    };
    /**
     * get current selection
     * @returns {any}
     */
    AutoCompleteComponent.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * get current input value
     * @returns {string}
     */
    AutoCompleteComponent.prototype.getValue = function () {
        return this.formValue;
    };
    /**
     * set current input value
     */
    AutoCompleteComponent.prototype.setValue = function (selection) {
        this.formValue = this.getFormValue(selection);
        this.keyword = this.getLabel(selection);
        return;
    };
    /**
  
     /**
     * clear current input value
     */
    AutoCompleteComponent.prototype.clearValue = function (hideItemList) {
        if (hideItemList === void 0) { hideItemList = false; }
        this.keyword = '';
        this.selection = null;
        this.formValue = null;
        if (hideItemList) {
            this.hideItemList();
        }
        return;
    };
    /**
     * set focus of searchbar
     */
    AutoCompleteComponent.prototype.setFocus = function () {
        if (this.searchbarElem) {
            this.searchbarElem.setFocus();
        }
    };
    /**
     * fired when the input focused
     */
    AutoCompleteComponent.prototype.onFocus = function () {
        this.autoFocus.emit();
    };
    /**
     * fired when the input focused
     */
    AutoCompleteComponent.prototype.onBlur = function () {
        this.autoBlur.emit();
    };
    /**
     * handle document click
     * @param event
     */
    AutoCompleteComponent.prototype.documentClickHandler = function (event) {
        if ((this.searchbarElem
            && !this.searchbarElem._elementRef.nativeElement.contains(event.target))
            ||
                (!this.inputElem && this.inputElem._elementRef.nativeElement.contains(event.target))) {
            this.hideItemList();
        }
    };
    AutoCompleteComponent.prototype.getFormValue = function (selection) {
        if (selection == null) {
            return null;
        }
        var attr = this.dataProvider.formValueAttribute == null ? this.dataProvider.labelAttribute : this.dataProvider.formValueAttribute;
        if (typeof selection === 'object' && attr) {
            return selection[attr];
        }
        return selection;
    };
    AutoCompleteComponent.prototype.getLabel = function (selection) {
        if (selection == null) {
            return '';
        }
        var attr = this.dataProvider.labelAttribute;
        var value = selection;
        if (this.dataProvider.getItemLabel) {
            value = this.dataProvider.getItemLabel(value);
        }
        if (typeof value === 'object' && attr) {
            return value[attr] || '';
        }
        return value || '';
    };
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "dataProvider", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "keyword", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "showResultsFirst", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "alwaysShowList", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "hideListOnSelection", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteComponent.prototype, "useIonInput", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "autoBlur", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "itemSelected", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "itemsShown", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "itemsHidden", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteComponent.prototype, "ionAutoInput", void 0);
    __decorate([
        core_1.ViewChild('searchbarElem')
    ], AutoCompleteComponent.prototype, "searchbarElem", void 0);
    __decorate([
        core_1.ViewChild('inputElem')
    ], AutoCompleteComponent.prototype, "inputElem", void 0);
    __decorate([
        core_1.HostListener('document:click', ['$event'])
    ], AutoCompleteComponent.prototype, "documentClickHandler", null);
    AutoCompleteComponent = AutoCompleteComponent_1 = __decorate([
        core_1.Component({
            selector: 'ion-auto-complete',
            templateUrl: 'auto-complete.html',
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: AutoCompleteComponent_1, multi: true }
            ]
        })
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
    var AutoCompleteComponent_1;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
