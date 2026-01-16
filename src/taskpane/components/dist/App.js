"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var Header_1 = require("./Header");
var Results_1 = require("./Results");
var App = function (props) {
    // The list items are static and won't change at runtime,
    // so this should be an ordinary const, not a part of state.
    var _a = react_1.useState({}), presentationErrors = _a[0], setPresentationErrors = _a[1];
    var _b = react_1.useState(false), isScanning = _b[0], setIsScanning = _b[1];
    function scanSlideVitals() {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PowerPoint.run(function (context) { return __awaiter(_this, void 0, void 0, function () {
                            var slideCount, slideErrors, _loop_1, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        setIsScanning(true);
                                        slideCount = context.presentation.slides.getCount();
                                        return [4 /*yield*/, context.sync()];
                                    case 1:
                                        _a.sent();
                                        slideErrors = {};
                                        _loop_1 = function (i) {
                                            var slide, shapes, textShapes, textCount, textDensityWarnings, textDensityErrors;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        slide = context.presentation.slides.getItemAt(i);
                                                        shapes = slide.shapes;
                                                        shapes.load("type");
                                                        return [4 /*yield*/, context.sync()];
                                                    case 1:
                                                        _a.sent();
                                                        // load text frames
                                                        shapes.load("items/textFrame/hasText");
                                                        return [4 /*yield*/, context.sync()];
                                                    case 2:
                                                        _a.sent();
                                                        textShapes = shapes.items.filter(function (shape) { return shape.textFrame && shape.textFrame.hasText; });
                                                        // load text ranges
                                                        textShapes.forEach(function (textShape) {
                                                            textShape.textFrame.textRange.load("text");
                                                        });
                                                        return [4 /*yield*/, context.sync()];
                                                    case 3:
                                                        _a.sent();
                                                        textCount = 0;
                                                        // Get total text count
                                                        textShapes.forEach(function (textShape) {
                                                            var text = textShape.textFrame.textRange.text;
                                                            textCount += text.length;
                                                        });
                                                        textDensityWarnings = [];
                                                        textDensityErrors = [];
                                                        if (textCount > 400 && textCount <= 700) {
                                                            textDensityWarnings.push("Warning: Slide has too much text (400+ characters). Consider shortening or splitting the content.");
                                                        }
                                                        else if (textCount > 700) {
                                                            textDensityErrors.push("Error: Slide is overloaded with text (700+ characters). Break this into multiple slides or move details to speaker notes.");
                                                        }
                                                        if (textDensityWarnings.length > 0 || textDensityErrors.length > 0) {
                                                            slideErrors[i + 1] = __assign(__assign({}, slideErrors), { textDensityErrors: textDensityErrors, textDensityWarnings: textDensityWarnings });
                                                        }
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = 0;
                                        _a.label = 2;
                                    case 2:
                                        if (!(i < slideCount.value)) return [3 /*break*/, 5];
                                        return [5 /*yield**/, _loop_1(i)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        setPresentationErrors(slideErrors);
                                        setIsScanning(false);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "w-full h-[100vh] flex flex-col" },
        React.createElement(Header_1["default"], { logo: "assets/slidevitals-logo.png", title: props.title }),
        React.createElement("button", { onClick: scanSlideVitals, className: (isScanning ? "bg-gray-500" : "bg-orange-500 cursor-pointer") + " text-white text-xl font-bold rounded-md px-5 py-3 mt-3" }, isScanning ? "Scanning..." : "Scan Now"),
        React.createElement(Results_1["default"], { presentationErrors: presentationErrors })));
};
exports["default"] = App;
