function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "firstpage";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.firstPageRootView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.Fill,
        layout: "vertical",
        id: "firstPageRootView"
    });
    $.__views.firstPageRootView && $.addTopLevelView($.__views.firstPageRootView);
    $.__views.aboutUsView = Ti.UI.createView({
        height: "50%",
        width: "100%",
        id: "aboutUsView",
        layout: "vertical",
        borderWidth: "1",
        borderColor: "black"
    });
    $.__views.firstPageRootView.add($.__views.aboutUsView);
    $.__views.aboutUsLabelTitle = Ti.UI.createLabel({
        color: "red",
        font: {
            fontSize: 36
        },
        left: 30,
        top: 10,
        width: Ti.UI.FILL,
        text: "創思國際地產代理",
        id: "aboutUsLabelTitle"
    });
    $.__views.aboutUsView.add($.__views.aboutUsLabelTitle);
    $.__views.aboutUsLabelContent = Ti.UI.createLabel({
        color: "blue",
        font: {
            fontSize: 24
        },
        left: 30,
        width: Ti.UI.FILL,
        text: "創立於1986年，香港四大地產代理之一。\n我們以「給您最好的選擇」的理念，\n為每一位尊貴客戶提供最全面、最專的服務，\n創立20多年來，屢獲業界殊榮，地位備受肯定。",
        id: "aboutUsLabelContent"
    });
    $.__views.aboutUsView.add($.__views.aboutUsLabelContent);
    $.__views.firstHonView = Ti.UI.createView({
        height: "50%",
        width: "100%",
        id: "firstHonView"
    });
    $.__views.firstPageRootView.add($.__views.firstHonView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;