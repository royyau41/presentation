function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reProp/rePropDetailTmpl1";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.rePropDetailTmpl1 = Ti.UI.createView({
        layout: "vertical",
        id: "rePropDetailTmpl1"
    });
    $.__views.rePropDetailTmpl1 && $.addTopLevelView($.__views.rePropDetailTmpl1);
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
        width: Ti.UI.FILL,
        height: "45%",
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "horizontal",
        id: "rePropDtlScrollImgView"
    });
    $.__views.rePropDetailTmpl1.add($.__views.rePropDtlScrollImgView);
    $.__views.rePropDtlAddrView = Ti.UI.createView({
        left: "20dp",
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
    $.__views.rePropDetailTmpl1.add($.__views.rePropDtlAddrView);
    $.__views.rePropDtlAddr = Ti.UI.createLabel({
        color: "#efefef",
        left: "20dp",
        top: "5dp",
        bottom: 10,
        font: {
            fontSize: 24,
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
        height: 200,
        layout: "vertical",
        id: "rePropDtlInfoView"
    });
    $.__views.rePropDetailTmpl1.add($.__views.rePropDtlInfoView);
    $.__views.rePropDtlItem = Ti.UI.createView({
        left: 20,
        top: 10,
        font: {
            fontSize: 14
        },
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "rePropDtlItem"
    });
    $.__views.rePropDtlInfoView.add($.__views.rePropDtlItem);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var loginInfo = Ti.App.Properties.getObject("loginInfo", false);
    var db = require("db").db;
    var args = arguments[0] || {};
    var rePropDetailTmpl1 = {
        titleView: null,
        detailView: null,
        init: function() {
            this.genPropItemView();
            this.setImage();
        },
        genPropItemView: function() {
            var lang = "c";
            var detail_item = {
                district: lang + "_district",
                empty1: "empty1",
                narea: "netarea",
                garea: "grossarea",
                price: "price",
                rent: "rent"
            };
            var propdetail = database.getPropInfo(args.propertyno);
            $.rePropDtlAddr.text = propdetail[lang + "_premises"];
            $.rePropDtlAddr.setWidth($.rePropDtlAddr.toImage().width + 20);
            $.rePropDtlAddr.setHeight($.rePropDtlAddr.toImage().height + 5);
            var i = 0;
            for (var loopItem = 0; 1 > loopItem; loopItem++) for (var k in detail_item) {
                if (-1 == k.indexOf("empty")) {
                    var itemView = Ti.UI.createView({
                        layout: "horizontal",
                        width: "40%",
                        height: Ti.UI.SIZE,
                        left: "10dp"
                    });
                    var item = Ti.UI.createLabel({
                        text: eval("Alloy.Globals." + k + "[lang]"),
                        font: {
                            fontSize: 16
                        },
                        top: "10dp",
                        left: 0,
                        width: "80dp",
                        color: "#176f5e"
                    });
                    var value = Ti.UI.createLabel({
                        text: propdetail[detail_item[k]] || "",
                        font: {
                            fontSize: 16
                        },
                        top: "10dp",
                        left: 0,
                        color: "#999"
                    });
                    itemView.add(item);
                    itemView.add(value);
                    $.rePropDtlItem.add(itemView);
                } else {
                    var itemView = Ti.UI.createView({
                        layout: "horizontal",
                        width: "40%",
                        height: Ti.UI.SIZE,
                        left: "10dp"
                    });
                    $.rePropDtlItem.add(itemView);
                }
                i++;
            }
            $.rePropDtlInfoView.setHeight($.rePropDtlInfoView.toImage().height + 20);
        },
        setImage: function() {
            var propImage = database.getImage(args.propertyno, args.propgroup);
            if (propImage) for (var i = 0; propImage.length > i; i++) {
                console.log("123");
                var smallImageItemView = Ti.UI.createView({
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    top: "8dp",
                    left: "10dp"
                });
                if (propImage[i]) {
                    var image = Ti.UI.createImageView({
                        image: Ti.Utils.base64decode(propImage[i].image),
                        widht: .38 * (Alloy.Globals.DisplayHeight - 20),
                        height: .3 * (Alloy.Globals.DisplayHeight - 20)
                    });
                    smallImageItemView.add(image);
                }
                $.rePropDtlScrollImgView.add(smallImageItemView);
            }
        },
        setTmplData: function() {
            var data = {
                rent: 123123,
                price: 12123123,
                c_premises: "testest",
                RECDATE: "1230/9",
                PROP_DEVELOPER: "集團"
            };
            return data;
        }
    };
    var database = {
        getPropInfo: function(number) {
            var $sql = "select * from property where number=" + number;
            var res = db.getObjResultSet($sql);
            return res[0] || {};
        },
        getImage: function(number, propgroup) {
            var $sql = "select attachment as image from propertyfile where propertyno=(select propertyno from property where number = " + number + " and propgroupno=" + propgroup + ")" + "and attachment is not null " + "and propgroupno = " + propgroup;
            var res = db.getObjResultSet($sql);
            return res || {};
        }
    };
    rePropDetailTmpl1.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;