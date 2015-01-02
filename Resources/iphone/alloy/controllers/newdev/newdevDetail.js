function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadView(view, newdevNo) {
        if (view) if (view.children.length) ; else {
            var obj = {
                newdevNo: newdevNo
            };
            view.add(Alloy.createController("newdev/newdevDetailTmpl1", obj).getView());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newdev/newdevDetail";
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
    $.__views.newdevDetail = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        title: "主頁",
        id: "newdevDetail"
    });
    $.__views.newdevDetail && $.addTopLevelView($.__views.newdevDetail);
    $.__views.mainDetailView = Ti.UI.createView({
        backgroundColor: "#E5E5E5",
        width: Ti.UI.FILL,
        zIndex: 10,
        layout: "vertical",
        height: Ti.UI.FILL,
        id: "mainDetailView"
    });
    $.__views.newdevDetail.add($.__views.mainDetailView);
    var __alloyId40 = [];
    $.__views.newdevDtlScrollView = Ti.UI.createScrollableView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        width: "100%",
        contentWidth: "auto",
        contentHeight: "100%",
        views: __alloyId40,
        id: "newdevDtlScrollView"
    });
    $.__views.mainDetailView.add($.__views.newdevDtlScrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var args = arguments[0] || {};
    var basicui = new baseUi(true);
    var win = basicui.getBasic_win();
    var mainView = basicui.getMainView();
    var newdevDetail = {
        currentNewdev: args.record,
        newdevList: args.newdevList,
        titleView: null,
        detailView: null,
        containers: [],
        currentPage: 0,
        init: function() {
            mainView.add($.mainDetailView);
            win.open();
            this.setScrollView();
        },
        setScrollView: function() {
            this.containers = [];
            var i = 0;
            for (var k in this.newdevList) {
                var basic_view = Ti.UI.createView({
                    width: Ti.UI.FILL,
                    height: Ti.UI.FIll
                });
                this.containers.push(basic_view);
                if (this.newdevList[k] == this.currentNewdev) {
                    loadView(this.containers[i], this.newdevList[k]);
                    this.currentPage = i;
                    $.newdevDtlScrollView.currentPage = i;
                }
                i++;
            }
            $.newdevDtlScrollView.views = this.containers;
            $.newdevDtlScrollView.addEventListener("scroll", this.setScrollEvent);
            $.newdevDtlScrollView.currentPage = this.currentPage;
        },
        setScrollEvent: function(evt) {
            if (newdevDetail.currentPage != evt.currentPage) {
                newdevDetail.currentPage = evt.currentPage;
                loadView(newdevDetail.containers[evt.currentPage], newdevDetail.newdevList[evt.currentPage]);
            }
        }
    };
    newdevDetail.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;