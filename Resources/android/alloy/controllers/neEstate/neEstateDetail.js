function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadView(view, estateno) {
        if (view) if (view.children.length) ; else {
            var obj = {
                estateno: estateno
            };
            view.add(Alloy.createController("neEstate/neEstateDetailTmpl2", obj).getView());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "neEstate/neEstateDetail";
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
    $.__views.mainDetailView = Ti.UI.createView({
        backgroundColor: "#E5E5E5",
        zIndex: 10,
        layout: "vertical",
        height: Ti.UI.FILL,
        id: "mainDetailView"
    });
    $.__views.mainDetailView && $.addTopLevelView($.__views.mainDetailView);
    var __alloyId39 = [];
    $.__views.neEstateDtlScrollView = Ti.UI.createScrollableView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        width: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        views: __alloyId39,
        id: "neEstateDtlScrollView",
        currentPage: "2"
    });
    $.__views.mainDetailView.add($.__views.neEstateDtlScrollView);
    $.__views.neEstateDtlBtnView = Ti.UI.createView({
        top: 10,
        height: "38dp",
        id: "neEstateDtlBtnView"
    });
    $.__views.mainDetailView.add($.__views.neEstateDtlBtnView);
    $.__views.neEstateDtlPrev = Ti.UI.createButton({
        backgroundImage: "/temp/prevBtn.png",
        top: 0,
        right: 130,
        width: "87dp",
        height: "38dp",
        id: "neEstateDtlPrev"
    });
    $.__views.neEstateDtlBtnView.add($.__views.neEstateDtlPrev);
    $.__views.neEstateDtlNext = Ti.UI.createButton({
        backgroundImage: "/temp/nextBtn.png",
        top: 0,
        right: 30,
        width: "87dp",
        height: "38dp",
        id: "neEstateDtlNext"
    });
    $.__views.neEstateDtlBtnView.add($.__views.neEstateDtlNext);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var args = arguments[0] || {};
    require("db").db;
    var basicui = new baseUi(true, false);
    var win = basicui.getBasic_win();
    var mainView = basicui.getMainView();
    var neEstateDetail = {
        currentEstate: args.record,
        estateList: args.estateList,
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
            for (var k in this.estateList) {
                var basic_view = Ti.UI.createView({
                    width: Ti.UI.FILL,
                    height: Ti.UI.FIll
                });
                this.containers.push(basic_view);
                if (this.estateList[k] == this.currentEstate) {
                    loadView(this.containers[i], this.estateList[k]);
                    this.currentPage = i;
                    $.neEstateDtlScrollView.currentPage = i;
                }
                i++;
            }
            $.neEstateDtlScrollView.views = this.containers;
            $.neEstateDtlScrollView.addEventListener("scroll", this.setScrollEvent);
            $.neEstateDtlScrollView.setCurrentPage(this.currentPage);
        },
        setScrollEvent: function(evt) {
            if (neEstateDetail.currentPage != evt.currentPage) {
                neEstateDetail.currentPage = evt.currentPage;
                loadView(neEstateDetail.containers[evt.currentPage], neEstateDetail.estateList[evt.currentPage]);
            }
        }
    };
    neEstateDetail.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;