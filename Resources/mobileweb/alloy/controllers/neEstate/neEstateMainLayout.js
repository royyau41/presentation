function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "neEstate/neEstateMainLayout";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
            var detailWin = Alloy.createController("neEstate/neEstateDetail", obj).getView();
            detailWin.open({
                animated: true
            });
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