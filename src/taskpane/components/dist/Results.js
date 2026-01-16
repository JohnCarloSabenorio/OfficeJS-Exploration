"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AlertMessage_1 = require("./message/AlertMessage");
var Slide_1 = require("./Slide");
function Results(_a) {
    var presentationErrors = _a.presentationErrors;
    console.log("presentation errors:", presentationErrors);
    return (react_1["default"].createElement("section", { className: "h-full bg-gray-100 flex-1 mt-3 p-3" },
        react_1["default"].createElement("h1", { className: "text-2xl" }, "Vitals"),
        react_1["default"].createElement(AlertMessage_1["default"], { anomaliesExist: Object.keys(presentationErrors).length != 0 }),
        react_1["default"].createElement("div", { className: "h-full w-full flex flex-col gap-3 py-3" }, presentationErrors != null &&
            Object.keys(presentationErrors).map(function (slideNumber, idx) {
                if (presentationErrors[slideNumber])
                    return (react_1["default"].createElement(Slide_1["default"], { key: idx, slideProblems: presentationErrors[slideNumber], slideNumber: parseInt(slideNumber) }));
                return react_1["default"].createElement(react_1["default"].Fragment, null);
            }))));
}
exports["default"] = Results;
