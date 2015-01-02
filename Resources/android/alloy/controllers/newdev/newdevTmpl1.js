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
    this.__controllerPath = "newdev/newdevTmpl1";
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
    $.__views.newdevTmpl1Wrap = Ti.UI.createView({
        width: "220dp",
        height: "220dp",
        top: "20dp",
        left: "20dp",
        backgroundImage: "/recommend/propBg.png",
        borderRadius: 10,
        layout: "vertical",
        id: "newdevTmpl1Wrap"
    });
    $.__views.newdevTmpl1Wrap && $.addTopLevelView($.__views.newdevTmpl1Wrap);
    $.__views.newdevTmpl1Image = Ti.UI.createImageView({
        top: "10dp",
        width: "90%",
        height: "70%",
        id: "newdevTmpl1Image"
    });
    $.__views.newdevTmpl1Wrap.add($.__views.newdevTmpl1Image);
    $.__views.newdevTmpl1Bld = Ti.UI.createLabel({
        color: "#575757",
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        left: "10dp",
        top: "10dp",
        text: "海富中心",
        id: "newdevTmpl1Bld"
    });
    $.__views.newdevTmpl1Wrap.add($.__views.newdevTmpl1Bld);
    $.__views.space = Ti.UI.createView({
        id: "space",
        height: "25dp",
        width: Ti.UI.FILL
    });
    $.__views.newdevTmpl1Wrap.add($.__views.space);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.newdevTmpl1Wrap.number = args.number;
    $.newdevTmpl1Image.number = args.number;
    $.newdevTmpl1Bld.number = args.number;
    $.space.number = args.number;
    args.attachment && ($.newdevTmpl1Image.image = Ti.Utils.base64decode(args.attachment));
    $.newdevTmpl1Bld.text = args.chinesename || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;