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
    this.__controllerPath = "newdev/newdevDetailTmpl1";
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
    $.__views.newdevDeatilTmpl1Main = Ti.UI.createScrollView({
        layout: "vertical",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        scrollType: "vertical",
        height: Ti.UI.FILL,
        width: "100%",
        contentWidth: "100%",
        id: "newdevDeatilTmpl1Main"
    });
    $.__views.newdevDeatilTmpl1Main && $.addTopLevelView($.__views.newdevDeatilTmpl1Main);
    $.__views.newdevDtlAddrView = Ti.UI.createView({
        left: "20dp",
        top: "20dp",
        height: Ti.UI.SIZE,
        borderRadius: 5,
        layout: "vertical",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#23aa90",
                offset: 0
            }, {
                color: "#21a088",
                offset: .45
            }, {
                color: "#1b846f",
                offset: 1
            } ]
        },
        width: Ti.UI.SIZE,
        id: "newdevDtlAddrView"
    });
    $.__views.newdevDeatilTmpl1Main.add($.__views.newdevDtlAddrView);
    $.__views.newdevDtlAddr = Ti.UI.createLabel({
        color: "#efefef",
        left: "10dp",
        top: "5dp",
        height: 22,
        bottom: 10,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "newdevDtlAddr"
    });
    $.__views.newdevDtlAddrView.add($.__views.newdevDtlAddr);
    $.__views.newdevDtlScrollImgView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        top: 20,
        left: 20,
        right: 20,
        borderColor: "#CACACA",
        borderWidth: "1",
        borderRadius: 5,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#EEEEEE",
                offset: 0
            }, {
                color: "#EEEEEE",
                offset: .45
            }, {
                color: "#EEEEEE",
                offset: 1
            } ]
        },
        width: Ti.UI.FILL,
        height: "80%",
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "horizontal",
        id: "newdevDtlScrollImgView"
    });
    $.__views.newdevDeatilTmpl1Main.add($.__views.newdevDtlScrollImgView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.getObject("loginInfo", false);
    var db = require("db").db;
    var viewFile = require("viewFile").viewFile;
    var args = arguments[0] || {};
    var newdevDetailTmpl1 = {
        titleView: null,
        detailView: null,
        init: function() {
            this.genPropItemView();
            this.setImage();
        },
        genPropItemView: function() {
            var propdetail = database.getPropInfo(args.newdevNo);
            $.newdevDtlAddr.text = propdetail["chinesename"];
            $.newdevDtlAddr.setWidth(pToD($.newdevDtlAddr.toImage().width) + 10);
        },
        setImage: function() {
            var newdevImage = database.getImage(args.newdevNo);
            if (newdevImage) {
                var imageHeight = .7 * (Alloy.Globals.DisplayHeight - Alloy.Globals.titleHeight - 20);
                for (var i = 0; i < newdevImage.length; i++) {
                    var filetype = newdevImage[i]["filename"].split(".");
                    filetype = filetype[filetype.length - 1];
                    var smallImageItemView = Ti.UI.createView({
                        width: .58 * (Alloy.Globals.DisplayHeight - 20) + "dp",
                        height: imageHeight + 10,
                        left: "20dp",
                        top: "8dp",
                        left: "10dp"
                    });
                    var fileName = i + ".pdf";
                    var content = viewFile(filetype, newdevImage[i], true, {
                        fileName: fileName
                    });
                    smallImageItemView.add(content);
                    $.newdevDtlScrollImgView.add(smallImageItemView);
                }
            }
        }
    };
    var database = {
        getPropInfo: function(number) {
            var $sql = "select * from newdev where number=" + number;
            var res = db.getObjResultSet($sql);
            return res[0] || {};
        },
        getImage: function(number) {
            var $sql = "select attachment,filename from newdevfile where  newdevelopmentno=" + number;
            var res = db.getObjResultSet($sql);
            return res || {};
        }
    };
    newdevDetailTmpl1.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;