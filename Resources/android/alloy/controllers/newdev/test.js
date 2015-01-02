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
    this.__controllerPath = "newdev/test";
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
    $.__views.win = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        id: "win",
        modal: "true"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var db = require("db").db;
    var test = {
        init: function() {
            var pdf = database.getNewDev();
            pdf = pdf[0];
            var file = Ti.Utils.base64decode(pdf.attachment);
            var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "test.pdf");
            f.write(file);
            $.webview.setUrl("https://docs.google.com/viewer?url=" + Ti.Filesystem.tempDirectory + "/test.pdf");
            setTimeout(function() {
                $.win.close();
            }, 15e3);
        }
    };
    var database = {
        getNewDev: function() {
            var $sql = "select attachment from newdevfile  where filename like '%.pdf'";
            var res = db.getObjResultSet($sql);
            return res || {};
        }
    };
    test.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;