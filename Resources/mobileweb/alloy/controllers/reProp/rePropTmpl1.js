function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reProp/rePropTmpl1";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.reTableRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        className: "myrows",
        id: "reTableRow"
    });
    $.__views.reTableRow && $.addTopLevelView($.__views.reTableRow);
    $.__views.rePropTmpl1RowView = Ti.UI.createView({
        backgroundImage: "/recommend/propBg.png",
        layout: "horizontal",
        left: 30,
        right: 30,
        borderRadius: 8,
        top: 10,
        widht: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "rePropTmpl1RowView"
    });
    $.__views.reTableRow.add($.__views.rePropTmpl1RowView);
    $.__views.__alloyId42 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId42"
    });
    $.__views.rePropTmpl1RowView.add($.__views.__alloyId42);
    $.__views.rePropTmpl1Image = Ti.UI.createImageView({
        top: 7,
        width: "100dp",
        height: "100dp",
        left: 10,
        id: "rePropTmpl1Image"
    });
    $.__views.__alloyId42.add($.__views.rePropTmpl1Image);
    $.__views.rePropTmpl1MainDetailView = Ti.UI.createView({
        layout: "vertical",
        top: 7,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "rePropTmpl1MainDetailView"
    });
    $.__views.rePropTmpl1RowView.add($.__views.rePropTmpl1MainDetailView);
    $.__views.rePropTmpl1Addr = Ti.UI.createLabel({
        color: "#3BAC9B",
        left: 30,
        top: 0,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "rePropTmpl1Addr"
    });
    $.__views.rePropTmpl1MainDetailView.add($.__views.rePropTmpl1Addr);
    $.__views.rePropTmpl1SubDetailView = Ti.UI.createView({
        layout: "horizontal",
        horizontalWrap: true,
        width: Ti.UI.FILL,
        height: "100dp",
        id: "rePropTmpl1SubDetailView"
    });
    $.__views.rePropTmpl1MainDetailView.add($.__views.rePropTmpl1SubDetailView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.reTableRow.propgroup = args.propgroupno;
    $.reTableRow.record = args.number;
    args.attachment && ($.rePropTmpl1Image.image = Ti.Utils.base64decode(args.attachment));
    $.rePropTmpl1Addr.text = args.c_premises || "";
    var lang = "c";
    var detail_item = {
        district: {
            field: lang + "_district"
        },
        price: {
            field: "price"
        },
        rent: {
            field: "rent"
        },
        garea: {
            field: "grossarea"
        },
        narea: {
            field: "netarea"
        },
        remarks: {
            field: lang + "_remarks",
            width: "100%"
        }
    };
    var i = 0;
    for (var k in detail_item) {
        if (eval("Alloy.Globals." + k + "[lang]")) {
            var itemView = Ti.UI.createView({
                layout: "horizontal",
                height: Ti.UI.SIZE,
                width: detail_item[k].width || "150dp",
                top: 10,
                left: 30
            });
            var item = Ti.UI.createLabel({
                text: eval("Alloy.Globals." + k + "[lang]") + (args[detail_item[k].field] || "--"),
                font: {
                    fontSize: 16
                },
                left: 0,
                height: "20dp",
                color: "#000"
            });
            itemView.add(item);
            $.rePropTmpl1SubDetailView.add(itemView);
        }
        i++;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;