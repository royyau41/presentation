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
    this.__controllerPath = "reProp/rePropDetailTmpl1";
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
    $.__views.rePropDeatilTmpl1Main = Ti.UI.createScrollView({
        layout: "vertical",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        scrollType: "vertical",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        contentWidth: "100%",
        id: "rePropDeatilTmpl1Main"
    });
    $.__views.rePropDeatilTmpl1Main && $.addTopLevelView($.__views.rePropDeatilTmpl1Main);
    $.__views.rePropDtlScrollImgView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        top: 20,
        left: 20,
        right: 20,
        borderColor: "#CACACA",
        borderWidth: "1",
        borderRadius: 5,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#EEEEEE",
                offset: 0
            }, {
                color: "#EEEEEE",
                offset: .45
            }, {
                color: "#EEEEEE",
                offset: 1
            } ]
        },
        scrollType: "horizontal",
        horizontalWrap: false,
        width: Ti.UI.FILL,
        height: "45%",
        contentWidth: "auto",
        contentHeight: "45%",
        layout: "horizontal",
        id: "rePropDtlScrollImgView"
    });
    $.__views.rePropDeatilTmpl1Main.add($.__views.rePropDtlScrollImgView);
    $.__views.rePropDtlAddrView = Ti.UI.createView({
        left: "10dp",
        top: "20dp",
        height: Ti.UI.SIZE,
        borderRadius: 5,
        layout: "vertical",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#23aa90",
                offset: 0
            }, {
                color: "#21a088",
                offset: .45
            }, {
                color: "#1b846f",
                offset: 1
            } ]
        },
        width: Ti.UI.SIZE,
        id: "rePropDtlAddrView"
    });
    $.__views.rePropDeatilTmpl1Main.add($.__views.rePropDtlAddrView);
    $.__views.rePropDtlAddr = Ti.UI.createLabel({
        color: "#efefef",
        left: "10dp",
        top: "5dp",
        bottom: 10,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        text: "上環德輔道中262號一洲大廈",
        id: "rePropDtlAddr"
    });
    $.__views.rePropDtlAddrView.add($.__views.rePropDtlAddr);
    $.__views.rePropDtlInfoView = Ti.UI.createView({
        left: 20,
        top: 15,
        borderRadius: 5,
        borderColor: "#CACACA",
        backgroundColor: "white",
        right: 20,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "rePropDtlInfoView"
    });
    $.__views.rePropDeatilTmpl1Main.add($.__views.rePropDtlInfoView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var viewFile = require("viewFile").viewFile;
    var getProp = require("getData").property;
    var args = arguments[0] || {};
    var win = args.win;
    var rePropDetailTmpl1 = {
        titleView: null,
        detailView: null,
        init: function() {
            this.genPropItemView();
            this.setImage();
        },
        genPropItemView: function() {
            var lang = "c";
            var detail_item = getProp.getFieldList("propDetail", lang);
            var propdetail = getProp.getDetail(args.propertyno, args.propgroup);
            $.rePropDtlAddr.text = propdetail[lang + "_premises"];
            $.rePropDtlAddr.setWidth(pToD($.rePropDtlAddr.toImage().width) + 10);
            $.rePropDtlAddr.setHeight(pToD($.rePropDtlAddr.toImage().height));
            var i = 0;
            for (var loopItem = 0; 1 > loopItem; loopItem++) for (var k in detail_item) {
                if (-1 == k.indexOf("empty")) {
                    var itemView = Ti.UI.createView({
                        layout: "horizontal",
                        width: detail_item[k]["width"] || "40%",
                        height: Ti.UI.SIZE,
                        bubbleParent: false,
                        left: "10dp"
                    });
                    var item = Ti.UI.createLabel({
                        text: Alloy.Globals.getfieldTitle(k),
                        font: {
                            fontSize: 16
                        },
                        top: "10dp",
                        left: 0,
                        width: "80dp",
                        color: "#176f5e"
                    });
                    var value = Ti.UI.createLabel({
                        text: comjs.displayValue(detail_item[k], propdetail[detail_item[k].field], k),
                        font: {
                            fontSize: 16
                        },
                        top: "10dp",
                        left: 0,
                        color: "#000"
                    });
                    if ("development" == Ti.App.deployType || "test" == Ti.App.deployType) {
                        comjs.changeColor(item, win);
                        comjs.changeColor(value, win);
                    }
                    itemView.add(item);
                    itemView.add(value);
                    if (detail_item[k].tool) switch (detail_item[k].tool) {
                      case "mortagageTool":
                        var obj = {
                            win: win,
                            price: propdetail[detail_item[k].field] * (detail_item[k].base || 1)
                        };
                        var img = tools.mortagageTool(obj);
                        itemView.add(img);
                    }
                    $.rePropDtlInfoView.add(itemView);
                } else {
                    var itemView = Ti.UI.createView({
                        layout: "horizontal",
                        width: "40%",
                        height: Ti.UI.SIZE,
                        left: "10dp"
                    });
                    var value = Ti.UI.createLabel({
                        text: "",
                        font: {
                            fontSize: 16
                        },
                        top: "10dp",
                        left: 0,
                        color: "#999"
                    });
                    itemView.add(value);
                    $.rePropDtlInfoView.add(itemView);
                }
                i++;
            }
            var dummyView = Ti.UI.createView({
                width: "100%",
                height: "20",
                left: "10dp"
            });
            $.rePropDtlInfoView.add(dummyView);
        },
        setImage: function() {
            var propImage = getProp.getImage(args.propertyno, args.propgroup);
            $.rePropDtlScrollImgView.setHeight(.45 * (Alloy.Globals.DisplayHeight - Alloy.Globals.titleHeight - 20));
            if (propImage) {
                var imageHeight = .4 * (Alloy.Globals.DisplayHeight - Alloy.Globals.titleHeight - 20);
                for (var i = 0; i < propImage.length; i++) {
                    var smallImageItemView = Ti.UI.createView({
                        width: .38 * (Alloy.Globals.DisplayHeight - 20) + "dp",
                        height: imageHeight + 10 + "dp",
                        left: "20dp",
                        top: "8dp",
                        left: "10dp"
                    });
                    if (propImage[i]) {
                        var image = Ti.UI.createImageView({
                            image: Ti.Utils.base64decode(propImage[i].image),
                            focusable: true
                        });
                        image.addEventListener("click", function(e) {
                            viewFile("img", e.source.image);
                        });
                        smallImageItemView.add(image);
                    }
                    $.rePropDtlScrollImgView.add(smallImageItemView);
                }
            }
        }
    };
    rePropDetailTmpl1.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;