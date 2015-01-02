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
    this.__controllerPath = "neEstate/neEstateMainLayout";
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
    $.__views.nePropMainView = Ti.UI.createScrollView({
        layout: "horizontal",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        top: 0,
        width: "95%",
        contentWidth: "95%",
        contentHeight: "auto",
        height: Ti.UI.FILL,
        id: "nePropMainView"
    });
    $.__views.nePropMainView && $.addTopLevelView($.__views.nePropMainView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    arguments[0] || {};
    var db = require("db").db;
    var neEstate = {
        estateList: [],
        init: function() {
            var estRecord = database.getEstate();
            estRecord && this.showEstate(estRecord);
        },
        showEstate: function(record) {
            for (var i in record) {
                this.estateList.push(record[i]["estateno"]);
                var result = Alloy.createController("neEstate/neEstateTmpl1", record[i]).getView();
                result.addEventListener("click", this.showEstateDetail);
                $.nePropMainView.add(result);
            }
        },
        showEstateDetail: function(e) {
            var obj = {
                estateList: neEstate.estateList,
                record: e.source.estate
            };
            Alloy.createController("neEstate/neEstateDetail", obj).getView();
        }
    };
    var database = {
        init: function() {
            propgroup || (propgroup = this.getLastPropgroup());
            var property = this.getProperty(propgroup);
            property && reProp.showProp(property);
        },
        getEstate: function() {
            var $sql = "select p.* from estate as p where deletedate =0 ";
            var res = db.getObjResultSet($sql);
            return res || {};
        }
    };
    neEstate.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;