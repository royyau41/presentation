function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "firstpage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    $.__views.__alloyId0 = Ti.UI.createView({
        id: "__alloyId0"
    });
    $.__views.firstHonView.add($.__views.__alloyId0);
    $.__views.testId = Alloy.createWidget("nl.fokkezb.button", "widget", {
        borderWidth: 1,
        enabled: true,
        borderColor: "#FF22FF",
        backgroundColor: "#ccc",
        backgroundGradient: "",
        backgroundSelectedColor: "#FF22FF",
        activeStyle: {
            backgroundGradient: "",
            backgroundColor: "#000",
            color: "#fff"
        },
        title: "Primary",
        style: "bs-default",
        id: "testId",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.testId.setParent($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        id: "__alloyId1"
    });
    $.__views.firstHonView.add($.__views.__alloyId1);
    $.__views.testImg = Ti.UI.createImageView({
        height: "100",
        width: "100",
        id: "testImg"
    });
    $.__views.__alloyId1.add($.__views.testImg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;