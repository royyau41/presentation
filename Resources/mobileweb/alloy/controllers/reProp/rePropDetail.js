function Controller() {
    function loadView(view, propertyId) {
        if (view) if (view.children.length) ; else {
            var obj = {
                propgroup: args.propgroup,
                propertyno: propertyId
            };
            view.add(Alloy.createController("reProp/rePropDetailTmpl1", obj).getView());
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reProp/rePropDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        zIndex: 10,
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
        contentHeight: "auto",
        views: __alloyId41,
        id: "rePropDtlScrollView"
    });
    $.__views.mainDetailView.add($.__views.rePropDtlScrollView);
    $.__views.rePropDtlBtnView = Ti.UI.createView({
        top: 20,
        height: "38dp",
        bottom: 20,
        id: "rePropDtlBtnView"
    });
    $.__views.mainDetailView.add($.__views.rePropDtlBtnView);
    $.__views.rePropDtlPrev = Ti.UI.createButton({
        backgroundImage: "/temp/prevBtn.png",
        top: 0,
        right: 120,
        width: "87dp",
        height: "38dp",
        id: "rePropDtlPrev"
    });
    $.__views.rePropDtlBtnView.add($.__views.rePropDtlPrev);
    $.__views.rePropDtlNext = Ti.UI.createButton({
        backgroundImage: "/temp/nextBtn.png",
        top: 0,
        right: 20,
        width: "87dp",
        height: "38dp",
        id: "rePropDtlNext"
    });
    $.__views.rePropDtlBtnView.add($.__views.rePropDtlNext);
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
            $.rePropDtlScrollView.setHeight(Ti.Platform.displayCaps.platformHeight - Alloy.Globals.titleHeight - $.rePropDtlBtnView.top - $.rePropDtlBtnView.toImage().height - 20);
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