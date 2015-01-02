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
    this.__controllerPath = "doc/docDetailTmpl1";
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
            var detail_item = comjs.getDetailField("propDetail", lang);
            var propdetail = getProp.getDetail(args.propertyno);
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
                        text: Alloy.Globals.getfieldTitle(k, lang),
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
                        color: "#999"
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
            console.log(pToD($.rePropDtlInfoView.toImage().width));
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