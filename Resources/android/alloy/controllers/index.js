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
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        backgroundColor: "#E6E6E6",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var db = require("db").db;
    require("ti.map");
    var basicui = new baseUi(false);
    var win = basicui.getBasic_win();
    basicui.getMainView();
    var pushNo = require("pushNotification").pushNotification;
    var index = {
        init: function() {
            var chkbit = 0;
            win.addEventListener("postlayout", function() {
                0 == chkbit && (chkbit = 1);
            });
            win.exitOnClose = true;
            win.open();
            db.init();
            pushNo.getDeviceToken();
            win.addEventListener("android:back", function() {
                var dialog = Ti.UI.createAlertDialog({
                    cancel: 0,
                    buttonNames: [ "取消", "確定" ],
                    message: "離開APPS？",
                    title: "離開"
                });
                dialog.addEventListener("click", function(e) {
                    1 === e.index && win.close();
                });
                dialog.show();
            });
            this.checkinglogin();
        },
        checkinglogin: function() {
            var e = {
                showView: "login/login",
                rightButton: "/title/loginRt.png",
                win: win
            };
            var loadViewargs = {
                win: win
            };
            var evtData = {
                e: e,
                loadViewargs: loadViewargs
            };
            if (Ti.App.Properties.getObject("loginInfo", false)) if (0 == Ti.App.Properties.getInt("propgroup", 0)) {
                var dialog = Ti.UI.createAlertDialog({
                    buttonNames: [ "確定" ],
                    message: "請選擇顯示樓盤"
                });
                dialog.addEventListener("click", function() {
                    Ti.App.fireEvent("showPage", evtData);
                });
                dialog.show();
            } else {
                langIso = Ti.App.Properties.getString("langIso", "zh");
                e = {
                    showView: "reProp/rePropMainLayout",
                    rightButton: "/title/" + langIso + "/recRt.png",
                    win: win
                };
                evtData.e = e;
                Ti.App.fireEvent("showPage", evtData);
            } else {
                var dialog = Ti.UI.createAlertDialog({
                    buttonNames: [ "確定" ],
                    message: "請先登入及選擇顯示樓盤"
                });
                dialog.addEventListener("click", function() {
                    Ti.App.fireEvent("showPage", evtData);
                });
                dialog.show();
            }
        }
    };
    index.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;