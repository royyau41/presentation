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
    this.__controllerPath = "reProp/rePropTmpl1";
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
    $.__views.reTableRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        className: "myrows",
        id: "reTableRow"
    });
    $.__views.reTableRow && $.addTopLevelView($.__views.reTableRow);
    $.__views.rePropTmpl1RowView = Ti.UI.createView({
        backgroundImage: "/recommend/propBg.png",
        left: 30,
        right: 40,
        borderRadius: 5,
        width: Ti.UI.FILL,
        top: 10,
        height: Ti.UI.SIZE,
        id: "rePropTmpl1RowView"
    });
    $.__views.reTableRow.add($.__views.rePropTmpl1RowView);
    $.__views.reNewpic = Ti.UI.createImageView({
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        image: "/reProp/triangle.png",
        id: "reNewpic"
    });
    $.__views.rePropTmpl1RowView.add($.__views.reNewpic);
    $.__views.rePropImageView = Ti.UI.createView({
        width: "20%",
        height: Ti.UI.SIZE,
        left: 20,
        top: 0,
        layout: "vertical",
        id: "rePropImageView"
    });
    $.__views.rePropTmpl1RowView.add($.__views.rePropImageView);
    $.__views.rePropTmpl1Image = Ti.UI.createImageView({
        top: 7,
        width: "auto",
        height: "160",
        id: "rePropTmpl1Image"
    });
    $.__views.rePropImageView.add($.__views.rePropTmpl1Image);
    $.__views.rePropTmpl1MainDetailView = Ti.UI.createView({
        left: "25%",
        top: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "rePropTmpl1MainDetailView"
    });
    $.__views.rePropTmpl1RowView.add($.__views.rePropTmpl1MainDetailView);
    $.__views.rePropTmpl1BestSale = Ti.UI.createView({
        backgroundImage: "/temp/hot.png",
        width: "52dp",
        height: "37dp",
        top: 0,
        right: 30,
        zIndex: 10,
        id: "rePropTmpl1BestSale"
    });
    $.__views.rePropTmpl1MainDetailView.add($.__views.rePropTmpl1BestSale);
    $.__views.rePropTmpl1Addr = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "black"
        });
        Alloy.Globals.checkLang("c") && _.extend(o, {
            left: 20,
            width: "auto",
            height: Ti.UI.SIZE,
            top: 0,
            font: {
                fontSize: 20,
                fontWeight: "bold"
            },
            color: "#006865"
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            left: 20,
            width: "auto",
            right: "70dp",
            height: Ti.UI.SIZE,
            top: 0,
            font: {
                fontSize: "18dp",
                fontWeight: "bold"
            },
            color: "#006865"
        });
        _.extend(o, {
            id: "rePropTmpl1Addr"
        });
        return o;
    }());
    $.__views.rePropTmpl1MainDetailView.add($.__views.rePropTmpl1Addr);
    $.__views.rePropTmpl1SubDetailView = Ti.UI.createView(function() {
        var o = {};
        Alloy.Globals.checkLang("c") && _.extend(o, {
            layout: "horizontal",
            top: 20,
            horizontalWrap: true,
            width: "90%",
            height: Ti.UI.SIZE
        });
        Alloy.Globals.checkLang("e") && _.extend(o, {
            layout: "horizontal",
            top: 35,
            horizontalWrap: true,
            width: "90%",
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "rePropTmpl1SubDetailView"
        });
        return o;
    }());
    $.__views.rePropTmpl1MainDetailView.add($.__views.rePropTmpl1SubDetailView);
    $.__views.rePropTmpl1Order = Ti.UI.createLabel({
        color: "#555",
        bottom: 0,
        right: 30,
        text: "1/5",
        id: "rePropTmpl1Order"
    });
    $.__views.rePropTmpl1MainDetailView.add($.__views.rePropTmpl1Order);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var getProp = require("getData").property;
    var win = args.win;
    comjs.PixelsToDPUnits;
    $.reTableRow.propgroup = args.propgroupno;
    $.reTableRow.record = args.number;
    $.reTableRow.propertyid = args.id;
    args.attachment && ($.rePropTmpl1Image.image = Ti.Utils.base64decode(args.attachment));
    $.rePropTmpl1Addr.text = args[Ti.App.Properties.getString("lang", "c") + "_premises"] || "";
    $.rePropTmpl1Order.text = args.order;
    ("development" == Ti.App.deployType || "test" == Ti.App.deployType) && comjs.changeColor($.rePropTmpl1Addr, win);
    $.reTableRow.addEventListener("click", function() {
        getProp.updateRead(" id=" + args.id);
        $.reNewpic.hide();
    });
    $.reNewpic.setVisible(1 == args.read || "1" == args.read ? false : true);
    var detail_item = getProp.getFieldList("propSearch");
    var i = 0;
    for (var k in detail_item) {
        if (Alloy.Globals.getfieldTitle(k)) {
            var itemView = Ti.UI.createView({
                layout: "horizontal",
                height: Ti.UI.SIZE,
                width: detail_item[k].width || "35%",
                top: 10,
                left: 30
            });
            var title = Ti.UI.createLabel({
                text: Alloy.Globals.getfieldTitle(k),
                font: {
                    fontSize: 18
                },
                left: 0,
                width: Alloy.Globals.getfieldTitle(k, "Width") || "90dp",
                color: "#000"
            });
            var item = Ti.UI.createLabel({
                text: comjs.displayValue(detail_item[k], args[detail_item[k].field]),
                font: {
                    fontSize: 18,
                    fontWeight: "bold"
                },
                left: 0,
                color: "#151ba5"
            });
            if ("development" == Ti.App.deployType || "test" == Ti.App.deployType) {
                comjs.changeColor(title, win);
                comjs.changeColor(item, win);
            }
            itemView.add(title);
            itemView.add(item);
            $.rePropTmpl1SubDetailView.add(itemView);
        }
        i++;
    }
    var dummyView = Ti.UI.createView({
        width: "100%",
        height: 40
    });
    $.rePropTmpl1SubDetailView.add(dummyView);
    $.reTableRow.height = $.reTableRow.toImage().height + 20;
    $.rePropTmpl1RowView.height = $.rePropTmpl1RowView.toImage().height + 20;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;