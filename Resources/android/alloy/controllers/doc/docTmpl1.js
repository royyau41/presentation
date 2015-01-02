function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setDocFile() {
        if (0 == $.docListDocument.children.length) {
            var itemResult = getdoc.getDocument(args.number);
            if (itemResult) for (var i = 0; i < itemResult.length; i++) {
                var filetype = itemResult[i]["filename"].split(".");
                filetype = filetype[filetype.length - 1];
                var containView = Ti.UI.createView({
                    width: "270",
                    height: "260",
                    left: "20dp",
                    top: "8dp",
                    layout: "vertical"
                });
                var filenameLabel = Ti.UI.createLabel({
                    text: itemResult[i].c_subject
                });
                containView.add(filenameLabel);
                var smallItemView = Ti.UI.createView({
                    width: "240",
                    height: "240"
                });
                containView.add(smallItemView);
                var fileName = i + ".pdf";
                var itemView = viewFile(filetype, itemResult[i], true, {
                    fileName: fileName
                });
                smallItemView.add(itemView);
                $.docListDocument.add(containView);
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "doc/docTmpl1";
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
    $.__views.docTmpl1RowView = Ti.UI.createView({
        backgroundImage: "/recommend/propBg.png",
        left: 20,
        right: 20,
        borderRadius: 5,
        width: Ti.UI.FILL,
        top: 10,
        height: Ti.UI.SIZE,
        id: "docTmpl1RowView"
    });
    $.__views.docTmpl1RowView && $.addTopLevelView($.__views.docTmpl1RowView);
    $.__views.docTmpl1MainDetailView = Ti.UI.createView({
        layout: "vertical",
        left: "10",
        top: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "docTmpl1MainDetailView"
    });
    $.__views.docTmpl1RowView.add($.__views.docTmpl1MainDetailView);
    $.__views.docTmpl1Title = Ti.UI.createLabel({
        color: "#006865",
        left: 20,
        width: "auto",
        height: Ti.UI.SIZE,
        top: 0,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "docTmpl1Title"
    });
    $.__views.docTmpl1MainDetailView.add($.__views.docTmpl1Title);
    $.__views.docListDocument = Ti.UI.createScrollView({
        bubbleParent: false,
        top: 10,
        width: "80%",
        height: 0,
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
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        layout: "horizontal",
        id: "docListDocument"
    });
    $.__views.docTmpl1MainDetailView.add($.__views.docListDocument);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var getdoc = require("getData").doc;
    var viewFile = require("viewFile").viewFile;
    var win = args.win;
    comjs.PixelsToDPUnits;
    $.docTmpl1Title.text = args.chinesename || "";
    ("development" == Ti.App.deployType || "test" == Ti.App.deployType) && comjs.changeColor($.docTmpl1Title, win);
    setDocFile();
    $.docTmpl1MainDetailView.addEventListener("click", function() {
        Ti.UI.createAnimation({
            height: 250,
            duration: 150
        });
        if (0 == $.docListDocument.height) {
            setDocFile();
            $.docListDocument.height = 300;
        } else $.docListDocument.height = 0;
    });
    var dummyView = Ti.UI.createView({
        width: "100%",
        height: 20
    });
    $.docTmpl1MainDetailView.add(dummyView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;