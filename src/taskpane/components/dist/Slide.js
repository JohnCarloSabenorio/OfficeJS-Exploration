"use strict";
exports.__esModule = true;
var react_1 = require("react");
function Slide(_a) {
    var slideNumber = _a.slideNumber, slideProblems = _a.slideProblems;
    return (react_1["default"].createElement("div", { className: "bg-white p-3" },
        react_1["default"].createElement("h1", { className: "font-bold" },
            "Slide ",
            slideNumber),
        (slideProblems.textDensityWarnings || slideProblems.textDensityErrors) && (react_1["default"].createElement("h1", { className: "text-3xl mt-3" }, "Text Density")),
        react_1["default"].createElement("div", { className: "mt-3" },
            react_1["default"].createElement("ul", { className: "list-disc text-amber-400 font-semibold mx-3" }, slideProblems.textDensityWarnings.map(function (error, idx) {
                return react_1["default"].createElement("li", { key: idx }, error);
            }))),
        react_1["default"].createElement("div", { className: "mt-3" },
            react_1["default"].createElement("ul", { className: "list-disc text-red-500 font-semibold mx-3" }, slideProblems.textDensityErrors.map(function (error, idx) {
                return react_1["default"].createElement("li", { key: idx }, error);
            })))));
}
exports["default"] = Slide;
