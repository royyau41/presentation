function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadView(view, propertyId) {
        if (view) if (view.children.length) ; else {
            var obj = {
                win: win,
                propgroup: args.propgroup,
                propertyno: propertyId
            };
            view.add(Alloy.createController("reProp/rePropDetailTmpl" + (args.layout || 1), obj).getView());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reProp/rePropDetail";
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
    $.__views.rePropDetail = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        title: "主頁",
        id: "rePropDetail"
    });
    $.__views.rePropDetail && $.addTopLevelView($.__views.rePropDetail);
    $.__views.mainDetailView = Ti.UI.createView({
        backgroundColor: "#E5E5E5",
        width: Ti.UI.FILL,
        zIndex: 2,
        layout: "vertical",
        height: Ti.UI.FILL,
        id: "mainDetailView"
    });
    $.__views.rePropDetail.add($.__views.mainDetailView);
    var __alloyId41 = [];
    $.__views.rePropDtlScrollView = Ti.UI.createScrollableView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        width: "100%",
        contentWidth: "auto",
        contentHeight: "100%",
        showPagingControl: true,
        views: __alloyId41,
        id: "rePropDtlScrollView"
    });
    $.__views.mainDetailView.add($.__views.rePropDtlScrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var args = arguments[0] || {};
    var basicui = new baseUi(true, false);
    var win = basicui.getBasic_win();
    var mainView = basicui.getMainView();
    var rePropDetail = {
        currentProperty: args.record,
        propertyNumberList: args.propertyList,
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
            for (var k in this.propertyNumberList) {
                var basic_view = Ti.UI.createView({
                    width: Ti.UI.FILL,
                    height: Ti.UI.FIll
                });
                this.containers.push(basic_view);
                if (this.propertyNumberList[k] == this.currentProperty) {
                    loadView(this.containers[i], this.propertyNumberList[k]);
                    this.currentPage = i;
                    $.rePropDtlScrollView.currentPage = i;
                }
                i++;
            }
            $.rePropDtlScrollView.views = this.containers;
            $.rePropDtlScrollView.addEventListener("scroll", this.setScrollEvent);
            $.rePropDtlScrollView.currentPage = this.currentPage;
        },
        setScrollEvent: function(evt) {
            if (rePropDetail.currentPage != evt.currentPage) {
                rePropDetail.currentPage = evt.currentPage;
                loadView(rePropDetail.containers[evt.currentPage], rePropDetail.propertyNumberList[evt.currentPage]);
            }
        }
    };
    rePropDetail.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;