"use strict";
exports.__esModule = true;
var react_1 = require("react");
function AlertMessage(_a) {
    var anomaliesExist = _a.anomaliesExist;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, !anomaliesExist ? (react_1["default"].createElement("p", { className: "text-green-500 font-bold text-center text-xl mt-5" }, "No Anomalies Detected.")) : (react_1["default"].createElement("p", { className: "text-red-500 font-bold text-center text-xl mt-5" }, "Anomalies Found."))));
}
exports["default"] = AlertMessage;
