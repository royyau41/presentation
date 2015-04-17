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
    this.__controllerPath = "reProp/rePropDetailTmpl2";
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
    $.__views.tmpl2Main = Ti.UI.createView({
        backgroundColor: "white",
        height: "90%",
        top: 20,
        left: 30,
        right: 30,
        borderWidth: 1,
        borderColor: "#CACACA",
        id: "tmpl2Main"
    });
    $.__views.tmpl2Main && $.addTopLevelView($.__views.tmpl2Main);
    $.__views.leftSrlView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        scrollType: "vertical",
        left: "0",
        height: Ti.UI.FILL,
        layout: "vertical",
        width: "30%",
        id: "leftSrlView"
    });
    $.__views.tmpl2Main.add($.__views.leftSrlView);
    $.__views.leftTitle = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        top: 15,
        left: 15,
        height: 50,
        width: Ti.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        borderRadius: "5",
        backgroundColor: "#65c200",
        id: "leftTitle",
        text: "出售"
    });
    $.__views.leftSrlView.add($.__views.leftTitle);
    $.__views.priceView = Ti.UI.createView({
        top: "15",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "priceView"
    });
    $.__views.leftSrlView.add($.__views.priceView);
    $.__views.__alloyId42 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId42"
    });
    $.__views.priceView.add($.__views.__alloyId42);
    $.__views.priceLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 15,
            width: 30,
            height: 70,
            color: "white"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            transform: Alloy.Globals.rotateLeft90,
            left: 10,
            width: 45,
            height: 30,
            color: "white"
        });
        _.extend(o, {
            id: "priceLabel",
            text: "售價"
        });
        return o;
    }());
    $.__views.__alloyId42.add($.__views.priceLabel);
    $.__views.__alloyId43 = Ti.UI.createView({
        width: Ti.UI.FILL,
        left: 50,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        left: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    $.__views.price = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 32
        },
        left: 0,
        width: "70%",
        height: Ti.UI.SIZE,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        textAlign: "left",
        id: "price",
        text: "1,630"
    });
    $.__views.__alloyId44.add($.__views.price);
    $.__views.priceUnit = Ti.UI.createLabel({
        color: "black",
        left: "55%",
        height: Ti.UI.SIZE,
        textAlign: "bottom",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "priceUnit",
        text: "萬元"
    });
    $.__views.__alloyId44.add($.__views.priceUnit);
    $.__views.hotBtn = Ti.UI.createButton({
        backgroundImage: "/temp/hot.png",
        width: "52dp",
        height: "37dp",
        right: 0,
        left: "75%",
        id: "hotBtn"
    });
    $.__views.__alloyId44.add($.__views.hotBtn);
    $.__views.__alloyId45 = Ti.UI.createView({
        left: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId45"
    });
    $.__views.__alloyId43.add($.__views.__alloyId45);
    $.__views.avgprice = Ti.UI.createLabel({
        color: "#28bee4",
        left: 0,
        top: 0,
        textAlign: "bottom",
        font: {
            fontSize: 21,
            fontWeight: "bold"
        },
        text: "@ 111",
        id: "avgprice"
    });
    $.__views.__alloyId45.add($.__views.avgprice);
    $.__views.__alloyId46 = Ti.UI.createView({
        bottom: 0,
        height: 1,
        left: 15,
        borderColor: "#CACACA",
        width: Ti.UI.FILL,
        borderWidth: 2,
        id: "__alloyId46"
    });
    $.__views.priceView.add($.__views.__alloyId46);
    $.__views.rentView = Ti.UI.createView({
        top: "15",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "rentView"
    });
    $.__views.leftSrlView.add($.__views.rentView);
    $.__views.__alloyId47 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId47"
    });
    $.__views.rentView.add($.__views.__alloyId47);
    $.__views.rentLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 15,
            width: 30,
            height: 70,
            color: "white"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            transform: Alloy.Globals.rotateLeft90,
            left: 10,
            width: 45,
            height: 30,
            color: "white"
        });
        _.extend(o, {
            id: "rentLabel",
            text: "租金"
        });
        return o;
    }());
    $.__views.__alloyId47.add($.__views.rentLabel);
    $.__views.__alloyId48 = Ti.UI.createView({
        width: Ti.UI.FILL,
        left: 50,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        left: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.rent = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 30
        },
        left: 0,
        height: Ti.UI.SIZE,
        textAlign: "center",
        id: "rent",
        text: "1234"
    });
    $.__views.__alloyId49.add($.__views.rent);
    $.__views.__alloyId50 = Ti.UI.createView({
        left: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId50"
    });
    $.__views.__alloyId48.add($.__views.__alloyId50);
    $.__views.avgrent = Ti.UI.createLabel({
        color: "#28bee4",
        left: 0,
        top: 0,
        textAlign: "bottom",
        font: {
            fontSize: 21,
            fontWeight: "bold"
        },
        text: "@ 111",
        id: "avgrent"
    });
    $.__views.__alloyId50.add($.__views.avgrent);
    $.__views.__alloyId51 = Ti.UI.createView({
        bottom: 0,
        height: 1,
        left: 15,
        borderColor: "#CACACA",
        width: Ti.UI.FILL,
        borderWidth: 2,
        id: "__alloyId51"
    });
    $.__views.rentView.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createView({
        layout: "horizontal",
        top: "15",
        height: Ti.UI.SIZE,
        id: "__alloyId52"
    });
    $.__views.leftSrlView.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId53"
    });
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.areaLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 15,
            width: 30,
            height: 70,
            color: "white"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            transform: Alloy.Globals.rotateLeft90,
            left: 10,
            width: 45,
            height: 30,
            color: "white"
        });
        _.extend(o, {
            id: "areaLabel",
            text: "面積"
        });
        return o;
    }());
    $.__views.__alloyId53.add($.__views.areaLabel);
    $.__views.__alloyId54 = Ti.UI.createView({
        width: Ti.UI.FILL,
        left: 50,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createView({
        left: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.netUnit = Ti.UI.createLabel({
        color: "black",
        left: "0",
        height: Ti.UI.SIZE,
        textAlign: "bottom",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "netUnit",
        text: "實用 :"
    });
    $.__views.__alloyId55.add($.__views.netUnit);
    $.__views.netarea = Ti.UI.createLabel({
        color: "black",
        id: "netarea",
        text: "1,146 呎"
    });
    $.__views.__alloyId55.add($.__views.netarea);
    $.__views.__alloyId56 = Ti.UI.createView({
        left: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.grossUnit = Ti.UI.createLabel({
        color: "black",
        left: "0",
        height: Ti.UI.SIZE,
        textAlign: "bottom",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "grossUnit",
        text: "建築 :"
    });
    $.__views.__alloyId56.add($.__views.grossUnit);
    $.__views.grossarea = Ti.UI.createLabel({
        color: "black",
        id: "grossarea",
        text: "1,146 呎"
    });
    $.__views.__alloyId56.add($.__views.grossarea);
    $.__views.__alloyId57 = Ti.UI.createView({
        bottom: 0,
        height: 1,
        left: 15,
        borderColor: "#CACACA",
        width: Ti.UI.FILL,
        borderWidth: 2,
        id: "__alloyId57"
    });
    $.__views.__alloyId52.add($.__views.__alloyId57);
    $.__views.otherMainView = Ti.UI.createView({
        top: "15",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "otherMainView"
    });
    $.__views.leftSrlView.add($.__views.otherMainView);
    $.__views.__alloyId58 = Ti.UI.createView(function() {
        var o = {};
        Alloy.Globals.checkLang("c") && _.extend(o, {
            top: 0,
            left: 10,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "__alloyId58"
        });
        return o;
    }());
    $.__views.otherMainView.add($.__views.__alloyId58);
    $.__views.othersLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 5,
            top: 10,
            bottom: 5,
            width: 30,
            height: Ti.UI.SIZE,
            color: "black"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 15,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 0,
            top: 30,
            bottom: 0,
            width: 65,
            height: 30,
            transform: Alloy.Globals.rotateLeft90,
            color: "black"
        });
        _.extend(o, {
            text: "其他資料",
            id: "othersLabel"
        });
        return o;
    }());
    $.__views.__alloyId58.add($.__views.othersLabel);
    $.__views.__alloyId59 = Ti.UI.createView(function() {
        var o = {};
        Alloy.Globals.checkLang("c") && _.extend(o, {
            left: 40,
            top: 0,
            bottom: 0,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            left: 50,
            top: 0,
            bottom: 0,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        _.extend(o, {
            id: "__alloyId59"
        });
        return o;
    }());
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createView({
        top: 5,
        height: Ti.UI.SIZE,
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
        color: "black",
        width: "38%",
        left: 10,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "入伙年份：",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        color: "#151ba5",
        left: "38%",
        width: Ti.UI.FILL,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        text: "1967年",
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createView({
        top: 5,
        height: Ti.UI.SIZE,
        id: "__alloyId63"
    });
    $.__views.__alloyId59.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        color: "black",
        width: "38%",
        left: 10,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "管理費：",
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        color: "#151ba5",
        left: "38%",
        width: Ti.UI.FILL,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        text: "約2000（每月）",
        id: "__alloyId65"
    });
    $.__views.__alloyId63.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createView({
        top: 5,
        height: Ti.UI.SIZE,
        id: "__alloyId66"
    });
    $.__views.__alloyId59.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        color: "black",
        width: "38%",
        left: 10,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "間隔：",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        color: "#151ba5",
        left: "38%",
        width: Ti.UI.FILL,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        text: "3房2廳",
        id: "__alloyId68"
    });
    $.__views.__alloyId66.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
        top: 5,
        height: Ti.UI.SIZE,
        id: "__alloyId69"
    });
    $.__views.__alloyId59.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
        color: "black",
        width: "38%",
        left: 10,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "座向景觀：",
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        color: "#151ba5",
        left: "38%",
        width: Ti.UI.FILL,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        text: "向南,園景",
        id: "__alloyId71"
    });
    $.__views.__alloyId69.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createView({
        top: 5,
        height: Ti.UI.SIZE,
        id: "__alloyId72"
    });
    $.__views.__alloyId59.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        color: "black",
        width: "38%",
        left: 10,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        text: "裝修：",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        color: "#151ba5",
        left: "38%",
        width: Ti.UI.FILL,
        top: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        text: "原裝間隔,柚木地,冷",
        id: "__alloyId74"
    });
    $.__views.__alloyId72.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
        bottom: 0,
        height: 1,
        left: 15,
        borderColor: "#CACACA",
        width: Ti.UI.FILL,
        borderWidth: 2,
        id: "__alloyId75"
    });
    $.__views.otherMainView.add($.__views.__alloyId75);
    $.__views.otherMainView = Ti.UI.createView({
        top: "15",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "otherMainView"
    });
    $.__views.leftSrlView.add($.__views.otherMainView);
    $.__views.remarkContainView = Ti.UI.createView(function() {
        var o = {};
        Alloy.Globals.checkLang("c") && _.extend(o, {
            top: 0,
            left: 10,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "remarkContainView"
        });
        return o;
    }());
    $.__views.otherMainView.add($.__views.remarkContainView);
    $.__views.otherItemRemarksLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 17,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 5,
            top: 10,
            bottom: 5,
            width: 30,
            height: Ti.UI.SIZE,
            color: "black"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            backgroundColor: "#74DF00",
            font: {
                fontSize: 15,
                fontWeight: "bold"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            left: 0,
            top: 30,
            bottom: 0,
            width: 65,
            height: 30,
            transform: Alloy.Globals.rotateLeft90,
            color: "black"
        });
        _.extend(o, {
            top: 15,
            text: "備註",
            id: "otherItemRemarksLabel"
        });
        return o;
    }());
    $.__views.remarkContainView.add($.__views.otherItemRemarksLabel);
    $.__views.otherItemRemarks = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            left: 50,
            width: Ti.UI.FILL,
            top: 15,
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: 16
            }
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            left: 55,
            width: Ti.UI.FILL,
            top: 15,
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: 16
            }
        });
        _.extend(o, {
            text: "業主自讓:有蓋車位,全包,不售,清靜,獨立工人房.工作間",
            id: "otherItemRemarks"
        });
        return o;
    }());
    $.__views.remarkContainView.add($.__views.otherItemRemarks);
    $.__views.__alloyId76 = Ti.UI.createView({
        bottom: 0,
        height: 1,
        left: 15,
        borderColor: "#CACACA",
        width: Ti.UI.FILL,
        borderWidth: 2,
        id: "__alloyId76"
    });
    $.__views.otherMainView.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        top: "15",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId77"
    });
    $.__views.leftSrlView.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.priceItemView = Ti.UI.createButton({
        left: 15,
        id: "priceItemView"
    });
    $.__views.__alloyId78.add($.__views.priceItemView);
    $.__views.emailBtn = Ti.UI.createButton({
        width: "112dp",
        height: "37dp",
        left: 15,
        backgroundImage: "/temp/emailBtn.png",
        id: "emailBtn"
    });
    $.__views.__alloyId78.add($.__views.emailBtn);
    $.__views.rightView = Ti.UI.createView({
        top: 15,
        right: 15,
        left: "32%",
        height: Ti.UI.FILL,
        layout: "vertical",
        width: Ti.UI.FILL,
        id: "rightView"
    });
    $.__views.tmpl2Main.add($.__views.rightView);
    $.__views.topView = Ti.UI.createView({
        top: 0,
        height: Ti.UI.SIZE,
        id: "topView"
    });
    $.__views.rightView.add($.__views.topView);
    $.__views.premises = Ti.UI.createLabel({
        color: "#006865",
        left: 0,
        right: "70",
        textAlign: "left",
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        text: "金鐘柯布連道89號力寶中心",
        id: "premises"
    });
    $.__views.topView.add($.__views.premises);
    $.__views.__alloyId79 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId79"
    });
    $.__views.topView.add($.__views.__alloyId79);
    $.__views.likeBtn = Ti.UI.createButton({
        width: "77dp",
        height: "37dp",
        right: 0,
        backgroundImage: "/temp/likeBtn.png",
        id: "likeBtn"
    });
    $.__views.__alloyId79.add($.__views.likeBtn);
    $.__views.bottomView = Ti.UI.createView({
        borderColor: "#CACACA",
        borderWidth: "1",
        top: 10,
        layout: "horizontal",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "bottomView"
    });
    $.__views.rightView.add($.__views.bottomView);
    $.__views.middleSrlView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        scrollType: "vertical",
        top: 20,
        left: 20,
        height: "100%",
        layout: "vertical",
        width: "46%",
        id: "middleSrlView"
    });
    $.__views.bottomView.add($.__views.middleSrlView);
    $.__views.iconLabel = Ti.UI.createLabel({
        color: "#FFFFFF",
        backgroundColor: "black",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "center",
        text: "設施／鄰近設施",
        id: "iconLabel"
    });
    $.__views.middleSrlView.add($.__views.iconLabel);
    $.__views.iconView = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "iconView"
    });
    $.__views.middleSrlView.add($.__views.iconView);
    $.__views.__alloyId80 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId80"
    });
    $.__views.iconView.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/parking.png",
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId82"
    });
    $.__views.iconView.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/swimming.png",
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId84"
    });
    $.__views.iconView.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/room1.png",
        id: "__alloyId85"
    });
    $.__views.__alloyId84.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId86"
    });
    $.__views.iconView.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/mtr.png",
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId88"
    });
    $.__views.iconView.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/licenseW.png",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId90"
    });
    $.__views.iconView.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/parking.png",
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId92"
    });
    $.__views.iconView.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/swimming.png",
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId94"
    });
    $.__views.iconView.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/room1.png",
        id: "__alloyId95"
    });
    $.__views.__alloyId94.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId96"
    });
    $.__views.iconView.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/mtr.png",
        id: "__alloyId97"
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createView({
        top: 10,
        width: 50,
        height: 50,
        left: 5,
        borderColor: "black",
        borderWidth: 1,
        id: "__alloyId98"
    });
    $.__views.iconView.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createImageView({
        width: 32,
        height: 32,
        image: "/propertyIcon/licenseW.png",
        id: "__alloyId99"
    });
    $.__views.__alloyId98.add($.__views.__alloyId99);
    $.__views.smallImgSrlView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        scrollType: "vertical",
        left: 10,
        height: Ti.UI.FILL,
        layout: "vertical",
        width: Ti.UI.FILL,
        id: "smallImgSrlView"
    });
    $.__views.bottomView.add($.__views.smallImgSrlView);
    $.__views.rightSubView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: Ti.UI.FILL,
        top: 20,
        id: "rightSubView"
    });
    $.__views.smallImgSrlView.add($.__views.rightSubView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var Map = require("ti.map");
    var viewFile = require("viewFile").viewFile;
    var getProp = require("getData").property;
    var args = arguments[0] || {};
    var win = args.win;
    var propdetail;
    var lang = Ti.App.Properties.getString("lang", "c");
    var rePropDetailTmpl2 = {
        check: 0,
        init: function() {
            this.setLangTitle();
            this.setDetail();
            $.smallImgSrlView.addEventListener("postlayout", function() {
                if (0 == rePropDetailTmpl2.check) {
                    rePropDetailTmpl2.setImage();
                    rePropDetailTmpl2.check++;
                }
            });
            var obj = {
                win: win,
                price: args.price
            };
            var img = tools.mortagageTool(obj);
            $.priceItemView.add(img);
        },
        setLangTitle: function() {
            $.leftTitle.setText(s("forPrice"));
            $.priceLabel.setText(s("Price"));
            $.rentLabel.setText(s("Rent"));
            $.areaLabel.setText(s("Area"));
            $.netUnit.setText(s("netUnit"));
            $.grossUnit.setText(s("grossUnit"));
            $.othersLabel.setText(s("others"));
            $.otherItemRemarksLabel.setText(s("remarks"));
            $.hotBtn.backgroundImage = "/temp/" + Alloy.Globals.langIso + "/hot.png";
        },
        setDetail: function() {
            propdetail = getProp.getDetail(args.propertyno, args.propgroup);
            $.premises.text = propdetail[lang + "_premises"];
            $.price.text = comjs.addCommas(100 * propdetail["price"]);
            $.avgprice.text = "@" + comjs.addCommas(propdetail["averageprice"]);
            $.avgrent.text = "@" + comjs.addCommas(propdetail["averagerent"]);
            $.rent.text = comjs.addCommas(propdetail["rent"]);
            $.netarea.text = comjs.addCommas(propdetail["netarea"]) + "呎";
            $.grossarea.text = comjs.addCommas(propdetail["grossarea"]) + "呎";
            $.otherItemRemarks.text = propdetail[lang + "_remarks"];
            $.remarkContainView.height = 70;
            if (0 == propdetail["rent"] || "" == propdetail["rent"]) {
                $.leftSrlView.remove($.rentView);
                $.leftTitle.setText(s("forPrice"));
            }
            if (0 == propdetail["price"] || "" == propdetail["price"]) {
                $.leftSrlView.remove($.priceView);
                $.leftTitle.setText(s("forRent"));
            }
        },
        setMap: function(addr) {
            var mapHeight = "50%";
            var xhrLocationCode = Ti.Network.createHTTPClient();
            xhrLocationCode.setTimeout(12e4);
            var requestUrl = "http://maps.google.com/maps/api/geocode/json?address=" + addr;
            requestUrl += "&sensor=" + (true == Ti.Geolocation.locationServicesEnabled);
            xhrLocationCode.open("GET", requestUrl);
            xhrLocationCode.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhrLocationCode.send();
            xhrLocationCode.onerror = function() {};
            xhrLocationCode.onload = function() {
                var response = JSON.parse(this.responseText);
                if ("OK" == response.status && void 0 != response.results && response.results.length > 0) {
                    var mapView = Map.createView({
                        animate: true,
                        regionFit: true,
                        location: {
                            latitude: response.results[0].geometry.location.lat,
                            longitude: response.results[0].geometry.location.lng,
                            latitudeDelta: .005,
                            longitudeDelta: .005
                        },
                        region: {
                            latitude: response.results[0].geometry.location.lat,
                            longitude: response.results[0].geometry.location.lng,
                            latitudeDelta: .005,
                            longitudeDelta: .005
                        },
                        top: 20,
                        width: Ti.UI.FILL,
                        height: mapHeight,
                        mapType: Map.NORMAL_TYPE
                    });
                    $.middleSrlView.add(mapView);
                    var objLocationAnnotation = Map.createAnnotation({
                        latitude: response.results[0].geometry.location.lat,
                        longitude: response.results[0].geometry.location.lng,
                        title: addr,
                        subtitle: addr,
                        animate: true,
                        id: 1
                    });
                    mapView.addAnnotation(objLocationAnnotation);
                    objLocationAnnotation = null;
                }
                response = null;
            };
        },
        setImage: function() {
            var propImage = getProp.getImage(args.propertyno, args.propgroup);
            if (propImage) {
                var viewW = $.rightSubView.size.width / 2 - 15;
                for (var i = 0; i < propImage.length; i++) {
                    var smallImageItemView = Ti.UI.createView({
                        width: viewW,
                        height: 140,
                        right: 6,
                        bottom: 6,
                        borderColor: "#CACACA",
                        borderWidth: 1
                    });
                    if (propImage[i]) {
                        var image = viewFile("jpg", propImage[i], true);
                        smallImageItemView.add(image);
                    }
                    $.rightSubView.add(smallImageItemView);
                }
                setTimeout(function() {
                    rePropDetailTmpl2.setMap(propdetail[lang + "_premises"]);
                }, 2e3);
            }
        }
    };
    rePropDetailTmpl2.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;