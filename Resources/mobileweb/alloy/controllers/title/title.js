function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "title/title";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.movableview = Ti.UI.createView({
        width: Alloy.Globals.DisplayWidth,
        height: Alloy.Globals.DisplayHeight,
        id: "movableview"
    });
    $.__views.movableview && $.addTopLevelView($.__views.movableview);
    $.__views.shadowview = Ti.UI.createView({
        id: "shadowview"
    });
    $.__views.movableview.add($.__views.shadowview);
    $.__views.navview = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Alloy.Globals.DisplayWidth,
        height: "88",
        backgroundImage: "/title/header.jpg",
        zIndex: 6,
        id: "navview"
    });
    $.__views.shadowview.add($.__views.navview);
    $.__views.leftButton = Ti.UI.createButton({
        left: "0dp",
        top: "0dp",
        backgroundImage: "none",
        image: "/menu/ButtonMenu.png",
        height: "44",
        width: "60",
        style: "none",
        id: "leftButton"
    });
    $.__views.navview.add($.__views.leftButton);
    $.__views.rightButton = Ti.UI.createButton({
        right: "20dp",
        top: "30dp",
        backgroundImage: "none",
        image: "/title/recomBtn.png",
        height: "41",
        width: "136",
        style: "none",
        id: "rightButton"
    });
    $.__views.navview.add($.__views.rightButton);
    $.__views.menuList = Ti.UI.createView({
        width: Ti.UI.SIZE,
        left: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "black",
        zIndex: 5,
        opacity: .8,
        id: "menuList"
    });
    $.__views.shadowview.add($.__views.menuList);
    $.__views.menu = Alloy.createController("menu/menurow", {
        id: "menu",
        __parentSymbol: $.__views.menuList
    });
    $.__views.menu.setParent($.__views.menuList);
    $.__views.mainContentView = Ti.UI.createView({
        width: Alloy.Globals.DisplayWidth,
        backgroundColor: "#E6E6E6",
        id: "mainContentView"
    });
    $.__views.shadowview.add($.__views.mainContentView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    {
        Ti.UI.createAnimation({
            top: $.navview.height,
            duration: 500
        });
    }
    {
        Ti.UI.createAnimation({
            top: "-" + $.menuList.toImage().height,
            duration: 150
        });
    }
    var hasSlided = false;
    var direction = "reset";
    var title = {
        init: function() {
            $.mainContentView.setHeight(Alloy.Globals.DisplayHeight - $.navview.height);
            $.mainContentView.setTop($.navview.height);
            Alloy.Globals.titleHeight = $.navview.height;
            this.setEvent();
            !args.newWin;
            this.setMenu();
        },
        setMenu: function() {
            $.menuList.setTop("-" + $.menuList.toImage().height);
            $.menu.table.setHeight(Alloy.Globals.DisplayHeight - $.navview.height);
        },
        setEvent: function() {
            $.leftButton.addEventListener("click", function() {
                if (args.newWin) {
                    Ti.UI.currentWindow;
                    args.currentWin.close();
                } else if (hasSlided) {
                    direction = "reset";
                    $.menuList.setTop("-" + $.menuList.toImage().height);
                    hasSlided = false;
                } else {
                    direction = "down";
                    $.menuList.setTop($.navview.height);
                    hasSlided = true;
                }
            });
        }
    };
    title.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;