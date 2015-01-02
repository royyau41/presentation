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
    this.__controllerPath = "newdev/newdevMainLayout";
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
    $.__views.newdevMainView = Ti.UI.createScrollView({
        layout: "horizontal",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        top: 0,
        width: "95%",
        contentWidth: "95%",
        contentHeight: "auto",
        height: Ti.UI.FILL,
        id: "newdevMainView"
    });
    $.__views.newdevMainView && $.addTopLevelView($.__views.newdevMainView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var win = args.win;
    var db = require("db").db;
    var newdev = {
        newdevList: [],
        init: function() {
            var newRecord = database.getNewDev();
            newRecord && this.showNewDev(newRecord);
        },
        showNewDev: function(record) {
            for (var i in record) {
                this.newdevList.push(record[i]["number"]);
                record[i]["win"] = win;
                var result = Alloy.createController("newdev/newdevTmpl1", record[i]).getView();
                result.addEventListener("click", this.showNewDevDetail);
                $.newdevMainView.add(result);
            }
        },
        showNewDevDetail: function(e) {
            var obj = {
                newdevList: newdev.newdevList,
                record: e.source.number
            };
            comjs.getLoadingView("newdev/newdevDetail", obj);
        }
    };
    var database = {
        getNewDev: function() {
            var $sql = "select p.* from newdev as p where deletedate =0 ";
            var res = db.getObjResultSet($sql);
            return res || {};
        }
    };
    newdev.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;