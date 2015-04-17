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
    this.__controllerPath = "viewFile/viewFile";
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
    $.__views.viewFileWin = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ 3, 4 ],
        theme: "Theme.noActionBar",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: 1,
        id: "viewFileWin"
    });
    $.__views.viewFileWin && $.addTopLevelView($.__views.viewFileWin);
    $.__views.topView = Ti.UI.createView({
        width: Ti.UI.Fill,
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        backgroundColor: "grey",
        zIndex: 100,
        id: "topView"
    });
    $.__views.viewFileWin.add($.__views.topView);
    $.__views.backBtn = Ti.UI.createButton({
        left: 5,
        top: 5,
        width: 80,
        height: 43,
        id: "backBtn"
    });
    $.__views.topView.add($.__views.backBtn);
    $.__views.contentView = Ti.UI.createView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true,
        maxZoomScale: 10,
        minZoomScale: .1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "contentView"
    });
    $.__views.viewFileWin.add($.__views.contentView);
    $.__views.bottomView = Ti.UI.createView({
        width: "100%",
        bottom: 0,
        height: "40dp",
        backgroundColor: "grey",
        id: "bottomView"
    });
    $.__views.viewFileWin.add($.__views.bottomView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.backBtn.backgroundImage = "/temp/" + Alloy.Globals.langIso + "/imgback.png";
    $.backBtn.addEventListener("click", function() {
        $.viewFileWin.close();
    });
    var topViewShow = Ti.UI.createAnimation({
        top: 0,
        duration: 500
    });
    var topViewHide = Ti.UI.createAnimation({
        top: "-" + $.topView.toImage().height,
        duration: 500
    });
    var bottomViewShow = Ti.UI.createAnimation({
        bottom: 0,
        duration: 500
    });
    var bottomViewHide = Ti.UI.createAnimation({
        bottom: "-" + $.bottomView.toImage().height,
        duration: 500
    });
    var showView = false;
    "pdf" != args["type"] && setTimeout(function() {
        $.topView.animate(topViewHide);
        $.bottomView.animate(bottomViewHide);
    }, 2e3);
    $.contentView.addEventListener("click", function() {
        if (showView) {
            $.topView.animate(topViewHide);
            $.bottomView.animate(bottomViewHide);
            showView = false;
        } else {
            $.topView.animate(topViewShow);
            $.bottomView.animate(bottomViewShow);
            showView = true;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;