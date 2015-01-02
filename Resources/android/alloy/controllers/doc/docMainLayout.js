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
    this.__controllerPath = "doc/docMainLayout";
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
    $.__views.docMainLayoutView = Ti.UI.createScrollView({
        title: "推介樓盤",
        backgroundColor: "#E6E6E6",
        height: Ti.UI.FILL,
        top: 10,
        layout: "horizontal",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        width: "95%",
        contentWidth: "95%",
        contentHeight: "auto",
        id: "docMainLayoutView"
    });
    $.__views.docMainLayoutView && $.addTopLevelView($.__views.docMainLayoutView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var getdoc = require("getData").doc;
    require("email").email;
    var args = arguments[0] || {};
    var win = args.win;
    var doc = {
        propertyList: [],
        init: function() {
            var docResult = getdoc.getList();
            if (docResult) {
                this.showDoc(docResult);
                this.addEvent();
            }
        },
        showDoc: function(record) {
            for (var i in record) {
                doc.propertyList.push(record[i].number);
                record[i]["win"] = win;
                var result = Alloy.createController("doc/docTmpl2", record[i]).getView();
                $.docMainLayoutView.add(result);
            }
        },
        addEvent: function() {}
    };
    doc.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;