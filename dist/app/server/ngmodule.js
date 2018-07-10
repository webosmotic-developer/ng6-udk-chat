(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var emoji_service_1 = __webpack_require__(/*! ../emoji.service */ "./node_modules/ng-emoji-picker/src/emoji.service.js");
var EmojiInputComponent = /** @class */ (function () {
    function EmojiInputComponent(emojiService) {
        this.emojiService = emojiService;
        this.popupAnchor = 'top';
        this.inputClass = '';
        this.searchClass = '';
        this.onEnter = function () { };
        this.autofocus = false;
        this.closeAfterSelection = true;
        this.modelChange = new core_1.EventEmitter();
        this.setPopupAction = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.keyup = new core_1.EventEmitter();
        this.emojiClick = new core_1.EventEmitter();
        this.input = '';
        this.filterEmojis = '';
        this.popupOpen = false;
        this.lastCursorPosition = 0;
    }
    EmojiInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.setPopupAction) {
            this.setPopupAction.emit(function (status) { _this.openPopup(status); });
        }
        this.allEmojis = this.emojiService.getAll();
        this.clean();
    };
    EmojiInputComponent.prototype.ngAfterViewInit = function () {
        if (this.autofocus) {
            if (this.textArea) {
                this.textareaEl.nativeElement.focus();
            }
            else {
                this.inputEl.nativeElement.focus();
            }
        }
    };
    EmojiInputComponent.prototype.ngOnChanges = function () {
        if (this.model !== this.input) {
            this.input = this.model;
        }
    };
    EmojiInputComponent.prototype.onKeyup = function (event) {
        this.updateCursor();
        if (this.keyup) {
            this.keyup.emit(event);
        }
    };
    EmojiInputComponent.prototype.onBlur = function (event) {
        this.updateCursor();
        if (this.blur) {
            this.blur.emit(event);
        }
    };
    EmojiInputComponent.prototype.onFocus = function (event) {
        this.updateCursor();
        if (this.focus) {
            this.focus.emit(event);
        }
    };
    EmojiInputComponent.prototype.clean = function () {
        this.filterEmojis = '';
        this.filteredEmojis = this.getFilteredEmojis();
    };
    EmojiInputComponent.prototype.openPopup = function (status) {
        if (status === void 0) { status = null; }
        if (status === null) {
            this.popupOpen = !this.popupOpen;
        }
        else {
            this.popupOpen = status;
        }
    };
    EmojiInputComponent.prototype.updateFilteredEmojis = function () {
        this.filteredEmojis = this.getFilteredEmojis();
    };
    EmojiInputComponent.prototype.getFilteredEmojis = function () {
        var _this = this;
        return this.allEmojis.filter(function (e) {
            if (_this.filterEmojis === '') {
                return true;
            }
            else {
                for (var _i = 0, _a = e.aliases; _i < _a.length; _i++) {
                    var alias = _a[_i];
                    if (alias.includes(_this.filterEmojis)) {
                        return true;
                    }
                }
            }
            return false;
        });
    };
    EmojiInputComponent.prototype.onEmojiClick = function (e) {
        this.input = this.input.substr(0, this.lastCursorPosition) + e + this.input.substr(this.lastCursorPosition);
        this.modelChange.emit(this.input);
        this.emojiClick.emit(e);
        if (this.closeAfterSelection) {
            this.popupOpen = false;
            this.clean();
        }
    };
    EmojiInputComponent.prototype.onChange = function (newValue) {
        this.input = this.emojiService.emojify(newValue);
        this.model = this.input;
        this.modelChange.emit(this.input);
    };
    EmojiInputComponent.prototype.updateCursor = function () {
        if (this.textArea) {
            this.lastCursorPosition = this.textareaEl.nativeElement.selectionStart;
        }
        else {
            this.lastCursorPosition = this.inputEl.nativeElement.selectionStart;
        }
    };
    EmojiInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'emoji-input',
                    template: "\n    <ng-template [ngIf]=\"textArea\">\n      <textarea #textareaEl name=\"text\"\n        [ngClass]=\"[inputClass]\"\n        [attr.cols]=\"textArea.cols\"\n        [attr.rows]=\"textArea.rows\"\n        (keyup)=\"onKeyup($event)\"\n        (keyup.enter)=\"onEnter()\"\n        (blur)=\"onBlur($event)\"\n        (focus)=\"onFocus($event)\"\n        (ngModelChange)=\"onChange($event)\"\n        [(ngModel)]=\"input\">\n      </textarea>\n    </ng-template>\n    <ng-template [ngIf]=\"!textArea\">\n      <input #inputEl type=\"text\"\n        [ngClass]=\"[inputClass]\"\n        (keyup)=\"onKeyup($event)\"\n        (keyup.enter)=\"onEnter()\"\n        (blur)=\"onBlur($event)\"\n        (focus)=\"onFocus($event)\"\n        (ngModelChange)=\"onChange($event)\"\n        [(ngModel)]=\"input\"/>\n    </ng-template>\n    <div class=\"emoji-search\"\n      [ngClass]=\"[popupAnchor, searchClass]\"\n      [hidden]=\"!popupOpen\"\n      [style.display]=\"popupOpen ? 'flex' : 'none'\"\n      (click)=\"$event.stopPropagation()\">\n      <div class=\"search-header\">\n        <input type=\"search\" placeholder=\"Search...\"\n          [(ngModel)]=\"filterEmojis\"\n          (ngModelChange)=\"updateFilteredEmojis()\"/>\n      </div>\n      <div class=\"emojis-container\">\n        <span *ngFor=\"let emoji of filteredEmojis\"\n              (click)=\"onEmojiClick(emoji.emoji)\"\n               title=\"{{emoji.aliases[0]}}\">\n          {{emoji.emoji}}\n        </span>\n      </div>\n    </div>\n  ",
                    styles: ["\n      :host {\n        display: block;\n        position: relative;\n      }\n      :host .emoji-search {\n        background-color: #fff;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);\n        height: auto;\n        line-height: 1.5;\n        position: absolute;\n        right: 0;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        z-index: 100;\n      }\n      :host .emoji-search[hidden] {\n        display: none;\n      }\n      :host .emoji-search.bottom {\n        top: -202px;\n      }\n      :host .emoji-search input {\n        border-radius: 4px;\n        font-size: 10px;\n        padding: 4px 8px;\n        margin: 0;\n        height: 30px;\n      }\n      :host .emoji-search .search-header {\n        background-color: #eee;\n        border-bottom: 1px solid #ccc;\n        border-radius: 4px 4px 0 0;\n        padding: 4px 8px;\n        width: 100%;\n      }\n      :host .emoji-search .emojis-container {\n        border-radius: 0 0 4px 4px;\n        max-height: 160px;\n        padding: 5px 12px;\n        overflow: auto;\n        overflow-x: hidden;\n        flex: 1;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: center;\n      }\n      :host .emoji-search span {\n        cursor: pointer;\n        padding: 4px 3px 2px 4px;\n        font-size: 24px;\n      }\n      :host .emoji-search span:hover {\n        background-color: #ccc;\n      }\n\n  "]
                },] },
    ];
    /** @nocollapse */
    EmojiInputComponent.ctorParameters = function () { return [
        { type: emoji_service_1.EmojiService, },
    ]; };
    EmojiInputComponent.propDecorators = {
        "textArea": [{ type: core_1.Input },],
        "popupAnchor": [{ type: core_1.Input },],
        "inputClass": [{ type: core_1.Input },],
        "searchClass": [{ type: core_1.Input },],
        "onEnter": [{ type: core_1.Input },],
        "model": [{ type: core_1.Input },],
        "autofocus": [{ type: core_1.Input },],
        "closeAfterSelection": [{ type: core_1.Input },],
        "modelChange": [{ type: core_1.Output },],
        "setPopupAction": [{ type: core_1.Output },],
        "blur": [{ type: core_1.Output },],
        "focus": [{ type: core_1.Output },],
        "keyup": [{ type: core_1.Output },],
        "emojiClick": [{ type: core_1.Output },],
        "textareaEl": [{ type: core_1.ViewChild, args: ['textareaEl',] },],
        "inputEl": [{ type: core_1.ViewChild, args: ['inputEl',] },],
    };
    return EmojiInputComponent;
}());
exports.EmojiInputComponent = EmojiInputComponent;
//# sourceMappingURL=emoji-input.component.js.map

/***/ }),

/***/ "./node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.ngfactory.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.ngfactory.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i1 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i2 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
var i3 = __webpack_require__(/*! ./emoji-input.component */ "./node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.js");
var i4 = __webpack_require__(/*! ../emoji.service */ "./node_modules/ng-emoji-picker/src/emoji.service.js");
var styles_EmojiInputComponent = ["[_nghost-%COMP%] {\n        display: block;\n        position: relative;\n      }\n      [_nghost-%COMP%]   .emoji-search[_ngcontent-%COMP%] {\n        background-color: #fff;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);\n        height: auto;\n        line-height: 1.5;\n        position: absolute;\n        right: 0;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        z-index: 100;\n      }\n      [_nghost-%COMP%]   .emoji-search[hidden][_ngcontent-%COMP%] {\n        display: none;\n      }\n      [_nghost-%COMP%]   .emoji-search.bottom[_ngcontent-%COMP%] {\n        top: -202px;\n      }\n      [_nghost-%COMP%]   .emoji-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        border-radius: 4px;\n        font-size: 10px;\n        padding: 4px 8px;\n        margin: 0;\n        height: 30px;\n      }\n      [_nghost-%COMP%]   .emoji-search[_ngcontent-%COMP%]   .search-header[_ngcontent-%COMP%] {\n        background-color: #eee;\n        border-bottom: 1px solid #ccc;\n        border-radius: 4px 4px 0 0;\n        padding: 4px 8px;\n        width: 100%;\n      }\n      [_nghost-%COMP%]   .emoji-search[_ngcontent-%COMP%]   .emojis-container[_ngcontent-%COMP%] {\n        border-radius: 0 0 4px 4px;\n        max-height: 160px;\n        padding: 5px 12px;\n        overflow: auto;\n        overflow-x: hidden;\n        flex: 1;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: center;\n      }\n      [_nghost-%COMP%]   .emoji-search[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        cursor: pointer;\n        padding: 4px 3px 2px 4px;\n        font-size: 24px;\n      }\n      [_nghost-%COMP%]   .emoji-search[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover {\n        background-color: #ccc;\n      }"];
var RenderType_EmojiInputComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_EmojiInputComponent, data: {} });
exports.RenderType_EmojiInputComponent = RenderType_EmojiInputComponent;
function View_EmojiInputComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[1, 0], ["textareaEl", 1]], null, 8, "textarea", [["name", "text"]], [[1, "cols", 0], [1, "rows", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "keyup"], [null, "keyup.enter"], [null, "blur"], [null, "focus"], [null, "ngModelChange"], [null, "input"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 3)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 3).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 3)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 3)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("keyup" === en)) {
        var pd_4 = (_co.onKeyup($event) !== false);
        ad = (pd_4 && ad);
    } if (("keyup.enter" === en)) {
        var pd_5 = (_co.onEnter() !== false);
        ad = (pd_5 && ad);
    } if (("blur" === en)) {
        var pd_6 = (_co.onBlur($event) !== false);
        ad = (pd_6 && ad);
    } if (("focus" === en)) {
        var pd_7 = (_co.onFocus($event) !== false);
        ad = (pd_7 && ad);
    } if (("ngModelChange" === en)) {
        var pd_8 = (_co.onChange($event) !== false);
        ad = (pd_8 && ad);
    } if (("ngModelChange" === en)) {
        var pd_9 = ((_co.input = $event) !== false);
        ad = (pd_9 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpad(2, 1), i0.ɵdid(3, 16384, null, 0, i2.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i2.DefaultValueAccessor]), i0.ɵdid(5, 671744, null, 0, i2.NgModel, [[8, null], [8, null], [8, null], [6, i2.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i0.ɵdid(7, 16384, null, 0, i2.NgControlStatus, [[4, i2.NgControl]], null, null), (_l()(), i0.ɵted(-1, null, ["      "]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = _ck(_v, 2, 0, _co.inputClass); _ck(_v, 1, 0, currVal_9); var currVal_10 = "text"; var currVal_11 = _co.input; _ck(_v, 5, 0, currVal_10, currVal_11); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.textArea.cols; var currVal_1 = _co.textArea.rows; var currVal_2 = i0.ɵnov(_v, 7).ngClassUntouched; var currVal_3 = i0.ɵnov(_v, 7).ngClassTouched; var currVal_4 = i0.ɵnov(_v, 7).ngClassPristine; var currVal_5 = i0.ɵnov(_v, 7).ngClassDirty; var currVal_6 = i0.ɵnov(_v, 7).ngClassValid; var currVal_7 = i0.ɵnov(_v, 7).ngClassInvalid; var currVal_8 = i0.ɵnov(_v, 7).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_EmojiInputComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[2, 0], ["inputEl", 1]], null, 7, "input", [["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "keyup"], [null, "keyup.enter"], [null, "blur"], [null, "focus"], [null, "ngModelChange"], [null, "input"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 3)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 3).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 3)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 3)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("keyup" === en)) {
        var pd_4 = (_co.onKeyup($event) !== false);
        ad = (pd_4 && ad);
    } if (("keyup.enter" === en)) {
        var pd_5 = (_co.onEnter() !== false);
        ad = (pd_5 && ad);
    } if (("blur" === en)) {
        var pd_6 = (_co.onBlur($event) !== false);
        ad = (pd_6 && ad);
    } if (("focus" === en)) {
        var pd_7 = (_co.onFocus($event) !== false);
        ad = (pd_7 && ad);
    } if (("ngModelChange" === en)) {
        var pd_8 = (_co.onChange($event) !== false);
        ad = (pd_8 && ad);
    } if (("ngModelChange" === en)) {
        var pd_9 = ((_co.input = $event) !== false);
        ad = (pd_9 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpad(2, 1), i0.ɵdid(3, 16384, null, 0, i2.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i2.DefaultValueAccessor]), i0.ɵdid(5, 671744, null, 0, i2.NgModel, [[8, null], [8, null], [8, null], [6, i2.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i0.ɵdid(7, 16384, null, 0, i2.NgControlStatus, [[4, i2.NgControl]], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _ck(_v, 2, 0, _co.inputClass); _ck(_v, 1, 0, currVal_7); var currVal_8 = _co.input; _ck(_v, 5, 0, currVal_8); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 7).ngClassUntouched; var currVal_1 = i0.ɵnov(_v, 7).ngClassTouched; var currVal_2 = i0.ɵnov(_v, 7).ngClassPristine; var currVal_3 = i0.ɵnov(_v, 7).ngClassDirty; var currVal_4 = i0.ɵnov(_v, 7).ngClassValid; var currVal_5 = i0.ɵnov(_v, 7).ngClassInvalid; var currVal_6 = i0.ɵnov(_v, 7).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
function View_EmojiInputComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onEmojiClick(_v.context.$implicit.emoji) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(1, null, [" ", " "]))], null, function (_ck, _v) { var currVal_0 = i0.ɵinlineInterpolate(1, "", _v.context.$implicit.aliases[0], ""); _ck(_v, 0, 0, currVal_0); var currVal_1 = _v.context.$implicit.emoji; _ck(_v, 1, 0, currVal_1); }); }
function View_EmojiInputComponent_0(_l) { return i0.ɵvid(0, [i0.ɵqud(671088640, 1, { textareaEl: 0 }), i0.ɵqud(671088640, 2, { inputEl: 0 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_EmojiInputComponent_1)), i0.ɵdid(3, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_EmojiInputComponent_2)), i0.ɵdid(5, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(6, 0, null, null, 12, "div", [["class", "emoji-search"]], [[8, "hidden", 0], [4, "display", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = ($event.stopPropagation() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(7, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpad(8, 2), (_l()(), i0.ɵeld(9, 0, null, null, 6, "div", [["class", "search-header"]], null, null, null, null, null)), (_l()(), i0.ɵeld(10, 0, null, null, 5, "input", [["placeholder", "Search..."], ["type", "search"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 11)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 11).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 11)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 11)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.filterEmojis = $event) !== false);
        ad = (pd_4 && ad);
    } if (("ngModelChange" === en)) {
        var pd_5 = (_co.updateFilteredEmojis() !== false);
        ad = (pd_5 && ad);
    } return ad; }, null, null)), i0.ɵdid(11, 16384, null, 0, i2.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i2.DefaultValueAccessor]), i0.ɵdid(13, 671744, null, 0, i2.NgModel, [[8, null], [8, null], [8, null], [6, i2.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i2.NgControl, null, [i2.NgModel]), i0.ɵdid(15, 16384, null, 0, i2.NgControlStatus, [[4, i2.NgControl]], null, null), (_l()(), i0.ɵeld(16, 0, null, null, 2, "div", [["class", "emojis-container"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_EmojiInputComponent_3)), i0.ɵdid(18, 802816, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.textArea; _ck(_v, 3, 0, currVal_0); var currVal_1 = !_co.textArea; _ck(_v, 5, 0, currVal_1); var currVal_4 = "emoji-search"; var currVal_5 = _ck(_v, 8, 0, _co.popupAnchor, _co.searchClass); _ck(_v, 7, 0, currVal_4, currVal_5); var currVal_13 = _co.filterEmojis; _ck(_v, 13, 0, currVal_13); var currVal_14 = _co.filteredEmojis; _ck(_v, 18, 0, currVal_14); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = !_co.popupOpen; var currVal_3 = (_co.popupOpen ? "flex" : "none"); _ck(_v, 6, 0, currVal_2, currVal_3); var currVal_6 = i0.ɵnov(_v, 15).ngClassUntouched; var currVal_7 = i0.ɵnov(_v, 15).ngClassTouched; var currVal_8 = i0.ɵnov(_v, 15).ngClassPristine; var currVal_9 = i0.ɵnov(_v, 15).ngClassDirty; var currVal_10 = i0.ɵnov(_v, 15).ngClassValid; var currVal_11 = i0.ɵnov(_v, 15).ngClassInvalid; var currVal_12 = i0.ɵnov(_v, 15).ngClassPending; _ck(_v, 10, 0, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12); }); }
exports.View_EmojiInputComponent_0 = View_EmojiInputComponent_0;
function View_EmojiInputComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "emoji-input", [], null, null, null, View_EmojiInputComponent_0, RenderType_EmojiInputComponent)), i0.ɵdid(1, 4833280, null, 0, i3.EmojiInputComponent, [i4.EmojiService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_EmojiInputComponent_Host_0 = View_EmojiInputComponent_Host_0;
var EmojiInputComponentNgFactory = i0.ɵccf("emoji-input", i3.EmojiInputComponent, View_EmojiInputComponent_Host_0, { textArea: "textArea", popupAnchor: "popupAnchor", inputClass: "inputClass", searchClass: "searchClass", onEnter: "onEnter", model: "model", autofocus: "autofocus", closeAfterSelection: "closeAfterSelection" }, { modelChange: "modelChange", setPopupAction: "setPopupAction", blur: "blur", focus: "focus", keyup: "keyup", emojiClick: "emojiClick" }, []);
exports.EmojiInputComponentNgFactory = EmojiInputComponentNgFactory;


/***/ }),

/***/ "./node_modules/ng-emoji-picker/src/emoji.db.js":
/*!******************************************************!*\
  !*** ./node_modules/ng-emoji-picker/src/emoji.db.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EMOJI_DB = [{
        "emoji": "😄",
        "description": "smiling face with open mouth and smiling eyes",
        "aliases": [
            "smile"
        ],
        "tags": [
            "happy", "joy", "pleased"
        ]
    }, {
        "emoji": "😃",
        "description": "smiling face with open mouth",
        "aliases": [
            "smiley"
        ],
        "tags": [
            "happy", "joy", "haha"
        ]
    }, {
        "emoji": "😀",
        "description": "grinning face",
        "aliases": [
            "grinning"
        ],
        "tags": [
            "smile", "happy"
        ]
    }, {
        "emoji": "😊",
        "description": "smiling face with smiling eyes",
        "aliases": [
            "blush"
        ],
        "tags": [
            "proud"
        ]
    }, {
        "emoji": "☺️",
        "description": "white smiling face",
        "aliases": [
            "relaxed"
        ],
        "tags": [
            "blush", "pleased"
        ]
    }, {
        "emoji": "😉",
        "description": "winking face",
        "aliases": [
            "wink"
        ],
        "tags": [
            "flirt"
        ]
    }, {
        "emoji": "😍",
        "description": "smiling face with heart-shaped eyes",
        "aliases": [
            "heart_eyes"
        ],
        "tags": [
            "love", "crush"
        ]
    }, {
        "emoji": "😘",
        "description": "face throwing a kiss",
        "aliases": [
            "kissing_heart"
        ],
        "tags": [
            "flirt"
        ]
    }, {
        "emoji": "😚",
        "description": "kissing face with closed eyes",
        "aliases": [
            "kissing_closed_eyes"
        ],
        "tags": []
    }, {
        "emoji": "😗",
        "description": "kissing face",
        "aliases": [
            "kissing"
        ],
        "tags": []
    }, {
        "emoji": "😙",
        "description": "kissing face with smiling eyes",
        "aliases": [
            "kissing_smiling_eyes"
        ],
        "tags": []
    }, {
        "emoji": "😜",
        "description": "face with stuck-out tongue and winking eye",
        "aliases": [
            "stuck_out_tongue_winking_eye"
        ],
        "tags": [
            "prank", "silly"
        ]
    }, {
        "emoji": "😝",
        "description": "face with stuck-out tongue and tightly-closed eyes",
        "aliases": [
            "stuck_out_tongue_closed_eyes"
        ],
        "tags": [
            "prank"
        ]
    }, {
        "emoji": "😛",
        "description": "face with stuck-out tongue",
        "aliases": [
            "stuck_out_tongue"
        ],
        "tags": []
    }, {
        "emoji": "😳",
        "description": "flushed face",
        "aliases": [
            "flushed"
        ],
        "tags": []
    }, {
        "emoji": "😁",
        "description": "grinning face with smiling eyes",
        "aliases": [
            "grin"
        ],
        "tags": []
    }, {
        "emoji": "😔",
        "description": "pensive face",
        "aliases": [
            "pensive"
        ],
        "tags": []
    }, {
        "emoji": "😌",
        "description": "relieved face",
        "aliases": [
            "relieved"
        ],
        "tags": [
            "whew"
        ]
    }, {
        "emoji": "😒",
        "description": "unamused face",
        "aliases": [
            "unamused"
        ],
        "tags": [
            "meh"
        ]
    }, {
        "emoji": "😞",
        "description": "disappointed face",
        "aliases": [
            "disappointed"
        ],
        "tags": [
            "sad"
        ]
    }, {
        "emoji": "😣",
        "description": "persevering face",
        "aliases": [
            "persevere"
        ],
        "tags": [
            "struggling"
        ]
    }, {
        "emoji": "😢",
        "description": "crying face",
        "aliases": [
            "cry"
        ],
        "tags": [
            "sad", "tear"
        ]
    }, {
        "emoji": "😂",
        "description": "face with tears of joy",
        "aliases": [
            "joy"
        ],
        "tags": [
            "tears"
        ]
    }, {
        "emoji": "😭",
        "description": "loudly crying face",
        "aliases": [
            "sob"
        ],
        "tags": [
            "sad", "cry", "bawling"
        ]
    }, {
        "emoji": "😪",
        "description": "sleepy face",
        "aliases": [
            "sleepy"
        ],
        "tags": [
            "tired"
        ]
    }, {
        "emoji": "😥",
        "description": "disappointed but relieved face",
        "aliases": [
            "disappointed_relieved"
        ],
        "tags": [
            "phew", "sweat", "nervous"
        ]
    }, {
        "emoji": "😰",
        "description": "face with open mouth and cold sweat",
        "aliases": [
            "cold_sweat"
        ],
        "tags": [
            "nervous"
        ]
    }, {
        "emoji": "😅",
        "description": "smiling face with open mouth and cold sweat",
        "aliases": [
            "sweat_smile"
        ],
        "tags": [
            "hot"
        ]
    }, {
        "emoji": "😓",
        "description": "face with cold sweat",
        "aliases": [
            "sweat"
        ],
        "tags": []
    }, {
        "emoji": "😩",
        "description": "weary face",
        "aliases": [
            "weary"
        ],
        "tags": [
            "tired"
        ]
    }, {
        "emoji": "😫",
        "description": "tired face",
        "aliases": [
            "tired_face"
        ],
        "tags": [
            "upset", "whine"
        ]
    }, {
        "emoji": "😨",
        "description": "fearful face",
        "aliases": [
            "fearful"
        ],
        "tags": [
            "scared", "shocked", "oops"
        ]
    }, {
        "emoji": "😱",
        "description": "face screaming in fear",
        "aliases": [
            "scream"
        ],
        "tags": [
            "horror", "shocked"
        ]
    }, {
        "emoji": "😠",
        "description": "angry face",
        "aliases": [
            "angry"
        ],
        "tags": [
            "mad", "annoyed"
        ]
    }, {
        "emoji": "😡",
        "description": "pouting face",
        "aliases": [
            "rage", "pout"
        ],
        "tags": [
            "angry"
        ]
    }, {
        "emoji": "😤",
        "description": "face with look of triumph",
        "aliases": [
            "triumph"
        ],
        "tags": [
            "smug"
        ]
    }, {
        "emoji": "😖",
        "description": "confounded face",
        "aliases": [
            "confounded"
        ],
        "tags": []
    }, {
        "emoji": "😆",
        "description": "smiling face with open mouth and tightly-closed eyes",
        "aliases": [
            "laughing", "satisfied"
        ],
        "tags": [
            "happy", "haha"
        ]
    }, {
        "emoji": "😋",
        "description": "face savouring delicious food",
        "aliases": [
            "yum"
        ],
        "tags": [
            "tongue", "lick"
        ]
    }, {
        "emoji": "😷",
        "description": "face with medical mask",
        "aliases": [
            "mask"
        ],
        "tags": [
            "sick", "ill"
        ]
    }, {
        "emoji": "😎",
        "description": "smiling face with sunglasses",
        "aliases": [
            "sunglasses"
        ],
        "tags": [
            "cool"
        ]
    }, {
        "emoji": "😴",
        "description": "sleeping face",
        "aliases": [
            "sleeping"
        ],
        "tags": [
            "zzz"
        ]
    }, {
        "emoji": "😵",
        "description": "dizzy face",
        "aliases": [
            "dizzy_face"
        ],
        "tags": []
    }, {
        "emoji": "😲",
        "description": "astonished face",
        "aliases": [
            "astonished"
        ],
        "tags": [
            "amazed", "gasp"
        ]
    }, {
        "emoji": "😟",
        "description": "worried face",
        "aliases": [
            "worried"
        ],
        "tags": [
            "nervous"
        ]
    }, {
        "emoji": "😦",
        "description": "frowning face with open mouth",
        "aliases": [
            "frowning"
        ],
        "tags": []
    }, {
        "emoji": "😧",
        "description": "anguished face",
        "aliases": [
            "anguished"
        ],
        "tags": [
            "stunned"
        ]
    }, {
        "emoji": "😈",
        "description": "smiling face with horns",
        "aliases": [
            "smiling_imp"
        ],
        "tags": [
            "devil", "evil", "horns"
        ]
    }, {
        "emoji": "👿",
        "description": "imp",
        "aliases": [
            "imp"
        ],
        "tags": [
            "angry", "devil", "evil", "horns"
        ]
    }, {
        "emoji": "😮",
        "description": "face with open mouth",
        "aliases": [
            "open_mouth"
        ],
        "tags": [
            "surprise", "impressed", "wow"
        ]
    }, {
        "emoji": "😬",
        "description": "grimacing face",
        "aliases": [
            "grimacing"
        ],
        "tags": []
    }, {
        "emoji": "😐",
        "description": "neutral face",
        "aliases": [
            "neutral_face"
        ],
        "tags": [
            "meh"
        ]
    }, {
        "emoji": "😕",
        "description": "confused face",
        "aliases": [
            "confused"
        ],
        "tags": []
    }, {
        "emoji": "😯",
        "description": "hushed face",
        "aliases": [
            "hushed"
        ],
        "tags": [
            "silence", "speechless"
        ]
    }, {
        "emoji": "😶",
        "description": "face without mouth",
        "aliases": [
            "no_mouth"
        ],
        "tags": [
            "mute", "silence"
        ]
    }, {
        "emoji": "😇",
        "description": "smiling face with halo",
        "aliases": [
            "innocent"
        ],
        "tags": [
            "angel"
        ]
    }, {
        "emoji": "😏",
        "description": "smirking face",
        "aliases": [
            "smirk"
        ],
        "tags": [
            "smug"
        ]
    }, {
        "emoji": "😑",
        "description": "expressionless face",
        "aliases": [
            "expressionless"
        ],
        "tags": []
    }, {
        "emoji": "👲",
        "description": "man with gua pi mao",
        "aliases": [
            "man_with_gua_pi_mao"
        ],
        "tags": []
    }, {
        "emoji": "👳",
        "description": "man with turban",
        "aliases": [
            "man_with_turban"
        ],
        "tags": []
    }, {
        "emoji": "👮",
        "description": "police officer",
        "aliases": [
            "cop"
        ],
        "tags": [
            "police", "law"
        ]
    }, {
        "emoji": "👷",
        "description": "construction worker",
        "aliases": [
            "construction_worker"
        ],
        "tags": [
            "helmet"
        ]
    }, {
        "emoji": "💂",
        "description": "guardsman",
        "aliases": [
            "guardsman"
        ],
        "tags": []
    }, {
        "emoji": "👶",
        "description": "baby",
        "aliases": [
            "baby"
        ],
        "tags": [
            "child", "newborn"
        ]
    }, {
        "emoji": "👦",
        "description": "boy",
        "aliases": [
            "boy"
        ],
        "tags": [
            "child"
        ]
    }, {
        "emoji": "👧",
        "description": "girl",
        "aliases": [
            "girl"
        ],
        "tags": [
            "child"
        ]
    }, {
        "emoji": "👨",
        "description": "man",
        "aliases": [
            "man"
        ],
        "tags": [
            "mustache", "father", "dad"
        ]
    }, {
        "emoji": "👩",
        "description": "woman",
        "aliases": [
            "woman"
        ],
        "tags": [
            "girls"
        ]
    }, {
        "emoji": "👴",
        "description": "older man",
        "aliases": [
            "older_man"
        ],
        "tags": []
    }, {
        "emoji": "👵",
        "description": "older woman",
        "aliases": [
            "older_woman"
        ],
        "tags": []
    }, {
        "emoji": "👱",
        "description": "person with blond hair",
        "aliases": [
            "person_with_blond_hair"
        ],
        "tags": [
            "boy"
        ]
    }, {
        "emoji": "👼",
        "description": "baby angel",
        "aliases": [
            "angel"
        ],
        "tags": []
    }, {
        "emoji": "👸",
        "description": "princess",
        "aliases": [
            "princess"
        ],
        "tags": [
            "blonde", "crown", "royal"
        ]
    }, {
        "emoji": "😺",
        "description": "smiling cat face with open mouth",
        "aliases": [
            "smiley_cat"
        ],
        "tags": []
    }, {
        "emoji": "😸",
        "description": "grinning cat face with smiling eyes",
        "aliases": [
            "smile_cat"
        ],
        "tags": []
    }, {
        "emoji": "😻",
        "description": "smiling cat face with heart-shaped eyes",
        "aliases": [
            "heart_eyes_cat"
        ],
        "tags": []
    }, {
        "emoji": "😽",
        "description": "kissing cat face with closed eyes",
        "aliases": [
            "kissing_cat"
        ],
        "tags": []
    }, {
        "emoji": "😼",
        "description": "cat face with wry smile",
        "aliases": [
            "smirk_cat"
        ],
        "tags": []
    }, {
        "emoji": "🙀",
        "description": "weary cat face",
        "aliases": [
            "scream_cat"
        ],
        "tags": [
            "horror"
        ]
    }, {
        "emoji": "😿",
        "description": "crying cat face",
        "aliases": [
            "crying_cat_face"
        ],
        "tags": [
            "sad", "tear"
        ]
    }, {
        "emoji": "😹",
        "description": "cat face with tears of joy",
        "aliases": [
            "joy_cat"
        ],
        "tags": []
    }, {
        "emoji": "😾",
        "description": "pouting cat face",
        "aliases": [
            "pouting_cat"
        ],
        "tags": []
    }, {
        "emoji": "👹",
        "description": "japanese ogre",
        "aliases": [
            "japanese_ogre"
        ],
        "tags": [
            "monster"
        ]
    }, {
        "emoji": "👺",
        "description": "japanese goblin",
        "aliases": [
            "japanese_goblin"
        ],
        "tags": []
    }, {
        "emoji": "🙈",
        "description": "see-no-evil monkey",
        "aliases": [
            "see_no_evil"
        ],
        "tags": [
            "monkey", "blind", "ignore"
        ]
    }, {
        "emoji": "🙉",
        "description": "hear-no-evil monkey",
        "aliases": [
            "hear_no_evil"
        ],
        "tags": [
            "monkey", "deaf"
        ]
    }, {
        "emoji": "🙊",
        "description": "speak-no-evil monkey",
        "aliases": [
            "speak_no_evil"
        ],
        "tags": [
            "monkey", "mute", "hush"
        ]
    }, {
        "emoji": "💀",
        "description": "skull",
        "aliases": [
            "skull"
        ],
        "tags": [
            "dead", "danger", "poison"
        ]
    }, {
        "emoji": "👽",
        "description": "extraterrestrial alien",
        "aliases": [
            "alien"
        ],
        "tags": [
            "ufo"
        ]
    }, {
        "emoji": "💩",
        "description": "pile of poo",
        "aliases": [
            "hankey", "poop", "shit"
        ],
        "tags": [
            "crap"
        ]
    }, {
        "emoji": "🔥",
        "description": "fire",
        "aliases": [
            "fire"
        ],
        "tags": [
            "burn"
        ]
    }, {
        "emoji": "✨",
        "description": "sparkles",
        "aliases": [
            "sparkles"
        ],
        "tags": [
            "shiny"
        ]
    }, {
        "emoji": "🌟",
        "description": "glowing star",
        "aliases": [
            "star2"
        ],
        "tags": []
    }, {
        "emoji": "💫",
        "description": "dizzy symbol",
        "aliases": [
            "dizzy"
        ],
        "tags": [
            "star"
        ]
    }, {
        "emoji": "💥",
        "description": "collision symbol",
        "aliases": [
            "boom", "collision"
        ],
        "tags": [
            "explode"
        ]
    }, {
        "emoji": "💢",
        "description": "anger symbol",
        "aliases": [
            "anger"
        ],
        "tags": [
            "angry"
        ]
    }, {
        "emoji": "💦",
        "description": "splashing sweat symbol",
        "aliases": [
            "sweat_drops"
        ],
        "tags": [
            "water", "workout"
        ]
    }, {
        "emoji": "💧",
        "description": "droplet",
        "aliases": [
            "droplet"
        ],
        "tags": [
            "water"
        ]
    }, {
        "emoji": "💤",
        "description": "sleeping symbol",
        "aliases": [
            "zzz"
        ],
        "tags": [
            "sleeping"
        ]
    }, {
        "emoji": "💨",
        "description": "dash symbol",
        "aliases": [
            "dash"
        ],
        "tags": [
            "wind", "blow", "fast"
        ]
    }, {
        "emoji": "👂",
        "description": "ear",
        "aliases": [
            "ear"
        ],
        "tags": [
            "hear", "sound", "listen"
        ]
    }, {
        "emoji": "👀",
        "description": "eyes",
        "aliases": [
            "eyes"
        ],
        "tags": [
            "look", "see", "watch"
        ]
    }, {
        "emoji": "👃",
        "description": "nose",
        "aliases": [
            "nose"
        ],
        "tags": [
            "smell"
        ]
    }, {
        "emoji": "👅",
        "description": "tongue",
        "aliases": [
            "tongue"
        ],
        "tags": [
            "taste"
        ]
    }, {
        "emoji": "👄",
        "description": "mouth",
        "aliases": [
            "lips"
        ],
        "tags": [
            "kiss"
        ]
    }, {
        "emoji": "👍",
        "description": "thumbs up sign",
        "aliases": [
            "+1", "thumbsup"
        ],
        "tags": [
            "approve", "ok"
        ]
    }, {
        "emoji": "👎",
        "description": "thumbs down sign",
        "aliases": [
            "-1", "thumbsdown"
        ],
        "tags": [
            "disapprove", "bury"
        ]
    }, {
        "emoji": "👌",
        "description": "ok hand sign",
        "aliases": [
            "ok_hand"
        ],
        "tags": []
    }, {
        "emoji": "👊",
        "description": "fisted hand sign",
        "aliases": [
            "facepunch", "punch"
        ],
        "tags": [
            "attack"
        ]
    }, {
        "emoji": "✊",
        "description": "raised fist",
        "aliases": [
            "fist"
        ],
        "tags": [
            "power"
        ]
    }, {
        "emoji": "✌️",
        "description": "victory hand",
        "aliases": [
            "v"
        ],
        "tags": [
            "victory", "peace"
        ]
    }, {
        "emoji": "👋",
        "description": "waving hand sign",
        "aliases": [
            "wave"
        ],
        "tags": [
            "goodbye"
        ]
    }, {
        "emoji": "✋",
        "description": "raised hand",
        "aliases": [
            "hand", "raised_hand"
        ],
        "tags": [
            "highfive", "stop"
        ]
    }, {
        "emoji": "👐",
        "description": "open hands sign",
        "aliases": [
            "open_hands"
        ],
        "tags": []
    }, {
        "emoji": "👆",
        "description": "white up pointing backhand index",
        "aliases": [
            "point_up_2"
        ],
        "tags": []
    }, {
        "emoji": "👇",
        "description": "white down pointing backhand index",
        "aliases": [
            "point_down"
        ],
        "tags": []
    }, {
        "emoji": "👉",
        "description": "white right pointing backhand index",
        "aliases": [
            "point_right"
        ],
        "tags": []
    }, {
        "emoji": "👈",
        "description": "white left pointing backhand index",
        "aliases": [
            "point_left"
        ],
        "tags": []
    }, {
        "emoji": "🙌",
        "description": "person raising both hands in celebration",
        "aliases": [
            "raised_hands"
        ],
        "tags": [
            "hooray"
        ]
    }, {
        "emoji": "🙏",
        "description": "person with folded hands",
        "aliases": [
            "pray"
        ],
        "tags": [
            "please", "hope", "wish"
        ]
    }, {
        "emoji": "☝️",
        "description": "white up pointing index",
        "aliases": [
            "point_up"
        ],
        "tags": []
    }, {
        "emoji": "👏",
        "description": "clapping hands sign",
        "aliases": [
            "clap"
        ],
        "tags": [
            "praise", "applause"
        ]
    }, {
        "emoji": "💪",
        "description": "flexed biceps",
        "aliases": [
            "muscle"
        ],
        "tags": [
            "flex", "bicep", "strong", "workout"
        ]
    }, {
        "emoji": "🚶",
        "description": "pedestrian",
        "aliases": [
            "walking"
        ],
        "tags": []
    }, {
        "emoji": "🏃",
        "description": "runner",
        "aliases": [
            "runner", "running"
        ],
        "tags": [
            "exercise", "workout", "marathon"
        ]
    }, {
        "emoji": "💃",
        "description": "dancer",
        "aliases": [
            "dancer"
        ],
        "tags": [
            "dress"
        ]
    }, {
        "emoji": "👫",
        "description": "man and woman holding hands",
        "aliases": [
            "couple"
        ],
        "tags": [
            "date"
        ]
    }, {
        "emoji": "👪",
        "description": "family",
        "aliases": [
            "family"
        ],
        "tags": [
            "home", "parents", "child"
        ]
    }, {
        "emoji": "👬",
        "description": "two men holding hands",
        "aliases": [
            "two_men_holding_hands"
        ],
        "tags": [
            "couple", "date"
        ]
    }, {
        "emoji": "👭",
        "description": "two women holding hands",
        "aliases": [
            "two_women_holding_hands"
        ],
        "tags": [
            "couple", "date"
        ]
    }, {
        "emoji": "💏",
        "description": "kiss",
        "aliases": [
            "couplekiss"
        ],
        "tags": []
    }, {
        "emoji": "💑",
        "description": "couple with heart",
        "aliases": [
            "couple_with_heart"
        ],
        "tags": []
    }, {
        "emoji": "👯",
        "description": "woman with bunny ears",
        "aliases": [
            "dancers"
        ],
        "tags": [
            "bunny"
        ]
    }, {
        "emoji": "🙆",
        "description": "face with ok gesture",
        "aliases": [
            "ok_woman"
        ],
        "tags": []
    }, {
        "emoji": "🙅",
        "description": "face with no good gesture",
        "aliases": [
            "no_good", "ng_woman"
        ],
        "tags": [
            "stop", "halt"
        ]
    }, {
        "emoji": "💁",
        "description": "information desk person",
        "aliases": [
            "information_desk_person"
        ],
        "tags": []
    }, {
        "emoji": "🙋",
        "description": "happy person raising one hand",
        "aliases": [
            "raising_hand"
        ],
        "tags": []
    }, {
        "emoji": "💆",
        "description": "face massage",
        "aliases": [
            "massage"
        ],
        "tags": [
            "spa"
        ]
    }, {
        "emoji": "💇",
        "description": "haircut",
        "aliases": [
            "haircut"
        ],
        "tags": [
            "beauty"
        ]
    }, {
        "emoji": "💅",
        "description": "nail polish",
        "aliases": [
            "nail_care"
        ],
        "tags": [
            "beauty", "manicure"
        ]
    }, {
        "emoji": "👰",
        "description": "bride with veil",
        "aliases": [
            "bride_with_veil"
        ],
        "tags": [
            "marriage", "wedding"
        ]
    }, {
        "emoji": "🙎",
        "description": "person with pouting face",
        "aliases": [
            "person_with_pouting_face"
        ],
        "tags": []
    }, {
        "emoji": "🙍",
        "description": "person frowning",
        "aliases": [
            "person_frowning"
        ],
        "tags": [
            "sad"
        ]
    }, {
        "emoji": "🙇",
        "description": "person bowing deeply",
        "aliases": [
            "bow"
        ],
        "tags": [
            "respect", "thanks"
        ]
    }, {
        "emoji": "🎩",
        "description": "top hat",
        "aliases": [
            "tophat"
        ],
        "tags": [
            "hat", "classy"
        ]
    }, {
        "emoji": "👑",
        "description": "crown",
        "aliases": [
            "crown"
        ],
        "tags": [
            "king", "queen", "royal"
        ]
    }, {
        "emoji": "👒",
        "description": "womans hat",
        "aliases": [
            "womans_hat"
        ],
        "tags": []
    }, {
        "emoji": "👟",
        "description": "athletic shoe",
        "aliases": [
            "athletic_shoe"
        ],
        "tags": [
            "sneaker", "sport", "running"
        ]
    }, {
        "emoji": "👞",
        "description": "mans shoe",
        "aliases": [
            "mans_shoe", "shoe"
        ],
        "tags": []
    }, {
        "emoji": "👡",
        "description": "womans sandal",
        "aliases": [
            "sandal"
        ],
        "tags": [
            "shoe"
        ]
    }, {
        "emoji": "👠",
        "description": "high-heeled shoe",
        "aliases": [
            "high_heel"
        ],
        "tags": [
            "shoe"
        ]
    }, {
        "emoji": "👢",
        "description": "womans boots",
        "aliases": [
            "boot"
        ],
        "tags": []
    }, {
        "emoji": "👕",
        "description": "t-shirt",
        "aliases": [
            "shirt", "tshirt"
        ],
        "tags": []
    }, {
        "emoji": "👔",
        "description": "necktie",
        "aliases": [
            "necktie"
        ],
        "tags": [
            "shirt", "formal"
        ]
    }, {
        "emoji": "👚",
        "description": "womans clothes",
        "aliases": [
            "womans_clothes"
        ],
        "tags": []
    }, {
        "emoji": "👗",
        "description": "dress",
        "aliases": [
            "dress"
        ],
        "tags": []
    }, {
        "emoji": "🎽",
        "description": "running shirt with sash",
        "aliases": [
            "running_shirt_with_sash"
        ],
        "tags": [
            "marathon"
        ]
    }, {
        "emoji": "👖",
        "description": "jeans",
        "aliases": [
            "jeans"
        ],
        "tags": [
            "pants"
        ]
    }, {
        "emoji": "👘",
        "description": "kimono",
        "aliases": [
            "kimono"
        ],
        "tags": []
    }, {
        "emoji": "👙",
        "description": "bikini",
        "aliases": [
            "bikini"
        ],
        "tags": [
            "beach"
        ]
    }, {
        "emoji": "💼",
        "description": "briefcase",
        "aliases": [
            "briefcase"
        ],
        "tags": [
            "business"
        ]
    }, {
        "emoji": "👜",
        "description": "handbag",
        "aliases": [
            "handbag"
        ],
        "tags": [
            "bag"
        ]
    }, {
        "emoji": "👝",
        "description": "pouch",
        "aliases": [
            "pouch"
        ],
        "tags": [
            "bag"
        ]
    }, {
        "emoji": "👛",
        "description": "purse",
        "aliases": [
            "purse"
        ],
        "tags": []
    }, {
        "emoji": "👓",
        "description": "eyeglasses",
        "aliases": [
            "eyeglasses"
        ],
        "tags": [
            "glasses"
        ]
    }, {
        "emoji": "🎀",
        "description": "ribbon",
        "aliases": [
            "ribbon"
        ],
        "tags": []
    }, {
        "emoji": "🌂",
        "description": "closed umbrella",
        "aliases": [
            "closed_umbrella"
        ],
        "tags": [
            "weather", "rain"
        ]
    }, {
        "emoji": "💄",
        "description": "lipstick",
        "aliases": [
            "lipstick"
        ],
        "tags": [
            "makeup"
        ]
    }, {
        "emoji": "💛",
        "description": "yellow heart",
        "aliases": [
            "yellow_heart"
        ],
        "tags": []
    }, {
        "emoji": "💙",
        "description": "blue heart",
        "aliases": [
            "blue_heart"
        ],
        "tags": []
    }, {
        "emoji": "💜",
        "description": "purple heart",
        "aliases": [
            "purple_heart"
        ],
        "tags": []
    }, {
        "emoji": "💚",
        "description": "green heart",
        "aliases": [
            "green_heart"
        ],
        "tags": []
    }, {
        "emoji": "❤️",
        "description": "heavy black heart",
        "aliases": [
            "heart"
        ],
        "tags": [
            "love"
        ]
    }, {
        "emoji": "💔",
        "description": "broken heart",
        "aliases": [
            "broken_heart"
        ],
        "tags": []
    }, {
        "emoji": "💗",
        "description": "growing heart",
        "aliases": [
            "heartpulse"
        ],
        "tags": []
    }, {
        "emoji": "💓",
        "description": "beating heart",
        "aliases": [
            "heartbeat"
        ],
        "tags": []
    }, {
        "emoji": "💕",
        "description": "two hearts",
        "aliases": [
            "two_hearts"
        ],
        "tags": []
    }, {
        "emoji": "💖",
        "description": "sparkling heart",
        "aliases": [
            "sparkling_heart"
        ],
        "tags": []
    }, {
        "emoji": "💞",
        "description": "revolving hearts",
        "aliases": [
            "revolving_hearts"
        ],
        "tags": []
    }, {
        "emoji": "💘",
        "description": "heart with arrow",
        "aliases": [
            "cupid"
        ],
        "tags": [
            "love", "heart"
        ]
    }, {
        "emoji": "💌",
        "description": "love letter",
        "aliases": [
            "love_letter"
        ],
        "tags": [
            "email", "envelope"
        ]
    }, {
        "emoji": "💋",
        "description": "kiss mark",
        "aliases": [
            "kiss"
        ],
        "tags": [
            "lipstick"
        ]
    }, {
        "emoji": "💍",
        "description": "ring",
        "aliases": [
            "ring"
        ],
        "tags": [
            "wedding", "marriage", "engaged"
        ]
    }, {
        "emoji": "💎",
        "description": "gem stone",
        "aliases": [
            "gem"
        ],
        "tags": [
            "diamond"
        ]
    }, {
        "emoji": "👤",
        "description": "bust in silhouette",
        "aliases": [
            "bust_in_silhouette"
        ],
        "tags": [
            "user"
        ]
    }, {
        "emoji": "👥",
        "description": "busts in silhouette",
        "aliases": [
            "busts_in_silhouette"
        ],
        "tags": [
            "users", "group", "team"
        ]
    }, {
        "emoji": "💬",
        "description": "speech balloon",
        "aliases": [
            "speech_balloon"
        ],
        "tags": [
            "comment"
        ]
    }, {
        "emoji": "👣",
        "description": "footprints",
        "aliases": [
            "footprints"
        ],
        "tags": [
            "feet", "tracks"
        ]
    }, {
        "emoji": "💭",
        "description": "thought balloon",
        "aliases": [
            "thought_balloon"
        ],
        "tags": [
            "thinking"
        ]
    }, {
        "emoji": "🐶",
        "description": "dog face",
        "aliases": [
            "dog"
        ],
        "tags": [
            "pet"
        ]
    }, {
        "emoji": "🐺",
        "description": "wolf face",
        "aliases": [
            "wolf"
        ],
        "tags": []
    }, {
        "emoji": "🐱",
        "description": "cat face",
        "aliases": [
            "cat"
        ],
        "tags": [
            "pet"
        ]
    }, {
        "emoji": "🐭",
        "description": "mouse face",
        "aliases": [
            "mouse"
        ],
        "tags": []
    }, {
        "emoji": "🐹",
        "description": "hamster face",
        "aliases": [
            "hamster"
        ],
        "tags": [
            "pet"
        ]
    }, {
        "emoji": "🐰",
        "description": "rabbit face",
        "aliases": [
            "rabbit"
        ],
        "tags": [
            "bunny"
        ]
    }, {
        "emoji": "🐸",
        "description": "frog face",
        "aliases": [
            "frog"
        ],
        "tags": []
    }, {
        "emoji": "🐯",
        "description": "tiger face",
        "aliases": [
            "tiger"
        ],
        "tags": []
    }, {
        "emoji": "🐨",
        "description": "koala",
        "aliases": [
            "koala"
        ],
        "tags": []
    }, {
        "emoji": "🐻",
        "description": "bear face",
        "aliases": [
            "bear"
        ],
        "tags": []
    }, {
        "emoji": "🐷",
        "description": "pig face",
        "aliases": [
            "pig"
        ],
        "tags": []
    }, {
        "emoji": "🐽",
        "description": "pig nose",
        "aliases": [
            "pig_nose"
        ],
        "tags": []
    }, {
        "emoji": "🐮",
        "description": "cow face",
        "aliases": [
            "cow"
        ],
        "tags": []
    }, {
        "emoji": "🐗",
        "description": "boar",
        "aliases": [
            "boar"
        ],
        "tags": []
    }, {
        "emoji": "🐵",
        "description": "monkey face",
        "aliases": [
            "monkey_face"
        ],
        "tags": []
    }, {
        "emoji": "🐒",
        "description": "monkey",
        "aliases": [
            "monkey"
        ],
        "tags": []
    }, {
        "emoji": "🐴",
        "description": "horse face",
        "aliases": [
            "horse"
        ],
        "tags": []
    }, {
        "emoji": "🐑",
        "description": "sheep",
        "aliases": [
            "sheep"
        ],
        "tags": []
    }, {
        "emoji": "🐘",
        "description": "elephant",
        "aliases": [
            "elephant"
        ],
        "tags": []
    }, {
        "emoji": "🐼",
        "description": "panda face",
        "aliases": [
            "panda_face"
        ],
        "tags": []
    }, {
        "emoji": "🐧",
        "description": "penguin",
        "aliases": [
            "penguin"
        ],
        "tags": []
    }, {
        "emoji": "🐦",
        "description": "bird",
        "aliases": [
            "bird"
        ],
        "tags": []
    }, {
        "emoji": "🐤",
        "description": "baby chick",
        "aliases": [
            "baby_chick"
        ],
        "tags": []
    }, {
        "emoji": "🐥",
        "description": "front-facing baby chick",
        "aliases": [
            "hatched_chick"
        ],
        "tags": []
    }, {
        "emoji": "🐣",
        "description": "hatching chick",
        "aliases": [
            "hatching_chick"
        ],
        "tags": []
    }, {
        "emoji": "🐔",
        "description": "chicken",
        "aliases": [
            "chicken"
        ],
        "tags": []
    }, {
        "emoji": "🐍",
        "description": "snake",
        "aliases": [
            "snake"
        ],
        "tags": []
    }, {
        "emoji": "🐢",
        "description": "turtle",
        "aliases": [
            "turtle"
        ],
        "tags": [
            "slow"
        ]
    }, {
        "emoji": "🐛",
        "description": "bug",
        "aliases": [
            "bug"
        ],
        "tags": []
    }, {
        "emoji": "🐝",
        "description": "honeybee",
        "aliases": [
            "bee", "honeybee"
        ],
        "tags": []
    }, {
        "emoji": "🐜",
        "description": "ant",
        "aliases": [
            "ant"
        ],
        "tags": []
    }, {
        "emoji": "🐞",
        "description": "lady beetle",
        "aliases": [
            "beetle"
        ],
        "tags": [
            "bug"
        ]
    }, {
        "emoji": "🐌",
        "description": "snail",
        "aliases": [
            "snail"
        ],
        "tags": [
            "slow"
        ]
    }, {
        "emoji": "🐙",
        "description": "octopus",
        "aliases": [
            "octopus"
        ],
        "tags": []
    }, {
        "emoji": "🐚",
        "description": "spiral shell",
        "aliases": [
            "shell"
        ],
        "tags": [
            "sea", "beach"
        ]
    }, {
        "emoji": "🐠",
        "description": "tropical fish",
        "aliases": [
            "tropical_fish"
        ],
        "tags": []
    }, {
        "emoji": "🐟",
        "description": "fish",
        "aliases": [
            "fish"
        ],
        "tags": []
    }, {
        "emoji": "🐬",
        "description": "dolphin",
        "aliases": [
            "dolphin", "flipper"
        ],
        "tags": []
    }, {
        "emoji": "🐳",
        "description": "spouting whale",
        "aliases": [
            "whale"
        ],
        "tags": [
            "sea"
        ]
    }, {
        "emoji": "🐋",
        "description": "whale",
        "aliases": [
            "whale2"
        ],
        "tags": []
    }, {
        "emoji": "🐄",
        "description": "cow",
        "aliases": [
            "cow2"
        ],
        "tags": []
    }, {
        "emoji": "🐏",
        "description": "ram",
        "aliases": [
            "ram"
        ],
        "tags": []
    }, {
        "emoji": "🐀",
        "description": "rat",
        "aliases": [
            "rat"
        ],
        "tags": []
    }, {
        "emoji": "🐃",
        "description": "water buffalo",
        "aliases": [
            "water_buffalo"
        ],
        "tags": []
    }, {
        "emoji": "🐅",
        "description": "tiger",
        "aliases": [
            "tiger2"
        ],
        "tags": []
    }, {
        "emoji": "🐇",
        "description": "rabbit",
        "aliases": [
            "rabbit2"
        ],
        "tags": []
    }, {
        "emoji": "🐉",
        "description": "dragon",
        "aliases": [
            "dragon"
        ],
        "tags": []
    }, {
        "emoji": "🐎",
        "description": "horse",
        "aliases": [
            "racehorse"
        ],
        "tags": [
            "speed"
        ]
    }, {
        "emoji": "🐐",
        "description": "goat",
        "aliases": [
            "goat"
        ],
        "tags": []
    }, {
        "emoji": "🐓",
        "description": "rooster",
        "aliases": [
            "rooster"
        ],
        "tags": []
    }, {
        "emoji": "🐕",
        "description": "dog",
        "aliases": [
            "dog2"
        ],
        "tags": []
    }, {
        "emoji": "🐖",
        "description": "pig",
        "aliases": [
            "pig2"
        ],
        "tags": []
    }, {
        "emoji": "🐁",
        "description": "mouse",
        "aliases": [
            "mouse2"
        ],
        "tags": []
    }, {
        "emoji": "🐂",
        "description": "ox",
        "aliases": [
            "ox"
        ],
        "tags": []
    }, {
        "emoji": "🐲",
        "description": "dragon face",
        "aliases": [
            "dragon_face"
        ],
        "tags": []
    }, {
        "emoji": "🐡",
        "description": "blowfish",
        "aliases": [
            "blowfish"
        ],
        "tags": []
    }, {
        "emoji": "🐊",
        "description": "crocodile",
        "aliases": [
            "crocodile"
        ],
        "tags": []
    }, {
        "emoji": "🐫",
        "description": "bactrian camel",
        "aliases": [
            "camel"
        ],
        "tags": []
    }, {
        "emoji": "🐪",
        "description": "dromedary camel",
        "aliases": [
            "dromedary_camel"
        ],
        "tags": [
            "desert"
        ]
    }, {
        "emoji": "🐆",
        "description": "leopard",
        "aliases": [
            "leopard"
        ],
        "tags": []
    }, {
        "emoji": "🐈",
        "description": "cat",
        "aliases": [
            "cat2"
        ],
        "tags": []
    }, {
        "emoji": "🐩",
        "description": "poodle",
        "aliases": [
            "poodle"
        ],
        "tags": [
            "dog"
        ]
    }, {
        "emoji": "🐾",
        "description": "paw prints",
        "aliases": [
            "feet", "paw_prints"
        ],
        "tags": []
    }, {
        "emoji": "💐",
        "description": "bouquet",
        "aliases": [
            "bouquet"
        ],
        "tags": [
            "flowers"
        ]
    }, {
        "emoji": "🌸",
        "description": "cherry blossom",
        "aliases": [
            "cherry_blossom"
        ],
        "tags": [
            "flower", "spring"
        ]
    }, {
        "emoji": "🌷",
        "description": "tulip",
        "aliases": [
            "tulip"
        ],
        "tags": [
            "flower"
        ]
    }, {
        "emoji": "🍀",
        "description": "four leaf clover",
        "aliases": [
            "four_leaf_clover"
        ],
        "tags": [
            "luck"
        ]
    }, {
        "emoji": "🌹",
        "description": "rose",
        "aliases": [
            "rose"
        ],
        "tags": [
            "flower"
        ]
    }, {
        "emoji": "🌻",
        "description": "sunflower",
        "aliases": [
            "sunflower"
        ],
        "tags": []
    }, {
        "emoji": "🌺",
        "description": "hibiscus",
        "aliases": [
            "hibiscus"
        ],
        "tags": []
    }, {
        "emoji": "🍁",
        "description": "maple leaf",
        "aliases": [
            "maple_leaf"
        ],
        "tags": [
            "canada"
        ]
    }, {
        "emoji": "🍃",
        "description": "leaf fluttering in wind",
        "aliases": [
            "leaves"
        ],
        "tags": [
            "leaf"
        ]
    }, {
        "emoji": "🍂",
        "description": "fallen leaf",
        "aliases": [
            "fallen_leaf"
        ],
        "tags": [
            "autumn"
        ]
    }, {
        "emoji": "🌿",
        "description": "herb",
        "aliases": [
            "herb"
        ],
        "tags": []
    }, {
        "emoji": "🌾",
        "description": "ear of rice",
        "aliases": [
            "ear_of_rice"
        ],
        "tags": []
    }, {
        "emoji": "🍄",
        "description": "mushroom",
        "aliases": [
            "mushroom"
        ],
        "tags": []
    }, {
        "emoji": "🌵",
        "description": "cactus",
        "aliases": [
            "cactus"
        ],
        "tags": []
    }, {
        "emoji": "🌴",
        "description": "palm tree",
        "aliases": [
            "palm_tree"
        ],
        "tags": []
    }, {
        "emoji": "🌲",
        "description": "evergreen tree",
        "aliases": [
            "evergreen_tree"
        ],
        "tags": [
            "wood"
        ]
    }, {
        "emoji": "🌳",
        "description": "deciduous tree",
        "aliases": [
            "deciduous_tree"
        ],
        "tags": [
            "wood"
        ]
    }, {
        "emoji": "🌰",
        "description": "chestnut",
        "aliases": [
            "chestnut"
        ],
        "tags": []
    }, {
        "emoji": "🌱",
        "description": "seedling",
        "aliases": [
            "seedling"
        ],
        "tags": [
            "plant"
        ]
    }, {
        "emoji": "🌼",
        "description": "blossom",
        "aliases": [
            "blossom"
        ],
        "tags": []
    }, {
        "emoji": "🌐",
        "description": "globe with meridians",
        "aliases": [
            "globe_with_meridians"
        ],
        "tags": [
            "world", "global", "international"
        ]
    }, {
        "emoji": "🌞",
        "description": "sun with face",
        "aliases": [
            "sun_with_face"
        ],
        "tags": [
            "summer"
        ]
    }, {
        "emoji": "🌝",
        "description": "full moon with face",
        "aliases": [
            "full_moon_with_face"
        ],
        "tags": []
    }, {
        "emoji": "🌚",
        "description": "new moon with face",
        "aliases": [
            "new_moon_with_face"
        ],
        "tags": []
    }, {
        "emoji": "🌑",
        "description": "new moon symbol",
        "aliases": [
            "new_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌒",
        "description": "waxing crescent moon symbol",
        "aliases": [
            "waxing_crescent_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌓",
        "description": "first quarter moon symbol",
        "aliases": [
            "first_quarter_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌔",
        "description": "waxing gibbous moon symbol",
        "aliases": [
            "moon", "waxing_gibbous_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌕",
        "description": "full moon symbol",
        "aliases": [
            "full_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌖",
        "description": "waning gibbous moon symbol",
        "aliases": [
            "waning_gibbous_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌗",
        "description": "last quarter moon symbol",
        "aliases": [
            "last_quarter_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌘",
        "description": "waning crescent moon symbol",
        "aliases": [
            "waning_crescent_moon"
        ],
        "tags": []
    }, {
        "emoji": "🌜",
        "description": "last quarter moon with face",
        "aliases": [
            "last_quarter_moon_with_face"
        ],
        "tags": []
    }, {
        "emoji": "🌛",
        "description": "first quarter moon with face",
        "aliases": [
            "first_quarter_moon_with_face"
        ],
        "tags": []
    }, {
        "emoji": "🌙",
        "description": "crescent moon",
        "aliases": [
            "crescent_moon"
        ],
        "tags": [
            "night"
        ]
    }, {
        "emoji": "🌍",
        "description": "earth globe europe-africa",
        "aliases": [
            "earth_africa"
        ],
        "tags": [
            "globe", "world", "international"
        ]
    }, {
        "emoji": "🌎",
        "description": "earth globe americas",
        "aliases": [
            "earth_americas"
        ],
        "tags": [
            "globe", "world", "international"
        ]
    }, {
        "emoji": "🌏",
        "description": "earth globe asia-australia",
        "aliases": [
            "earth_asia"
        ],
        "tags": [
            "globe", "world", "international"
        ]
    }, {
        "emoji": "🌋",
        "description": "volcano",
        "aliases": [
            "volcano"
        ],
        "tags": []
    }, {
        "emoji": "🌌",
        "description": "milky way",
        "aliases": [
            "milky_way"
        ],
        "tags": []
    }, {
        "emoji": "🌠",
        "description": "shooting star",
        "aliases": [
            "stars"
        ],
        "tags": []
    }, {
        "emoji": "⭐",
        "description": "white medium star",
        "aliases": [
            "star"
        ],
        "tags": []
    }, {
        "emoji": "☀️",
        "description": "black sun with rays",
        "aliases": [
            "sunny"
        ],
        "tags": [
            "weather"
        ]
    }, {
        "emoji": "⛅",
        "description": "sun behind cloud",
        "aliases": [
            "partly_sunny"
        ],
        "tags": [
            "weather", "cloud"
        ]
    }, {
        "emoji": "☁️",
        "description": "cloud",
        "aliases": [
            "cloud"
        ],
        "tags": []
    }, {
        "emoji": "⚡",
        "description": "high voltage sign",
        "aliases": [
            "zap"
        ],
        "tags": [
            "lightning", "thunder"
        ]
    }, {
        "emoji": "☔",
        "description": "umbrella with rain drops",
        "aliases": [
            "umbrella"
        ],
        "tags": [
            "rain", "weather"
        ]
    }, {
        "emoji": "❄️",
        "description": "snowflake",
        "aliases": [
            "snowflake"
        ],
        "tags": [
            "winter", "cold", "weather"
        ]
    }, {
        "emoji": "⛄",
        "description": "snowman without snow",
        "aliases": [
            "snowman"
        ],
        "tags": [
            "winter", "christmas"
        ]
    }, {
        "emoji": "🌀",
        "description": "cyclone",
        "aliases": [
            "cyclone"
        ],
        "tags": [
            "swirl"
        ]
    }, {
        "emoji": "🌁",
        "description": "foggy",
        "aliases": [
            "foggy"
        ],
        "tags": [
            "karl"
        ]
    }, {
        "emoji": "🌈",
        "description": "rainbow",
        "aliases": [
            "rainbow"
        ],
        "tags": [
            "pride"
        ]
    }, {
        "emoji": "🌊",
        "description": "water wave",
        "aliases": [
            "ocean"
        ],
        "tags": [
            "sea"
        ]
    }, {
        "emoji": "🎍",
        "description": "pine decoration",
        "aliases": [
            "bamboo"
        ],
        "tags": []
    }, {
        "emoji": "💝",
        "description": "heart with ribbon",
        "aliases": [
            "gift_heart"
        ],
        "tags": [
            "chocolates"
        ]
    }, {
        "emoji": "🎎",
        "description": "japanese dolls",
        "aliases": [
            "dolls"
        ],
        "tags": []
    }, {
        "emoji": "🎒",
        "description": "school satchel",
        "aliases": [
            "school_satchel"
        ],
        "tags": []
    }, {
        "emoji": "🎓",
        "description": "graduation cap",
        "aliases": [
            "mortar_board"
        ],
        "tags": [
            "education", "college", "university", "graduation"
        ]
    }, {
        "emoji": "🎏",
        "description": "carp streamer",
        "aliases": [
            "flags"
        ],
        "tags": []
    }, {
        "emoji": "🎆",
        "description": "fireworks",
        "aliases": [
            "fireworks"
        ],
        "tags": [
            "festival", "celebration"
        ]
    }, {
        "emoji": "🎇",
        "description": "firework sparkler",
        "aliases": [
            "sparkler"
        ],
        "tags": []
    }, {
        "emoji": "🎐",
        "description": "wind chime",
        "aliases": [
            "wind_chime"
        ],
        "tags": []
    }, {
        "emoji": "🎑",
        "description": "moon viewing ceremony",
        "aliases": [
            "rice_scene"
        ],
        "tags": []
    }, {
        "emoji": "🎃",
        "description": "jack-o-lantern",
        "aliases": [
            "jack_o_lantern"
        ],
        "tags": [
            "halloween"
        ]
    }, {
        "emoji": "👻",
        "description": "ghost",
        "aliases": [
            "ghost"
        ],
        "tags": [
            "halloween"
        ]
    }, {
        "emoji": "🎅",
        "description": "father christmas",
        "aliases": [
            "santa"
        ],
        "tags": [
            "christmas"
        ]
    }, {
        "emoji": "🎄",
        "description": "christmas tree",
        "aliases": [
            "christmas_tree"
        ],
        "tags": []
    }, {
        "emoji": "🎁",
        "description": "wrapped present",
        "aliases": [
            "gift"
        ],
        "tags": [
            "present", "birthday", "christmas"
        ]
    }, {
        "emoji": "🎋",
        "description": "tanabata tree",
        "aliases": [
            "tanabata_tree"
        ],
        "tags": []
    }, {
        "emoji": "🎉",
        "description": "party popper",
        "aliases": [
            "tada"
        ],
        "tags": [
            "party"
        ]
    }, {
        "emoji": "🎊",
        "description": "confetti ball",
        "aliases": [
            "confetti_ball"
        ],
        "tags": []
    }, {
        "emoji": "🎈",
        "description": "balloon",
        "aliases": [
            "balloon"
        ],
        "tags": [
            "party", "birthday"
        ]
    }, {
        "emoji": "🎌",
        "description": "crossed flags",
        "aliases": [
            "crossed_flags"
        ],
        "tags": []
    }, {
        "emoji": "🔮",
        "description": "crystal ball",
        "aliases": [
            "crystal_ball"
        ],
        "tags": [
            "fortune"
        ]
    }, {
        "emoji": "🎥",
        "description": "movie camera",
        "aliases": [
            "movie_camera"
        ],
        "tags": [
            "film", "video"
        ]
    }, {
        "emoji": "📷",
        "description": "camera",
        "aliases": [
            "camera"
        ],
        "tags": [
            "photo"
        ]
    }, {
        "emoji": "📹",
        "description": "video camera",
        "aliases": [
            "video_camera"
        ],
        "tags": []
    }, {
        "emoji": "📼",
        "description": "videocassette",
        "aliases": [
            "vhs"
        ],
        "tags": []
    }, {
        "emoji": "💿",
        "description": "optical disc",
        "aliases": [
            "cd"
        ],
        "tags": []
    }, {
        "emoji": "📀",
        "description": "dvd",
        "aliases": [
            "dvd"
        ],
        "tags": []
    }, {
        "emoji": "💽",
        "description": "minidisc",
        "aliases": [
            "minidisc"
        ],
        "tags": []
    }, {
        "emoji": "💾",
        "description": "floppy disk",
        "aliases": [
            "floppy_disk"
        ],
        "tags": [
            "save"
        ]
    }, {
        "emoji": "💻",
        "description": "personal computer",
        "aliases": [
            "computer"
        ],
        "tags": [
            "desktop", "screen"
        ]
    }, {
        "emoji": "📱",
        "description": "mobile phone",
        "aliases": [
            "iphone"
        ],
        "tags": [
            "smartphone", "mobile"
        ]
    }, {
        "emoji": "☎️",
        "description": "black telephone",
        "aliases": [
            "phone", "telephone"
        ],
        "tags": []
    }, {
        "emoji": "📞",
        "description": "telephone receiver",
        "aliases": [
            "telephone_receiver"
        ],
        "tags": [
            "phone", "call"
        ]
    }, {
        "emoji": "📟",
        "description": "pager",
        "aliases": [
            "pager"
        ],
        "tags": []
    }, {
        "emoji": "📠",
        "description": "fax machine",
        "aliases": [
            "fax"
        ],
        "tags": []
    }, {
        "emoji": "📡",
        "description": "satellite antenna",
        "aliases": [
            "satellite"
        ],
        "tags": [
            "signal"
        ]
    }, {
        "emoji": "📺",
        "description": "television",
        "aliases": [
            "tv"
        ],
        "tags": []
    }, {
        "emoji": "📻",
        "description": "radio",
        "aliases": [
            "radio"
        ],
        "tags": [
            "podcast"
        ]
    }, {
        "emoji": "🔊",
        "description": "speaker with three sound waves",
        "aliases": [
            "loud_sound"
        ],
        "tags": [
            "volume"
        ]
    }, {
        "emoji": "🔉",
        "description": "speaker with one sound wave",
        "aliases": [
            "sound"
        ],
        "tags": [
            "volume"
        ]
    }, {
        "emoji": "🔈",
        "description": "speaker",
        "aliases": [
            "speaker"
        ],
        "tags": []
    }, {
        "emoji": "🔇",
        "description": "speaker with cancellation stroke",
        "aliases": [
            "mute"
        ],
        "tags": [
            "sound", "volume"
        ]
    }, {
        "emoji": "🔔",
        "description": "bell",
        "aliases": [
            "bell"
        ],
        "tags": [
            "sound", "notification"
        ]
    }, {
        "emoji": "🔕",
        "description": "bell with cancellation stroke",
        "aliases": [
            "no_bell"
        ],
        "tags": [
            "volume", "off"
        ]
    }, {
        "emoji": "📢",
        "description": "public address loudspeaker",
        "aliases": [
            "loudspeaker"
        ],
        "tags": [
            "announcement"
        ]
    }, {
        "emoji": "📣",
        "description": "cheering megaphone",
        "aliases": [
            "mega"
        ],
        "tags": []
    }, {
        "emoji": "⏳",
        "description": "hourglass with flowing sand",
        "aliases": [
            "hourglass_flowing_sand"
        ],
        "tags": [
            "time"
        ]
    }, {
        "emoji": "⌛",
        "description": "hourglass",
        "aliases": [
            "hourglass"
        ],
        "tags": [
            "time"
        ]
    }, {
        "emoji": "⏰",
        "description": "alarm clock",
        "aliases": [
            "alarm_clock"
        ],
        "tags": [
            "morning"
        ]
    }, {
        "emoji": "⌚",
        "description": "watch",
        "aliases": [
            "watch"
        ],
        "tags": [
            "time"
        ]
    }, {
        "emoji": "🔓",
        "description": "open lock",
        "aliases": [
            "unlock"
        ],
        "tags": [
            "security"
        ]
    }, {
        "emoji": "🔒",
        "description": "lock",
        "aliases": [
            "lock"
        ],
        "tags": [
            "security", "private"
        ]
    }, {
        "emoji": "🔏",
        "description": "lock with ink pen",
        "aliases": [
            "lock_with_ink_pen"
        ],
        "tags": []
    }, {
        "emoji": "🔐",
        "description": "closed lock with key",
        "aliases": [
            "closed_lock_with_key"
        ],
        "tags": [
            "security"
        ]
    }, {
        "emoji": "🔑",
        "description": "key",
        "aliases": [
            "key"
        ],
        "tags": [
            "lock", "password"
        ]
    }, {
        "emoji": "🔎",
        "description": "right-pointing magnifying glass",
        "aliases": [
            "mag_right"
        ],
        "tags": []
    }, {
        "emoji": "💡",
        "description": "electric light bulb",
        "aliases": [
            "bulb"
        ],
        "tags": [
            "idea", "light"
        ]
    }, {
        "emoji": "🔦",
        "description": "electric torch",
        "aliases": [
            "flashlight"
        ],
        "tags": []
    }, {
        "emoji": "🔆",
        "description": "high brightness symbol",
        "aliases": [
            "high_brightness"
        ],
        "tags": []
    }, {
        "emoji": "🔅",
        "description": "low brightness symbol",
        "aliases": [
            "low_brightness"
        ],
        "tags": []
    }, {
        "emoji": "🔌",
        "description": "electric plug",
        "aliases": [
            "electric_plug"
        ],
        "tags": []
    }, {
        "emoji": "🔋",
        "description": "battery",
        "aliases": [
            "battery"
        ],
        "tags": [
            "power"
        ]
    }, {
        "emoji": "🔍",
        "description": "left-pointing magnifying glass",
        "aliases": [
            "mag"
        ],
        "tags": [
            "search", "zoom"
        ]
    }, {
        "emoji": "🛁",
        "description": "bathtub",
        "aliases": [
            "bathtub"
        ],
        "tags": []
    }, {
        "emoji": "🛀",
        "description": "bath",
        "aliases": [
            "bath"
        ],
        "tags": [
            "shower"
        ]
    }, {
        "emoji": "🚿",
        "description": "shower",
        "aliases": [
            "shower"
        ],
        "tags": [
            "bath"
        ]
    }, {
        "emoji": "🚽",
        "description": "toilet",
        "aliases": [
            "toilet"
        ],
        "tags": [
            "wc"
        ]
    }, {
        "emoji": "🔧",
        "description": "wrench",
        "aliases": [
            "wrench"
        ],
        "tags": [
            "tool"
        ]
    }, {
        "emoji": "🔩",
        "description": "nut and bolt",
        "aliases": [
            "nut_and_bolt"
        ],
        "tags": []
    }, {
        "emoji": "🔨",
        "description": "hammer",
        "aliases": [
            "hammer"
        ],
        "tags": [
            "tool"
        ]
    }, {
        "emoji": "🚪",
        "description": "door",
        "aliases": [
            "door"
        ],
        "tags": []
    }, {
        "emoji": "🚬",
        "description": "smoking symbol",
        "aliases": [
            "smoking"
        ],
        "tags": [
            "cigarette"
        ]
    }, {
        "emoji": "💣",
        "description": "bomb",
        "aliases": [
            "bomb"
        ],
        "tags": [
            "boom"
        ]
    }, {
        "emoji": "🔫",
        "description": "pistol",
        "aliases": [
            "gun"
        ],
        "tags": [
            "shoot", "weapon"
        ]
    }, {
        "emoji": "🔪",
        "description": "hocho",
        "aliases": [
            "hocho", "knife"
        ],
        "tags": [
            "cut", "chop"
        ]
    }, {
        "emoji": "💊",
        "description": "pill",
        "aliases": [
            "pill"
        ],
        "tags": [
            "health", "medicine"
        ]
    }, {
        "emoji": "💉",
        "description": "syringe",
        "aliases": [
            "syringe"
        ],
        "tags": [
            "health", "hospital", "needle"
        ]
    }, {
        "emoji": "💰",
        "description": "money bag",
        "aliases": [
            "moneybag"
        ],
        "tags": [
            "dollar", "cream"
        ]
    }, {
        "emoji": "💴",
        "description": "banknote with yen sign",
        "aliases": [
            "yen"
        ],
        "tags": []
    }, {
        "emoji": "💵",
        "description": "banknote with dollar sign",
        "aliases": [
            "dollar"
        ],
        "tags": [
            "money"
        ]
    }, {
        "emoji": "💷",
        "description": "banknote with pound sign",
        "aliases": [
            "pound"
        ],
        "tags": []
    }, {
        "emoji": "💶",
        "description": "banknote with euro sign",
        "aliases": [
            "euro"
        ],
        "tags": []
    }, {
        "emoji": "💳",
        "description": "credit card",
        "aliases": [
            "credit_card"
        ],
        "tags": [
            "subscription"
        ]
    }, {
        "emoji": "💸",
        "description": "money with wings",
        "aliases": [
            "money_with_wings"
        ],
        "tags": [
            "dollar"
        ]
    }, {
        "emoji": "📲",
        "description": "mobile phone with rightwards arrow at left",
        "aliases": [
            "calling"
        ],
        "tags": [
            "call", "incoming"
        ]
    }, {
        "emoji": "📧",
        "description": "e-mail symbol",
        "aliases": [
            "e-mail"
        ],
        "tags": []
    }, {
        "emoji": "📥",
        "description": "inbox tray",
        "aliases": [
            "inbox_tray"
        ],
        "tags": []
    }, {
        "emoji": "📤",
        "description": "outbox tray",
        "aliases": [
            "outbox_tray"
        ],
        "tags": []
    }, {
        "emoji": "✉️",
        "description": "envelope",
        "aliases": [
            "email", "envelope"
        ],
        "tags": [
            "letter"
        ]
    }, {
        "emoji": "📩",
        "description": "envelope with downwards arrow above",
        "aliases": [
            "envelope_with_arrow"
        ],
        "tags": []
    }, {
        "emoji": "📨",
        "description": "incoming envelope",
        "aliases": [
            "incoming_envelope"
        ],
        "tags": []
    }, {
        "emoji": "📯",
        "description": "postal horn",
        "aliases": [
            "postal_horn"
        ],
        "tags": []
    }, {
        "emoji": "📫",
        "description": "closed mailbox with raised flag",
        "aliases": [
            "mailbox"
        ],
        "tags": []
    }, {
        "emoji": "📪",
        "description": "closed mailbox with lowered flag",
        "aliases": [
            "mailbox_closed"
        ],
        "tags": []
    }, {
        "emoji": "📬",
        "description": "open mailbox with raised flag",
        "aliases": [
            "mailbox_with_mail"
        ],
        "tags": []
    }, {
        "emoji": "📭",
        "description": "open mailbox with lowered flag",
        "aliases": [
            "mailbox_with_no_mail"
        ],
        "tags": []
    }, {
        "emoji": "📮",
        "description": "postbox",
        "aliases": [
            "postbox"
        ],
        "tags": []
    }, {
        "emoji": "📦",
        "description": "package",
        "aliases": [
            "package"
        ],
        "tags": [
            "shipping"
        ]
    }, {
        "emoji": "📝",
        "description": "memo",
        "aliases": [
            "memo", "pencil"
        ],
        "tags": [
            "document", "note"
        ]
    }, {
        "emoji": "📄",
        "description": "page facing up",
        "aliases": [
            "page_facing_up"
        ],
        "tags": [
            "document"
        ]
    }, {
        "emoji": "📃",
        "description": "page with curl",
        "aliases": [
            "page_with_curl"
        ],
        "tags": []
    }, {
        "emoji": "📑",
        "description": "bookmark tabs",
        "aliases": [
            "bookmark_tabs"
        ],
        "tags": []
    }, {
        "emoji": "📊",
        "description": "bar chart",
        "aliases": [
            "bar_chart"
        ],
        "tags": [
            "stats", "metrics"
        ]
    }, {
        "emoji": "📈",
        "description": "chart with upwards trend",
        "aliases": [
            "chart_with_upwards_trend"
        ],
        "tags": [
            "graph", "metrics"
        ]
    }, {
        "emoji": "📉",
        "description": "chart with downwards trend",
        "aliases": [
            "chart_with_downwards_trend"
        ],
        "tags": [
            "graph", "metrics"
        ]
    }, {
        "emoji": "📜",
        "description": "scroll",
        "aliases": [
            "scroll"
        ],
        "tags": [
            "document"
        ]
    }, {
        "emoji": "📋",
        "description": "clipboard",
        "aliases": [
            "clipboard"
        ],
        "tags": []
    }, {
        "emoji": "📅",
        "description": "calendar",
        "aliases": [
            "date"
        ],
        "tags": [
            "calendar", "schedule"
        ]
    }, {
        "emoji": "📆",
        "description": "tear-off calendar",
        "aliases": [
            "calendar"
        ],
        "tags": [
            "schedule"
        ]
    }, {
        "emoji": "📇",
        "description": "card index",
        "aliases": [
            "card_index"
        ],
        "tags": []
    }, {
        "emoji": "📁",
        "description": "file folder",
        "aliases": [
            "file_folder"
        ],
        "tags": [
            "directory"
        ]
    }, {
        "emoji": "📂",
        "description": "open file folder",
        "aliases": [
            "open_file_folder"
        ],
        "tags": []
    }, {
        "emoji": "✂️",
        "description": "black scissors",
        "aliases": [
            "scissors"
        ],
        "tags": [
            "cut"
        ]
    }, {
        "emoji": "📌",
        "description": "pushpin",
        "aliases": [
            "pushpin"
        ],
        "tags": [
            "location"
        ]
    }, {
        "emoji": "📎",
        "description": "paperclip",
        "aliases": [
            "paperclip"
        ],
        "tags": []
    }, {
        "emoji": "✒️",
        "description": "black nib",
        "aliases": [
            "black_nib"
        ],
        "tags": []
    }, {
        "emoji": "✏️",
        "description": "pencil",
        "aliases": [
            "pencil2"
        ],
        "tags": []
    }, {
        "emoji": "📏",
        "description": "straight ruler",
        "aliases": [
            "straight_ruler"
        ],
        "tags": []
    }, {
        "emoji": "📐",
        "description": "triangular ruler",
        "aliases": [
            "triangular_ruler"
        ],
        "tags": []
    }, {
        "emoji": "📕",
        "description": "closed book",
        "aliases": [
            "closed_book"
        ],
        "tags": []
    }, {
        "emoji": "📗",
        "description": "green book",
        "aliases": [
            "green_book"
        ],
        "tags": []
    }, {
        "emoji": "📘",
        "description": "blue book",
        "aliases": [
            "blue_book"
        ],
        "tags": []
    }, {
        "emoji": "📙",
        "description": "orange book",
        "aliases": [
            "orange_book"
        ],
        "tags": []
    }, {
        "emoji": "📓",
        "description": "notebook",
        "aliases": [
            "notebook"
        ],
        "tags": []
    }, {
        "emoji": "📔",
        "description": "notebook with decorative cover",
        "aliases": [
            "notebook_with_decorative_cover"
        ],
        "tags": []
    }, {
        "emoji": "📒",
        "description": "ledger",
        "aliases": [
            "ledger"
        ],
        "tags": []
    }, {
        "emoji": "📚",
        "description": "books",
        "aliases": [
            "books"
        ],
        "tags": [
            "library"
        ]
    }, {
        "emoji": "📖",
        "description": "open book",
        "aliases": [
            "book", "open_book"
        ],
        "tags": []
    }, {
        "emoji": "🔖",
        "description": "bookmark",
        "aliases": [
            "bookmark"
        ],
        "tags": []
    }, {
        "emoji": "📛",
        "description": "name badge",
        "aliases": [
            "name_badge"
        ],
        "tags": []
    }, {
        "emoji": "🔬",
        "description": "microscope",
        "aliases": [
            "microscope"
        ],
        "tags": [
            "science", "laboratory", "investigate"
        ]
    }, {
        "emoji": "🔭",
        "description": "telescope",
        "aliases": [
            "telescope"
        ],
        "tags": []
    }, {
        "emoji": "📰",
        "description": "newspaper",
        "aliases": [
            "newspaper"
        ],
        "tags": [
            "press"
        ]
    }, {
        "emoji": "🎨",
        "description": "artist palette",
        "aliases": [
            "art"
        ],
        "tags": [
            "design", "paint"
        ]
    }, {
        "emoji": "🎬",
        "description": "clapper board",
        "aliases": [
            "clapper"
        ],
        "tags": [
            "film"
        ]
    }, {
        "emoji": "🎤",
        "description": "microphone",
        "aliases": [
            "microphone"
        ],
        "tags": [
            "sing"
        ]
    }, {
        "emoji": "🎧",
        "description": "headphone",
        "aliases": [
            "headphones"
        ],
        "tags": [
            "music", "earphones"
        ]
    }, {
        "emoji": "🎼",
        "description": "musical score",
        "aliases": [
            "musical_score"
        ],
        "tags": []
    }, {
        "emoji": "🎵",
        "description": "musical note",
        "aliases": [
            "musical_note"
        ],
        "tags": []
    }, {
        "emoji": "🎶",
        "description": "multiple musical notes",
        "aliases": [
            "notes"
        ],
        "tags": [
            "music"
        ]
    }, {
        "emoji": "🎹",
        "description": "musical keyboard",
        "aliases": [
            "musical_keyboard"
        ],
        "tags": [
            "piano"
        ]
    }, {
        "emoji": "🎻",
        "description": "violin",
        "aliases": [
            "violin"
        ],
        "tags": []
    }, {
        "emoji": "🎺",
        "description": "trumpet",
        "aliases": [
            "trumpet"
        ],
        "tags": []
    }, {
        "emoji": "🎷",
        "description": "saxophone",
        "aliases": [
            "saxophone"
        ],
        "tags": []
    }, {
        "emoji": "🎸",
        "description": "guitar",
        "aliases": [
            "guitar"
        ],
        "tags": [
            "rock"
        ]
    }, {
        "emoji": "👾",
        "description": "alien monster",
        "aliases": [
            "space_invader"
        ],
        "tags": [
            "game", "retro"
        ]
    }, {
        "emoji": "🎮",
        "description": "video game",
        "aliases": [
            "video_game"
        ],
        "tags": [
            "play", "controller", "console"
        ]
    }, {
        "emoji": "🃏",
        "description": "playing card black joker",
        "aliases": [
            "black_joker"
        ],
        "tags": []
    }, {
        "emoji": "🎴",
        "description": "flower playing cards",
        "aliases": [
            "flower_playing_cards"
        ],
        "tags": []
    }, {
        "emoji": "🀄",
        "description": "mahjong tile red dragon",
        "aliases": [
            "mahjong"
        ],
        "tags": []
    }, {
        "emoji": "🎲",
        "description": "game die",
        "aliases": [
            "game_die"
        ],
        "tags": [
            "dice", "gambling"
        ]
    }, {
        "emoji": "🎯",
        "description": "direct hit",
        "aliases": [
            "dart"
        ],
        "tags": [
            "target"
        ]
    }, {
        "emoji": "🏈",
        "description": "american football",
        "aliases": [
            "football"
        ],
        "tags": [
            "sports"
        ]
    }, {
        "emoji": "🏀",
        "description": "basketball and hoop",
        "aliases": [
            "basketball"
        ],
        "tags": [
            "sports"
        ]
    }, {
        "emoji": "⚽",
        "description": "soccer ball",
        "aliases": [
            "soccer"
        ],
        "tags": [
            "sports"
        ]
    }, {
        "emoji": "⚾️",
        "description": "baseball",
        "aliases": [
            "baseball"
        ],
        "tags": [
            "sports"
        ]
    }, {
        "emoji": "🎾",
        "description": "tennis racquet and ball",
        "aliases": [
            "tennis"
        ],
        "tags": [
            "sports"
        ]
    }, {
        "emoji": "🎱",
        "description": "billiards",
        "aliases": [
            "8ball"
        ],
        "tags": [
            "pool", "billiards"
        ]
    }, {
        "emoji": "🏉",
        "description": "rugby football",
        "aliases": [
            "rugby_football"
        ],
        "tags": []
    }, {
        "emoji": "🎳",
        "description": "bowling",
        "aliases": [
            "bowling"
        ],
        "tags": []
    }, {
        "emoji": "⛳",
        "description": "flag in hole",
        "aliases": [
            "golf"
        ],
        "tags": []
    }, {
        "emoji": "🚵",
        "description": "mountain bicyclist",
        "aliases": [
            "mountain_bicyclist"
        ],
        "tags": []
    }, {
        "emoji": "🚴",
        "description": "bicyclist",
        "aliases": [
            "bicyclist"
        ],
        "tags": []
    }, {
        "emoji": "🏁",
        "description": "chequered flag",
        "aliases": [
            "checkered_flag"
        ],
        "tags": [
            "milestone", "finish"
        ]
    }, {
        "emoji": "🏇",
        "description": "horse racing",
        "aliases": [
            "horse_racing"
        ],
        "tags": []
    }, {
        "emoji": "🏆",
        "description": "trophy",
        "aliases": [
            "trophy"
        ],
        "tags": [
            "award", "contest", "winner"
        ]
    }, {
        "emoji": "🎿",
        "description": "ski and ski boot",
        "aliases": [
            "ski"
        ],
        "tags": []
    }, {
        "emoji": "🏂",
        "description": "snowboarder",
        "aliases": [
            "snowboarder"
        ],
        "tags": []
    }, {
        "emoji": "🏊",
        "description": "swimmer",
        "aliases": [
            "swimmer"
        ],
        "tags": []
    }, {
        "emoji": "🏄",
        "description": "surfer",
        "aliases": [
            "surfer"
        ],
        "tags": []
    }, {
        "emoji": "🎣",
        "description": "fishing pole and fish",
        "aliases": [
            "fishing_pole_and_fish"
        ],
        "tags": []
    }, {
        "emoji": "☕",
        "description": "hot beverage",
        "aliases": [
            "coffee"
        ],
        "tags": [
            "cafe", "espresso"
        ]
    }, {
        "emoji": "🍵",
        "description": "teacup without handle",
        "aliases": [
            "tea"
        ],
        "tags": [
            "green", "breakfast"
        ]
    }, {
        "emoji": "🍶",
        "description": "sake bottle and cup",
        "aliases": [
            "sake"
        ],
        "tags": []
    }, {
        "emoji": "🍼",
        "description": "baby bottle",
        "aliases": [
            "baby_bottle"
        ],
        "tags": [
            "milk"
        ]
    }, {
        "emoji": "🍺",
        "description": "beer mug",
        "aliases": [
            "beer"
        ],
        "tags": [
            "drink"
        ]
    }, {
        "emoji": "🍻",
        "description": "clinking beer mugs",
        "aliases": [
            "beers"
        ],
        "tags": [
            "drinks"
        ]
    }, {
        "emoji": "🍸",
        "description": "cocktail glass",
        "aliases": [
            "cocktail"
        ],
        "tags": [
            "drink"
        ]
    }, {
        "emoji": "🍹",
        "description": "tropical drink",
        "aliases": [
            "tropical_drink"
        ],
        "tags": [
            "summer", "vacation"
        ]
    }, {
        "emoji": "🍷",
        "description": "wine glass",
        "aliases": [
            "wine_glass"
        ],
        "tags": []
    }, {
        "emoji": "🍴",
        "description": "fork and knife",
        "aliases": [
            "fork_and_knife"
        ],
        "tags": [
            "cutlery"
        ]
    }, {
        "emoji": "🍕",
        "description": "slice of pizza",
        "aliases": [
            "pizza"
        ],
        "tags": []
    }, {
        "emoji": "🍔",
        "description": "hamburger",
        "aliases": [
            "hamburger"
        ],
        "tags": [
            "burger"
        ]
    }, {
        "emoji": "🍟",
        "description": "french fries",
        "aliases": [
            "fries"
        ],
        "tags": []
    }, {
        "emoji": "🍗",
        "description": "poultry leg",
        "aliases": [
            "poultry_leg"
        ],
        "tags": [
            "meat", "chicken"
        ]
    }, {
        "emoji": "🍖",
        "description": "meat on bone",
        "aliases": [
            "meat_on_bone"
        ],
        "tags": []
    }, {
        "emoji": "🍝",
        "description": "spaghetti",
        "aliases": [
            "spaghetti"
        ],
        "tags": [
            "pasta"
        ]
    }, {
        "emoji": "🍛",
        "description": "curry and rice",
        "aliases": [
            "curry"
        ],
        "tags": []
    }, {
        "emoji": "🍤",
        "description": "fried shrimp",
        "aliases": [
            "fried_shrimp"
        ],
        "tags": [
            "tempura"
        ]
    }, {
        "emoji": "🍱",
        "description": "bento box",
        "aliases": [
            "bento"
        ],
        "tags": []
    }, {
        "emoji": "🍣",
        "description": "sushi",
        "aliases": [
            "sushi"
        ],
        "tags": []
    }, {
        "emoji": "🍥",
        "description": "fish cake with swirl design",
        "aliases": [
            "fish_cake"
        ],
        "tags": []
    }, {
        "emoji": "🍙",
        "description": "rice ball",
        "aliases": [
            "rice_ball"
        ],
        "tags": []
    }, {
        "emoji": "🍘",
        "description": "rice cracker",
        "aliases": [
            "rice_cracker"
        ],
        "tags": []
    }, {
        "emoji": "🍚",
        "description": "cooked rice",
        "aliases": [
            "rice"
        ],
        "tags": []
    }, {
        "emoji": "🍜",
        "description": "steaming bowl",
        "aliases": [
            "ramen"
        ],
        "tags": [
            "noodle"
        ]
    }, {
        "emoji": "🍲",
        "description": "pot of food",
        "aliases": [
            "stew"
        ],
        "tags": []
    }, {
        "emoji": "🍢",
        "description": "oden",
        "aliases": [
            "oden"
        ],
        "tags": []
    }, {
        "emoji": "🍡",
        "description": "dango",
        "aliases": [
            "dango"
        ],
        "tags": []
    }, {
        "emoji": "🍳",
        "description": "cooking",
        "aliases": [
            "egg"
        ],
        "tags": [
            "breakfast"
        ]
    }, {
        "emoji": "🍞",
        "description": "bread",
        "aliases": [
            "bread"
        ],
        "tags": [
            "toast"
        ]
    }, {
        "emoji": "🍩",
        "description": "doughnut",
        "aliases": [
            "doughnut"
        ],
        "tags": []
    }, {
        "emoji": "🍮",
        "description": "custard",
        "aliases": [
            "custard"
        ],
        "tags": []
    }, {
        "emoji": "🍦",
        "description": "soft ice cream",
        "aliases": [
            "icecream"
        ],
        "tags": []
    }, {
        "emoji": "🍨",
        "description": "ice cream",
        "aliases": [
            "ice_cream"
        ],
        "tags": []
    }, {
        "emoji": "🍧",
        "description": "shaved ice",
        "aliases": [
            "shaved_ice"
        ],
        "tags": []
    }, {
        "emoji": "🎂",
        "description": "birthday cake",
        "aliases": [
            "birthday"
        ],
        "tags": [
            "party"
        ]
    }, {
        "emoji": "🍰",
        "description": "shortcake",
        "aliases": [
            "cake"
        ],
        "tags": [
            "dessert"
        ]
    }, {
        "emoji": "🍪",
        "description": "cookie",
        "aliases": [
            "cookie"
        ],
        "tags": []
    }, {
        "emoji": "🍫",
        "description": "chocolate bar",
        "aliases": [
            "chocolate_bar"
        ],
        "tags": []
    }, {
        "emoji": "🍬",
        "description": "candy",
        "aliases": [
            "candy"
        ],
        "tags": [
            "sweet"
        ]
    }, {
        "emoji": "🍭",
        "description": "lollipop",
        "aliases": [
            "lollipop"
        ],
        "tags": []
    }, {
        "emoji": "🍯",
        "description": "honey pot",
        "aliases": [
            "honey_pot"
        ],
        "tags": []
    }, {
        "emoji": "🍎",
        "description": "red apple",
        "aliases": [
            "apple"
        ],
        "tags": []
    }, {
        "emoji": "🍏",
        "description": "green apple",
        "aliases": [
            "green_apple"
        ],
        "tags": [
            "fruit"
        ]
    }, {
        "emoji": "🍊",
        "description": "tangerine",
        "aliases": [
            "tangerine", "orange", "mandarin"
        ],
        "tags": []
    }, {
        "emoji": "🍋",
        "description": "lemon",
        "aliases": [
            "lemon"
        ],
        "tags": []
    }, {
        "emoji": "🍒",
        "description": "cherries",
        "aliases": [
            "cherries"
        ],
        "tags": [
            "fruit"
        ]
    }, {
        "emoji": "🍇",
        "description": "grapes",
        "aliases": [
            "grapes"
        ],
        "tags": []
    }, {
        "emoji": "🍉",
        "description": "watermelon",
        "aliases": [
            "watermelon"
        ],
        "tags": []
    }, {
        "emoji": "🍓",
        "description": "strawberry",
        "aliases": [
            "strawberry"
        ],
        "tags": [
            "fruit"
        ]
    }, {
        "emoji": "🍑",
        "description": "peach",
        "aliases": [
            "peach"
        ],
        "tags": []
    }, {
        "emoji": "🍈",
        "description": "melon",
        "aliases": [
            "melon"
        ],
        "tags": []
    }, {
        "emoji": "🍌",
        "description": "banana",
        "aliases": [
            "banana"
        ],
        "tags": [
            "fruit"
        ]
    }, {
        "emoji": "🍐",
        "description": "pear",
        "aliases": [
            "pear"
        ],
        "tags": []
    }, {
        "emoji": "🍍",
        "description": "pineapple",
        "aliases": [
            "pineapple"
        ],
        "tags": []
    }, {
        "emoji": "🍠",
        "description": "roasted sweet potato",
        "aliases": [
            "sweet_potato"
        ],
        "tags": []
    }, {
        "emoji": "🍆",
        "description": "aubergine",
        "aliases": [
            "eggplant"
        ],
        "tags": [
            "aubergine"
        ]
    }, {
        "emoji": "🍅",
        "description": "tomato",
        "aliases": [
            "tomato"
        ],
        "tags": []
    }, {
        "emoji": "🌽",
        "description": "ear of maize",
        "aliases": [
            "corn"
        ],
        "tags": []
    }, {
        "emoji": "🏠",
        "description": "house building",
        "aliases": [
            "house"
        ],
        "tags": []
    }, {
        "emoji": "🏡",
        "description": "house with garden",
        "aliases": [
            "house_with_garden"
        ],
        "tags": []
    }, {
        "emoji": "🏫",
        "description": "school",
        "aliases": [
            "school"
        ],
        "tags": []
    }, {
        "emoji": "🏢",
        "description": "office building",
        "aliases": [
            "office"
        ],
        "tags": []
    }, {
        "emoji": "🏣",
        "description": "japanese post office",
        "aliases": [
            "post_office"
        ],
        "tags": []
    }, {
        "emoji": "🏥",
        "description": "hospital",
        "aliases": [
            "hospital"
        ],
        "tags": []
    }, {
        "emoji": "🏦",
        "description": "bank",
        "aliases": [
            "bank"
        ],
        "tags": []
    }, {
        "emoji": "🏪",
        "description": "convenience store",
        "aliases": [
            "convenience_store"
        ],
        "tags": []
    }, {
        "emoji": "🏩",
        "description": "love hotel",
        "aliases": [
            "love_hotel"
        ],
        "tags": []
    }, {
        "emoji": "🏨",
        "description": "hotel",
        "aliases": [
            "hotel"
        ],
        "tags": []
    }, {
        "emoji": "💒",
        "description": "wedding",
        "aliases": [
            "wedding"
        ],
        "tags": [
            "marriage"
        ]
    }, {
        "emoji": "⛪",
        "description": "church",
        "aliases": [
            "church"
        ],
        "tags": []
    }, {
        "emoji": "🏬",
        "description": "department store",
        "aliases": [
            "department_store"
        ],
        "tags": []
    }, {
        "emoji": "🏤",
        "description": "european post office",
        "aliases": [
            "european_post_office"
        ],
        "tags": []
    }, {
        "emoji": "🌇",
        "description": "sunset over buildings",
        "aliases": [
            "city_sunrise"
        ],
        "tags": []
    }, {
        "emoji": "🌆",
        "description": "cityscape at dusk",
        "aliases": [
            "city_sunset"
        ],
        "tags": []
    }, {
        "emoji": "🏯",
        "description": "japanese castle",
        "aliases": [
            "japanese_castle"
        ],
        "tags": []
    }, {
        "emoji": "🏰",
        "description": "european castle",
        "aliases": [
            "european_castle"
        ],
        "tags": []
    }, {
        "emoji": "⛺",
        "description": "tent",
        "aliases": [
            "tent"
        ],
        "tags": [
            "camping"
        ]
    }, {
        "emoji": "🏭",
        "description": "factory",
        "aliases": [
            "factory"
        ],
        "tags": []
    }, {
        "emoji": "🗼",
        "description": "tokyo tower",
        "aliases": [
            "tokyo_tower"
        ],
        "tags": []
    }, {
        "emoji": "🗾",
        "description": "silhouette of japan",
        "aliases": [
            "japan"
        ],
        "tags": []
    }, {
        "emoji": "🗻",
        "description": "mount fuji",
        "aliases": [
            "mount_fuji"
        ],
        "tags": []
    }, {
        "emoji": "🌄",
        "description": "sunrise over mountains",
        "aliases": [
            "sunrise_over_mountains"
        ],
        "tags": []
    }, {
        "emoji": "🌅",
        "description": "sunrise",
        "aliases": [
            "sunrise"
        ],
        "tags": []
    }, {
        "emoji": "🌃",
        "description": "night with stars",
        "aliases": [
            "night_with_stars"
        ],
        "tags": []
    }, {
        "emoji": "🗽",
        "description": "statue of liberty",
        "aliases": [
            "statue_of_liberty"
        ],
        "tags": []
    }, {
        "emoji": "🌉",
        "description": "bridge at night",
        "aliases": [
            "bridge_at_night"
        ],
        "tags": []
    }, {
        "emoji": "🎠",
        "description": "carousel horse",
        "aliases": [
            "carousel_horse"
        ],
        "tags": []
    }, {
        "emoji": "🎡",
        "description": "ferris wheel",
        "aliases": [
            "ferris_wheel"
        ],
        "tags": []
    }, {
        "emoji": "⛲",
        "description": "fountain",
        "aliases": [
            "fountain"
        ],
        "tags": []
    }, {
        "emoji": "🎢",
        "description": "roller coaster",
        "aliases": [
            "roller_coaster"
        ],
        "tags": []
    }, {
        "emoji": "🚢",
        "description": "ship",
        "aliases": [
            "ship"
        ],
        "tags": []
    }, {
        "emoji": "⛵",
        "description": "sailboat",
        "aliases": [
            "boat", "sailboat"
        ],
        "tags": []
    }, {
        "emoji": "🚤",
        "description": "speedboat",
        "aliases": [
            "speedboat"
        ],
        "tags": [
            "ship"
        ]
    }, {
        "emoji": "🚣",
        "description": "rowboat",
        "aliases": [
            "rowboat"
        ],
        "tags": []
    }, {
        "emoji": "⚓",
        "description": "anchor",
        "aliases": [
            "anchor"
        ],
        "tags": [
            "ship"
        ]
    }, {
        "emoji": "🚀",
        "description": "rocket",
        "aliases": [
            "rocket"
        ],
        "tags": [
            "ship", "launch"
        ]
    }, {
        "emoji": "✈️",
        "description": "airplane",
        "aliases": [
            "airplane"
        ],
        "tags": [
            "flight"
        ]
    }, {
        "emoji": "💺",
        "description": "seat",
        "aliases": [
            "seat"
        ],
        "tags": []
    }, {
        "emoji": "🚁",
        "description": "helicopter",
        "aliases": [
            "helicopter"
        ],
        "tags": []
    }, {
        "emoji": "🚂",
        "description": "steam locomotive",
        "aliases": [
            "steam_locomotive"
        ],
        "tags": [
            "train"
        ]
    }, {
        "emoji": "🚊",
        "description": "tram",
        "aliases": [
            "tram"
        ],
        "tags": []
    }, {
        "emoji": "🚉",
        "description": "station",
        "aliases": [
            "station"
        ],
        "tags": []
    }, {
        "emoji": "🚞",
        "description": "mountain railway",
        "aliases": [
            "mountain_railway"
        ],
        "tags": []
    }, {
        "emoji": "🚆",
        "description": "train",
        "aliases": [
            "train2"
        ],
        "tags": []
    }, {
        "emoji": "🚄",
        "description": "high-speed train",
        "aliases": [
            "bullettrain_side"
        ],
        "tags": [
            "train"
        ]
    }, {
        "emoji": "🚅",
        "description": "high-speed train with bullet nose",
        "aliases": [
            "bullettrain_front"
        ],
        "tags": [
            "train"
        ]
    }, {
        "emoji": "🚈",
        "description": "light rail",
        "aliases": [
            "light_rail"
        ],
        "tags": []
    }, {
        "emoji": "🚇",
        "description": "metro",
        "aliases": [
            "metro"
        ],
        "tags": []
    }, {
        "emoji": "🚝",
        "description": "monorail",
        "aliases": [
            "monorail"
        ],
        "tags": []
    }, {
        "emoji": "🚋",
        "description": "tram car",
        "aliases": [
            "train"
        ],
        "tags": []
    }, {
        "emoji": "🚃",
        "description": "railway car",
        "aliases": [
            "railway_car"
        ],
        "tags": []
    }, {
        "emoji": "🚎",
        "description": "trolleybus",
        "aliases": [
            "trolleybus"
        ],
        "tags": []
    }, {
        "emoji": "🚌",
        "description": "bus",
        "aliases": [
            "bus"
        ],
        "tags": []
    }, {
        "emoji": "🚍",
        "description": "oncoming bus",
        "aliases": [
            "oncoming_bus"
        ],
        "tags": []
    }, {
        "emoji": "🚙",
        "description": "recreational vehicle",
        "aliases": [
            "blue_car"
        ],
        "tags": []
    }, {
        "emoji": "🚘",
        "description": "oncoming automobile",
        "aliases": [
            "oncoming_automobile"
        ],
        "tags": []
    }, {
        "emoji": "🚗",
        "description": "automobile",
        "aliases": [
            "car", "red_car"
        ],
        "tags": []
    }, {
        "emoji": "🚕",
        "description": "taxi",
        "aliases": [
            "taxi"
        ],
        "tags": []
    }, {
        "emoji": "🚖",
        "description": "oncoming taxi",
        "aliases": [
            "oncoming_taxi"
        ],
        "tags": []
    }, {
        "emoji": "🚛",
        "description": "articulated lorry",
        "aliases": [
            "articulated_lorry"
        ],
        "tags": []
    }, {
        "emoji": "🚚",
        "description": "delivery truck",
        "aliases": [
            "truck"
        ],
        "tags": []
    }, {
        "emoji": "🚨",
        "description": "police cars revolving light",
        "aliases": [
            "rotating_light"
        ],
        "tags": [
            "911", "emergency"
        ]
    }, {
        "emoji": "🚓",
        "description": "police car",
        "aliases": [
            "police_car"
        ],
        "tags": []
    }, {
        "emoji": "🚔",
        "description": "oncoming police car",
        "aliases": [
            "oncoming_police_car"
        ],
        "tags": []
    }, {
        "emoji": "🚒",
        "description": "fire engine",
        "aliases": [
            "fire_engine"
        ],
        "tags": []
    }, {
        "emoji": "🚑",
        "description": "ambulance",
        "aliases": [
            "ambulance"
        ],
        "tags": []
    }, {
        "emoji": "🚐",
        "description": "minibus",
        "aliases": [
            "minibus"
        ],
        "tags": []
    }, {
        "emoji": "🚲",
        "description": "bicycle",
        "aliases": [
            "bike"
        ],
        "tags": [
            "bicycle"
        ]
    }, {
        "emoji": "🚡",
        "description": "aerial tramway",
        "aliases": [
            "aerial_tramway"
        ],
        "tags": []
    }, {
        "emoji": "🚟",
        "description": "suspension railway",
        "aliases": [
            "suspension_railway"
        ],
        "tags": []
    }, {
        "emoji": "🚠",
        "description": "mountain cableway",
        "aliases": [
            "mountain_cableway"
        ],
        "tags": []
    }, {
        "emoji": "🚜",
        "description": "tractor",
        "aliases": [
            "tractor"
        ],
        "tags": []
    }, {
        "emoji": "💈",
        "description": "barber pole",
        "aliases": [
            "barber"
        ],
        "tags": []
    }, {
        "emoji": "🚏",
        "description": "bus stop",
        "aliases": [
            "busstop"
        ],
        "tags": []
    }, {
        "emoji": "🎫",
        "description": "ticket",
        "aliases": [
            "ticket"
        ],
        "tags": []
    }, {
        "emoji": "🚦",
        "description": "vertical traffic light",
        "aliases": [
            "vertical_traffic_light"
        ],
        "tags": [
            "semaphore"
        ]
    }, {
        "emoji": "🚥",
        "description": "horizontal traffic light",
        "aliases": [
            "traffic_light"
        ],
        "tags": []
    }, {
        "emoji": "⚠️",
        "description": "warning sign",
        "aliases": [
            "warning"
        ],
        "tags": [
            "wip"
        ]
    }, {
        "emoji": "🚧",
        "description": "construction sign",
        "aliases": [
            "construction"
        ],
        "tags": [
            "wip"
        ]
    }, {
        "emoji": "🔰",
        "description": "japanese symbol for beginner",
        "aliases": [
            "beginner"
        ],
        "tags": []
    }, {
        "emoji": "⛽",
        "description": "fuel pump",
        "aliases": [
            "fuelpump"
        ],
        "tags": []
    }, {
        "emoji": "🏮",
        "description": "izakaya lantern",
        "aliases": [
            "izakaya_lantern", "lantern"
        ],
        "tags": []
    }, {
        "emoji": "🎰",
        "description": "slot machine",
        "aliases": [
            "slot_machine"
        ],
        "tags": []
    }, {
        "emoji": "♨️",
        "description": "hot springs",
        "aliases": [
            "hotsprings"
        ],
        "tags": []
    }, {
        "emoji": "🗿",
        "description": "moyai",
        "aliases": [
            "moyai"
        ],
        "tags": [
            "stone"
        ]
    }, {
        "emoji": "🎪",
        "description": "circus tent",
        "aliases": [
            "circus_tent"
        ],
        "tags": []
    }, {
        "emoji": "🎭",
        "description": "performing arts",
        "aliases": [
            "performing_arts"
        ],
        "tags": [
            "theater", "drama"
        ]
    }, {
        "emoji": "📍",
        "description": "round pushpin",
        "aliases": [
            "round_pushpin"
        ],
        "tags": [
            "location"
        ]
    }, {
        "emoji": "🚩",
        "description": "triangular flag on post",
        "aliases": [
            "triangular_flag_on_post"
        ],
        "tags": []
    }, {
        "emoji": "🇯🇵",
        "description": "regional indicator symbol letter j + regional indicator symbol letter p",
        "aliases": [
            "jp"
        ],
        "tags": [
            "japan"
        ]
    }, {
        "emoji": "🇰🇷",
        "description": "regional indicator symbol letter k + regional indicator symbol letter r",
        "aliases": [
            "kr"
        ],
        "tags": [
            "korea"
        ]
    }, {
        "emoji": "🇩🇪",
        "description": "regional indicator symbol letter d + regional indicator symbol letter e",
        "aliases": [
            "de"
        ],
        "tags": [
            "flag", "germany"
        ]
    }, {
        "emoji": "🇨🇳",
        "description": "regional indicator symbol letter c + regional indicator symbol letter n",
        "aliases": [
            "cn"
        ],
        "tags": [
            "china"
        ]
    }, {
        "emoji": "🇺🇸",
        "description": "regional indicator symbol letter u + regional indicator symbol letter s",
        "aliases": [
            "us"
        ],
        "tags": [
            "flag", "united", "america"
        ]
    }, {
        "emoji": "🇫🇷",
        "description": "regional indicator symbol letter f + regional indicator symbol letter r",
        "aliases": [
            "fr"
        ],
        "tags": [
            "france", "french"
        ]
    }, {
        "emoji": "🇪🇸",
        "description": "regional indicator symbol letter e + regional indicator symbol letter s",
        "aliases": [
            "es"
        ],
        "tags": [
            "spain"
        ]
    }, {
        "emoji": "🇮🇹",
        "description": "regional indicator symbol letter i + regional indicator symbol letter t",
        "aliases": [
            "it"
        ],
        "tags": [
            "italy"
        ]
    }, {
        "emoji": "🇷🇺",
        "description": "regional indicator symbol letter r + regional indicator symbol letter u",
        "aliases": [
            "ru"
        ],
        "tags": [
            "russia"
        ]
    }, {
        "emoji": "🇬🇧",
        "description": "regional indicator symbol letter g + regional indicator symbol letter b",
        "aliases": [
            "gb", "uk"
        ],
        "tags": [
            "flag", "british"
        ]
    }, {
        "emoji": "1️⃣",
        "description": "digit one + combining enclosing keycap",
        "aliases": [
            "one"
        ],
        "tags": []
    }, {
        "emoji": "2️⃣",
        "description": "digit two + combining enclosing keycap",
        "aliases": [
            "two"
        ],
        "tags": []
    }, {
        "emoji": "3️⃣",
        "description": "digit three + combining enclosing keycap",
        "aliases": [
            "three"
        ],
        "tags": []
    }, {
        "emoji": "4️⃣",
        "description": "digit four + combining enclosing keycap",
        "aliases": [
            "four"
        ],
        "tags": []
    }, {
        "emoji": "5️⃣",
        "description": "digit five + combining enclosing keycap",
        "aliases": [
            "five"
        ],
        "tags": []
    }, {
        "emoji": "6️⃣",
        "description": "digit six + combining enclosing keycap",
        "aliases": [
            "six"
        ],
        "tags": []
    }, {
        "emoji": "7️⃣",
        "description": "digit seven + combining enclosing keycap",
        "aliases": [
            "seven"
        ],
        "tags": []
    }, {
        "emoji": "8️⃣",
        "description": "digit eight + combining enclosing keycap",
        "aliases": [
            "eight"
        ],
        "tags": []
    }, {
        "emoji": "9️⃣",
        "description": "digit nine + combining enclosing keycap",
        "aliases": [
            "nine"
        ],
        "tags": []
    }, {
        "emoji": "0️⃣",
        "description": "digit zero + combining enclosing keycap",
        "aliases": [
            "zero"
        ],
        "tags": []
    }, {
        "emoji": "🔟",
        "description": "keycap ten",
        "aliases": [
            "keycap_ten"
        ],
        "tags": []
    }, {
        "emoji": "🔢",
        "description": "input symbol for numbers",
        "aliases": [
            "1234"
        ],
        "tags": [
            "numbers"
        ]
    }, {
        "emoji": "#️⃣",
        "description": "number sign + combining enclosing keycap",
        "aliases": [
            "hash"
        ],
        "tags": [
            "number"
        ]
    }, {
        "emoji": "🔣",
        "description": "input symbol for symbols",
        "aliases": [
            "symbols"
        ],
        "tags": []
    }, {
        "emoji": "⬆️",
        "description": "upwards black arrow",
        "aliases": [
            "arrow_up"
        ],
        "tags": []
    }, {
        "emoji": "⬇️",
        "description": "downwards black arrow",
        "aliases": [
            "arrow_down"
        ],
        "tags": []
    }, {
        "emoji": "⬅️",
        "description": "leftwards black arrow",
        "aliases": [
            "arrow_left"
        ],
        "tags": []
    }, {
        "emoji": "➡️",
        "description": "black rightwards arrow",
        "aliases": [
            "arrow_right"
        ],
        "tags": []
    }, {
        "emoji": "🔠",
        "description": "input symbol for latin capital letters",
        "aliases": [
            "capital_abcd"
        ],
        "tags": [
            "letters"
        ]
    }, {
        "emoji": "🔡",
        "description": "input symbol for latin small letters",
        "aliases": [
            "abcd"
        ],
        "tags": []
    }, {
        "emoji": "🔤",
        "description": "input symbol for latin letters",
        "aliases": [
            "abc"
        ],
        "tags": [
            "alphabet"
        ]
    }, {
        "emoji": "↗️",
        "description": "north east arrow",
        "aliases": [
            "arrow_upper_right"
        ],
        "tags": []
    }, {
        "emoji": "↖️",
        "description": "north west arrow",
        "aliases": [
            "arrow_upper_left"
        ],
        "tags": []
    }, {
        "emoji": "↘️",
        "description": "south east arrow",
        "aliases": [
            "arrow_lower_right"
        ],
        "tags": []
    }, {
        "emoji": "↙️",
        "description": "south west arrow",
        "aliases": [
            "arrow_lower_left"
        ],
        "tags": []
    }, {
        "emoji": "↔️",
        "description": "left right arrow",
        "aliases": [
            "left_right_arrow"
        ],
        "tags": []
    }, {
        "emoji": "↕️",
        "description": "up down arrow",
        "aliases": [
            "arrow_up_down"
        ],
        "tags": []
    }, {
        "emoji": "🔄",
        "description": "anticlockwise downwards and upwards open circle arrows",
        "aliases": [
            "arrows_counterclockwise"
        ],
        "tags": [
            "sync"
        ]
    }, {
        "emoji": "◀️",
        "description": "black left-pointing triangle",
        "aliases": [
            "arrow_backward"
        ],
        "tags": []
    }, {
        "emoji": "▶️",
        "description": "black right-pointing triangle",
        "aliases": [
            "arrow_forward"
        ],
        "tags": []
    }, {
        "emoji": "🔼",
        "description": "up-pointing small red triangle",
        "aliases": [
            "arrow_up_small"
        ],
        "tags": []
    }, {
        "emoji": "🔽",
        "description": "down-pointing small red triangle",
        "aliases": [
            "arrow_down_small"
        ],
        "tags": []
    }, {
        "emoji": "↩️",
        "description": "leftwards arrow with hook",
        "aliases": [
            "leftwards_arrow_with_hook"
        ],
        "tags": [
            "return"
        ]
    }, {
        "emoji": "↪️",
        "description": "rightwards arrow with hook",
        "aliases": [
            "arrow_right_hook"
        ],
        "tags": []
    }, {
        "emoji": "ℹ️",
        "description": "information source",
        "aliases": [
            "information_source"
        ],
        "tags": []
    }, {
        "emoji": "⏪",
        "description": "black left-pointing double triangle",
        "aliases": [
            "rewind"
        ],
        "tags": []
    }, {
        "emoji": "⏩",
        "description": "black right-pointing double triangle",
        "aliases": [
            "fast_forward"
        ],
        "tags": []
    }, {
        "emoji": "⏫",
        "description": "black up-pointing double triangle",
        "aliases": [
            "arrow_double_up"
        ],
        "tags": []
    }, {
        "emoji": "⏬",
        "description": "black down-pointing double triangle",
        "aliases": [
            "arrow_double_down"
        ],
        "tags": []
    }, {
        "emoji": "⤵️",
        "description": "arrow pointing rightwards then curving downwards",
        "aliases": [
            "arrow_heading_down"
        ],
        "tags": []
    }, {
        "emoji": "⤴️",
        "description": "arrow pointing rightwards then curving upwards",
        "aliases": [
            "arrow_heading_up"
        ],
        "tags": []
    }, {
        "emoji": "🆗",
        "description": "squared ok",
        "aliases": [
            "ok"
        ],
        "tags": [
            "yes"
        ]
    }, {
        "emoji": "🔀",
        "description": "twisted rightwards arrows",
        "aliases": [
            "twisted_rightwards_arrows"
        ],
        "tags": [
            "shuffle"
        ]
    }, {
        "emoji": "🔁",
        "description": "clockwise rightwards and leftwards open circle arrows",
        "aliases": [
            "repeat"
        ],
        "tags": [
            "loop"
        ]
    }, {
        "emoji": "🔂",
        "description": "clockwise rightwards and leftwards open circle arrows with circled one overlay",
        "aliases": [
            "repeat_one"
        ],
        "tags": []
    }, {
        "emoji": "🆕",
        "description": "squared new",
        "aliases": [
            "new"
        ],
        "tags": [
            "fresh"
        ]
    }, {
        "emoji": "🆙",
        "description": "squared up with exclamation mark",
        "aliases": [
            "up"
        ],
        "tags": []
    }, {
        "emoji": "🆒",
        "description": "squared cool",
        "aliases": [
            "cool"
        ],
        "tags": []
    }, {
        "emoji": "🆓",
        "description": "squared free",
        "aliases": [
            "free"
        ],
        "tags": []
    }, {
        "emoji": "🆖",
        "description": "squared ng",
        "aliases": [
            "ng"
        ],
        "tags": []
    }, {
        "emoji": "📶",
        "description": "antenna with bars",
        "aliases": [
            "signal_strength"
        ],
        "tags": [
            "wifi"
        ]
    }, {
        "emoji": "🎦",
        "description": "cinema",
        "aliases": [
            "cinema"
        ],
        "tags": [
            "film", "movie"
        ]
    }, {
        "emoji": "🈁",
        "description": "squared katakana koko",
        "aliases": [
            "koko"
        ],
        "tags": []
    }, {
        "emoji": "🈯",
        "description": "squared cjk unified ideograph-6307",
        "aliases": [
            "u6307"
        ],
        "tags": []
    }, {
        "emoji": "🈳",
        "description": "squared cjk unified ideograph-7a7a",
        "aliases": [
            "u7a7a"
        ],
        "tags": []
    }, {
        "emoji": "🈵",
        "description": "squared cjk unified ideograph-6e80",
        "aliases": [
            "u6e80"
        ],
        "tags": []
    }, {
        "emoji": "🈴",
        "description": "squared cjk unified ideograph-5408",
        "aliases": [
            "u5408"
        ],
        "tags": []
    }, {
        "emoji": "🈲",
        "description": "squared cjk unified ideograph-7981",
        "aliases": [
            "u7981"
        ],
        "tags": []
    }, {
        "emoji": "🉐",
        "description": "circled ideograph advantage",
        "aliases": [
            "ideograph_advantage"
        ],
        "tags": []
    }, {
        "emoji": "🈹",
        "description": "squared cjk unified ideograph-5272",
        "aliases": [
            "u5272"
        ],
        "tags": []
    }, {
        "emoji": "🈺",
        "description": "squared cjk unified ideograph-55b6",
        "aliases": [
            "u55b6"
        ],
        "tags": []
    }, {
        "emoji": "🈶",
        "description": "squared cjk unified ideograph-6709",
        "aliases": [
            "u6709"
        ],
        "tags": []
    }, {
        "emoji": "🈚",
        "description": "squared cjk unified ideograph-7121",
        "aliases": [
            "u7121"
        ],
        "tags": []
    }, {
        "emoji": "🚻",
        "description": "restroom",
        "aliases": [
            "restroom"
        ],
        "tags": [
            "toilet"
        ]
    }, {
        "emoji": "🚹",
        "description": "mens symbol",
        "aliases": [
            "mens"
        ],
        "tags": []
    }, {
        "emoji": "🚺",
        "description": "womens symbol",
        "aliases": [
            "womens"
        ],
        "tags": []
    }, {
        "emoji": "🚼",
        "description": "baby symbol",
        "aliases": [
            "baby_symbol"
        ],
        "tags": []
    }, {
        "emoji": "🚾",
        "description": "water closet",
        "aliases": [
            "wc"
        ],
        "tags": [
            "toilet", "restroom"
        ]
    }, {
        "emoji": "🚰",
        "description": "potable water symbol",
        "aliases": [
            "potable_water"
        ],
        "tags": []
    }, {
        "emoji": "🚮",
        "description": "put litter in its place symbol",
        "aliases": [
            "put_litter_in_its_place"
        ],
        "tags": []
    }, {
        "emoji": "🅿️",
        "description": "negative squared latin capital letter p",
        "aliases": [
            "parking"
        ],
        "tags": []
    }, {
        "emoji": "♿",
        "description": "wheelchair symbol",
        "aliases": [
            "wheelchair"
        ],
        "tags": [
            "accessibility"
        ]
    }, {
        "emoji": "🚭",
        "description": "no smoking symbol",
        "aliases": [
            "no_smoking"
        ],
        "tags": []
    }, {
        "emoji": "🈷️",
        "description": "squared cjk unified ideograph-6708",
        "aliases": [
            "u6708"
        ],
        "tags": []
    }, {
        "emoji": "🈸",
        "description": "squared cjk unified ideograph-7533",
        "aliases": [
            "u7533"
        ],
        "tags": []
    }, {
        "emoji": "🈂️",
        "description": "squared katakana sa",
        "aliases": [
            "sa"
        ],
        "tags": []
    }, {
        "emoji": "Ⓜ️",
        "description": "circled latin capital letter m",
        "aliases": [
            "m"
        ],
        "tags": []
    }, {
        "emoji": "🛂",
        "description": "passport control",
        "aliases": [
            "passport_control"
        ],
        "tags": []
    }, {
        "emoji": "🛄",
        "description": "baggage claim",
        "aliases": [
            "baggage_claim"
        ],
        "tags": [
            "airport"
        ]
    }, {
        "emoji": "🛅",
        "description": "left luggage",
        "aliases": [
            "left_luggage"
        ],
        "tags": []
    }, {
        "emoji": "🛃",
        "description": "customs",
        "aliases": [
            "customs"
        ],
        "tags": []
    }, {
        "emoji": "🉑",
        "description": "circled ideograph accept",
        "aliases": [
            "accept"
        ],
        "tags": []
    }, {
        "emoji": "㊙️",
        "description": "circled ideograph secret",
        "aliases": [
            "secret"
        ],
        "tags": []
    }, {
        "emoji": "㊗️",
        "description": "circled ideograph congratulation",
        "aliases": [
            "congratulations"
        ],
        "tags": []
    }, {
        "emoji": "🆑",
        "description": "squared cl",
        "aliases": [
            "cl"
        ],
        "tags": []
    }, {
        "emoji": "🆘",
        "description": "squared sos",
        "aliases": [
            "sos"
        ],
        "tags": [
            "help", "emergency"
        ]
    }, {
        "emoji": "🆔",
        "description": "squared id",
        "aliases": [
            "id"
        ],
        "tags": []
    }, {
        "emoji": "🚫",
        "description": "no entry sign",
        "aliases": [
            "no_entry_sign"
        ],
        "tags": [
            "block", "forbidden"
        ]
    }, {
        "emoji": "🔞",
        "description": "no one under eighteen symbol",
        "aliases": [
            "underage"
        ],
        "tags": []
    }, {
        "emoji": "📵",
        "description": "no mobile phones",
        "aliases": [
            "no_mobile_phones"
        ],
        "tags": []
    }, {
        "emoji": "🚯",
        "description": "do not litter symbol",
        "aliases": [
            "do_not_litter"
        ],
        "tags": []
    }, {
        "emoji": "🚱",
        "description": "non-potable water symbol",
        "aliases": [
            "non-potable_water"
        ],
        "tags": []
    }, {
        "emoji": "🚳",
        "description": "no bicycles",
        "aliases": [
            "no_bicycles"
        ],
        "tags": []
    }, {
        "emoji": "🚷",
        "description": "no pedestrians",
        "aliases": [
            "no_pedestrians"
        ],
        "tags": []
    }, {
        "emoji": "🚸",
        "description": "children crossing",
        "aliases": [
            "children_crossing"
        ],
        "tags": []
    }, {
        "emoji": "⛔",
        "description": "no entry",
        "aliases": [
            "no_entry"
        ],
        "tags": [
            "limit"
        ]
    }, {
        "emoji": "✳️",
        "description": "eight spoked asterisk",
        "aliases": [
            "eight_spoked_asterisk"
        ],
        "tags": []
    }, {
        "emoji": "❇️",
        "description": "sparkle",
        "aliases": [
            "sparkle"
        ],
        "tags": []
    }, {
        "emoji": "❎",
        "description": "negative squared cross mark",
        "aliases": [
            "negative_squared_cross_mark"
        ],
        "tags": []
    }, {
        "emoji": "✅",
        "description": "white heavy check mark",
        "aliases": [
            "white_check_mark"
        ],
        "tags": []
    }, {
        "emoji": "✴️",
        "description": "eight pointed black star",
        "aliases": [
            "eight_pointed_black_star"
        ],
        "tags": []
    }, {
        "emoji": "💟",
        "description": "heart decoration",
        "aliases": [
            "heart_decoration"
        ],
        "tags": []
    }, {
        "emoji": "🆚",
        "description": "squared vs",
        "aliases": [
            "vs"
        ],
        "tags": []
    }, {
        "emoji": "📳",
        "description": "vibration mode",
        "aliases": [
            "vibration_mode"
        ],
        "tags": []
    }, {
        "emoji": "📴",
        "description": "mobile phone off",
        "aliases": [
            "mobile_phone_off"
        ],
        "tags": [
            "mute", "off"
        ]
    }, {
        "emoji": "🅰️",
        "description": "negative squared latin capital letter a",
        "aliases": [
            "a"
        ],
        "tags": []
    }, {
        "emoji": "🅱️",
        "description": "negative squared latin capital letter b",
        "aliases": [
            "b"
        ],
        "tags": []
    }, {
        "emoji": "🆎",
        "description": "negative squared ab",
        "aliases": [
            "ab"
        ],
        "tags": []
    }, {
        "emoji": "🅾️",
        "description": "negative squared latin capital letter o",
        "aliases": [
            "o2"
        ],
        "tags": []
    }, {
        "emoji": "💠",
        "description": "diamond shape with a dot inside",
        "aliases": [
            "diamond_shape_with_a_dot_inside"
        ],
        "tags": []
    }, {
        "emoji": "➿",
        "description": "double curly loop",
        "aliases": [
            "loop"
        ],
        "tags": []
    }, {
        "emoji": "♻️",
        "description": "black universal recycling symbol",
        "aliases": [
            "recycle"
        ],
        "tags": [
            "environment", "green"
        ]
    }, {
        "emoji": "♈",
        "description": "aries",
        "aliases": [
            "aries"
        ],
        "tags": []
    }, {
        "emoji": "♉",
        "description": "taurus",
        "aliases": [
            "taurus"
        ],
        "tags": []
    }, {
        "emoji": "♊",
        "description": "gemini",
        "aliases": [
            "gemini"
        ],
        "tags": []
    }, {
        "emoji": "♋",
        "description": "cancer",
        "aliases": [
            "cancer"
        ],
        "tags": []
    }, {
        "emoji": "♌",
        "description": "leo",
        "aliases": [
            "leo"
        ],
        "tags": []
    }, {
        "emoji": "♍",
        "description": "virgo",
        "aliases": [
            "virgo"
        ],
        "tags": []
    }, {
        "emoji": "♎",
        "description": "libra",
        "aliases": [
            "libra"
        ],
        "tags": []
    }, {
        "emoji": "♏",
        "description": "scorpius",
        "aliases": [
            "scorpius"
        ],
        "tags": []
    }, {
        "emoji": "♐",
        "description": "sagittarius",
        "aliases": [
            "sagittarius"
        ],
        "tags": []
    }, {
        "emoji": "♑",
        "description": "capricorn",
        "aliases": [
            "capricorn"
        ],
        "tags": []
    }, {
        "emoji": "♒",
        "description": "aquarius",
        "aliases": [
            "aquarius"
        ],
        "tags": []
    }, {
        "emoji": "♓",
        "description": "pisces",
        "aliases": [
            "pisces"
        ],
        "tags": []
    }, {
        "emoji": "⛎",
        "description": "ophiuchus",
        "aliases": [
            "ophiuchus"
        ],
        "tags": []
    }, {
        "emoji": "🔯",
        "description": "six pointed star with middle dot",
        "aliases": [
            "six_pointed_star"
        ],
        "tags": []
    }, {
        "emoji": "🏧",
        "description": "automated teller machine",
        "aliases": [
            "atm"
        ],
        "tags": []
    }, {
        "emoji": "💹",
        "description": "chart with upwards trend and yen sign",
        "aliases": [
            "chart"
        ],
        "tags": []
    }, {
        "emoji": "💲",
        "description": "heavy dollar sign",
        "aliases": [
            "heavy_dollar_sign"
        ],
        "tags": []
    }, {
        "emoji": "💱",
        "description": "currency exchange",
        "aliases": [
            "currency_exchange"
        ],
        "tags": []
    }, {
        "emoji": "©️",
        "description": "copyright sign",
        "aliases": [
            "copyright"
        ],
        "tags": []
    }, {
        "emoji": "®️",
        "description": "registered sign",
        "aliases": [
            "registered"
        ],
        "tags": []
    }, {
        "emoji": "™️",
        "description": "trade mark sign",
        "aliases": [
            "tm"
        ],
        "tags": [
            "trademark"
        ]
    }, {
        "emoji": "❌",
        "description": "cross mark",
        "aliases": [
            "x"
        ],
        "tags": []
    }, {
        "emoji": "‼️",
        "description": "double exclamation mark",
        "aliases": [
            "bangbang"
        ],
        "tags": []
    }, {
        "emoji": "⁉️",
        "description": "exclamation question mark",
        "aliases": [
            "interrobang"
        ],
        "tags": []
    }, {
        "emoji": "❗",
        "description": "heavy exclamation mark symbol",
        "aliases": [
            "exclamation", "heavy_exclamation_mark"
        ],
        "tags": [
            "bang"
        ]
    }, {
        "emoji": "❓",
        "description": "black question mark ornament",
        "aliases": [
            "question"
        ],
        "tags": [
            "confused"
        ]
    }, {
        "emoji": "❕",
        "description": "white exclamation mark ornament",
        "aliases": [
            "grey_exclamation"
        ],
        "tags": []
    }, {
        "emoji": "❔",
        "description": "white question mark ornament",
        "aliases": [
            "grey_question"
        ],
        "tags": []
    }, {
        "emoji": "⭕",
        "description": "heavy large circle",
        "aliases": [
            "o"
        ],
        "tags": []
    }, {
        "emoji": "🔝",
        "description": "top with upwards arrow above",
        "aliases": [
            "top"
        ],
        "tags": []
    }, {
        "emoji": "🔚",
        "description": "end with leftwards arrow above",
        "aliases": [
            "end"
        ],
        "tags": []
    }, {
        "emoji": "🔙",
        "description": "back with leftwards arrow above",
        "aliases": [
            "back"
        ],
        "tags": []
    }, {
        "emoji": "🔛",
        "description": "on with exclamation mark with left right arrow above",
        "aliases": [
            "on"
        ],
        "tags": []
    }, {
        "emoji": "🔜",
        "description": "soon with rightwards arrow above",
        "aliases": [
            "soon"
        ],
        "tags": []
    }, {
        "emoji": "🔃",
        "description": "clockwise downwards and upwards open circle arrows",
        "aliases": [
            "arrows_clockwise"
        ],
        "tags": []
    }, {
        "emoji": "🕛",
        "description": "clock face twelve oclock",
        "aliases": [
            "clock12"
        ],
        "tags": []
    }, {
        "emoji": "🕧",
        "description": "clock face twelve-thirty",
        "aliases": [
            "clock1230"
        ],
        "tags": []
    }, {
        "emoji": "🕐",
        "description": "clock face one oclock",
        "aliases": [
            "clock1"
        ],
        "tags": []
    }, {
        "emoji": "🕜",
        "description": "clock face one-thirty",
        "aliases": [
            "clock130"
        ],
        "tags": []
    }, {
        "emoji": "🕑",
        "description": "clock face two oclock",
        "aliases": [
            "clock2"
        ],
        "tags": []
    }, {
        "emoji": "🕝",
        "description": "clock face two-thirty",
        "aliases": [
            "clock230"
        ],
        "tags": []
    }, {
        "emoji": "🕒",
        "description": "clock face three oclock",
        "aliases": [
            "clock3"
        ],
        "tags": []
    }, {
        "emoji": "🕞",
        "description": "clock face three-thirty",
        "aliases": [
            "clock330"
        ],
        "tags": []
    }, {
        "emoji": "🕓",
        "description": "clock face four oclock",
        "aliases": [
            "clock4"
        ],
        "tags": []
    }, {
        "emoji": "🕟",
        "description": "clock face four-thirty",
        "aliases": [
            "clock430"
        ],
        "tags": []
    }, {
        "emoji": "🕔",
        "description": "clock face five oclock",
        "aliases": [
            "clock5"
        ],
        "tags": []
    }, {
        "emoji": "🕠",
        "description": "clock face five-thirty",
        "aliases": [
            "clock530"
        ],
        "tags": []
    }, {
        "emoji": "🕕",
        "description": "clock face six oclock",
        "aliases": [
            "clock6"
        ],
        "tags": []
    }, {
        "emoji": "🕖",
        "description": "clock face seven oclock",
        "aliases": [
            "clock7"
        ],
        "tags": []
    }, {
        "emoji": "🕗",
        "description": "clock face eight oclock",
        "aliases": [
            "clock8"
        ],
        "tags": []
    }, {
        "emoji": "🕘",
        "description": "clock face nine oclock",
        "aliases": [
            "clock9"
        ],
        "tags": []
    }, {
        "emoji": "🕙",
        "description": "clock face ten oclock",
        "aliases": [
            "clock10"
        ],
        "tags": []
    }, {
        "emoji": "🕚",
        "description": "clock face eleven oclock",
        "aliases": [
            "clock11"
        ],
        "tags": []
    }, {
        "emoji": "🕡",
        "description": "clock face six-thirty",
        "aliases": [
            "clock630"
        ],
        "tags": []
    }, {
        "emoji": "🕢",
        "description": "clock face seven-thirty",
        "aliases": [
            "clock730"
        ],
        "tags": []
    }, {
        "emoji": "🕣",
        "description": "clock face eight-thirty",
        "aliases": [
            "clock830"
        ],
        "tags": []
    }, {
        "emoji": "🕤",
        "description": "clock face nine-thirty",
        "aliases": [
            "clock930"
        ],
        "tags": []
    }, {
        "emoji": "🕥",
        "description": "clock face ten-thirty",
        "aliases": [
            "clock1030"
        ],
        "tags": []
    }, {
        "emoji": "🕦",
        "description": "clock face eleven-thirty",
        "aliases": [
            "clock1130"
        ],
        "tags": []
    }, {
        "emoji": "✖️",
        "description": "heavy multiplication x",
        "aliases": [
            "heavy_multiplication_x"
        ],
        "tags": []
    }, {
        "emoji": "➕",
        "description": "heavy plus sign",
        "aliases": [
            "heavy_plus_sign"
        ],
        "tags": []
    }, {
        "emoji": "➖",
        "description": "heavy minus sign",
        "aliases": [
            "heavy_minus_sign"
        ],
        "tags": []
    }, {
        "emoji": "➗",
        "description": "heavy division sign",
        "aliases": [
            "heavy_division_sign"
        ],
        "tags": []
    }, {
        "emoji": "♠️",
        "description": "black spade suit",
        "aliases": [
            "spades"
        ],
        "tags": []
    }, {
        "emoji": "♥️",
        "description": "black heart suit",
        "aliases": [
            "hearts"
        ],
        "tags": []
    }, {
        "emoji": "♣️",
        "description": "black club suit",
        "aliases": [
            "clubs"
        ],
        "tags": []
    }, {
        "emoji": "♦️",
        "description": "black diamond suit",
        "aliases": [
            "diamonds"
        ],
        "tags": []
    }, {
        "emoji": "💮",
        "description": "white flower",
        "aliases": [
            "white_flower"
        ],
        "tags": []
    }, {
        "emoji": "💯",
        "description": "hundred points symbol",
        "aliases": [
            "100"
        ],
        "tags": [
            "score", "perfect"
        ]
    }, {
        "emoji": "✔️",
        "description": "heavy check mark",
        "aliases": [
            "heavy_check_mark"
        ],
        "tags": []
    }, {
        "emoji": "☑️",
        "description": "ballot box with check",
        "aliases": [
            "ballot_box_with_check"
        ],
        "tags": []
    }, {
        "emoji": "🔘",
        "description": "radio button",
        "aliases": [
            "radio_button"
        ],
        "tags": []
    }, {
        "emoji": "🔗",
        "description": "link symbol",
        "aliases": [
            "link"
        ],
        "tags": []
    }, {
        "emoji": "➰",
        "description": "curly loop",
        "aliases": [
            "curly_loop"
        ],
        "tags": []
    }, {
        "emoji": "〰️",
        "description": "wavy dash",
        "aliases": [
            "wavy_dash"
        ],
        "tags": []
    }, {
        "emoji": "〽️",
        "description": "part alternation mark",
        "aliases": [
            "part_alternation_mark"
        ],
        "tags": []
    }, {
        "emoji": "🔱",
        "description": "trident emblem",
        "aliases": [
            "trident"
        ],
        "tags": []
    }, {
        "emoji": "◼️",
        "description": "black medium square",
        "aliases": [
            "black_medium_square"
        ],
        "tags": []
    }, {
        "emoji": "◻️",
        "description": "white medium square",
        "aliases": [
            "white_medium_square"
        ],
        "tags": []
    }, {
        "emoji": "◾",
        "description": "black medium small square",
        "aliases": [
            "black_medium_small_square"
        ],
        "tags": []
    }, {
        "emoji": "◽",
        "description": "white medium small square",
        "aliases": [
            "white_medium_small_square"
        ],
        "tags": []
    }, {
        "emoji": "▪️",
        "description": "black small square",
        "aliases": [
            "black_small_square"
        ],
        "tags": []
    }, {
        "emoji": "▫️",
        "description": "white small square",
        "aliases": [
            "white_small_square"
        ],
        "tags": []
    }, {
        "emoji": "🔺",
        "description": "up-pointing red triangle",
        "aliases": [
            "small_red_triangle"
        ],
        "tags": []
    }, {
        "emoji": "🔲",
        "description": "black square button",
        "aliases": [
            "black_square_button"
        ],
        "tags": []
    }, {
        "emoji": "🔳",
        "description": "white square button",
        "aliases": [
            "white_square_button"
        ],
        "tags": []
    }, {
        "emoji": "⚫",
        "description": "medium black circle",
        "aliases": [
            "black_circle"
        ],
        "tags": []
    }, {
        "emoji": "⚪",
        "description": "medium white circle",
        "aliases": [
            "white_circle"
        ],
        "tags": []
    }, {
        "emoji": "🔴",
        "description": "large red circle",
        "aliases": [
            "red_circle"
        ],
        "tags": []
    }, {
        "emoji": "🔵",
        "description": "large blue circle",
        "aliases": [
            "large_blue_circle"
        ],
        "tags": []
    }, {
        "emoji": "🔻",
        "description": "down-pointing red triangle",
        "aliases": [
            "small_red_triangle_down"
        ],
        "tags": []
    }, {
        "emoji": "⬜",
        "description": "white large square",
        "aliases": [
            "white_large_square"
        ],
        "tags": []
    }, {
        "emoji": "⬛",
        "description": "black large square",
        "aliases": [
            "black_large_square"
        ],
        "tags": []
    }, {
        "emoji": "🔶",
        "description": "large orange diamond",
        "aliases": [
            "large_orange_diamond"
        ],
        "tags": []
    }, {
        "emoji": "🔷",
        "description": "large blue diamond",
        "aliases": [
            "large_blue_diamond"
        ],
        "tags": []
    }, {
        "emoji": "🔸",
        "description": "small orange diamond",
        "aliases": [
            "small_orange_diamond"
        ],
        "tags": []
    }, {
        "emoji": "🔹",
        "description": "small blue diamond",
        "aliases": [
            "small_blue_diamond"
        ],
        "tags": []
    }, {
        "aliases": [
            "basecamp"
        ],
        "tags": []
    }, {
        "aliases": [
            "basecampy"
        ],
        "tags": []
    }, {
        "aliases": [
            "bowtie"
        ],
        "tags": []
    }, {
        "aliases": [
            "feelsgood"
        ],
        "tags": []
    }, {
        "aliases": [
            "finnadie"
        ],
        "tags": []
    }, {
        "aliases": [
            "fu"
        ],
        "tags": []
    }, {
        "aliases": [
            "goberserk"
        ],
        "tags": []
    }, {
        "aliases": [
            "godmode"
        ],
        "tags": []
    }, {
        "aliases": [
            "hurtrealbad"
        ],
        "tags": []
    }, {
        "aliases": [
            "metal"
        ],
        "tags": []
    }, {
        "aliases": [
            "neckbeard"
        ],
        "tags": []
    }, {
        "aliases": [
            "octocat"
        ],
        "tags": []
    }, {
        "aliases": [
            "rage1"
        ],
        "tags": []
    }, {
        "aliases": [
            "rage2"
        ],
        "tags": []
    }, {
        "aliases": [
            "rage3"
        ],
        "tags": []
    }, {
        "aliases": [
            "rage4"
        ],
        "tags": []
    }, {
        "aliases": [
            "shipit", "squirrel"
        ],
        "tags": []
    }, {
        "aliases": [
            "suspect"
        ],
        "tags": []
    }, {
        "aliases": [
            "taco"
        ],
        "tags": []
    }, {
        "aliases": [
            "trollface"
        ],
        "tags": []
    }];
//# sourceMappingURL=emoji.db.js.map

/***/ }),

/***/ "./node_modules/ng-emoji-picker/src/emoji.service.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng-emoji-picker/src/emoji.service.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var emoji_db_1 = __webpack_require__(/*! ./emoji.db */ "./node_modules/ng-emoji-picker/src/emoji.db.js");
var EmojiService = /** @class */ (function () {
    function EmojiService() {
        this.PARSE_REGEX = /:([a-zA-Z0-9_\-\+]+):/g;
    }
    EmojiService.prototype.get = function (emoji) {
        // TODO Fix performance
        for (var _i = 0, EMOJI_DB_1 = emoji_db_1.EMOJI_DB; _i < EMOJI_DB_1.length; _i++) {
            var data = EMOJI_DB_1[_i];
            for (var _a = 0, _b = data.aliases; _a < _b.length; _a++) {
                var e = _b[_a];
                if (emoji === e) {
                    return data.emoji;
                }
            }
        }
        return emoji;
    };
    EmojiService.prototype.getAll = function () {
        return emoji_db_1.EMOJI_DB;
    };
    EmojiService.prototype.emojify = function (str) {
        var _this = this;
        return str.split(this.PARSE_REGEX).map(function (emoji, index) {
            // Return every second element as an emoji
            if (index % 2 === 0) {
                return emoji;
            }
            return _this.get(emoji);
        }).join('');
    };
    EmojiService.decorators = [
        { type: core_1.Injectable },
    ];
    return EmojiService;
}());
exports.EmojiService = EmojiService;
//# sourceMappingURL=emoji.service.js.map

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var signup_component_1 = __webpack_require__(/*! ./components/signup/signup.component */ "./src/app/components/signup/signup.component.ts");
var login_component_1 = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
var auth_guard_service_1 = __webpack_require__(/*! ./common/guard/auth_guard/auth-guard.service */ "./src/app/common/guard/auth_guard/auth-guard.service.ts");
var dashboard_component_1 = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
var main_component_1 = __webpack_require__(/*! ./components/main/main.component */ "./src/app/components/main/main.component.ts");
var un_auth_guard_service_1 = __webpack_require__(/*! ./common/guard/unauth_guard/un-auth-guard.service */ "./src/app/common/guard/unauth_guard/un-auth-guard.service.ts");
var routes = [
    {
        path: 'signup', component: signup_component_1.SignupComponent,
        canActivate: [un_auth_guard_service_1.UnAuthGuardService]
    },
    {
        path: 'signin', component: login_component_1.LoginComponent,
        canActivate: [un_auth_guard_service_1.UnAuthGuardService]
    },
    {
        path: '',
        component: main_component_1.MainComponent,
        canActivate: [auth_guard_service_1.AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.css.shim.ngstyle.js":
/*!***************************************************!*\
  !*** ./src/app/app.component.css.shim.ngstyle.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = [""];
exports.styles = styles;


/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/*!********************************************!*\
  !*** ./src/app/app.component.ngfactory.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./app.component.css.shim.ngstyle */ "./src/app/app.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i3 = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var styles_AppComponent = [i0.styles];
var RenderType_AppComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_AppComponent, data: {} });
exports.RenderType_AppComponent = RenderType_AppComponent;
function View_AppComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), i1.ɵdid(1, 212992, null, 0, i2.RouterOutlet, [i2.ChildrenOutletContexts, i1.ViewContainerRef, i1.ComponentFactoryResolver, [8, null], i1.ChangeDetectorRef], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_AppComponent_0 = View_AppComponent_0;
function View_AppComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), i1.ɵdid(1, 12697600, null, 0, i3.AppComponent, [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;
var AppComponentNgFactory = i1.ɵccf("app-root", i3.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var io = __webpack_require__(/*! socket.io-client */ "socket.io-client");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
        this.BASE_URL = 'http://localhost:4000/';
        this.socket = { id: '' };
    }
    AppComponent.prototype.fnTest = function () {
        this.socket = io(this.BASE_URL);
        this.socket.on('connect', function () {
            console.log('working');
        });
        this.socket.on('test1', function (test) {
            console.log('working=-', test);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        /* this.socket.on('connect', function () {
           console.log('working');
         });*/
    };
    AppComponent.prototype.ngAfterViewChecked = function () {
        /* console.log('working==');
         */
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ID = 'my-app';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/app.server.module.ngfactory.js":
/*!************************************************!*\
  !*** ./src/app/app.server.module.ngfactory.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i1 = __webpack_require__(/*! ./app.server.module */ "./src/app/app.server.module.ts");
var i2 = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var i3 = __webpack_require__(/*! ./components/signup/signup.component.ngfactory */ "./src/app/components/signup/signup.component.ngfactory.js");
var i4 = __webpack_require__(/*! ./components/login/login.component.ngfactory */ "./src/app/components/login/login.component.ngfactory.js");
var i5 = __webpack_require__(/*! ./components/main/main.component.ngfactory */ "./src/app/components/main/main.component.ngfactory.js");
var i6 = __webpack_require__(/*! ./components/dashboard/dashboard.component.ngfactory */ "./src/app/components/dashboard/dashboard.component.ngfactory.js");
var i7 = __webpack_require__(/*! ./app.component.ngfactory */ "./src/app/app.component.ngfactory.js");
var i8 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i9 = __webpack_require__(/*! @angular/platform-browser */ "@angular/platform-browser");
var i10 = __webpack_require__(/*! @angular/platform-server */ "@angular/platform-server");
var i11 = __webpack_require__(/*! @angular/animations/browser */ "@angular/animations/browser");
var i12 = __webpack_require__(/*! @angular/platform-browser/animations */ "@angular/platform-browser/animations");
var i13 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
var i14 = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
var i15 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i16 = __webpack_require__(/*! ng-emoji-picker/src/emoji.service */ "ng-emoji-picker/src/emoji.service");
var i17 = __webpack_require__(/*! ./common/services/token/token.service */ "./src/app/common/services/token/token.service.ts");
var i18 = __webpack_require__(/*! ./common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i19 = __webpack_require__(/*! ./common/guard/auth_guard/auth-guard.service */ "./src/app/common/guard/auth_guard/auth-guard.service.ts");
var i20 = __webpack_require__(/*! ./common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i21 = __webpack_require__(/*! @angular/http */ "@angular/http");
var i22 = __webpack_require__(/*! @angular/animations */ "@angular/animations");
var i23 = __webpack_require__(/*! @nguniversal/module-map-ngfactory-loader */ "@nguniversal/module-map-ngfactory-loader");
var i24 = __webpack_require__(/*! ./components/signup/signup.component */ "./src/app/components/signup/signup.component.ts");
var i25 = __webpack_require__(/*! ./common/guard/unauth_guard/un-auth-guard.service */ "./src/app/common/guard/unauth_guard/un-auth-guard.service.ts");
var i26 = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
var i27 = __webpack_require__(/*! ./components/main/main.component */ "./src/app/components/main/main.component.ts");
var i28 = __webpack_require__(/*! ./components/dashboard/dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
var i29 = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
var i30 = __webpack_require__(/*! ng-emoji-picker/emoji-picker.module */ "ng-emoji-picker/emoji-picker.module");
var i31 = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
var AppServerModuleNgFactory = i0.ɵcmf(i1.AppServerModule, [i2.AppComponent], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i3.SignupComponentNgFactory, i4.LoginComponentNgFactory, i5.MainComponentNgFactory, i6.DashboardComponentNgFactory, i7.AppComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵangular_packages_core_core_l, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i8.NgLocalization, i8.NgLocaleLocalization, [i0.LOCALE_ID, [2, i8.ɵangular_packages_common_common_a]]), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵangular_packages_core_core_j, []), i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵangular_packages_core_core_k, []), i0.ɵmpd(4608, i9.DomSanitizer, i9.ɵangular_packages_platform_browser_platform_browser_e, [i8.DOCUMENT]), i0.ɵmpd(6144, i0.Sanitizer, null, [i9.DomSanitizer]), i0.ɵmpd(4608, i9.HAMMER_GESTURE_CONFIG, i9.HammerGestureConfig, []), i0.ɵmpd(5120, i9.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1, p2_2) { return [new i9.ɵDomEventsPlugin(p0_0, p0_1), new i9.ɵKeyEventsPlugin(p1_0), new i9.ɵHammerGesturesPlugin(p2_0, p2_1, p2_2)]; }, [i8.DOCUMENT, i0.NgZone, i8.DOCUMENT, i8.DOCUMENT, i9.HAMMER_GESTURE_CONFIG, i0.ɵConsole]), i0.ɵmpd(4608, i9.EventManager, i9.EventManager, [i9.EVENT_MANAGER_PLUGINS, i0.NgZone]), i0.ɵmpd(135680, i9.ɵDomSharedStylesHost, i9.ɵDomSharedStylesHost, [i8.DOCUMENT]), i0.ɵmpd(4608, i9.ɵDomRendererFactory2, i9.ɵDomRendererFactory2, [i9.EventManager, i9.ɵDomSharedStylesHost]), i0.ɵmpd(4608, i10.ɵangular_packages_platform_server_platform_server_c, i10.ɵangular_packages_platform_server_platform_server_c, [i9.DOCUMENT, [2, i9.ɵTRANSITION_ID]]), i0.ɵmpd(6144, i9.ɵSharedStylesHost, null, [i10.ɵangular_packages_platform_server_platform_server_c]), i0.ɵmpd(4608, i10.ɵServerRendererFactory2, i10.ɵServerRendererFactory2, [i0.NgZone, i9.DOCUMENT, i9.ɵSharedStylesHost]), i0.ɵmpd(4608, i11.AnimationDriver, i11.ɵNoopAnimationDriver, []), i0.ɵmpd(5120, i11.ɵAnimationStyleNormalizer, i12.ɵangular_packages_platform_browser_animations_animations_c, []), i0.ɵmpd(4608, i11.ɵAnimationEngine, i12.ɵangular_packages_platform_browser_animations_animations_a, [i11.AnimationDriver, i11.ɵAnimationStyleNormalizer]), i0.ɵmpd(5120, i0.RendererFactory2, i10.ɵangular_packages_platform_server_platform_server_a, [i10.ɵServerRendererFactory2, i11.ɵAnimationEngine, i0.NgZone]), i0.ɵmpd(4352, i0.Testability, null, []), i0.ɵmpd(4608, i9.Meta, i9.Meta, [i8.DOCUMENT]), i0.ɵmpd(4608, i9.Title, i9.Title, [i8.DOCUMENT]), i0.ɵmpd(4608, i13.ɵangular_packages_forms_forms_i, i13.ɵangular_packages_forms_forms_i, []), i0.ɵmpd(4608, i14.HttpXsrfTokenExtractor, i14.ɵangular_packages_common_http_http_h, [i8.DOCUMENT, i0.PLATFORM_ID, i14.ɵangular_packages_common_http_http_f]), i0.ɵmpd(4608, i14.ɵangular_packages_common_http_http_i, i14.ɵangular_packages_common_http_http_i, [i14.HttpXsrfTokenExtractor, i14.ɵangular_packages_common_http_http_g]), i0.ɵmpd(5120, i14.HTTP_INTERCEPTORS, function (p0_0) { return [p0_0]; }, [i14.ɵangular_packages_common_http_http_i]), i0.ɵmpd(4608, i14.XhrFactory, i10.ɵangular_packages_platform_server_platform_server_d, []), i0.ɵmpd(4608, i14.HttpXhrBackend, i14.HttpXhrBackend, [i14.XhrFactory]), i0.ɵmpd(6144, i14.HttpBackend, null, [i14.HttpXhrBackend]), i0.ɵmpd(5120, i14.HttpHandler, i10.ɵangular_packages_platform_server_platform_server_g, [i14.HttpBackend, [2, i14.HTTP_INTERCEPTORS]]), i0.ɵmpd(4608, i14.HttpClient, i14.HttpClient, [i14.HttpHandler]), i0.ɵmpd(4608, i14.ɵangular_packages_common_http_http_e, i14.ɵangular_packages_common_http_http_e, []), i0.ɵmpd(5120, i15.ActivatedRoute, i15.ɵangular_packages_router_router_f, [i15.Router]), i0.ɵmpd(4608, i15.NoPreloading, i15.NoPreloading, []), i0.ɵmpd(6144, i15.PreloadingStrategy, null, [i15.NoPreloading]), i0.ɵmpd(135680, i15.RouterPreloader, i15.RouterPreloader, [i15.Router, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector, i15.PreloadingStrategy]), i0.ɵmpd(4608, i15.PreloadAllModules, i15.PreloadAllModules, []), i0.ɵmpd(5120, i15.ROUTER_INITIALIZER, i15.ɵangular_packages_router_router_i, [i15.ɵangular_packages_router_router_g]), i0.ɵmpd(5120, i0.APP_BOOTSTRAP_LISTENER, function (p0_0) { return [p0_0]; }, [i15.ROUTER_INITIALIZER]), i0.ɵmpd(4608, i16.EmojiService, i16.EmojiService, []), i0.ɵmpd(4608, i17.TokenService, i17.TokenService, [i0.PLATFORM_ID]), i0.ɵmpd(4608, i18.AuthService, i18.AuthService, [i0.PLATFORM_ID, i14.HttpClient, i17.TokenService, i15.Router]), i0.ɵmpd(4608, i19.AuthGuardService, i19.AuthGuardService, [i18.AuthService, i15.Router]), i0.ɵmpd(4608, i20.SocketService, i20.SocketService, []), i0.ɵmpd(4608, i21.BrowserXhr, i10.ɵangular_packages_platform_server_platform_server_d, []), i0.ɵmpd(4608, i21.ResponseOptions, i21.BaseResponseOptions, []), i0.ɵmpd(4608, i21.XSRFStrategy, i10.ɵangular_packages_platform_server_platform_server_e, []), i0.ɵmpd(4608, i21.XHRBackend, i21.XHRBackend, [i21.BrowserXhr, i21.ResponseOptions, i21.XSRFStrategy]), i0.ɵmpd(4608, i21.RequestOptions, i21.BaseRequestOptions, []), i0.ɵmpd(5120, i21.Http, i10.ɵangular_packages_platform_server_platform_server_f, [i21.XHRBackend, i21.RequestOptions]), i0.ɵmpd(4608, i22.AnimationBuilder, i12.ɵBrowserAnimationBuilder, [i0.RendererFactory2, i9.DOCUMENT]), i0.ɵmpd(1073742336, i8.CommonModule, i8.CommonModule, []), i0.ɵmpd(1024, i0.ErrorHandler, i9.ɵangular_packages_platform_browser_platform_browser_a, []), i0.ɵmpd(1024, i0.NgProbeToken, function () { return [i15.ɵangular_packages_router_router_b()]; }, []), i0.ɵmpd(512, i15.ɵangular_packages_router_router_g, i15.ɵangular_packages_router_router_g, [i0.Injector]), i0.ɵmpd(256, i0.APP_ID, "my-app", []), i0.ɵmpd(2048, i9.ɵTRANSITION_ID, null, [i0.APP_ID]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0, p1_0, p2_0, p2_1, p2_2) { return [i9.ɵangular_packages_platform_browser_platform_browser_h(p0_0), i15.ɵangular_packages_router_router_h(p1_0), i9.ɵangular_packages_platform_browser_platform_browser_f(p2_0, p2_1, p2_2)]; }, [[2, i0.NgProbeToken], i15.ɵangular_packages_router_router_g, i9.ɵTRANSITION_ID, i8.DOCUMENT, i0.Injector]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef, [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]), i0.ɵmpd(1073742336, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(1073742336, i9.BrowserModule, i9.BrowserModule, [[3, i9.BrowserModule]]), i0.ɵmpd(1073742336, i13.ɵangular_packages_forms_forms_bb, i13.ɵangular_packages_forms_forms_bb, []), i0.ɵmpd(1073742336, i13.FormsModule, i13.FormsModule, []), i0.ɵmpd(1073742336, i14.HttpClientXsrfModule, i14.HttpClientXsrfModule, []), i0.ɵmpd(1073742336, i14.HttpClientModule, i14.HttpClientModule, []), i0.ɵmpd(1024, i15.ɵangular_packages_router_router_a, i15.ɵangular_packages_router_router_d, [[3, i15.Router]]), i0.ɵmpd(512, i15.UrlSerializer, i15.DefaultUrlSerializer, []), i0.ɵmpd(512, i15.ChildrenOutletContexts, i15.ChildrenOutletContexts, []), i0.ɵmpd(256, i15.ROUTER_CONFIGURATION, {}, []), i0.ɵmpd(1024, i8.LocationStrategy, i15.ɵangular_packages_router_router_c, [i8.PlatformLocation, [2, i8.APP_BASE_HREF], i15.ROUTER_CONFIGURATION]), i0.ɵmpd(512, i8.Location, i8.Location, [i8.LocationStrategy]), i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i0.NgModuleFactoryLoader, i23.ModuleMapNgFactoryLoader, [i0.Compiler, i23.MODULE_MAP]), i0.ɵmpd(1024, i15.ROUTES, function () { return [[{ path: "signup", component: i24.SignupComponent, canActivate: [i25.UnAuthGuardService] }, { path: "signin", component: i26.LoginComponent, canActivate: [i25.UnAuthGuardService] }, { path: "", component: i27.MainComponent, canActivate: [i19.AuthGuardService], children: [{ path: "", redirectTo: "/dashboard", pathMatch: "full" }, { path: "dashboard", component: i28.DashboardComponent }] }]]; }, []), i0.ɵmpd(1024, i15.Router, i15.ɵangular_packages_router_router_e, [i0.ApplicationRef, i15.UrlSerializer, i15.ChildrenOutletContexts, i8.Location, i0.Injector, i0.NgModuleFactoryLoader, i0.Compiler, i15.ROUTES, i15.ROUTER_CONFIGURATION, [2, i15.UrlHandlingStrategy], [2, i15.RouteReuseStrategy]]), i0.ɵmpd(1073742336, i15.RouterModule, i15.RouterModule, [[2, i15.ɵangular_packages_router_router_a], [2, i15.Router]]), i0.ɵmpd(1073742336, i29.AppRoutingModule, i29.AppRoutingModule, []), i0.ɵmpd(1073742336, i30.EmojiPickerModule, i30.EmojiPickerModule, []), i0.ɵmpd(1073742336, i31.AppModule, i31.AppModule, []), i0.ɵmpd(1073742336, i21.HttpModule, i21.HttpModule, []), i0.ɵmpd(1073742336, i12.NoopAnimationsModule, i12.NoopAnimationsModule, []), i0.ɵmpd(1073742336, i10.ServerModule, i10.ServerModule, []), i0.ɵmpd(1073742336, i23.ModuleMapLoaderModule, i23.ModuleMapLoaderModule, []), i0.ɵmpd(1073742336, i1.AppServerModule, i1.AppServerModule, []), i0.ɵmpd(256, i0.ɵAPP_ROOT, true, []), i0.ɵmpd(256, i14.ɵangular_packages_common_http_http_f, "XSRF-TOKEN", []), i0.ɵmpd(256, i14.ɵangular_packages_common_http_http_g, "X-XSRF-TOKEN", []), i0.ɵmpd(256, i12.ANIMATION_MODULE_TYPE, "NoopAnimations", [])]); });
exports.AppServerModuleNgFactory = AppServerModuleNgFactory;


/***/ }),

/***/ "./src/app/app.server.module.ts":
/*!**************************************!*\
  !*** ./src/app/app.server.module.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppServerModule = /** @class */ (function () {
    function AppServerModule() {
    }
    return AppServerModule;
}());
exports.AppServerModule = AppServerModule;


/***/ }),

/***/ "./src/app/common/components/navbar/navbar.component.css.shim.ngstyle.js":
/*!*******************************************************************************!*\
  !*** ./src/app/common/components/navbar/navbar.component.css.shim.ngstyle.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = [""];
exports.styles = styles;


/***/ }),

/***/ "./src/app/common/components/navbar/navbar.component.ngfactory.js":
/*!************************************************************************!*\
  !*** ./src/app/common/components/navbar/navbar.component.ngfactory.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./navbar.component.css.shim.ngstyle */ "./src/app/common/components/navbar/navbar.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! ./navbar.component */ "./src/app/common/components/navbar/navbar.component.ts");
var i3 = __webpack_require__(/*! ../../services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i4 = __webpack_require__(/*! ../../services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i5 = __webpack_require__(/*! @angular/router */ "@angular/router");
var styles_NavbarComponent = [i0.styles];
var RenderType_NavbarComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_NavbarComponent, data: {} });
exports.RenderType_NavbarComponent = RenderType_NavbarComponent;
function View_NavbarComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 11, "nav", [["class", "navbar navbar-expand-lg navbar-dark bg-dark"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 1, "a", [["class", "navbar-brand"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["ChatApp"])), (_l()(), i1.ɵeld(3, 0, null, null, 1, "button", [["aria-controls", "navbarSupportedContent"], ["aria-expanded", "false"], ["aria-label", "Toggle navigation"], ["class", "navbar-toggler"], ["data-target", "#navbarSupportedContent"], ["data-toggle", "collapse"], ["type", "button"]], null, null, null, null, null)), (_l()(), i1.ɵeld(4, 0, null, null, 0, "span", [["class", "navbar-toggler-icon"]], null, null, null, null, null)), (_l()(), i1.ɵeld(5, 0, null, null, 6, "div", [["class", "collapse navbar-collapse"], ["id", "navbarSupportedContent"]], null, null, null, null, null)), (_l()(), i1.ɵeld(6, 0, null, null, 3, "ul", [["class", "navbar-nav mr-auto"]], null, null, null, null, null)), (_l()(), i1.ɵeld(7, 0, null, null, 2, "li", [["class", "nav-item active"]], null, null, null, null, null)), (_l()(), i1.ɵeld(8, 0, null, null, 1, "a", [["class", "nav-link"]], null, null, null, null, null)), (_l()(), i1.ɵted(9, null, ["", ""])), (_l()(), i1.ɵeld(10, 0, null, null, 1, "button", [["class", "btn btn-outline-danger my-2 my-sm-0"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnLogout() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Logout"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.authUser.username; _ck(_v, 9, 0, currVal_0); }); }
exports.View_NavbarComponent_0 = View_NavbarComponent_0;
function View_NavbarComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-navar", [], null, null, null, View_NavbarComponent_0, RenderType_NavbarComponent)), i1.ɵdid(1, 114688, null, 0, i2.NavbarComponent, [i1.PLATFORM_ID, i3.AuthService, i4.SocketService, i5.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_NavbarComponent_Host_0 = View_NavbarComponent_Host_0;
var NavbarComponentNgFactory = i1.ɵccf("app-navar", i2.NavbarComponent, View_NavbarComponent_Host_0, {}, {}, []);
exports.NavbarComponentNgFactory = NavbarComponentNgFactory;


/***/ }),

/***/ "./src/app/common/components/navbar/navbar.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/common/components/navbar/navbar.component.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var constant_1 = __webpack_require__(/*! ../../constant */ "./src/app/common/constant.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var auth_service_1 = __webpack_require__(/*! ../../services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var common_1 = __webpack_require__(/*! @angular/common */ "@angular/common");
var socket_service_1 = __webpack_require__(/*! ../../services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(platformId, authService, socketService, _router) {
        this.platformId = platformId;
        this.authService = authService;
        this.socketService = socketService;
        this._router = _router;
        this.authUser = authService.getAuthUser();
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.fnLogout = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(constant_1.Constant.TOKEN_NAME);
            this.socketService.logout({ userId: this.authUser.id })
                .subscribe(function (response) {
                _this._router.navigate(['signin']);
            });
        }
    };
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;


/***/ }),

/***/ "./src/app/common/constant.ts":
/*!************************************!*\
  !*** ./src/app/common/constant.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Constant = /** @class */ (function () {
    function Constant() {
    }
    Constant.TOKEN_NAME = 'AUTH_TOKEN';
    Constant.API_URL = 'http://192.168.0.218:4000/';
    Constant.SOCKET_URL = 'http://192.168.0.218:4000/';
    Constant.EMAIL_REG_EX = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    Constant.PASSWORD_REG_EX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z!@#$%^&*?.+-\\d]{8,}$');
    return Constant;
}());
exports.Constant = Constant;


/***/ }),

/***/ "./src/app/common/guard/auth_guard/auth-guard.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/common/guard/auth_guard/auth-guard.service.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = __webpack_require__(/*! ../../services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i1 = __webpack_require__(/*! ../../services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i2 = __webpack_require__(/*! @angular/router */ "@angular/router");
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, _router) {
        this.authService = authService;
        this._router = _router;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (!this.authService.isAuthenticated()) {
            this._router.navigate(['signin']);
            return false;
        }
        return true;
    };
    AuthGuardService.ngInjectableDef = i0.defineInjectable({ factory: function AuthGuardService_Factory() { return new AuthGuardService(i0.inject(i1.AuthService), i0.inject(i2.Router)); }, token: AuthGuardService, providedIn: "root" });
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;


/***/ }),

/***/ "./src/app/common/guard/unauth_guard/un-auth-guard.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/common/guard/unauth_guard/un-auth-guard.service.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = __webpack_require__(/*! ../../services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i1 = __webpack_require__(/*! ../../services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i2 = __webpack_require__(/*! @angular/router */ "@angular/router");
var UnAuthGuardService = /** @class */ (function () {
    function UnAuthGuardService(authService, _router) {
        this.authService = authService;
        this._router = _router;
    }
    UnAuthGuardService.prototype.canActivate = function () {
        if (this.authService.isAuthenticated()) {
            this._router.navigate(['dashboard']);
            return false;
        }
        return true;
    };
    UnAuthGuardService.ngInjectableDef = i0.defineInjectable({ factory: function UnAuthGuardService_Factory() { return new UnAuthGuardService(i0.inject(i1.AuthService), i0.inject(i2.Router)); }, token: UnAuthGuardService, providedIn: "root" });
    return UnAuthGuardService;
}());
exports.UnAuthGuardService = UnAuthGuardService;


/***/ }),

/***/ "./src/app/common/pipes/order-by.pipe.ts":
/*!***********************************************!*\
  !*** ./src/app/common/pipes/order-by.pipe.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var _ = __webpack_require__(/*! lodash */ "lodash");
var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, args) {
        var args0 = _.split(args[0], ',');
        var args1 = _.split(args[1], ',');
        return _.orderBy(array, args0, args1 ? args1 : ['asc']);
    };
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;


/***/ }),

/***/ "./src/app/common/services/auth/auth.service.ts":
/*!******************************************************!*\
  !*** ./src/app/common/services/auth/auth.service.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = __webpack_require__(/*! ../../constant */ "./src/app/common/constant.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
var token_service_1 = __webpack_require__(/*! ../token/token.service */ "./src/app/common/services/token/token.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var common_1 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i1 = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
var i2 = __webpack_require__(/*! ../token/token.service */ "./src/app/common/services/token/token.service.ts");
var i3 = __webpack_require__(/*! @angular/router */ "@angular/router");
var AuthService = /** @class */ (function () {
    function AuthService(platformId, _http, jwtHelper, _router) {
        this.platformId = platformId;
        this._http = _http;
        this.jwtHelper = jwtHelper;
        this._router = _router;
    }
    AuthService.prototype.isAuthenticated = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            var token = localStorage.getItem(constant_1.Constant.TOKEN_NAME);
            // Check whether the token is expired and return
            // true or false
            return !this.jwtHelper.isTokenExpired(token);
        }
    };
    AuthService.prototype.getAuthUser = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            var token = localStorage.getItem(constant_1.Constant.TOKEN_NAME);
            if (token) {
                var tokenInfo = this.jwtHelper.parseJwt(token);
                return tokenInfo.data;
            }
            else {
                this._router.navigate(['signin']);
            }
        }
    };
    AuthService.prototype.signUp = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._http
                .post(constant_1.Constant.API_URL + 'register', params)
                .subscribe(function (response) {
                if (response && response.token) {
                    if (common_1.isPlatformBrowser(_this.platformId)) {
                        localStorage.setItem(constant_1.Constant.TOKEN_NAME, response.token);
                        console.log(_this.jwtHelper.parseJwt(response.token));
                    }
                }
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.login = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._http
                .post(constant_1.Constant.API_URL + 'login', params)
                .subscribe(function (response) {
                if (response && response.token) {
                    if (common_1.isPlatformBrowser(_this.platformId)) {
                        localStorage.setItem(constant_1.Constant.TOKEN_NAME, response.token);
                        console.log(_this.jwtHelper.parseJwt(response.token));
                    }
                }
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthService.ngInjectableDef = i0.defineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.inject(i0.PLATFORM_ID), i0.inject(i1.HttpClient), i0.inject(i2.TokenService), i0.inject(i3.Router)); }, token: AuthService, providedIn: "root" });
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/common/services/chat-service/chat.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/common/services/chat-service/chat.service.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = __webpack_require__(/*! ../../constant */ "./src/app/common/constant.ts");
var http_1 = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i1 = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
var ChatService = /** @class */ (function () {
    function ChatService(_http) {
        this._http = _http;
    }
    ChatService.prototype.getMessages = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._http
                .post(constant_1.Constant.API_URL + 'getMessages', params)
                .subscribe(function (response) {
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    };
    ChatService.ngInjectableDef = i0.defineInjectable({ factory: function ChatService_Factory() { return new ChatService(i0.inject(i1.HttpClient)); }, token: ChatService, providedIn: "root" });
    return ChatService;
}());
exports.ChatService = ChatService;


/***/ }),

/***/ "./src/app/common/services/emitter/emitter.service.ts":
/*!************************************************************!*\
  !*** ./src/app/common/services/emitter/emitter.service.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var EmitterService = /** @class */ (function () {
    function EmitterService() {
    }
    EmitterService.get = function (ID) {
        if (!this._emitters[ID]) {
            this._emitters[ID] = new core_1.EventEmitter();
        }
        return this._emitters[ID];
    };
    EmitterService._emitters = {};
    EmitterService.ngInjectableDef = i0.defineInjectable({ factory: function EmitterService_Factory() { return new EmitterService(); }, token: EmitterService, providedIn: "root" });
    return EmitterService;
}());
exports.EmitterService = EmitterService;


/***/ }),

/***/ "./src/app/common/services/socket/socket.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/common/services/socket/socket.service.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = __webpack_require__(/*! ../../constant */ "./src/app/common/constant.ts");
var io = __webpack_require__(/*! socket.io-client */ "socket.io-client");
var rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var SocketService = /** @class */ (function () {
    function SocketService() {
        this.BASE_URL = constant_1.Constant.SOCKET_URL;
    }
    /*
      * Method to connect the users to socket
      */
    SocketService.prototype.connectSocket = function (userId) {
        this.socket = io(this.BASE_URL, { query: "userId=" + userId });
        return this.socket;
    };
    /*
     * Method to emit the logout event.
     */
    SocketService.prototype.logout = function (userId) {
        var _this = this;
        this.socket.emit('logout', userId);
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('logout-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    /*
     * Method to receive chat-list-response event.
     */
    SocketService.prototype.getChatList = function (userId) {
        var _this = this;
        if (userId === void 0) { userId = null; }
        if (userId !== null) {
            this.socket.emit('chat-list', { userId: userId });
        }
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('chat-list-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    /*
   * Method to receive chat-list-response event.
   */
    SocketService.prototype.broadcastMsg = function (msg) {
        if (msg !== null) {
            this.socket.emit('message-broadcast', { msg: msg });
        }
    };
    /*
      * Method to receive broadcast-response event.
      */
    SocketService.prototype.receiveBroadcast = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('message-broadcast-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    /*
     * Method to emit the add-messages event.
     */
    SocketService.prototype.startTyping = function (message) {
        this.socket.emit('start-typing', message);
    };
    /*
      * Method to emit the add-messages event.
      */
    SocketService.prototype.sendMessage = function (message) {
        this.socket.emit('add-message', message);
    };
    /*
      * Method to receive add-message-response event.
      */
    SocketService.prototype.receiveMessages = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('add-message-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.receiveTypes = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('typing-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.drawLine = function (data) {
        this.socket.emit('drawing', data);
    };
    SocketService.prototype.receiveDrawingData = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('new-drawing', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.clearWhiteBoardCanvas = function (data) {
        this.socket.emit('clear-whiteboard', data);
    };
    SocketService.prototype.clearWhiteBoardCanvasResponse = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('clear-whiteboard-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.videoChat = function (data) {
        this.socket.emit('start-video-chat', data);
    };
    /*
     * Method to receive broadcast-response event.
     */
    SocketService.prototype.receiveVideoChatRespone = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('video-chat-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.startOffer = function (data) {
        this.socket.emit('offer', data);
    };
    SocketService.prototype.startAnswer = function (data) {
        this.socket.emit('answer', data);
    };
    SocketService.prototype.startCandidate = function (data) {
        this.socket.emit('candidate', data);
    };
    SocketService.prototype.hangUp = function (data) {
        this.socket.emit('hang-up', data);
    };
    /*
     * Method to receive broadcast-response event.
     */
    SocketService.prototype.receiveOfferResponse = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('offer-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.receiveAnswerResponse = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('answer-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.receiveCandidateResponse = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('candidate-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.prototype.receiveHangupResponse = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.socket.on('hang-up-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
    };
    SocketService.ngInjectableDef = i0.defineInjectable({ factory: function SocketService_Factory() { return new SocketService(); }, token: SocketService, providedIn: "root" });
    return SocketService;
}());
exports.SocketService = SocketService;


/***/ }),

/***/ "./src/app/common/services/token/token.service.ts":
/*!********************************************************!*\
  !*** ./src/app/common/services/token/token.service.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = __webpack_require__(/*! ../../constant */ "./src/app/common/constant.ts");
var jwt_decode = __webpack_require__(/*! jwt-decode */ "jwt-decode");
var common_1 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i0 = __webpack_require__(/*! @angular/core */ "@angular/core");
var TokenService = /** @class */ (function () {
    function TokenService(platformId) {
        this.platformId = platformId;
    }
    TokenService.prototype.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
    TokenService.prototype.getToken = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(constant_1.Constant.API_URL);
        }
    };
    TokenService.prototype.getTokenExpirationDate = function (token) {
        var decoded = jwt_decode(token);
        if (decoded.exp === undefined) {
            return null;
        }
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    TokenService.prototype.isTokenExpired = function (token) {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }
        var date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    };
    TokenService.ngInjectableDef = i0.defineInjectable({ factory: function TokenService_Factory() { return new TokenService(i0.inject(i0.PLATFORM_ID)); }, token: TokenService, providedIn: "root" });
    return TokenService;
}());
exports.TokenService = TokenService;


/***/ }),

/***/ "./src/app/components/chat-list/chat-list.component.css.shim.ngstyle.js":
/*!******************************************************************************!*\
  !*** ./src/app/components/chat-list/chat-list.component.css.shim.ngstyle.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = [""];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/chat-list/chat-list.component.ngfactory.js":
/*!***********************************************************************!*\
  !*** ./src/app/components/chat-list/chat-list.component.ngfactory.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./chat-list.component.css.shim.ngstyle */ "./src/app/components/chat-list/chat-list.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i3 = __webpack_require__(/*! ../../common/pipes/order-by.pipe */ "./src/app/common/pipes/order-by.pipe.ts");
var i4 = __webpack_require__(/*! ./chat-list.component */ "./src/app/components/chat-list/chat-list.component.ts");
var i5 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i6 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i7 = __webpack_require__(/*! ../../common/services/chat-service/chat.service */ "./src/app/common/services/chat-service/chat.service.ts");
var styles_ChatListComponent = [i0.styles];
var RenderType_ChatListComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_ChatListComponent, data: {} });
exports.RenderType_ChatListComponent = RenderType_ChatListComponent;
function View_ChatListComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "li", [["class", "list-group-item list-group-item-action c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.selectedUser(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i1.ɵdid(1, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), (_l()(), i1.ɵeld(2, 0, null, null, 1, "i", [["class", "fa fa-circle mr-2"]], null, null, null, null, null)), i1.ɵdid(3, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), (_l()(), i1.ɵted(4, null, ["", " "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "list-group-item list-group-item-action c-pointer"; var currVal_1 = ((_co.selectedUserId === _v.context.$implicit.id) ? "bg-dark text-white" : ""); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = "fa fa-circle mr-2"; var currVal_3 = ((_v.context.$implicit.online === "Y") ? "text-success" : "text-danger"); _ck(_v, 3, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_4 = _v.context.$implicit.username; _ck(_v, 4, 0, currVal_4); }); }
function View_ChatListComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "ul", [["class", "list-group"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 3, null, View_ChatListComponent_2)), i1.ɵdid(2, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), i1.ɵpad(3, 2), i1.ɵppd(4, 2)], function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵunv(_v, 2, 0, _ck(_v, 4, 0, i1.ɵnov(_v.parent, 0), _co.chatListUsers, _ck(_v, 3, 0, "username", "asc"))); _ck(_v, 2, 0, currVal_0); }, null); }
function View_ChatListComponent_0(_l) { return i1.ɵvid(0, [i1.ɵpid(0, i3.OrderByPipe, []), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ChatListComponent_1)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.chatListUsers.length; _ck(_v, 2, 0, currVal_0); }, null); }
exports.View_ChatListComponent_0 = View_ChatListComponent_0;
function View_ChatListComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-chat-list", [], null, null, null, View_ChatListComponent_0, RenderType_ChatListComponent)), i1.ɵdid(1, 114688, null, 0, i4.ChatListComponent, [i5.AuthService, i6.SocketService, i7.ChatService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_ChatListComponent_Host_0 = View_ChatListComponent_Host_0;
var ChatListComponentNgFactory = i1.ɵccf("app-chat-list", i4.ChatListComponent, View_ChatListComponent_Host_0, { conversation: "conversation", selectedUserInfo: "selectedUserInfo" }, {}, []);
exports.ChatListComponentNgFactory = ChatListComponentNgFactory;


/***/ }),

/***/ "./src/app/components/chat-list/chat-list.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/chat-list/chat-list.component.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var socket_service_1 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var emitter_service_1 = __webpack_require__(/*! ../../common/services/emitter/emitter.service */ "./src/app/common/services/emitter/emitter.service.ts");
var chat_service_1 = __webpack_require__(/*! ../../common/services/chat-service/chat.service */ "./src/app/common/services/chat-service/chat.service.ts");
var ChatListComponent = /** @class */ (function () {
    function ChatListComponent(authService, socketService, chatService) {
        this.authService = authService;
        this.socketService = socketService;
        this.chatService = chatService;
        this.userId = null;
        this.chatListUsers = [];
    }
    ChatListComponent.prototype.ngOnInit = function () {
    };
    ChatListComponent.prototype.getChatList = function (socketIOResponse, userId) {
        this.userId = userId;
        if (!socketIOResponse.error) {
            if (socketIOResponse.singleUser) {
                if (this.chatListUsers.length > 0) {
                    this.chatListUsers = this.chatListUsers.filter(function (obj) {
                        return obj.id !== socketIOResponse.chatList[0].id;
                    });
                }
                /* Adding new online user into chat list array */
                this.chatListUsers = this.chatListUsers.concat(socketIOResponse.chatList);
            }
            else if (socketIOResponse.userDisconnected) {
                var loggedOutUser = this.chatListUsers.findIndex(function (obj) { return obj.id === socketIOResponse.userid; });
                if (loggedOutUser >= 0) {
                    this.chatListUsers[loggedOutUser].online = 'N';
                }
            }
            else {
                /* Updating entire chatlist if user logs in. */
                this.chatListUsers = socketIOResponse.chatList;
            }
        }
        else {
            alert("Unable to load Chat list, Redirecting to Login.");
            /* this.chatService.removeLS()
               .then((removedLs: boolean) => {
                 this.router.navigate(['/']);
               })
               .catch((error: Error) => {
                 alert(' This App is Broken, we are working on it. try after some time.');
                 throw error;
               });*/
        }
    };
    ChatListComponent.prototype.selectedUser = function (user) {
        var _this = this;
        this.selectedUserId = user.id;
        /* Sending selected users information to other component. */
        emitter_service_1.EmitterService.get(this.selectedUserInfo).emit(user);
        /* calling method to get the messages */
        this.chatService.getMessages({ userId: this.userId, toUserId: user.id }).then(function (response) {
            /* Sending conversation between two users to other component. */
            emitter_service_1.EmitterService.get(_this.conversation).emit(response);
        });
    };
    return ChatListComponent;
}());
exports.ChatListComponent = ChatListComponent;


/***/ }),

/***/ "./src/app/components/conversation/conversation.component.css.shim.ngstyle.js":
/*!************************************************************************************!*\
  !*** ./src/app/components/conversation/conversation.component.css.shim.ngstyle.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = ["@import url(https://fonts.googleapis.com/css?family=Lato:400,700);\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after {\n  box-sizing: border-box;\n}\nbody[_ngcontent-%COMP%] {\n  background: #c5ddeb;\n  font: 14px/20px \"Lato\", Arial, sans-serif;\n  padding: 40px 0;\n  color: white;\n}\n.container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  background: #444753;\n  border-radius: 5px;\n}\n.people-list[_ngcontent-%COMP%] {\n  \n}\n.people-list[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.people-list[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border-radius: 3px;\n  border: none;\n  padding: 14px;\n  color: white;\n  background: #6a6c75;\n  width: 95%;\n  font-size: 14px;\n}\n.people-list[_ngcontent-%COMP%]   .fa-search[_ngcontent-%COMP%] {\n  position: relative;\n  left: -25px;\n}\n.people-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding: 20px;\n  height: 80%;\n  overflow: auto;\n}\n.people-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n  list-style: none;\n}\n.people-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n}\n.people-list[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  float: left;\n  margin-top: 8px;\n}\n.people-list[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  padding-left: 8px;\n}\n.people-list[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  color: #92959e;\n}\n.chat[_ngcontent-%COMP%] {\n  float: left;\n  background: #f2f5f8;\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  color: #434651;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 2px solid white;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 10px;\n  margin-top: 6px;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-with[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 16px;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-num-messages[_ngcontent-%COMP%] {\n  color: #92959e;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%] {\n  padding: 10px 10px 5px;\n  border-bottom: 2px solid white;\n  overflow-y: scroll;\n  height: 60%;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data-time[_ngcontent-%COMP%] {\n  color: #a8aab1;\n  padding-left: 6px;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  color: white;\n  padding: 8px 10px;\n  line-height: 26px;\n  font-size: 16px;\n  border-radius: 7px;\n  margin-bottom: 20px;\n  width: 90%;\n  position: relative;\n  word-break: break-all;\n  white-space: pre-line;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]:after {\n  bottom: 100%;\n  left: 7%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-bottom-color: #86bb71;\n  border-width: 10px;\n  margin-left: -10px;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .my-message[_ngcontent-%COMP%] {\n  background: #86bb71;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .other-message[_ngcontent-%COMP%] {\n  background: #94c2ed;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .other-message[_ngcontent-%COMP%]:after {\n  border-bottom-color: #94c2ed;\n  left: 93%;\n}\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%] {\n  padding: 10px;\n  position: relative;\n}\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  padding: 10px 20px;\n  font: 14px/22px \"Lato\", Arial, sans-serif;\n  margin-bottom: 10px;\n  border-radius: 5px;\n  resize: none;\n}\n.smiley[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 15px;\n  right: 20px;\n}\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]   .fa-file-o[_ngcontent-%COMP%], .chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]   .fa-file-image-o[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: gray;\n  cursor: pointer;\n}\n.chat-loader[_ngcontent-%COMP%]{\n \n}\n.online[_ngcontent-%COMP%] {\n  color: #86bb71;\n}\n.offline[_ngcontent-%COMP%] {\n  color: #e38968;\n}\n.me[_ngcontent-%COMP%] {\n  color: #94c2ed;\n}\n.align-left[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.align-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.float-right[_ngcontent-%COMP%] {\n  float: right;\n}\n.clearfix[_ngcontent-%COMP%]:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\nli[_ngcontent-%COMP%]{\n  list-style: none;\n}"];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/conversation/conversation.component.ngfactory.js":
/*!*****************************************************************************!*\
  !*** ./src/app/components/conversation/conversation.component.ngfactory.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./conversation.component.css.shim.ngstyle */ "./src/app/components/conversation/conversation.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i3 = __webpack_require__(/*! ../../../../node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.ngfactory */ "./node_modules/ng-emoji-picker/src/emoji-input/emoji-input.component.ngfactory.js");
var i4 = __webpack_require__(/*! ng-emoji-picker/src/emoji-input/emoji-input.component */ "ng-emoji-picker/src/emoji-input/emoji-input.component");
var i5 = __webpack_require__(/*! ng-emoji-picker/src/emoji.service */ "ng-emoji-picker/src/emoji.service");
var i6 = __webpack_require__(/*! ./conversation.component */ "./src/app/components/conversation/conversation.component.ts");
var i7 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i8 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i9 = __webpack_require__(/*! @angular/router */ "@angular/router");
var styles_ConversationComponent = [i0.styles];
var RenderType_ConversationComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_ConversationComponent, data: {} });
exports.RenderType_ConversationComponent = RenderType_ConversationComponent;
function View_ConversationComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 0, "i", [["class", "fa fa-circle online mr-2"]], null, null, null, null, null))], null, null); }
function View_ConversationComponent_4(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 0, "i", [["class", "fa fa-circle me ml-2"]], null, null, null, null, null))], null, null); }
function View_ConversationComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 11, "li", [["class", "clearfix"]], null, null, null, null, null)), i1.ɵdid(1, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), (_l()(), i1.ɵeld(2, 0, null, null, 7, "div", [["class", "message-data"]], null, null, null, null, null)), i1.ɵdid(3, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ConversationComponent_3)), i1.ɵdid(5, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(6, 0, null, null, 1, "span", [["class", "message-data-name"]], null, null, null, null, null)), (_l()(), i1.ɵted(7, null, ["", ""])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ConversationComponent_4)), i1.ɵdid(9, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(10, 0, null, null, 1, "div", [["class", "message"]], [[8, "innerHTML", 1]], null, null, null, null)), i1.ɵdid(11, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "clearfix"; var currVal_1 = ((_v.context.$implicit.fromUserId === _co.user.id) ? "clearfix" : ""); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = "message-data"; var currVal_3 = ((_v.context.$implicit.fromUserId === _co.user.id) ? "align-right" : ""); _ck(_v, 3, 0, currVal_2, currVal_3); var currVal_4 = (_v.context.$implicit.fromUserId !== _co.user.id); _ck(_v, 5, 0, currVal_4); var currVal_6 = (_v.context.$implicit.fromUserId === _co.user.id); _ck(_v, 9, 0, currVal_6); var currVal_8 = "message"; var currVal_9 = ((_v.context.$implicit.fromUserId === _co.user.id) ? "other-message float-right" : "my-message"); _ck(_v, 11, 0, currVal_8, currVal_9); }, function (_ck, _v) { var _co = _v.component; var currVal_5 = ((_v.context.$implicit.fromUserId === _co.user.id) ? _co.user.username : _co.selectedUser.username); _ck(_v, 7, 0, currVal_5); var currVal_7 = _v.context.$implicit.message; _ck(_v, 10, 0, currVal_7); }); }
function View_ConversationComponent_5(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 3, "span", [["class", "text-success"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 0, "i", [["class", "chat-loader fa fa-circle-o-notch fa-spin fa-lg fa-fw"]], null, null, null, null, null)), (_l()(), i1.ɵted(2, null, [" ", " is typing... "])), i1.ɵppd(3, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵunv(_v, 2, 0, _ck(_v, 3, 0, i1.ɵnov(_v.parent.parent, 0), _co.selectedUser.username)); _ck(_v, 2, 0, currVal_0); }); }
function View_ConversationComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 21, "div", [["class", "chat h-100 w-100"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 6, "div", [["class", "chat-header clearfix"]], null, null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 3, "div", [["class", "chat-about"]], null, null, null, null, null)), (_l()(), i1.ɵeld(3, 0, null, null, 2, "div", [["class", "chat-with"]], null, null, null, null, null)), (_l()(), i1.ɵted(4, null, ["", " "])), i1.ɵppd(5, 1), (_l()(), i1.ɵeld(6, 0, null, null, 0, "i", [["class", "fa fa-pencil-square-o fa-lg pull-right m-2 c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnShowBoard("whiteboard") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(7, 0, null, null, 0, "i", [["class", "fa fa-video-camera fa-lg pull-right m-2 c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnShowBoard("video") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(8, 0, null, null, 5, "div", [["class", "chat-history"]], null, null, null, null, null)), (_l()(), i1.ɵeld(9, 0, null, null, 2, "ul", [["class", "p-0"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ConversationComponent_2)), i1.ɵdid(11, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ConversationComponent_5)), i1.ɵdid(13, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(14, 0, null, null, 7, "div", [["class", "chat-message clearfix"]], null, null, null, null, null)), (_l()(), i1.ɵeld(15, 0, null, null, 2, "emoji-input", [], null, [[null, "modelChange"], [null, "click"], [null, "setPopupAction"], [null, "keypress"], [null, "blur"], [null, "keydown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("modelChange" === en)) {
        var pd_0 = ((_co.message = $event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.openPopup(false) !== false);
        ad = (pd_1 && ad);
    } if (("setPopupAction" === en)) {
        var pd_2 = (_co.setPopupAction($event) !== false);
        ad = (pd_2 && ad);
    } if (("keypress" === en)) {
        var pd_3 = (_co.fnType(true) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_co.fnType(false) !== false);
        ad = (pd_4 && ad);
    } if (("keydown" === en)) {
        var pd_5 = (_co.sendMessage($event) !== false);
        ad = (pd_5 && ad);
    } return ad; }, i3.View_EmojiInputComponent_0, i3.RenderType_EmojiInputComponent)), i1.ɵdid(16, 4833280, [[1, 4]], 0, i4.EmojiInputComponent, [i5.EmojiService], { textArea: [0, "textArea"], popupAnchor: [1, "popupAnchor"], model: [2, "model"] }, { modelChange: "modelChange", setPopupAction: "setPopupAction", blur: "blur" }), i1.ɵpod(17, { rows: 0 }), (_l()(), i1.ɵeld(18, 0, null, null, 1, "span", [["class", "smiley"]], null, [[null, "click"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _co.openPopup();
        var pd_0 = (_co.fnType(true) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_co.fnType(false) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(19, 0, null, null, 0, "i", [["class", "fa fa-smile-o"]], null, null, null, null, null)), (_l()(), i1.ɵeld(20, 0, null, null, 1, "button", [["class", "btn btn-info pull-right btn-sm"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.sendMessage($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Send"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.messages; _ck(_v, 11, 0, currVal_1); var currVal_2 = (_co.isType && (_co.selectedUser.id === _co.messages[0].fromUserId)); _ck(_v, 13, 0, currVal_2); var currVal_3 = _ck(_v, 17, 0, 3); var currVal_4 = "bottom"; var currVal_5 = _co.message; _ck(_v, 16, 0, currVal_3, currVal_4, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵunv(_v, 4, 0, _ck(_v, 5, 0, i1.ɵnov(_v.parent, 0), _co.selectedUser.username)); _ck(_v, 4, 0, currVal_0); }); }
function View_ConversationComponent_0(_l) { return i1.ɵvid(0, [i1.ɵpid(0, i2.TitleCasePipe, []), i1.ɵqud(671088640, 1, { textarea: 0 }), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ConversationComponent_1)), i1.ɵdid(3, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selectedUser; _ck(_v, 3, 0, currVal_0); }, null); }
exports.View_ConversationComponent_0 = View_ConversationComponent_0;
function View_ConversationComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-conversation", [], null, null, null, View_ConversationComponent_0, RenderType_ConversationComponent)), i1.ɵdid(1, 2670592, null, 0, i6.ConversationComponent, [i7.SocketService, i8.AuthService, i9.Router], null, null)], null, null); }
exports.View_ConversationComponent_Host_0 = View_ConversationComponent_Host_0;
var ConversationComponentNgFactory = i1.ɵccf("app-conversation", i6.ConversationComponent, View_ConversationComponent_Host_0, { conversation: "conversation", messages: "messages", selectedUserInfo: "selectedUserInfo", selectedUser: "selectedUser" }, { EventShowBoard: "EventShowBoard" }, []);
exports.ConversationComponentNgFactory = ConversationComponentNgFactory;


/***/ }),

/***/ "./src/app/components/conversation/conversation.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/conversation/conversation.component.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var socket_service_1 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var ConversationComponent = /** @class */ (function () {
    function ConversationComponent(socketService, authService, router) {
        this.socketService = socketService;
        this.authService = authService;
        this.router = router;
        this.EventShowBoard = new core_1.EventEmitter();
        this.user = authService.getAuthUser();
        this.message = '';
    }
    ConversationComponent.prototype.setPopupAction = function (fn) {
        this.openPopup = fn;
    };
    ConversationComponent.prototype.ngAfterContentChecked = function () {
        if (this.textarea) {
            this.textarea['textareaEl'].nativeElement.placeholder = 'Type your message';
        }
    };
    ConversationComponent.prototype.listenForMessages = function (userId) {
        var _this = this;
        this.userId = userId;
        this.socketService.receiveMessages().subscribe(function (message) {
            /* subscribing for messages starts */
            if (_this.selectedUser !== null && _this.selectedUser.id === message.fromUserId) {
                _this.messages = _this.messages.concat([message]);
                setTimeout(function () {
                    document.querySelector(".chat-history").scrollTop = document.querySelector(".chat-history").scrollHeight;
                }, 100);
            }
        });
    };
    ConversationComponent.prototype.listenTyping = function (userId) {
        var _this = this;
        this.userId = userId;
        this.socketService.receiveTypes().subscribe(function (data) {
            /* subscribing for messages statrts */
            if (_this.selectedUser !== null && _this.selectedUser.id === data.fromUserId) {
                _this.isType = data.isType;
                if (_this.isType) {
                    if (_this.timeout) {
                        clearTimeout(_this.timeout);
                    }
                    _this.timeout = setTimeout(function () {
                        _this.isType = false;
                    }, 5000);
                }
            }
        });
    };
    ConversationComponent.prototype.fnType = function (isTyping) {
        if (this.user.id === '') {
            this.router.navigate(['signup']);
        }
        else if (this.selectedUser.id === '') {
            alert("Select a user to chat.");
        }
        else {
            var data = {
                fromUserId: this.user.id,
                isType: isTyping,
                toUserId: this.selectedUser.id,
            };
            /* calling method to send the messages */
            this.socketService.startTyping(data);
        }
    };
    ConversationComponent.prototype.sendMessage = function (event) {
        if (event.type === 'click' || event.keyCode === 13) {
            var message = this.message;
            if (message === '' || message === undefined || message === null) {
                alert("Message can't be empty.");
            }
            else if (this.user.id === '') {
                this.router.navigate(['signup']);
            }
            else if (this.selectedUser.id === '') {
                alert("Select a user to chat.");
            }
            else {
                var data = {
                    fromUserId: this.user.id,
                    message: (message).trim(),
                    toUserId: this.selectedUser.id,
                };
                this.messages = this.messages.concat([data]);
                /* calling method to send the messages */
                this.socketService.sendMessage({
                    fromUserId: this.user.id,
                    message: (message).trim(),
                    toUserId: this.selectedUser.id
                });
                this.message = '';
                setTimeout(function () {
                    document.querySelector(".chat-history").scrollTop = document.querySelector(".chat-history").scrollHeight;
                }, 100);
            }
        }
    };
    ConversationComponent.prototype.fnShowBoard = function (type) {
        this.EventShowBoard.next(type);
    };
    ConversationComponent.prototype.ngOnChanges = function (changes) {
        /* Fetching selected users information from other component. */
    };
    return ConversationComponent;
}());
exports.ConversationComponent = ConversationComponent;


/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.css.shim.ngstyle.js":
/*!******************************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.css.shim.ngstyle.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = [""];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ngfactory.js":
/*!***********************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ngfactory.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./dashboard.component.css.shim.ngstyle */ "./src/app/components/dashboard/dashboard.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! ../conversation/conversation.component.ngfactory */ "./src/app/components/conversation/conversation.component.ngfactory.js");
var i3 = __webpack_require__(/*! ../conversation/conversation.component */ "./src/app/components/conversation/conversation.component.ts");
var i4 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i5 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i6 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i7 = __webpack_require__(/*! ../whiteboard/whiteboard.component.ngfactory */ "./src/app/components/whiteboard/whiteboard.component.ngfactory.js");
var i8 = __webpack_require__(/*! ../whiteboard/whiteboard.component */ "./src/app/components/whiteboard/whiteboard.component.ts");
var i9 = __webpack_require__(/*! ../video/video.component.ngfactory */ "./src/app/components/video/video.component.ngfactory.js");
var i10 = __webpack_require__(/*! ../video/video.component */ "./src/app/components/video/video.component.ts");
var i11 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
var i12 = __webpack_require__(/*! ../chat-list/chat-list.component.ngfactory */ "./src/app/components/chat-list/chat-list.component.ngfactory.js");
var i13 = __webpack_require__(/*! ../chat-list/chat-list.component */ "./src/app/components/chat-list/chat-list.component.ts");
var i14 = __webpack_require__(/*! ../../common/services/chat-service/chat.service */ "./src/app/common/services/chat-service/chat.service.ts");
var i15 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i16 = __webpack_require__(/*! ./dashboard.component */ "./src/app/components/dashboard/dashboard.component.ts");
var styles_DashboardComponent = [i0.styles];
var RenderType_DashboardComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_DashboardComponent, data: {} });
exports.RenderType_DashboardComponent = RenderType_DashboardComponent;
function View_DashboardComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-conversation", [], null, [[null, "EventShowBoard"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("EventShowBoard" === en)) {
        var pd_0 = (_co.fnShowBoard($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i2.View_ConversationComponent_0, i2.RenderType_ConversationComponent)), i1.ɵdid(1, 2670592, [[2, 4]], 0, i3.ConversationComponent, [i4.SocketService, i5.AuthService, i6.Router], { conversation: [0, "conversation"], messages: [1, "messages"], selectedUserInfo: [2, "selectedUserInfo"], selectedUser: [3, "selectedUser"] }, { EventShowBoard: "EventShowBoard" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.conversation; var currVal_1 = _co.messages; var currVal_2 = _co.selectedUserInfo; var currVal_3 = _co.selectedUser; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_DashboardComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-whiteboard", [], null, [[null, "EventShowChat"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("EventShowChat" === en)) {
        var pd_0 = (_co.fnShowBoard($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i7.View_WhiteboardComponent_0, i7.RenderType_WhiteboardComponent)), i1.ɵdid(1, 638976, null, 0, i8.WhiteboardComponent, [i4.SocketService, i5.AuthService], { selectedUserInfo: [0, "selectedUserInfo"], selectedUser: [1, "selectedUser"] }, { EventShowChat: "EventShowChat" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selectedUserInfo; var currVal_1 = _co.selectedUser; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_DashboardComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-video", [], null, [[null, "EventShowVideo"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("EventShowVideo" === en)) {
        var pd_0 = (_co.fnShowBoard($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i9.View_VideoComponent_0, i9.RenderType_VideoComponent)), i1.ɵdid(1, 4308992, null, 0, i10.VideoComponent, [i4.SocketService, i5.AuthService, i6.Router], { selectedUser: [0, "selectedUser"] }, { EventShowVideo: "EventShowVideo" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selectedUser; _ck(_v, 1, 0, currVal_0); }, null); }
function View_DashboardComponent_0(_l) { return i1.ɵvid(0, [i1.ɵqud(402653184, 1, { chatListComponent: 0 }), i1.ɵqud(671088640, 2, { conversationComponent: 0 }), (_l()(), i1.ɵeld(2, 0, null, null, 21, "div", [["class", "container h-nav border"]], null, null, null, null, null)), (_l()(), i1.ɵeld(3, 0, null, null, 20, "div", [["class", "row h-100"]], null, null, null, null, null)), (_l()(), i1.ɵeld(4, 0, null, null, 12, "div", [["class", "col-4"]], null, null, null, null, null)), (_l()(), i1.ɵeld(5, 0, null, null, 9, "div", [["class", "input-group mb-1 mt-1"]], null, null, null, null, null)), (_l()(), i1.ɵeld(6, 0, null, null, 5, "input", [["class", "form-control"], ["placeholder", "Enter message"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keypress"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 7)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 7).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 7)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 7)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.broadcastMsg = $event) !== false);
        ad = (pd_4 && ad);
    } if (("keypress" === en)) {
        var pd_5 = (_co.fnBroadcast($event) !== false);
        ad = (pd_5 && ad);
    } return ad; }, null, null)), i1.ɵdid(7, 16384, null, 0, i11.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i11.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵprd(1024, null, i11.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i11.DefaultValueAccessor]), i1.ɵdid(9, 671744, null, 0, i11.NgModel, [[8, null], [8, null], [8, null], [6, i11.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i11.NgControl, null, [i11.NgModel]), i1.ɵdid(11, 16384, null, 0, i11.NgControlStatus, [[4, i11.NgControl]], null, null), (_l()(), i1.ɵeld(12, 0, null, null, 2, "div", [["class", "input-group-append"]], null, null, null, null, null)), (_l()(), i1.ɵeld(13, 0, null, null, 1, "button", [["class", "btn btn-info"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnBroadcast($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Broadcast"])), (_l()(), i1.ɵeld(15, 0, null, null, 1, "app-chat-list", [], null, null, null, i12.View_ChatListComponent_0, i12.RenderType_ChatListComponent)), i1.ɵdid(16, 114688, [[1, 4]], 0, i13.ChatListComponent, [i5.AuthService, i4.SocketService, i14.ChatService], { conversation: [0, "conversation"], selectedUserInfo: [1, "selectedUserInfo"] }, null), (_l()(), i1.ɵeld(17, 0, null, null, 6, "div", [["class", "col-8"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_DashboardComponent_1)), i1.ɵdid(19, 16384, null, 0, i15.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_DashboardComponent_2)), i1.ɵdid(21, 16384, null, 0, i15.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_DashboardComponent_3)), i1.ɵdid(23, 16384, null, 0, i15.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.broadcastMsg; _ck(_v, 9, 0, currVal_7); var currVal_8 = _co.conversation; var currVal_9 = _co.selectedUserInfo; _ck(_v, 16, 0, currVal_8, currVal_9); var currVal_10 = (_co.isShowBoard === "chat"); _ck(_v, 19, 0, currVal_10); var currVal_11 = (_co.isShowBoard === "whiteboard"); _ck(_v, 21, 0, currVal_11); var currVal_12 = (_co.isShowBoard === "video"); _ck(_v, 23, 0, currVal_12); }, function (_ck, _v) { var currVal_0 = i1.ɵnov(_v, 11).ngClassUntouched; var currVal_1 = i1.ɵnov(_v, 11).ngClassTouched; var currVal_2 = i1.ɵnov(_v, 11).ngClassPristine; var currVal_3 = i1.ɵnov(_v, 11).ngClassDirty; var currVal_4 = i1.ɵnov(_v, 11).ngClassValid; var currVal_5 = i1.ɵnov(_v, 11).ngClassInvalid; var currVal_6 = i1.ɵnov(_v, 11).ngClassPending; _ck(_v, 6, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
exports.View_DashboardComponent_0 = View_DashboardComponent_0;
function View_DashboardComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-dashboard", [], null, null, null, View_DashboardComponent_0, RenderType_DashboardComponent)), i1.ɵdid(1, 4308992, null, 0, i16.DashboardComponent, [i5.AuthService, i4.SocketService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_DashboardComponent_Host_0 = View_DashboardComponent_Host_0;
var DashboardComponentNgFactory = i1.ɵccf("app-dashboard", i16.DashboardComponent, View_DashboardComponent_Host_0, {}, {}, []);
exports.DashboardComponentNgFactory = DashboardComponentNgFactory;


/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var socket_service_1 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var chat_list_component_1 = __webpack_require__(/*! ../chat-list/chat-list.component */ "./src/app/components/chat-list/chat-list.component.ts");
var conversation_component_1 = __webpack_require__(/*! ../conversation/conversation.component */ "./src/app/components/conversation/conversation.component.ts");
var emitter_service_1 = __webpack_require__(/*! ../../common/services/emitter/emitter.service */ "./src/app/common/services/emitter/emitter.service.ts");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(authService, socketService) {
        this.authService = authService;
        this.socketService = socketService;
        this.messages = [];
        this.conversation = 'CONVERSATION';
        this.selectedUserInfo = 'SELECTEDUSERINFO';
        this.authUser = authService.getAuthUser();
        this.isShowBoard = 'chat';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        /* making socket connection by passing UserId. */
        var socket = this.socketService.connectSocket(this.authUser.id);
    };
    DashboardComponent.prototype.listenBroadcast = function () {
        this.socketService.receiveBroadcast().subscribe(function (broadcastResponse) {
            alert(broadcastResponse.data);
        });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        /* calling getChatList() service method to get the chat list. */
        this.socketService.getChatList(this.authUser.id).subscribe(function (chatListResponse) {
            // console.log(chatListResponse.chatList);
            // this.overlayDisplay = false;
            _this.chatListComponent.getChatList(chatListResponse, _this.authUser.id);
        });
        emitter_service_1.EmitterService.get(this.selectedUserInfo).subscribe(function (selectedUser) {
            _this.selectedUser = selectedUser;
            // move scroll to bottom of the chat list
            setTimeout(function () {
                document.querySelector(".chat-history").scrollTop = document.querySelector(".chat-history").scrollHeight;
            }, 100);
        });
        emitter_service_1.EmitterService.get(this.conversation).subscribe(function (data) {
            _this.messages = data.messages;
        });
        this.conversationComponent.listenForMessages(this.authUser.id);
        this.conversationComponent.listenTyping(this.authUser.id);
        this.listenBroadcast();
    };
    DashboardComponent.prototype.fnShowBoard = function (type) {
        this.isShowBoard = type;
    };
    DashboardComponent.prototype.fnBroadcast = function (event) {
        if (event.type === 'click' || event.keyCode === 13) {
            var msg = this.broadcastMsg;
            if (msg === '' || msg === undefined || msg === null) {
                alert('There is nothing to broadcast.');
            }
            else {
                this.socketService.broadcastMsg(msg);
                this.broadcastMsg = '';
            }
        }
    };
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ "./src/app/components/login/login.component.css.shim.ngstyle.js":
/*!**********************************************************************!*\
  !*** ./src/app/components/login/login.component.css.shim.ngstyle.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = ["@charset \"utf-8\";\n\n\n@media (min-width: 768px) {\n  .omb_row-sm-offset-3[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child[class*=\"col-\"] {\n    margin-left: 25%;\n  }\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_authTitle[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white; // In yourUse @body-bg\nopacity:0.9;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: white;\n  opacity:1;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   .omb_btn-facebook[_ngcontent-%COMP%] {background: #3b5998;}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   .omb_btn-twitter[_ngcontent-%COMP%] {background: #00aced;}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   .omb_btn-google[_ngcontent-%COMP%] {background: #c32f10;}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpOr[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 1.5em;\n  color: #aaa;\n  margin-top: 1em;\n  margin-bottom: 1em;\n  padding-top: 0.5em;\n  padding-bottom: 0.5em;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpOr[_ngcontent-%COMP%]   .omb_hrOr[_ngcontent-%COMP%] {\n  background-color: #cdcdcd;\n  height: 1px;\n  margin-top: 0px !important;\n  margin-bottom: 0px !important;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpOr[_ngcontent-%COMP%]   .omb_spanOr[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: -0.6em;\n  margin-left: -1.5em;\n  background-color: white;\n  width: 3em;\n  text-align: center;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpForm[_ngcontent-%COMP%]   .input-group.i[_ngcontent-%COMP%] {\n  width: 2em;\n}\n@media (min-width: 768px) {\n  .omb_signUp[_ngcontent-%COMP%]   .omb_forgotPwd[_ngcontent-%COMP%] {\n    text-align: right;\n    margin-top:10px;\n  }\n}"];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/login/login.component.ngfactory.js":
/*!***************************************************************!*\
  !*** ./src/app/components/login/login.component.ngfactory.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./login.component.css.shim.ngstyle */ "./src/app/components/login/login.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i3 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i4 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
var i5 = __webpack_require__(/*! ./login.component */ "./src/app/components/login/login.component.ts");
var i6 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var styles_LoginComponent = [i0.styles];
var RenderType_LoginComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_LoginComponent, data: {} });
exports.RenderType_LoginComponent = RenderType_LoginComponent;
function View_LoginComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Email is required. "]))], null, null); }
function View_LoginComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_LoginComponent_2)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = ((i1.ɵnov(_v.parent, 44) == null) ? null : i1.ɵnov(_v.parent, 44).errors.required); _ck(_v, 2, 0, currVal_0); }, null); }
function View_LoginComponent_4(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Password is required. "]))], null, null); }
function View_LoginComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_LoginComponent_4)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = ((i1.ɵnov(_v.parent, 55) == null) ? null : i1.ɵnov(_v.parent, 55).errors.required); _ck(_v, 2, 0, currVal_0); }, null); }
function View_LoginComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 61, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 60, "div", [["class", "omb_signUp"]], null, null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 1, "h1", [["class", "omb_authTitle mt-3"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Login"])), (_l()(), i1.ɵeld(4, 0, null, null, 5, "div", [["class", "omb_authTitle mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(5, 0, null, null, 4, "small", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Don't have an account? "])), (_l()(), i1.ɵeld(7, 0, null, null, 2, "a", [["routerLink", "/signup"]], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 8).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i1.ɵdid(8, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), (_l()(), i1.ɵted(-1, null, ["Sign up"])), (_l()(), i1.ɵeld(10, 0, null, null, 15, "div", [["class", "row omb_row-sm-offset-3 omb_socialButtons"]], null, null, null, null, null)), (_l()(), i1.ɵeld(11, 0, null, null, 4, "div", [["class", "col-xs-4 col-sm-2"]], null, null, null, null, null)), (_l()(), i1.ɵeld(12, 0, null, null, 3, "a", [["class", "btn btn-lg btn-block omb_btn-facebook"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵeld(13, 0, null, null, 0, "i", [["class", "fa fa-facebook visible-xs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(14, 0, null, null, 1, "span", [["class", "hidden-xs"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Facebook"])), (_l()(), i1.ɵeld(16, 0, null, null, 4, "div", [["class", "col-xs-4 col-sm-2"]], null, null, null, null, null)), (_l()(), i1.ɵeld(17, 0, null, null, 3, "a", [["class", "btn btn-lg btn-block omb_btn-twitter"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵeld(18, 0, null, null, 0, "i", [["class", "fa fa-twitter visible-xs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(19, 0, null, null, 1, "span", [["class", "hidden-xs"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Twitter"])), (_l()(), i1.ɵeld(21, 0, null, null, 4, "div", [["class", "col-xs-4 col-sm-2"]], null, null, null, null, null)), (_l()(), i1.ɵeld(22, 0, null, null, 3, "a", [["class", "btn btn-lg btn-block omb_btn-google"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵeld(23, 0, null, null, 0, "i", [["class", "fa fa-google-plus visible-xs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(24, 0, null, null, 1, "span", [["class", "hidden-xs"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Google+"])), (_l()(), i1.ɵeld(26, 0, null, null, 4, "div", [["class", "row omb_row-sm-offset-3 omb_signUpOr"]], null, null, null, null, null)), (_l()(), i1.ɵeld(27, 0, null, null, 3, "div", [["class", "col-xs-12 col-sm-6"]], null, null, null, null, null)), (_l()(), i1.ɵeld(28, 0, null, null, 0, "hr", [["class", "omb_hrOr"]], null, null, null, null, null)), (_l()(), i1.ɵeld(29, 0, null, null, 1, "span", [["class", "omb_spanOr"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["or"])), (_l()(), i1.ɵeld(31, 0, null, null, 30, "div", [["class", "row omb_row-sm-offset-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(32, 0, null, null, 29, "div", [["class", "col-xs-12 col-sm-6"]], null, null, null, null, null)), (_l()(), i1.ɵeld(33, 0, null, null, 28, "form", [["class", "omb_signUpForm"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (i1.ɵnov(_v, 35).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i1.ɵnov(_v, 35).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.fnLogin(_co.userObj) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), i1.ɵdid(34, 16384, null, 0, i4.ɵangular_packages_forms_forms_bg, [], null, null), i1.ɵdid(35, 4210688, [["form", 4]], 0, i4.NgForm, [[8, null], [8, null]], null, { ngSubmit: "ngSubmit" }), i1.ɵprd(2048, null, i4.ControlContainer, null, [i4.NgForm]), i1.ɵdid(37, 16384, null, 0, i4.NgControlStatusGroup, [[4, i4.ControlContainer]], null, null), (_l()(), i1.ɵeld(38, 0, null, null, 10, "div", [["class", "mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(39, 0, null, null, 7, "input", [["class", "form-control"], ["name", "email"], ["ngModel", ""], ["placeholder", "Email Address"], ["required", ""], ["type", "email"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 40)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 40).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 40)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 40)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.userObj.email = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), i1.ɵdid(40, 16384, null, 0, i4.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(41, 16384, null, 0, i4.RequiredValidator, [], { required: [0, "required"] }, null), i1.ɵprd(1024, null, i4.NG_VALIDATORS, function (p0_0) { return [p0_0]; }, [i4.RequiredValidator]), i1.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i1.ɵdid(44, 671744, [["email", 4]], 0, i4.NgModel, [[2, i4.ControlContainer], [6, i4.NG_VALIDATORS], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i1.ɵdid(46, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_LoginComponent_1)), i1.ɵdid(48, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(49, 0, null, null, 10, "div", [["class", "mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(50, 0, null, null, 7, "input", [["class", "form-control"], ["name", "password"], ["placeholder", "Password"], ["required", ""], ["type", "password"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 51)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 51).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 51)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 51)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.userObj.password = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), i1.ɵdid(51, 16384, null, 0, i4.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(52, 16384, null, 0, i4.RequiredValidator, [], { required: [0, "required"] }, null), i1.ɵprd(1024, null, i4.NG_VALIDATORS, function (p0_0) { return [p0_0]; }, [i4.RequiredValidator]), i1.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i1.ɵdid(55, 671744, [["password", 4]], 0, i4.NgModel, [[2, i4.ControlContainer], [6, i4.NG_VALIDATORS], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i1.ɵdid(57, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_LoginComponent_3)), i1.ɵdid(59, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(60, 0, null, null, 1, "button", [["class", "btn btn-lg btn-primary btn-block"], ["type", "submit"]], [[8, "disabled", 0]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Login "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = "/signup"; _ck(_v, 8, 0, currVal_2); var currVal_18 = ""; _ck(_v, 41, 0, currVal_18); var currVal_19 = "email"; var currVal_20 = _co.userObj.email; _ck(_v, 44, 0, currVal_19, currVal_20); var currVal_21 = (i1.ɵnov(_v, 44).invalid && (i1.ɵnov(_v, 44).dirty || i1.ɵnov(_v, 44).touched)); _ck(_v, 48, 0, currVal_21); var currVal_30 = ""; _ck(_v, 52, 0, currVal_30); var currVal_31 = "password"; var currVal_32 = _co.userObj.password; _ck(_v, 55, 0, currVal_31, currVal_32); var currVal_33 = (i1.ɵnov(_v, 55).invalid && (i1.ɵnov(_v, 55).dirty || i1.ɵnov(_v, 55).touched)); _ck(_v, 59, 0, currVal_33); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵnov(_v, 8).target; var currVal_1 = i1.ɵnov(_v, 8).href; _ck(_v, 7, 0, currVal_0, currVal_1); var currVal_3 = i1.ɵnov(_v, 37).ngClassUntouched; var currVal_4 = i1.ɵnov(_v, 37).ngClassTouched; var currVal_5 = i1.ɵnov(_v, 37).ngClassPristine; var currVal_6 = i1.ɵnov(_v, 37).ngClassDirty; var currVal_7 = i1.ɵnov(_v, 37).ngClassValid; var currVal_8 = i1.ɵnov(_v, 37).ngClassInvalid; var currVal_9 = i1.ɵnov(_v, 37).ngClassPending; _ck(_v, 33, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_10 = (i1.ɵnov(_v, 41).required ? "" : null); var currVal_11 = i1.ɵnov(_v, 46).ngClassUntouched; var currVal_12 = i1.ɵnov(_v, 46).ngClassTouched; var currVal_13 = i1.ɵnov(_v, 46).ngClassPristine; var currVal_14 = i1.ɵnov(_v, 46).ngClassDirty; var currVal_15 = i1.ɵnov(_v, 46).ngClassValid; var currVal_16 = i1.ɵnov(_v, 46).ngClassInvalid; var currVal_17 = i1.ɵnov(_v, 46).ngClassPending; _ck(_v, 39, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); var currVal_22 = (i1.ɵnov(_v, 52).required ? "" : null); var currVal_23 = i1.ɵnov(_v, 57).ngClassUntouched; var currVal_24 = i1.ɵnov(_v, 57).ngClassTouched; var currVal_25 = i1.ɵnov(_v, 57).ngClassPristine; var currVal_26 = i1.ɵnov(_v, 57).ngClassDirty; var currVal_27 = i1.ɵnov(_v, 57).ngClassValid; var currVal_28 = i1.ɵnov(_v, 57).ngClassInvalid; var currVal_29 = i1.ɵnov(_v, 57).ngClassPending; _ck(_v, 50, 0, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29); var currVal_34 = (i1.ɵnov(_v, 35).invalid || _co.noMatch); _ck(_v, 60, 0, currVal_34); }); }
exports.View_LoginComponent_0 = View_LoginComponent_0;
function View_LoginComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-login", [], null, null, null, View_LoginComponent_0, RenderType_LoginComponent)), i1.ɵdid(1, 114688, null, 0, i5.LoginComponent, [i6.AuthService, i3.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_LoginComponent_Host_0 = View_LoginComponent_Host_0;
var LoginComponentNgFactory = i1.ɵccf("app-login", i5.LoginComponent, View_LoginComponent_Host_0, {}, {}, []);
exports.LoginComponentNgFactory = LoginComponentNgFactory;


/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, _router) {
        this.authService = authService;
        this._router = _router;
        this.userObj = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.fnLogin = function (authObj) {
        var _this = this;
        this.authService.login(authObj)
            .then(function (res) {
            _this._router.navigate(['dashboard']);
        }).catch(function (error) {
        });
    };
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "./src/app/components/main/main.component.css.shim.ngstyle.js":
/*!********************************************************************!*\
  !*** ./src/app/components/main/main.component.css.shim.ngstyle.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = [""];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/main/main.component.ngfactory.js":
/*!*************************************************************!*\
  !*** ./src/app/components/main/main.component.ngfactory.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./main.component.css.shim.ngstyle */ "./src/app/components/main/main.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! ../../common/components/navbar/navbar.component.ngfactory */ "./src/app/common/components/navbar/navbar.component.ngfactory.js");
var i3 = __webpack_require__(/*! ../../common/components/navbar/navbar.component */ "./src/app/common/components/navbar/navbar.component.ts");
var i4 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i5 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i6 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i7 = __webpack_require__(/*! ./main.component */ "./src/app/components/main/main.component.ts");
var styles_MainComponent = [i0.styles];
var RenderType_MainComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_MainComponent, data: {} });
exports.RenderType_MainComponent = RenderType_MainComponent;
function View_MainComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-navar", [], null, null, null, i2.View_NavbarComponent_0, i2.RenderType_NavbarComponent)), i1.ɵdid(1, 114688, null, 0, i3.NavbarComponent, [i1.PLATFORM_ID, i4.AuthService, i5.SocketService, i6.Router], null, null), (_l()(), i1.ɵeld(2, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), i1.ɵdid(3, 212992, null, 0, i6.RouterOutlet, [i6.ChildrenOutletContexts, i1.ViewContainerRef, i1.ComponentFactoryResolver, [8, null], i1.ChangeDetectorRef], null, null)], function (_ck, _v) { _ck(_v, 1, 0); _ck(_v, 3, 0); }, null); }
exports.View_MainComponent_0 = View_MainComponent_0;
function View_MainComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-main", [], null, null, null, View_MainComponent_0, RenderType_MainComponent)), i1.ɵdid(1, 114688, null, 0, i7.MainComponent, [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_MainComponent_Host_0 = View_MainComponent_Host_0;
var MainComponentNgFactory = i1.ɵccf("app-main", i7.MainComponent, View_MainComponent_Host_0, {}, {}, []);
exports.MainComponentNgFactory = MainComponentNgFactory;


/***/ }),

/***/ "./src/app/components/main/main.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/main/main.component.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var MainComponent = /** @class */ (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    return MainComponent;
}());
exports.MainComponent = MainComponent;


/***/ }),

/***/ "./src/app/components/signup/signup.component.css.shim.ngstyle.js":
/*!************************************************************************!*\
  !*** ./src/app/components/signup/signup.component.css.shim.ngstyle.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = ["@charset \"utf-8\";\n\n\n@media (min-width: 768px) {\n  .omb_row-sm-offset-3[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child[class*=\"col-\"] {\n    margin-left: 25%;\n  }\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_authTitle[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white; // In yourUse @body-bg\nopacity:0.9;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: white;\n  opacity:1;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   .omb_btn-facebook[_ngcontent-%COMP%] {background: #3b5998;}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   .omb_btn-twitter[_ngcontent-%COMP%] {background: #00aced;}\n.omb_signUp[_ngcontent-%COMP%]   .omb_socialButtons[_ngcontent-%COMP%]   .omb_btn-google[_ngcontent-%COMP%] {background: #c32f10;}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpOr[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 1.5em;\n  color: #aaa;\n  margin-top: 1em;\n  margin-bottom: 1em;\n  padding-top: 0.5em;\n  padding-bottom: 0.5em;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpOr[_ngcontent-%COMP%]   .omb_hrOr[_ngcontent-%COMP%] {\n  background-color: #cdcdcd;\n  height: 1px;\n  margin-top: 0px !important;\n  margin-bottom: 0px !important;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpOr[_ngcontent-%COMP%]   .omb_spanOr[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: -0.6em;\n  margin-left: -1.5em;\n  background-color: white;\n  width: 3em;\n  text-align: center;\n}\n.omb_signUp[_ngcontent-%COMP%]   .omb_signUpForm[_ngcontent-%COMP%]   .input-group.i[_ngcontent-%COMP%] {\n  width: 2em;\n}\n@media (min-width: 768px) {\n  .omb_signUp[_ngcontent-%COMP%]   .omb_forgotPwd[_ngcontent-%COMP%] {\n    text-align: right;\n    margin-top:10px;\n  }\n}"];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/signup/signup.component.ngfactory.js":
/*!*****************************************************************!*\
  !*** ./src/app/components/signup/signup.component.ngfactory.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./signup.component.css.shim.ngstyle */ "./src/app/components/signup/signup.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i3 = __webpack_require__(/*! @angular/router */ "@angular/router");
var i4 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
var i5 = __webpack_require__(/*! ./signup.component */ "./src/app/components/signup/signup.component.ts");
var i6 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var styles_SignupComponent = [i0.styles];
var RenderType_SignupComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_SignupComponent, data: {} });
exports.RenderType_SignupComponent = RenderType_SignupComponent;
function View_SignupComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Username is required. "]))], null, null); }
function View_SignupComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_2)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = ((i1.ɵnov(_v.parent, 44) == null) ? null : i1.ɵnov(_v.parent, 44).errors.required); _ck(_v, 2, 0, currVal_0); }, null); }
function View_SignupComponent_4(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Email is required. "]))], null, null); }
function View_SignupComponent_5(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Invalid email. "]))], null, null); }
function View_SignupComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_4)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_5)), i1.ɵdid(4, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = ((i1.ɵnov(_v.parent, 56) == null) ? null : i1.ɵnov(_v.parent, 56).errors.required); _ck(_v, 2, 0, currVal_0); var currVal_1 = ((i1.ɵnov(_v.parent, 56) == null) ? null : i1.ɵnov(_v.parent, 56).errors.pattern); _ck(_v, 4, 0, currVal_1); }, null); }
function View_SignupComponent_7(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Password is required. "]))], null, null); }
function View_SignupComponent_8(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Invalid password. "]))], null, null); }
function View_SignupComponent_6(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_7)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_8)), i1.ɵdid(4, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = ((i1.ɵnov(_v.parent, 68) == null) ? null : i1.ɵnov(_v.parent, 68).errors.required); _ck(_v, 2, 0, currVal_0); var currVal_1 = ((i1.ɵnov(_v.parent, 68) == null) ? null : i1.ɵnov(_v.parent, 68).errors.pattern); _ck(_v, 4, 0, currVal_1); }, null); }
function View_SignupComponent_10(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Confirm password is required. "]))], null, null); }
function View_SignupComponent_9(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_10)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = ((i1.ɵnov(_v.parent, 79) == null) ? null : i1.ɵnov(_v.parent, 79).errors.required); _ck(_v, 2, 0, currVal_0); }, null); }
function View_SignupComponent_11(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Password not match. "]))], null, null); }
function View_SignupComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 87, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 86, "div", [["class", "omb_signUp"]], null, null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 1, "h1", [["class", "omb_authTitle mt-3"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Sign Up"])), (_l()(), i1.ɵeld(4, 0, null, null, 5, "div", [["class", "omb_authTitle mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(5, 0, null, null, 4, "small", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Already have an account? "])), (_l()(), i1.ɵeld(7, 0, null, null, 2, "a", [["routerLink", "/signin"]], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 8).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i1.ɵdid(8, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), (_l()(), i1.ɵted(-1, null, ["Login"])), (_l()(), i1.ɵeld(10, 0, null, null, 15, "div", [["class", "row omb_row-sm-offset-3 omb_socialButtons"]], null, null, null, null, null)), (_l()(), i1.ɵeld(11, 0, null, null, 4, "div", [["class", "col-xs-4 col-sm-2"]], null, null, null, null, null)), (_l()(), i1.ɵeld(12, 0, null, null, 3, "a", [["class", "btn btn-lg btn-block omb_btn-facebook"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵeld(13, 0, null, null, 0, "i", [["class", "fa fa-facebook visible-xs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(14, 0, null, null, 1, "span", [["class", "hidden-xs"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Facebook"])), (_l()(), i1.ɵeld(16, 0, null, null, 4, "div", [["class", "col-xs-4 col-sm-2"]], null, null, null, null, null)), (_l()(), i1.ɵeld(17, 0, null, null, 3, "a", [["class", "btn btn-lg btn-block omb_btn-twitter"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵeld(18, 0, null, null, 0, "i", [["class", "fa fa-twitter visible-xs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(19, 0, null, null, 1, "span", [["class", "hidden-xs"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Twitter"])), (_l()(), i1.ɵeld(21, 0, null, null, 4, "div", [["class", "col-xs-4 col-sm-2"]], null, null, null, null, null)), (_l()(), i1.ɵeld(22, 0, null, null, 3, "a", [["class", "btn btn-lg btn-block omb_btn-google"], ["href", "#"]], null, null, null, null, null)), (_l()(), i1.ɵeld(23, 0, null, null, 0, "i", [["class", "fa fa-google-plus visible-xs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(24, 0, null, null, 1, "span", [["class", "hidden-xs"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Google+"])), (_l()(), i1.ɵeld(26, 0, null, null, 4, "div", [["class", "row omb_row-sm-offset-3 omb_signUpOr"]], null, null, null, null, null)), (_l()(), i1.ɵeld(27, 0, null, null, 3, "div", [["class", "col-xs-12 col-sm-6"]], null, null, null, null, null)), (_l()(), i1.ɵeld(28, 0, null, null, 0, "hr", [["class", "omb_hrOr"]], null, null, null, null, null)), (_l()(), i1.ɵeld(29, 0, null, null, 1, "span", [["class", "omb_spanOr"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["or"])), (_l()(), i1.ɵeld(31, 0, null, null, 56, "div", [["class", "row omb_row-sm-offset-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(32, 0, null, null, 55, "div", [["class", "col-xs-12 col-sm-6"]], null, null, null, null, null)), (_l()(), i1.ɵeld(33, 0, null, null, 54, "form", [["class", "omb_signUpForm"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (i1.ɵnov(_v, 35).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i1.ɵnov(_v, 35).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.fnRegisterUser(_co.newUser) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), i1.ɵdid(34, 16384, null, 0, i4.ɵangular_packages_forms_forms_bg, [], null, null), i1.ɵdid(35, 4210688, [["form", 4]], 0, i4.NgForm, [[8, null], [8, null]], null, { ngSubmit: "ngSubmit" }), i1.ɵprd(2048, null, i4.ControlContainer, null, [i4.NgForm]), i1.ɵdid(37, 16384, null, 0, i4.NgControlStatusGroup, [[4, i4.ControlContainer]], null, null), (_l()(), i1.ɵeld(38, 0, null, null, 10, "div", [["class", "mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(39, 0, null, null, 7, "input", [["class", "form-control"], ["name", "username"], ["placeholder", "Username"], ["required", ""], ["type", "text"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 40)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 40).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 40)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 40)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.newUser.username = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), i1.ɵdid(40, 16384, null, 0, i4.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(41, 16384, null, 0, i4.RequiredValidator, [], { required: [0, "required"] }, null), i1.ɵprd(1024, null, i4.NG_VALIDATORS, function (p0_0) { return [p0_0]; }, [i4.RequiredValidator]), i1.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i1.ɵdid(44, 671744, [["userName", 4]], 0, i4.NgModel, [[2, i4.ControlContainer], [6, i4.NG_VALIDATORS], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i1.ɵdid(46, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_1)), i1.ɵdid(48, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(49, 0, null, null, 11, "div", [["class", "mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(50, 0, null, null, 8, "input", [["class", "form-control"], ["name", "email"], ["ngModel", ""], ["placeholder", "Email Address"], ["required", ""], ["type", "email"]], [[1, "required", 0], [1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 51)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 51).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 51)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 51)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.newUser.email = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), i1.ɵdid(51, 16384, null, 0, i4.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(52, 16384, null, 0, i4.RequiredValidator, [], { required: [0, "required"] }, null), i1.ɵdid(53, 540672, null, 0, i4.PatternValidator, [], { pattern: [0, "pattern"] }, null), i1.ɵprd(1024, null, i4.NG_VALIDATORS, function (p0_0, p1_0) { return [p0_0, p1_0]; }, [i4.RequiredValidator, i4.PatternValidator]), i1.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i1.ɵdid(56, 671744, [["email", 4]], 0, i4.NgModel, [[2, i4.ControlContainer], [6, i4.NG_VALIDATORS], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i1.ɵdid(58, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_3)), i1.ɵdid(60, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(61, 0, null, null, 11, "div", [["class", "mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(62, 0, null, null, 8, "input", [["class", "form-control"], ["name", "password"], ["placeholder", "Password"], ["required", ""], ["type", "password"]], [[1, "required", 0], [1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 63)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 63).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 63)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 63)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.newUser.password = $event) !== false);
        ad = (pd_4 && ad);
    } if (("ngModelChange" === en)) {
        var pd_5 = ((_co.cfPass && _co.fnCheckPassword(_co.newUser.password, _co.cfPass)) !== false);
        ad = (pd_5 && ad);
    } return ad; }, null, null)), i1.ɵdid(63, 16384, null, 0, i4.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(64, 16384, null, 0, i4.RequiredValidator, [], { required: [0, "required"] }, null), i1.ɵdid(65, 540672, null, 0, i4.PatternValidator, [], { pattern: [0, "pattern"] }, null), i1.ɵprd(1024, null, i4.NG_VALIDATORS, function (p0_0, p1_0) { return [p0_0, p1_0]; }, [i4.RequiredValidator, i4.PatternValidator]), i1.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i1.ɵdid(68, 671744, [["password", 4]], 0, i4.NgModel, [[2, i4.ControlContainer], [6, i4.NG_VALIDATORS], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i1.ɵdid(70, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_6)), i1.ɵdid(72, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(73, 0, null, null, 12, "div", [["class", "mb-3"]], null, null, null, null, null)), (_l()(), i1.ɵeld(74, 0, null, null, 7, "input", [["class", "form-control"], ["name", "cpassword"], ["placeholder", "Confirm Password"], ["required", ""], ["type", "password"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 75)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 75).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 75)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 75)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.cfPass = $event) !== false);
        ad = (pd_4 && ad);
    } if (("ngModelChange" === en)) {
        var pd_5 = (_co.fnCheckPassword(_co.newUser.password, _co.cfPass) !== false);
        ad = (pd_5 && ad);
    } return ad; }, null, null)), i1.ɵdid(75, 16384, null, 0, i4.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(76, 16384, null, 0, i4.RequiredValidator, [], { required: [0, "required"] }, null), i1.ɵprd(1024, null, i4.NG_VALIDATORS, function (p0_0) { return [p0_0]; }, [i4.RequiredValidator]), i1.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i1.ɵdid(79, 671744, [["cfPassword", 4]], 0, i4.NgModel, [[2, i4.ControlContainer], [6, i4.NG_VALIDATORS], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i1.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i1.ɵdid(81, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_9)), i1.ɵdid(83, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SignupComponent_11)), i1.ɵdid(85, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(86, 0, null, null, 1, "button", [["class", "btn btn-lg btn-primary btn-block"], ["type", "submit"]], [[8, "disabled", 0]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Sign Up "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = "/signin"; _ck(_v, 8, 0, currVal_2); var currVal_18 = ""; _ck(_v, 41, 0, currVal_18); var currVal_19 = "username"; var currVal_20 = _co.newUser.username; _ck(_v, 44, 0, currVal_19, currVal_20); var currVal_21 = (i1.ɵnov(_v, 44).invalid && (i1.ɵnov(_v, 44).dirty || i1.ɵnov(_v, 44).touched)); _ck(_v, 48, 0, currVal_21); var currVal_31 = ""; _ck(_v, 52, 0, currVal_31); var currVal_32 = _co.emailRegEx; _ck(_v, 53, 0, currVal_32); var currVal_33 = "email"; var currVal_34 = _co.newUser.email; _ck(_v, 56, 0, currVal_33, currVal_34); var currVal_35 = (i1.ɵnov(_v, 56).invalid && (i1.ɵnov(_v, 56).dirty || i1.ɵnov(_v, 56).touched)); _ck(_v, 60, 0, currVal_35); var currVal_45 = ""; _ck(_v, 64, 0, currVal_45); var currVal_46 = _co.passwordRegEx; _ck(_v, 65, 0, currVal_46); var currVal_47 = "password"; var currVal_48 = _co.newUser.password; _ck(_v, 68, 0, currVal_47, currVal_48); var currVal_49 = (i1.ɵnov(_v, 68).invalid && (i1.ɵnov(_v, 68).dirty || i1.ɵnov(_v, 68).touched)); _ck(_v, 72, 0, currVal_49); var currVal_58 = ""; _ck(_v, 76, 0, currVal_58); var currVal_59 = "cpassword"; var currVal_60 = _co.cfPass; _ck(_v, 79, 0, currVal_59, currVal_60); var currVal_61 = (i1.ɵnov(_v, 79).invalid && (i1.ɵnov(_v, 79).dirty || i1.ɵnov(_v, 79).touched)); _ck(_v, 83, 0, currVal_61); var currVal_62 = _co.noMatch; _ck(_v, 85, 0, currVal_62); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵnov(_v, 8).target; var currVal_1 = i1.ɵnov(_v, 8).href; _ck(_v, 7, 0, currVal_0, currVal_1); var currVal_3 = i1.ɵnov(_v, 37).ngClassUntouched; var currVal_4 = i1.ɵnov(_v, 37).ngClassTouched; var currVal_5 = i1.ɵnov(_v, 37).ngClassPristine; var currVal_6 = i1.ɵnov(_v, 37).ngClassDirty; var currVal_7 = i1.ɵnov(_v, 37).ngClassValid; var currVal_8 = i1.ɵnov(_v, 37).ngClassInvalid; var currVal_9 = i1.ɵnov(_v, 37).ngClassPending; _ck(_v, 33, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_10 = (i1.ɵnov(_v, 41).required ? "" : null); var currVal_11 = i1.ɵnov(_v, 46).ngClassUntouched; var currVal_12 = i1.ɵnov(_v, 46).ngClassTouched; var currVal_13 = i1.ɵnov(_v, 46).ngClassPristine; var currVal_14 = i1.ɵnov(_v, 46).ngClassDirty; var currVal_15 = i1.ɵnov(_v, 46).ngClassValid; var currVal_16 = i1.ɵnov(_v, 46).ngClassInvalid; var currVal_17 = i1.ɵnov(_v, 46).ngClassPending; _ck(_v, 39, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); var currVal_22 = (i1.ɵnov(_v, 52).required ? "" : null); var currVal_23 = (i1.ɵnov(_v, 53).pattern ? i1.ɵnov(_v, 53).pattern : null); var currVal_24 = i1.ɵnov(_v, 58).ngClassUntouched; var currVal_25 = i1.ɵnov(_v, 58).ngClassTouched; var currVal_26 = i1.ɵnov(_v, 58).ngClassPristine; var currVal_27 = i1.ɵnov(_v, 58).ngClassDirty; var currVal_28 = i1.ɵnov(_v, 58).ngClassValid; var currVal_29 = i1.ɵnov(_v, 58).ngClassInvalid; var currVal_30 = i1.ɵnov(_v, 58).ngClassPending; _ck(_v, 50, 0, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30); var currVal_36 = (i1.ɵnov(_v, 64).required ? "" : null); var currVal_37 = (i1.ɵnov(_v, 65).pattern ? i1.ɵnov(_v, 65).pattern : null); var currVal_38 = i1.ɵnov(_v, 70).ngClassUntouched; var currVal_39 = i1.ɵnov(_v, 70).ngClassTouched; var currVal_40 = i1.ɵnov(_v, 70).ngClassPristine; var currVal_41 = i1.ɵnov(_v, 70).ngClassDirty; var currVal_42 = i1.ɵnov(_v, 70).ngClassValid; var currVal_43 = i1.ɵnov(_v, 70).ngClassInvalid; var currVal_44 = i1.ɵnov(_v, 70).ngClassPending; _ck(_v, 62, 0, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44); var currVal_50 = (i1.ɵnov(_v, 76).required ? "" : null); var currVal_51 = i1.ɵnov(_v, 81).ngClassUntouched; var currVal_52 = i1.ɵnov(_v, 81).ngClassTouched; var currVal_53 = i1.ɵnov(_v, 81).ngClassPristine; var currVal_54 = i1.ɵnov(_v, 81).ngClassDirty; var currVal_55 = i1.ɵnov(_v, 81).ngClassValid; var currVal_56 = i1.ɵnov(_v, 81).ngClassInvalid; var currVal_57 = i1.ɵnov(_v, 81).ngClassPending; _ck(_v, 74, 0, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57); var currVal_63 = (i1.ɵnov(_v, 35).invalid || _co.noMatch); _ck(_v, 86, 0, currVal_63); }); }
exports.View_SignupComponent_0 = View_SignupComponent_0;
function View_SignupComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-signup", [], null, null, null, View_SignupComponent_0, RenderType_SignupComponent)), i1.ɵdid(1, 114688, null, 0, i5.SignupComponent, [i6.AuthService, i3.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_SignupComponent_Host_0 = View_SignupComponent_Host_0;
var SignupComponentNgFactory = i1.ɵccf("app-signup", i5.SignupComponent, View_SignupComponent_Host_0, {}, {}, []);
exports.SignupComponentNgFactory = SignupComponentNgFactory;


/***/ }),

/***/ "./src/app/components/signup/signup.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/signup/signup.component.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var constant_1 = __webpack_require__(/*! ../../common/constant */ "./src/app/common/constant.ts");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService, _router) {
        this.authService = authService;
        this._router = _router;
        this.emailRegEx = constant_1.Constant.EMAIL_REG_EX;
        this.passwordRegEx = constant_1.Constant.PASSWORD_REG_EX;
        this.newUser = {};
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.cfPass = '';
        this.noMatch = false;
    };
    SignupComponent.prototype.fnCheckPassword = function (password, cfPassword) {
        if (!cfPassword) {
            this.noMatch = false;
        }
        else {
            if (password !== cfPassword) {
                this.noMatch = true;
            }
            else {
                this.noMatch = false;
            }
        }
    };
    SignupComponent.prototype.fnRegisterUser = function (newUser) {
        var _this = this;
        this.authService.signUp(newUser)
            .then(function (res) {
            _this._router.navigate(['dashboard']);
        }).catch(function (error) {
        });
    };
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;


/***/ }),

/***/ "./src/app/components/video/video.component.css.shim.ngstyle.js":
/*!**********************************************************************!*\
  !*** ./src/app/components/video/video.component.css.shim.ngstyle.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = [".chat[_ngcontent-%COMP%] {\n  float: left;\n  background: #f2f5f8;\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  color: #434651;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 2px solid white;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 10px;\n  margin-top: 6px;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-with[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 16px;\n}"];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/video/video.component.ngfactory.js":
/*!***************************************************************!*\
  !*** ./src/app/components/video/video.component.ngfactory.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./video.component.css.shim.ngstyle */ "./src/app/components/video/video.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i3 = __webpack_require__(/*! ./video.component */ "./src/app/components/video/video.component.ts");
var i4 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i5 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var i6 = __webpack_require__(/*! @angular/router */ "@angular/router");
var styles_VideoComponent = [i0.styles];
var RenderType_VideoComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_VideoComponent, data: {} });
exports.RenderType_VideoComponent = RenderType_VideoComponent;
function View_VideoComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 14, "div", [["class", "chat h-100 w-100"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 6, "div", [["class", "chat-header clearfix"]], null, null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 3, "div", [["class", "chat-about"]], null, null, null, null, null)), (_l()(), i1.ɵeld(3, 0, null, null, 2, "div", [["class", "chat-with"]], null, null, null, null, null)), (_l()(), i1.ɵted(4, null, ["", " "])), i1.ɵppd(5, 1), (_l()(), i1.ɵeld(6, 0, null, null, 0, "i", [["class", "fa fa-pencil-square-o fa-lg pull-right m-2 c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnShowChat("whiteboard") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(7, 0, null, null, 0, "i", [["class", "fa fa-commenting-o fa-lg pull-right m-2 c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnShowChat("chat") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(8, 0, null, null, 4, "div", [["id", "videoContainer"]], null, null, null, null, null)), (_l()(), i1.ɵeld(9, 0, null, null, 1, "div", [["id", "localVideoController"]], null, null, null, null, null)), (_l()(), i1.ɵeld(10, 0, null, null, 0, "video", [["autoplay", ""], ["id", "localVideo"]], null, null, null, null, null)), (_l()(), i1.ɵeld(11, 0, null, null, 1, "div", [["id", "remoteVideoContainer"]], null, null, null, null, null)), (_l()(), i1.ɵeld(12, 0, null, null, 0, "video", [["autoplay", ""], ["id", "remoteVideo"]], null, null, null, null, null)), (_l()(), i1.ɵeld(13, 0, null, null, 1, "div", [["id", "control"]], null, null, null, null, null)), (_l()(), i1.ɵeld(14, 0, null, null, 0, "input", [["id", "startButton"], ["type", "button"]], [[8, "value", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.isHangUp ? _co.start(true) : _co.hangUpCall()) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵunv(_v, 4, 0, _ck(_v, 5, 0, i1.ɵnov(_v.parent, 0), _co.selectedUser.username)); _ck(_v, 4, 0, currVal_0); var currVal_1 = (_co.isHangUp ? "Start Call" : "Hang Up"); _ck(_v, 14, 0, currVal_1); }); }
function View_VideoComponent_0(_l) { return i1.ɵvid(0, [i1.ɵpid(0, i2.TitleCasePipe, []), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_VideoComponent_1)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selectedUser; _ck(_v, 2, 0, currVal_0); }, null); }
exports.View_VideoComponent_0 = View_VideoComponent_0;
function View_VideoComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-video", [], null, null, null, View_VideoComponent_0, RenderType_VideoComponent)), i1.ɵdid(1, 4308992, null, 0, i3.VideoComponent, [i4.SocketService, i5.AuthService, i6.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_VideoComponent_Host_0 = View_VideoComponent_Host_0;
var VideoComponentNgFactory = i1.ɵccf("app-video", i3.VideoComponent, View_VideoComponent_Host_0, { selectedUser: "selectedUser" }, { EventShowVideo: "EventShowVideo" }, []);
exports.VideoComponentNgFactory = VideoComponentNgFactory;


/***/ }),

/***/ "./src/app/components/video/video.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/video/video.component.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var socket_service_1 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var router_1 = __webpack_require__(/*! @angular/router */ "@angular/router");
var VideoComponent = /** @class */ (function () {
    function VideoComponent(socketService, authService, router) {
        var _this = this;
        this.socketService = socketService;
        this.authService = authService;
        this.router = router;
        this.EventShowVideo = new core_1.EventEmitter();
        this.getUserMediaSuccess = function (stream) {
            console.log('stream', stream);
            _this.localStream = stream;
            _this.localVideo.src = window.URL.createObjectURL(stream);
            if (stream.getAudioTracks().length > 0) {
                console.log('in');
            }
        };
        this.start = function (isCaller) {
            _this.isHangUp = false;
            _this.createPeerConnection();
            var offerOptions = {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1,
            };
            if (isCaller) {
                _this.rtcPeerConnection.createOffer(offerOptions)
                    .then(function (desc) { return _this.setLocalAndOffer(desc); })
                    .catch(function (e) { return console.log(e); });
            }
        };
        this.createPeerConnection = function () {
            _this.rtcPeerConnection = new RTCPeerConnection(_this.iceServers);
            _this.rtcPeerConnection.onicecandidate = _this.onIceCandidate;
            _this.rtcPeerConnection.onaddstream = _this.onAddStream;
            _this.rtcPeerConnection.addStream(_this.localStream);
        };
        this.onAddStream = function (event) {
            _this.remoteVideo.src = URL.createObjectURL(event.stream);
            _this.remoteStream = event.stream;
            if (_this.remoteStream.getAudioTracks().length > 0) {
                console.log('Remote user is sending Audio');
            }
            else {
                console.log('Remote user is not sending Audio');
            }
        };
        this.setLocalAndOffer = function (sessionDescription) {
            _this.rtcPeerConnection.setLocalDescription(sessionDescription);
            var data = {
                type: 'offer',
                fromUserId: _this.user.id,
                sdp: sessionDescription,
                toUserId: _this.selectedUser.id
            };
            _this.socketService.startOffer(data);
        };
        this.setLocalAndAnswer = function (sessionDescription) {
            _this.rtcPeerConnection.setLocalDescription(sessionDescription);
            var data = {
                type: 'answer',
                fromUserId: _this.user.id,
                sdp: sessionDescription,
                toUserId: _this.selectedUser.id
            };
            _this.socketService.startAnswer(data);
        };
        this.onIceCandidate = function (event) {
            if (event.candidate) {
                var data = {
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    toUserId: _this.selectedUser.id,
                    fromUserId: _this.user.id,
                };
                _this.socketService.startCandidate(data);
            }
        };
        this.hangUpCall = function () {
            _this.closeVideoCall();
            var data = {
                type: 'hang-up',
                toUserId: _this.selectedUser.id,
                fromUserId: _this.user.id,
            };
            _this.isHangUp = true;
            _this.socketService.hangUp(data);
        };
        this.closeVideoCall = function () {
            if (_this.rtcPeerConnection) {
                if (_this.remoteVideo.src) {
                    _this.remoteVideo.src = null;
                }
                _this.rtcPeerConnection.close();
                _this.rtcPeerConnection = null;
            }
        };
        this.user = authService.getAuthUser();
        this.chatMessage = '';
        this.isHangUp = true;
        this.iceServers = {
            'iceServers': [
                {
                    'url': 'stun:stun.services.mozilla.com'
                },
                {
                    'url': 'stun:stun.l.google.com:19302'
                }
            ]
        };
    }
    VideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var constraints = {
            video: true,
            audio: true,
        };
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            _this.getUserMediaSuccess(stream);
        });
    };
    VideoComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.localVideo = document.getElementById('localVideo');
        this.remoteVideo = document.getElementById('remoteVideo');
        this.socketService.receiveOfferResponse().subscribe(function (data) {
            if (!_this.rtcPeerConnection) {
                _this.start(false);
            }
            _this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
            _this.rtcPeerConnection.createAnswer()
                .then(function (desc) { return _this.setLocalAndAnswer(desc); })
                .catch(function (e) { return console.log(e); });
        });
        this.socketService.receiveAnswerResponse().subscribe(function (data) {
            _this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
        });
        this.socketService.receiveHangupResponse().subscribe(function (data) {
            _this.isHangUp = true;
            _this.closeVideoCall();
        });
        this.socketService.receiveCandidateResponse().subscribe(function (data) {
            var candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate
            });
            _this.rtcPeerConnection.addIceCandidate(candidate);
        });
    };
    VideoComponent.prototype.fnShowChat = function (type) {
        this.EventShowVideo.next(type);
    };
    return VideoComponent;
}());
exports.VideoComponent = VideoComponent;


/***/ }),

/***/ "./src/app/components/whiteboard/whiteboard.component.css.shim.ngstyle.js":
/*!********************************************************************************!*\
  !*** ./src/app/components/whiteboard/whiteboard.component.css.shim.ngstyle.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var styles = ["@import url(https://fonts.googleapis.com/css?family=Lato:400,700);\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after {\n  box-sizing: border-box;\n}\nbody[_ngcontent-%COMP%] {\n  background: #c5ddeb;\n  font: 14px/20px \"Lato\", Arial, sans-serif;\n  padding: 40px 0;\n  color: white;\n}\n.container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  background: #444753;\n  border-radius: 5px;\n}\n.people-list[_ngcontent-%COMP%] {\n  \n}\n.people-list[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.people-list[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border-radius: 3px;\n  border: none;\n  padding: 14px;\n  color: white;\n  background: #6a6c75;\n  width: 95%;\n  font-size: 14px;\n}\n.people-list[_ngcontent-%COMP%]   .fa-search[_ngcontent-%COMP%] {\n  position: relative;\n  left: -25px;\n}\n.people-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding: 20px;\n  height: 80%;\n  overflow: auto;\n}\n.people-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n  list-style: none;\n}\n.people-list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n}\n.people-list[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  float: left;\n  margin-top: 8px;\n}\n.people-list[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  padding-left: 8px;\n}\n.people-list[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  color: #92959e;\n}\n.chat[_ngcontent-%COMP%] {\n  float: left;\n  background: #f2f5f8;\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  color: #434651;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-bottom: 2px solid white;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  float: left;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-about[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 10px;\n  margin-top: 6px;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-with[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 16px;\n}\n.chat[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%]   .chat-num-messages[_ngcontent-%COMP%] {\n  color: #92959e;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%] {\n  padding: 10px 10px 5px;\n  border-bottom: 2px solid white;\n  overflow-y: hidden;\n  height: 90%;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message-data-time[_ngcontent-%COMP%] {\n  color: #a8aab1;\n  padding-left: 6px;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  color: white;\n  padding: 8px 10px;\n  line-height: 26px;\n  font-size: 16px;\n  border-radius: 7px;\n  margin-bottom: 20px;\n  width: 90%;\n  position: relative;\n  word-break: break-all;\n  white-space: pre-line;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]:after {\n  bottom: 100%;\n  left: 7%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-bottom-color: #86bb71;\n  border-width: 10px;\n  margin-left: -10px;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .my-message[_ngcontent-%COMP%] {\n  background: #86bb71;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .other-message[_ngcontent-%COMP%] {\n  background: #94c2ed;\n}\n.chat[_ngcontent-%COMP%]   .chat-history[_ngcontent-%COMP%]   .other-message[_ngcontent-%COMP%]:after {\n  border-bottom-color: #94c2ed;\n  left: 93%;\n}\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%] {\n  padding: 10px;\n  position: relative;\n}\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  padding: 10px 20px;\n  font: 14px/22px \"Lato\", Arial, sans-serif;\n  margin-bottom: 10px;\n  border-radius: 5px;\n  resize: none;\n}\n.chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]   .fa-file-o[_ngcontent-%COMP%], .chat[_ngcontent-%COMP%]   .chat-message[_ngcontent-%COMP%]   .fa-file-image-o[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: gray;\n  cursor: pointer;\n}\n.chat-loader[_ngcontent-%COMP%]{\n  \n}\n.online[_ngcontent-%COMP%] {\n  color: #86bb71;\n}\n.offline[_ngcontent-%COMP%] {\n  color: #e38968;\n}\n.me[_ngcontent-%COMP%] {\n  color: #94c2ed;\n}\n.align-left[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.align-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.float-right[_ngcontent-%COMP%] {\n  float: right;\n}\n.clearfix[_ngcontent-%COMP%]:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\nli[_ngcontent-%COMP%]{\n  list-style: none;\n}\n.whiteboard[_ngcontent-%COMP%]{\n  border:2px solid #000;\n  border-radius: 10px;\n}\n.fa-2[_ngcontent-%COMP%]{\n  font-size: 8px;\n}\n.fa-4[_ngcontent-%COMP%]{\n  font-size: 10px;\n}\n.fa-10[_ngcontent-%COMP%]{\n  font-size: 14px;\n}\n.btn-group[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height:36px;\n}\n.active[_ngcontent-%COMP%] {\n  border: 2px solid #17a2b8;\n}"];
exports.styles = styles;


/***/ }),

/***/ "./src/app/components/whiteboard/whiteboard.component.ngfactory.js":
/*!*************************************************************************!*\
  !*** ./src/app/components/whiteboard/whiteboard.component.ngfactory.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = __webpack_require__(/*! ./whiteboard.component.css.shim.ngstyle */ "./src/app/components/whiteboard/whiteboard.component.css.shim.ngstyle.js");
var i1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var i2 = __webpack_require__(/*! @angular/common */ "@angular/common");
var i3 = __webpack_require__(/*! ./whiteboard.component */ "./src/app/components/whiteboard/whiteboard.component.ts");
var i4 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var i5 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var styles_WhiteboardComponent = [i0.styles];
var RenderType_WhiteboardComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_WhiteboardComponent, data: {} });
exports.RenderType_WhiteboardComponent = RenderType_WhiteboardComponent;
function View_WhiteboardComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "chat-with"]], null, null, null, null, null)), (_l()(), i1.ɵted(1, null, ["", " "])), i1.ɵppd(2, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵunv(_v, 1, 0, _ck(_v, 2, 0, i1.ɵnov(_v.parent, 0), _co.selectedUser.username)); _ck(_v, 1, 0, currVal_0); }); }
function View_WhiteboardComponent_0(_l) { return i1.ɵvid(0, [i1.ɵpid(0, i2.TitleCasePipe, []), (_l()(), i1.ɵeld(1, 0, null, null, 28, "div", [["class", "chat h-100 w-100"]], [[8, "hidden", 0]], null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 25, "div", [["class", "chat-header clearfix d-flex"]], null, null, null, null, null)), (_l()(), i1.ɵeld(3, 0, null, null, 2, "div", [["class", "chat-about"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_WhiteboardComponent_1)), i1.ɵdid(5, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(6, 0, null, null, 21, "div", [["class", "ml-auto"]], null, null, null, null, null)), (_l()(), i1.ɵeld(7, 0, null, null, 20, "ul", [["class", "toolbar nav"]], null, null, null, null, null)), (_l()(), i1.ɵeld(8, 0, null, null, 1, "li", [["class", "nav-item active"]], null, null, null, null, null)), (_l()(), i1.ɵeld(9, 0, null, null, 0, "i", [["class", "fa fa-pencil m-2"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnPen($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(10, 0, null, null, 1, "li", [["class", "nav-item"]], null, null, null, null, null)), (_l()(), i1.ɵeld(11, 0, null, null, 0, "i", [["class", "fa fa-eraser m-2"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnErase($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(12, 0, null, null, 1, "li", [["class", "nav-item"]], null, null, null, null, null)), (_l()(), i1.ɵeld(13, 0, null, null, 0, "input", [["class", "m-1"], ["id", "colorpicker"], ["type", "color"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.onColorUpdate($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(14, 0, null, null, 8, "li", [["class", "nav-item"]], null, null, null, null, null)), (_l()(), i1.ɵeld(15, 0, null, null, 7, "div", [["aria-label", "Toolbar with button groups"], ["class", "btn-toolbar"], ["role", "toolbar"]], null, null, null, null, null)), (_l()(), i1.ɵeld(16, 0, null, null, 6, "div", [["aria-label", "First group"], ["class", "btn-group mr-2 btn-group-sm"], ["role", "group"]], null, null, null, null, null)), (_l()(), i1.ɵeld(17, 0, null, null, 1, "button", [["class", "btn fa-2 active"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnSetlineWidth($event, 2) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(18, 0, null, null, 0, "i", [["class", "fa fa-ws fa-circle"]], null, null, null, null, null)), (_l()(), i1.ɵeld(19, 0, null, null, 1, "button", [["class", "btn fa-4"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnSetlineWidth($event, 4) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(20, 0, null, null, 0, "i", [["class", "fa fa-ws fa-circle"]], null, null, null, null, null)), (_l()(), i1.ɵeld(21, 0, null, null, 1, "button", [["class", "btn fa-10"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnSetlineWidth($event, 10) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(22, 0, null, null, 0, "i", [["class", "fa fa-ws fa-circle"]], null, null, null, null, null)), (_l()(), i1.ɵeld(23, 0, null, null, 1, "li", [["class", "nav-item"]], null, null, null, null, null)), (_l()(), i1.ɵeld(24, 0, null, null, 0, "i", [["class", "fa fa-times-circle m-2"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnClear($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(25, 0, null, null, 2, "li", [["class", "nav-item"]], null, null, null, null, null)), (_l()(), i1.ɵeld(26, 0, null, null, 0, "i", [["class", "fa fa-video-camera fa-lg pull-right m-2 c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnShowChat("video") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(27, 0, null, null, 0, "i", [["class", "fa fa-commenting-o fa-lg pull-right m-2 c-pointer"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fnShowChat("chat") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(28, 0, null, null, 1, "div", [["class", "chat-history p-0"], ["style", "position: relative"]], null, null, null, null, null)), (_l()(), i1.ɵeld(29, 0, null, null, 0, "canvas", [["class", "whiteboard"]], null, [[null, "mouseup"], [null, "mouseout"], [null, "mousedown"], [null, "mousemove"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("mouseup" === en)) {
        var pd_0 = (_co.fnOnMouseUp($event) !== false);
        ad = (pd_0 && ad);
    } if (("mouseout" === en)) {
        var pd_1 = (_co.fnOnMouseUp($event) !== false);
        ad = (pd_1 && ad);
    } if (("mousedown" === en)) {
        var pd_2 = (_co.fnOnMouseDown($event) !== false);
        ad = (pd_2 && ad);
    } if (("mousemove" === en)) {
        var pd_3 = (_co.fnOnMouseMove($event) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.selectedUser; _ck(_v, 5, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.selectedUser; _ck(_v, 1, 0, currVal_0); }); }
exports.View_WhiteboardComponent_0 = View_WhiteboardComponent_0;
function View_WhiteboardComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-whiteboard", [], null, null, null, View_WhiteboardComponent_0, RenderType_WhiteboardComponent)), i1.ɵdid(1, 638976, null, 0, i3.WhiteboardComponent, [i4.SocketService, i5.AuthService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_WhiteboardComponent_Host_0 = View_WhiteboardComponent_Host_0;
var WhiteboardComponentNgFactory = i1.ɵccf("app-whiteboard", i3.WhiteboardComponent, View_WhiteboardComponent_Host_0, { selectedUserInfo: "selectedUserInfo", selectedUser: "selectedUser" }, { EventShowChat: "EventShowChat" }, []);
exports.WhiteboardComponentNgFactory = WhiteboardComponentNgFactory;


/***/ }),

/***/ "./src/app/components/whiteboard/whiteboard.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/whiteboard/whiteboard.component.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var socket_service_1 = __webpack_require__(/*! ../../common/services/socket/socket.service */ "./src/app/common/services/socket/socket.service.ts");
var auth_service_1 = __webpack_require__(/*! ../../common/services/auth/auth.service */ "./src/app/common/services/auth/auth.service.ts");
var WhiteboardComponent = /** @class */ (function () {
    function WhiteboardComponent(socketService, authService) {
        var _this = this;
        this.socketService = socketService;
        this.authService = authService;
        this.EventShowChat = new core_1.EventEmitter();
        this.onColorUpdate = function (e) {
            _this.selectedColor = e.target.value;
            _this.current.color = e.target.value;
        };
        this.fnErase = function (e) {
            document.getElementById('colorpicker')['disabled'] = true;
            _this.current.color = '#f2f5f8';
            _this.fnSetSelected(e);
        };
        this.fnPen = function (e) {
            document.getElementById('colorpicker')['disabled'] = false;
            _this.current.color = _this.selectedColor;
            _this.fnSetSelected(e);
        };
        this.fnClear = function (e) {
            _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.socketService.clearWhiteBoardCanvas({
                fromUserId: _this.user.id,
                toUserId: _this.selectedUser.id
            });
            _this.fnSetSelected(e);
        };
        this.fnDrawLine = function (x0, y0, x1, y1, color, lineWidth, emit) {
            _this.context.beginPath();
            _this.context.moveTo(x0, y0);
            _this.context.lineTo(x1, y1);
            _this.context.lineCap = 'round';
            _this.context.lineWidth = lineWidth;
            _this.context.strokeStyle = color;
            _this.context.stroke();
            _this.context.closePath();
            if (!emit) {
                return;
            }
            var w = _this.canvas['width'];
            var h = _this.canvas['height'];
            _this.socketService.drawLine({
                x0: x0 / w,
                y0: y0 / h,
                x1: x1 / w,
                y1: y1 / h,
                color: color,
                lineWidth: lineWidth,
                fromUserId: _this.user.id,
                toUserId: _this.selectedUser.id
            });
        };
        this.fnOnMouseDown = function (e) {
            _this.drawing = true;
            _this.current.x = e.offsetX;
            _this.current.y = e.offsetY;
        };
        this.fnOnMouseUp = function (e) {
            if (!_this.drawing) {
                return;
            }
            _this.drawing = false;
            _this.fnDrawLine(_this.current.x, _this.current.y, e.offsetX, e.offsetY, _this.current.color, _this.lineWidth, true);
        };
        this.fnOnMouseMove = function (e) {
            if (!_this.drawing) {
                return;
            }
            _this.fnDrawLine(_this.current.x, _this.current.y, e.offsetX, e.offsetY, _this.current.color, _this.lineWidth, true);
            _this.current.x = e.offsetX;
            _this.current.y = e.offsetY;
        };
        this.onDrawingEvent = function (data) {
            var w = _this.canvas['width'];
            var h = _this.canvas['height'];
            _this.fnDrawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.lineWidth);
        };
        this.user = authService.getAuthUser();
        this.drawing = false;
        this.lineWidth = 2;
        this.selectedColor = '#000000';
        this.current = {
            'color': 'black',
        };
    }
    WhiteboardComponent.prototype.fnShowChat = function (type) {
        this.EventShowChat.next(type);
    };
    WhiteboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketService.receiveDrawingData().subscribe(function (data) {
            /* subscribing for messages statrts */
            if (_this.selectedUser !== null && _this.selectedUser.id === data.fromUserId) {
                _this.onDrawingEvent(data);
            }
        });
        this.socketService.clearWhiteBoardCanvasResponse().subscribe(function (data) {
            /* subscribing for messages statrts */
            if (_this.selectedUser !== null && _this.selectedUser.id === data.fromUserId) {
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            }
        });
    };
    WhiteboardComponent.prototype.fnSetlineWidth = function (event, size) {
        var li = document.querySelectorAll('.btn-group button.active');
        if (li.length) {
            for (var i = 0; i < li.length; i++) {
                li[i].classList.remove('active');
            }
        }
        if (event.target.tagName === 'I') {
            event.target.parentNode.classList.add('active');
        }
        else {
            event.target.classList.add('active');
        }
        this.lineWidth = size;
    };
    WhiteboardComponent.prototype.fnInit = function () {
        this.canvas = document.getElementsByClassName('whiteboard')[0];
        this.canvas.width = this.canvas.parentNode.clientWidth - 10;
        this.canvas.height = this.canvas.parentNode.clientHeight - 10;
        this.context = this.canvas.getContext('2d');
    };
    WhiteboardComponent.prototype.fnSetSelected = function (event) {
        var li = document.querySelectorAll('.toolbar li.active');
        if (li.length) {
            for (var i = 0; i < li.length; i++) {
                li[i].classList.remove('active');
            }
        }
        event.target.parentNode.classList.add('active');
    };
    WhiteboardComponent.prototype.ngOnChanges = function (changes) {
        this.fnInit();
    };
    return WhiteboardComponent;
}());
exports.WhiteboardComponent = WhiteboardComponent;


/***/ }),

/***/ "./src/app/ngmodule.ts":
/*!*****************************!*\
  !*** ./src/app/ngmodule.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_server_module_ngfactory_1 = __webpack_require__(/*! ./app.server.module.ngfactory */ "./src/app/app.server.module.ngfactory.js");
exports.AppServerModuleNgFactory = app_server_module_ngfactory_1.AppServerModuleNgFactory;
var app_server_module_1 = __webpack_require__(/*! ./app.server.module */ "./src/app/app.server.module.ts");
exports.AppServerModule = app_server_module_1.AppServerModule;
exports.LAZY_MODULE_MAP = {};


/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/app/ngmodule.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Volumes/My Computer/Projects/Test/ChatDemoApp/ng6-udk-chat/src/app/ngmodule.ts */"./src/app/ngmodule.ts");


/***/ }),

/***/ "@angular/animations":
/*!**************************************!*\
  !*** external "@angular/animations" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/animations");

/***/ }),

/***/ "@angular/animations/browser":
/*!**********************************************!*\
  !*** external "@angular/animations/browser" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/animations/browser");

/***/ }),

/***/ "@angular/common":
/*!**********************************!*\
  !*** external "@angular/common" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),

/***/ "@angular/common/http":
/*!***************************************!*\
  !*** external "@angular/common/http" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/common/http");

/***/ }),

/***/ "@angular/core":
/*!********************************!*\
  !*** external "@angular/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@angular/forms":
/*!*********************************!*\
  !*** external "@angular/forms" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),

/***/ "@angular/http":
/*!********************************!*\
  !*** external "@angular/http" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/http");

/***/ }),

/***/ "@angular/platform-browser":
/*!********************************************!*\
  !*** external "@angular/platform-browser" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser");

/***/ }),

/***/ "@angular/platform-browser/animations":
/*!*******************************************************!*\
  !*** external "@angular/platform-browser/animations" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser/animations");

/***/ }),

/***/ "@angular/platform-server":
/*!*******************************************!*\
  !*** external "@angular/platform-server" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-server");

/***/ }),

/***/ "@angular/router":
/*!**********************************!*\
  !*** external "@angular/router" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/router");

/***/ }),

/***/ "@nguniversal/module-map-ngfactory-loader":
/*!***********************************************************!*\
  !*** external "@nguniversal/module-map-ngfactory-loader" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nguniversal/module-map-ngfactory-loader");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "ng-emoji-picker/emoji-picker.module":
/*!******************************************************!*\
  !*** external "ng-emoji-picker/emoji-picker.module" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ng-emoji-picker/emoji-picker.module");

/***/ }),

/***/ "ng-emoji-picker/src/emoji-input/emoji-input.component":
/*!************************************************************************!*\
  !*** external "ng-emoji-picker/src/emoji-input/emoji-input.component" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ng-emoji-picker/src/emoji-input/emoji-input.component");

/***/ }),

/***/ "ng-emoji-picker/src/emoji.service":
/*!****************************************************!*\
  !*** external "ng-emoji-picker/src/emoji.service" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ng-emoji-picker/src/emoji.service");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ })

/******/ })));