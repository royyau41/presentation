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
    this.__controllerPath = "neEstate/neEstateTmpl1";
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
    $.__views.nePropTmpl1Wrap = Ti.UI.createView({
        width: "220dp",
        height: "220dp",
        top: "20dp",
        left: "20dp",
        backgroundImage: "/recommend/propBg.png",
        borderRadius: 10,
        layout: "vertical",
        id: "nePropTmpl1Wrap"
    });
    $.__views.nePropTmpl1Wrap && $.addTopLevelView($.__views.nePropTmpl1Wrap);
    $.__views.nePropTmpl1Image = Ti.UI.createImageView({
        top: "10dp",
        width: "90%",
        height: "70%",
        id: "nePropTmpl1Image"
    });
    $.__views.nePropTmpl1Wrap.add($.__views.nePropTmpl1Image);
    $.__views.nePropTmpl1Bld = Ti.UI.createLabel({
        color: "#575757",
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        left: "10dp",
        top: "10dp",
        text: "海富中心",
        id: "nePropTmpl1Bld"
    });
    $.__views.nePropTmpl1Wrap.add($.__views.nePropTmpl1Bld);
    $.__views.space = Ti.UI.createView({
        id: "space",
        height: "25dp",
        width: Ti.UI.FILL
    });
    $.__views.nePropTmpl1Wrap.add($.__views.space);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.nePropTmpl1Wrap.estate = args.estateno;
    $.nePropTmpl1Image.estate = args.estateno;
    $.nePropTmpl1Bld.estate = args.estateno;
    $.space.estate = args.estateno;
    args.attachment && ($.nePropTmpl1Image.image = Ti.Utils.base64decode(args.attachment));
    $.nePropTmpl1Bld.text = args.chinesename || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;