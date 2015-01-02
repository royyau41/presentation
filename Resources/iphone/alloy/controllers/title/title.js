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
    this.__controllerPath = "title/title";
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
    $.__views.movableview = Ti.UI.createView({
        width: "100%",
        height: "100%",
        id: "movableview"
    });
    $.__views.movableview && $.addTopLevelView($.__views.movableview);
    $.__views.shadowview = Ti.UI.createView({
        width: "100%",
        height: "100%",
        layout: "vertical",
        scrollType: "vertical",
        id: "shadowview"
    });
    $.__views.movableview.add($.__views.shadowview);
    $.__views.navview = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "100%",
        height: Ti.UI.SIZE,
        backgroundColor: "#24AA91",
        zIndex: 9,
        id: "navview"
    });
    $.__views.shadowview.add($.__views.navview);
    $.__views.returnButton = Ti.UI.createButton({
        backgroundImage: "/title/imgback.png",
        left: "10dp",
        top: "25dp",
        visible: false,
        width: "54",
        height: "29",
        style: "none",
        zIndex: 10,
        id: "returnButton"
    });
    $.__views.navview.add($.__views.returnButton);
    $.__views.titleImg = Ti.UI.createImageView({
        image: "/title/header1.jpg",
        width: "1025dp",
        height: "88",
        left: -12,
        top: 0,
        zIndex: 9,
        id: "titleImg"
    });
    $.__views.navview.add($.__views.titleImg);
    $.__views.leftButton = Ti.UI.createButton({
        id: "leftButton"
    });
    $.__views.navview.add($.__views.leftButton);
    $.__views.rightButton = Ti.UI.createButton({
        right: "20dp",
        top: "25dp",
        backgroundImage: Alloy.Globals.rightButton,
        width: "136",
        height: "41",
        style: "none",
        zIndex: 10,
        id: "rightButton"
    });
    $.__views.navview.add($.__views.rightButton);
    $.__views.mainContentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.Fill,
        backgroundColor: "#E6E6E6",
        id: "mainContentView"
    });
    $.__views.shadowview.add($.__views.mainContentView);
    $.__views.menuList = Ti.UI.createView({
        width: Ti.UI.SIZE,
        top: "-4000",
        right: 10,
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "black",
        zIndex: 5,
        opacity: 1,
        id: "menuList"
    });
    $.__views.movableview.add($.__views.menuList);
    $.__views.menu = Alloy.createController("menu/menurow", {
        id: "menu",
        __parentSymbol: $.__views.menuList
    });
    $.__views.menu.setParent($.__views.menuList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var comjs = require("common");
    var duration = 500;
    var hasSlided = false;
    var direction = "reset";
    var title = {
        init: function() {
            this.setEvent();
            this.setMenu();
            if (args.newWin) {
                $.returnButton.visible = true;
                $.returnButton.addEventListener("click", function() {
                    args.currentWin.close();
                });
            }
        },
        setMenu: function() {
            this.setClickMenu();
        },
        setEvent: function() {
            Ti.App.addEventListener("showPage", function(evtData) {
                evtData.loadViewargs.win = args.currentWin;
                evtData.loadViewargs.mainView = $.mainContentView;
                changeMainContent(evtData.e, evtData.loadViewargs);
            });
            $.rightButton.addEventListener("click", function() {
                $.leftButton.fireEvent("click");
            });
            $.leftButton.addEventListener("click", function() {
                $.menuList.setHeight(pToD(Ti.Platform.displayCaps.platformHeight - $.navview.toImage().height));
                $.menu.table.setHeight(pToD(Ti.Platform.displayCaps.platformHeight - $.navview.toImage().height));
                Alloy.Globals.titleHeight = $.navview.size.height;
                var animateDown = Ti.UI.createAnimation({
                    top: $.navview.size.height,
                    duration: duration
                });
                var animateReset = Ti.UI.createAnimation({
                    top: "-" + Ti.Platform.displayCaps.platformHeight,
                    duration: 150
                });
                if (hasSlided) {
                    direction = "reset";
                    $.menuList.animate(animateReset);
                    hasSlided = false;
                } else {
                    direction = "down";
                    $.menuList.animate(animateDown);
                    hasSlided = true;
                }
            });
        },
        setClickMenu: function() {
            $.menu.table.addEventListener("click", function(e) {
                $.leftButton.fireEvent("click");
                var loadViewargs = {
                    mainView: $.mainContentView,
                    win: args.currentWin
                };
                changeMainContent(e.row, loadViewargs);
            });
        }
    };
    var changeMainContent = function(e, loadViewargs) {
        if (e.showView) {
            $.mainContentView.children.length && $.mainContentView.remove($.mainContentView.children[0]);
            var newView = comjs.getLoadingView(e.showView, loadViewargs);
            if (newView != title.currentView) {
                $.returnButton.visible = false;
                title.currentView = newView;
                $.mainContentView.add(title.currentView);
            }
        }
        if (e.rightButton) {
            $.rightButton.setBackgroundImage(e.rightButton);
            Alloy.Globals.rightButton = e.rightButton;
        }
    };
    title.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;