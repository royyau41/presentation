function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reProp/rePropMainLayout";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rePropMainLayoutView = Ti.UI.createView({
        id: "rePropMainLayoutView"
    });
    $.__views.rePropMainLayoutView && $.addTopLevelView($.__views.rePropMainLayoutView);
    $.__views.rePropTmpl1Table = Ti.UI.createTableView({
        id: "rePropTmpl1Table"
    });
    $.__views.rePropMainLayoutView.add($.__views.rePropTmpl1Table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    loginInfo = Ti.App.Properties.getObject("loginInfo", false);
    var db = require("db").db;
    var propgroup = Ti.App.Properties.getInt("propgroup", 0);
    var reProp = {
        propertyList: [],
        init: function() {
            this.showProp();
            this.addEvent();
            database.init();
        },
        showProp: function(record) {
            var row = [];
            for (var i in record) {
                reProp.propertyList.push(record[i].number);
                var result = Alloy.createController("reProp/rePropTmpl1", record[i]).getView();
                row.push(result);
            }
            $.rePropTmpl1Table.setData(row);
        },
        addEvent: function() {
            $.rePropTmpl1Table.addEventListener("click", function(e) {
                var obj = {
                    propertyList: reProp.propertyList,
                    propgroup: e.row.propgroup,
                    record: e.row.record,
                    index: e.index
                };
                var detailWin = Alloy.createController("reProp/rePropDetail", obj).getView();
                detailWin.open({
                    animated: true
                });
            });
        }
    };
    var database = {
        init: function() {
            propgroup || (propgroup = this.getLastPropgroup());
            var property = this.getProperty(propgroup);
            property && reProp.showProp(property);
        },
        getProperty: function(propgroup) {
            var $sql = "select p.* from property as p  where PROPGROUPNO=" + propgroup;
            var res = db.getObjResultSet($sql);
            return res || {};
        },
        getLastPropgroup: function() {
            var $sql = "select max(number) number  from propgroup where deletedate =0 ";
            var res = db.getObjResultSet($sql);
            return res[0].number || 0;
        }
    };
    reProp.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;