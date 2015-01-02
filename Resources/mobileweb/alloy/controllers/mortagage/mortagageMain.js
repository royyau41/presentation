function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mortagage/mortagageMain";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.morMainView = Ti.UI.createView({
        borderColor: Alloy.Globals.showdowColor,
        borderRadius: 8,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: "30",
        backgroundGradient: Alloy.Globals.basicBackgroundColor,
        width: "70%",
        left: "15%",
        right: "15%",
        id: "morMainView"
    });
    $.__views.morMainView && $.addTopLevelView($.__views.morMainView);
    $.__views.morTopView = Ti.UI.createView({
        layout: "horizontal",
        widht: "50%",
        height: Ti.UI.SIZE,
        id: "morTopView"
    });
    $.__views.morMainView.add($.__views.morTopView);
    $.__views.morTopSearchParaView = Ti.UI.createView({
        layout: "vertical",
        width: "50%",
        height: Ti.UI.SIZE,
        top: 20,
        id: "morTopSearchParaView"
    });
    $.__views.morTopView.add($.__views.morTopSearchParaView);
    $.__views.__alloyId15 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId15"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "業主叫價：",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        top: 10,
        left: 0,
        width: "65%",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId18"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "按揭比率：",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        top: 10,
        left: 0,
        width: "65%",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId21"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "利率：",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        top: 10,
        left: 0,
        width: "65%",
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId24"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "按揭年期：",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        top: 10,
        left: 0,
        width: "65%",
        id: "__alloyId26"
    });
    $.__views.__alloyId24.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId27"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "貸款金額：",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createTextField({
        color: "black",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        top: 10,
        left: 0,
        width: "65%",
        id: "__alloyId29"
    });
    $.__views.__alloyId27.add($.__views.__alloyId29);
    $.__views.morTopSmlResView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 20,
        layout: "vertical",
        id: "morTopSmlResView"
    });
    $.__views.morTopView.add($.__views.morTopSmlResView);
    $.__views.__alloyId30 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId30"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        color: "black",
        FONT: {
            FONTWEIGHT: "BOLD"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 17,
        left: 0,
        width: "30%",
        text: "首期：",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId32"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        color: "black",
        FONT: {
            FONTWEIGHT: "BOLD"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 17,
        left: 0,
        width: "30%",
        text: "每用供款：",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId34"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        color: "black",
        FONT: {
            FONTWEIGHT: "BOLD"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 17,
        left: 0,
        width: "30%",
        text: "總利息：",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId36"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        color: "black",
        FONT: {
            FONTWEIGHT: "BOLD"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 17,
        left: 0,
        width: "30%",
        text: "總貸款金額：",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId38"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId38);
    $.__views.morTopSmlResCal = Ti.UI.createButton({
        backgroundImage: "others/Calculate.png",
        width: "120px",
        top: 10,
        left: 0,
        id: "morTopSmlResCal"
    });
    $.__views.__alloyId38.add($.__views.morTopSmlResCal);
    $.__views.morBotView = Ti.UI.createView({
        top: 30,
        height: Ti.UI.SIZE,
        width: "70%",
        left: "15%",
        right: "15%",
        id: "morBotView"
    });
    $.__views.morMainView.add($.__views.morBotView);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        color: "black",
        text: "12312",
        id: "__alloyId39"
    });
    $.__views.morBotView.add($.__views.__alloyId39);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;