function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reProp/rePropDetail＿temp";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var args = arguments[0] || {};
    require("db").db;
    var rePropDetail = {
        currentProperty: args.record,
        propertyNumberList: args.propertyList,
        titleView: null,
        detailView: null,
        containers: [],
        currentPage: 0,
        init: function() {
            var args = {
                newWin: true,
                currentWin: $.rePropDetail
            };
            this.title = Alloy.createController("title/title", args).getView();
            $.rePropDetail.add(this.title);
            $.mainDetailView.setTop(Alloy.Globals.titleHeight);
        },
        setScrollView: function() {},
        setScrollEvent: function() {}
    };
    rePropDetail.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;