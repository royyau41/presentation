function Controller() {
    function loadView(view, estateno) {
        if (view) if (view.children.length) ; else {
            var obj = {
                estateno: estateno
            };
            view.add(Alloy.createController("neEstate/neEstateDetailTmpl1", obj).getView());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "neEstate/neEstateDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.neEstateDetail = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        title: "主頁",
        id: "neEstateDetail"
    });
    $.__views.neEstateDetail && $.addTopLevelView($.__views.neEstateDetail);
    $.__views.mainDetailView = Ti.UI.createView({
        backgroundColor: "#E5E5E5",
        zIndex: 10,
        layout: "vertical",
        height: Ti.UI.FILL,
        id: "mainDetailView"
    });
    $.__views.neEstateDetail.add($.__views.mainDetailView);
    var __alloyId40 = [];
    $.__views.neEstateDtlScrollView = Ti.UI.createScrollableView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        width: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        views: __alloyId40,
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
    var neEstateDetail = {
        currentEstate: args.record,
        estateList: args.estateList,
        containers: [],
        currentPage: 0,
        init: function() {
            var args = {
                newWin: true,
                currentWin: $.neEstateDetail
            };
            this.title = Alloy.createController("title/title", args).getView();
            $.neEstateDetail.add(this.title);
            $.mainDetailView.setTop(Alloy.Globals.titleHeight);
            $.neEstateDtlBtnView.setHeight($.neEstateDtlBtnView.toImage().height + 20);
            $.neEstateDtlScrollView.setHeight(Ti.Platform.displayCaps.platformHeight - Alloy.Globals.titleHeight - $.neEstateDtlBtnView.top - $.neEstateDtlBtnView.toImage().height);
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
                    console.log(this.estateList);
                    console.log(this.currentEstate);
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