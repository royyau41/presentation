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
    this.__controllerPath = "neEstate/neEstateDetailTmpl2";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        var $model = __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.containView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        width: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "horizontal",
        id: "containView"
    });
    $.__views.containView && $.addTopLevelView($.__views.containView);
    $.__views.neEstateDtlImage = Ti.UI.createView({
        layout: "vertical",
        top: 20,
        left: 20,
        right: 10,
        borderRadius: 5,
        backgroundColor: "white",
        height: Ti.UI.SIZE,
        width: "60%",
        borderColor: "#cacaca",
        id: "neEstateDtlImage"
    });
    $.__views.containView.add($.__views.neEstateDtlImage);
    $.__views.neEstateDtlHoldSize = Ti.UI.createView({
        top: 20,
        left: 20,
        width: "98%",
        height: "400dp",
        id: "neEstateDtlHoldSize"
    });
    $.__views.neEstateDtlImage.add($.__views.neEstateDtlHoldSize);
    $.__views.neEstateDtlBigImg = Ti.UI.createImageView({
        height: Ti.UI.FILL,
        width: "92%",
        id: "neEstateDtlBigImg"
    });
    $.__views.neEstateDtlHoldSize.add($.__views.neEstateDtlBigImg);
    $.__views.neEstateDtlScrSmlImg = Ti.UI.createScrollView({
        top: 10,
        left: 10,
        layout: "horizontal",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        contentWidth: "98%",
        contentHeight: "auto",
        id: "neEstateDtlScrSmlImg"
    });
    $.__views.neEstateDtlImage.add($.__views.neEstateDtlScrSmlImg);
    $.__views.neEstateDtlInfoView = Ti.UI.createView({
        left: 10,
        top: 20,
        borderRadius: 5,
        right: 20,
        height: Ti.UI.SIZE,
        width: "34%",
        backgroundColor: "white",
        borderColor: "#cacaca",
        borderWidth: 2,
        layout: "vertical",
        id: "neEstateDtlInfoView"
    });
    $.__views.containView.add($.__views.neEstateDtlInfoView);
    $.__views.neEstateDtlAddr = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        left: 20,
        top: 20,
        backgroundColor: "#1e927b",
        borderRadius: 5,
        width: "88%",
        height: "40dp",
        text: "上環德輔道中262號一洲大廈",
        id: "neEstateDtlAddr"
    });
    $.__views.neEstateDtlInfoView.add($.__views.neEstateDtlAddr);
    $.__views.neEstateDtlItem = Ti.UI.createView({
        left: 20,
        top: 10,
        font: {
            fontSize: 18
        },
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "neEstateDtlItem"
    });
    $.__views.neEstateDtlInfoView.add($.__views.neEstateDtlItem);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var loginInfo = Ti.App.Properties.getObject("loginInfo", false);
    var db = require("db").db;
    var args = arguments[0] || {};
    var viewFile = require("viewFile").viewFile;
    var neEstateDetailTmpl1 = {
        titleView: null,
        detailView: null,
        init: function() {
            this.genEstateItemView();
            this.setImage();
        },
        genEstateItemView: function() {
            var lang = "c";
            var detail_item = {
                developer: lang + "_developer1",
                remarks: lang + "_remarks"
            };
            var estatedetail = database.getEstateInfo(args.estateno);
            $.neEstateDtlAddr.text = estatedetail.chinesename;
            var i = 0;
            for (var loopItem = 0; 3 > loopItem; loopItem++) for (var k in detail_item) {
                if (eval("Alloy.Globals." + k + "[lang]")) {
                    var itemView = Ti.UI.createView({
                        layout: "vertical",
                        height: Ti.UI.SIZE
                    });
                    var item = Ti.UI.createLabel({
                        text: eval("Alloy.Globals." + k + "[lang]"),
                        font: {
                            fontSize: 20,
                            fontWeight: "bold"
                        },
                        left: 0,
                        top: 20,
                        height: 20,
                        color: "#000"
                    });
                    var value = Ti.UI.createLabel({
                        text: estatedetail[detail_item[k]] || "",
                        font: {
                            fontSize: 18
                        },
                        top: "10dp",
                        left: 0,
                        color: "#151ba5"
                    });
                    itemView.add(item);
                    itemView.add(value);
                    $.neEstateDtlItem.add(itemView);
                }
                i++;
            }
            $.neEstateDtlInfoView.setHeight($.neEstateDtlInfoView.toImage().height + 10);
        },
        setImage: function() {
            var estateImage = database.getImage(args.estateno);
            if (estateImage.length) {
                $.neEstateDtlBigImg.image = Ti.Utils.base64decode(estateImage[0]["image"]);
                $.neEstateDtlBigImg.addEventListener("click", function(e) {
                    viewFile("img", e.source.image);
                });
                var viewWidth = .28 * Alloy.Globals.DisplayWidth / 2 + "dp";
                for (var i = 0; i < estateImage.length; i++) {
                    var smallImageItemView = Ti.UI.createView({
                        width: viewWidth,
                        height: Ti.UI.SIZE,
                        top: 8
                    });
                    if (estateImage[i]) {
                        var image_left = Ti.UI.createImageView({
                            left: 10,
                            image: Ti.Utils.base64decode(estateImage[i].image),
                            widht: "100dp",
                            height: "100dp"
                        });
                        smallImageItemView.add(image_left);
                    }
                    $.neEstateDtlScrSmlImg.add(smallImageItemView);
                }
                $.neEstateDtlImage.setHeight("640dp");
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
        getEstateInfo: function(estateno) {
            var $sql = "select * from estate where estateno=" + estateno + " and deletedate=0";
            var res = db.getObjResultSet($sql);
            return res[0] || {};
        },
        getImage: function(estateno) {
            var $sql = "select attachment as image from estatefile where estateno=" + estateno + " and attachment is not null ";
            var res = db.getObjResultSet($sql);
            return res || {};
        }
    };
    neEstateDetailTmpl1.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;