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
    this.__controllerPath = "doc/docTmpl2";
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
    $.__views.docTmpl2Wrap = Ti.UI.createView({
        width: "300dp",
        height: "300dp",
        top: "20dp",
        left: "20dp",
        backgroundImage: "/recommend/propBg.png",
        borderRadius: 10,
        layout: "vertical",
        id: "docTmpl2Wrap"
    });
    $.__views.docTmpl2Wrap && $.addTopLevelView($.__views.docTmpl2Wrap);
    $.__views.docTmpl2Image = Ti.UI.createView({
        top: "10dp",
        width: "90%",
        height: "70%",
        id: "docTmpl2Image"
    });
    $.__views.docTmpl2Wrap.add($.__views.docTmpl2Image);
    $.__views.docTmpl2Title = Ti.UI.createLabel({
        color: "#575757",
        font: {
            fontSize: 16,
            fontWeight: "bold"
        },
        left: "10dp",
        top: "10dp",
        id: "docTmpl2Title"
    });
    $.__views.docTmpl2Wrap.add($.__views.docTmpl2Title);
    $.__views.space = Ti.UI.createView({
        id: "space",
        height: "25dp",
        width: Ti.UI.FILL
    });
    $.__views.docTmpl2Wrap.add($.__views.space);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("getData").doc;
    var viewFile = require("viewFile").viewFile;
    args.win;
    comjs.PixelsToDPUnits;
    $.docTmpl2Title.text = args.c_subject || "";
    var setDocFile = function() {
        var filetype = args["filename"].split(".");
        filetype = filetype[filetype.length - 1];
        var containView = Ti.UI.createView({
            width: "260dp",
            height: "220dp"
        });
        var itemView = viewFile(filetype, args, true, {
            fileName: args["filename"]
        });
        containView.add(itemView);
        $.docTmpl2Image.add(containView);
    };
    setDocFile();
    Ti.UI.createView({
        width: "100%",
        height: 20
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;