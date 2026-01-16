"use strict";
exports.__esModule = true;
var React = require("react");
var react_components_1 = require("@fluentui/react-components");
var useStyles = react_components_1.makeStyles({
    welcome__header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    message: {
        fontSize: react_components_1.tokens.fontSizeHero900,
        fontWeight: react_components_1.tokens.fontWeightRegular,
        fontColor: react_components_1.tokens.colorNeutralBackgroundStatic
    }
});
var Header = function (props) {
    var title = props.title, logo = props.logo;
    var styles = useStyles();
    return (React.createElement("section", { className: styles.welcome__header },
        React.createElement(react_components_1.Image, { width: "90", height: "90", src: logo, alt: title }),
        React.createElement("p", { className: "text-3xl mx-3 text-center italic" }, "Smart checks for better presentations.")));
};
exports["default"] = Header;
