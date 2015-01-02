function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        backgroundColor: "#E6E6E6",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.title = Alloy.createController("title/title", {
        id: "title",
        __parentSymbol: $.__views.index
    });
    $.__views.title.setParent($.__views.index);
    $.__views.loading = Ti.UI.createActivityIndicator({
        color: "white",
        backgroundColor: "black",
        borderRadius: 4,
        message: "下載中...",
        bottom: "10",
        left: "50%",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "loading"
    });
    $.__views.index.add($.__views.loading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var db = require("db").db;
    var index = {
        currentView: "",
        init: function() {
            db.checkTable();
            this.currentView = Alloy.createController("firstpage").getView();
            Alloy.Globals.Loading = $.loading;
            $.title.mainContentView.add(this.currentView);
            $.index.open();
            this.addEvent();
        },
        addEvent: function() {
            $.title.menu.table.addEventListener("click", function(e) {
                $.title.leftButton.fireEvent("click");
                var args = {
                    mainView: $.title.mainContentView
                };
                if (e.row.showView) {
                    $.title.mainContentView.remove(index.currentView);
                    var newView = Alloy.createController(e.row.showView, args).getView();
                    if (newView != index.currentView) {
                        index.currentView = newView;
                        $.title.mainContentView.add(index.currentView);
                    }
                }
            });
        }
    };
    index.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;