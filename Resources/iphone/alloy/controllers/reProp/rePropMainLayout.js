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
    this.__controllerPath = "reProp/rePropMainLayout";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        var $model = __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.rePropMainLayoutView = Ti.UI.createView({
        title: "推介樓盤",
        backgroundColor: "#E6E6E6",
        height: Ti.UI.FILL,
        id: "rePropMainLayoutView"
    });
    $.__views.rePropMainLayoutView && $.addTopLevelView($.__views.rePropMainLayoutView);
    $.__views.rePropImgParaView = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        top: 0,
        right: 0,
        borderRadius: 5,
        zIndex: 10,
        id: "rePropImgParaView"
    });
    $.__views.rePropMainLayoutView.add($.__views.rePropImgParaView);
    $.__views.rePropImgHold = Ti.UI.createView({
        width: 25,
        height: 205,
        bottom: 0,
        backgroundColor: "#767d86",
        id: "rePropImgHold"
    });
    $.__views.rePropImgParaView.add($.__views.rePropImgHold);
    $.__views.rePropImgArrow = Ti.UI.createImageView({
        image: "/reProp/leftArw.png",
        width: 16,
        height: 20,
        id: "rePropImgArrow"
    });
    $.__views.rePropImgHold.add($.__views.rePropImgArrow);
    $.__views.rePropSearchView = Ti.UI.createView({
        borderColor: "#A4A4A4",
        borderWidth: 1,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        bottom: 0,
        backgroundColor: "#FFFFFF",
        top: 0,
        layout: "vertical",
        id: "rePropSearchView"
    });
    $.__views.rePropImgParaView.add($.__views.rePropSearchView);
    $.__views.rePropSearchTitleView = Ti.UI.createView({
        width: 180,
        backgroundColor: "#088A85",
        height: 35,
        id: "rePropSearchTitleView"
    });
    $.__views.rePropSearchView.add($.__views.rePropSearchTitleView);
    $.__views.rePropSearchTitle = Ti.UI.createLabel({
        color: "#FFFFFF",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        text: "排序",
        id: "rePropSearchTitle"
    });
    $.__views.rePropSearchTitleView.add($.__views.rePropSearchTitle);
    $.__views.__alloyId100 = Ti.UI.createView({
        top: 10,
        left: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId100"
    });
    $.__views.rePropSearchView.add($.__views.__alloyId100);
    $.__views.rePropSearchAddr = Ti.UI.createLabel({
        color: "black",
        width: 100,
        text: "地址",
        id: "rePropSearchAddr"
    });
    $.__views.__alloyId100.add($.__views.rePropSearchAddr);
    $.__views.addrValue = Ti.UI.createLabel({
        color: "#04B404",
        width: 50,
        text: "遞增",
        id: "addrValue",
        value: "asc"
    });
    $.__views.__alloyId100.add($.__views.addrValue);
    $.__views.addrSelImg = Ti.UI.createImageView({
        width: 22,
        height: 22,
        image: "/reProp/downArrow.png",
        id: "addrSelImg",
        chSource: "addrValue"
    });
    $.__views.__alloyId100.add($.__views.addrSelImg);
    $.__views.__alloyId101 = Ti.UI.createView({
        top: 10,
        left: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId101"
    });
    $.__views.rePropSearchView.add($.__views.__alloyId101);
    $.__views.rePropSearchPrice = Ti.UI.createLabel({
        color: "black",
        width: 100,
        text: "售價",
        id: "rePropSearchPrice"
    });
    $.__views.__alloyId101.add($.__views.rePropSearchPrice);
    $.__views.priceValue = Ti.UI.createLabel({
        color: "#04B404",
        width: 50,
        text: "遞增",
        id: "priceValue",
        value: "asc"
    });
    $.__views.__alloyId101.add($.__views.priceValue);
    $.__views.priceSelImg = Ti.UI.createImageView({
        width: 22,
        height: 22,
        image: "/reProp/downArrow.png",
        id: "priceSelImg",
        chSource: "priceValue"
    });
    $.__views.__alloyId101.add($.__views.priceSelImg);
    $.__views.__alloyId102 = Ti.UI.createView({
        top: 10,
        left: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId102"
    });
    $.__views.rePropSearchView.add($.__views.__alloyId102);
    $.__views.rePropSearchRent = Ti.UI.createLabel({
        color: "black",
        width: 100,
        text: "租金",
        id: "rePropSearchRent"
    });
    $.__views.__alloyId102.add($.__views.rePropSearchRent);
    $.__views.rentValue = Ti.UI.createLabel({
        color: "#04B404",
        width: 50,
        text: "遞增",
        id: "rentValue",
        value: "asc"
    });
    $.__views.__alloyId102.add($.__views.rentValue);
    $.__views.rentSelImg = Ti.UI.createImageView({
        width: 22,
        height: 22,
        image: "/reProp/downArrow.png",
        id: "rentSelImg",
        chSource: "rentValue"
    });
    $.__views.__alloyId102.add($.__views.rentSelImg);
    $.__views.__alloyId103 = Ti.UI.createView({
        top: 10,
        left: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId103"
    });
    $.__views.rePropSearchView.add($.__views.__alloyId103);
    $.__views.rePropSearchNarea = Ti.UI.createLabel({
        color: "black",
        width: 100,
        text: "實用面積",
        id: "rePropSearchNarea"
    });
    $.__views.__alloyId103.add($.__views.rePropSearchNarea);
    $.__views.nareaValue = Ti.UI.createLabel({
        color: "#04B404",
        width: 50,
        text: "遞增",
        id: "nareaValue",
        value: "asc"
    });
    $.__views.__alloyId103.add($.__views.nareaValue);
    $.__views.nareaSelImg = Ti.UI.createImageView({
        width: 22,
        height: 22,
        image: "/reProp/downArrow.png",
        id: "nareaSelImg",
        chSource: "nareaValue"
    });
    $.__views.__alloyId103.add($.__views.nareaSelImg);
    $.__views.__alloyId104 = Ti.UI.createView({
        top: 10,
        left: 10,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId104"
    });
    $.__views.rePropSearchView.add($.__views.__alloyId104);
    $.__views.submitBtn = Ti.UI.createButton({
        title: "碓定",
        top: 0,
        left: 0,
        width: 100,
        height: Ti.UI.SIZE,
        color: "#FFFFFF",
        borderRadius: 5,
        font: {
            fontSize: "15dp"
        },
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#4DB2B6",
                offset: 0
            }, {
                color: "#409295",
                offset: 1
            } ]
        },
        zIndex: 100,
        id: "submitBtn"
    });
    $.__views.__alloyId104.add($.__views.submitBtn);
    $.__views.rePropTmpl1Table = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#E6E6E6",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        separatorColor: "transparent",
        separatorstyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "rePropTmpl1Table"
    });
    $.__views.rePropMainLayoutView.add($.__views.rePropTmpl1Table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    loginInfo = Ti.App.Properties.getObject("loginInfo", false);
    var db = require("db").db;
    var getPropGroup = require("getData").propGroup;
    var getProp = require("getData").property;
    var email = require("email").email;
    var propgroup = Ti.App.Properties.getInt("propgroup", 0);
    var propPage = Ti.App.Properties.getInt("propPage", 1);
    var args = arguments[0] || {};
    var win = args.win;
    var bottomBar = new funcBar("property");
    var selectedColor = "blue";
    var botBar = false;
    var reProp = {
        emailProp: [],
        propertyList: [],
        init: function() {
            bottomBar.setCencelEvent(cancelSet);
            this.setLangTitle();
            this.addEvent();
            propgroup || (propgroup = getPropGroup.getLastPropgroupNo());
            var property = getProp.getList(propgroup);
            property && this.showProp(property);
            var btmView = bottomBar.getBtmView();
            $.rePropMainLayoutView.add(btmView);
            this.setSortSearchOption();
        },
        setLangTitle: function() {
            $.rePropSearchAddr.text = s("addr");
            $.rePropSearchPrice.text = s("price");
            $.rePropSearchRent.text = s("rent");
            $.rePropSearchNarea.text = s("narea");
            $.addrValue.test = s("orderasc");
            $.priceValue.test = s("orderasc");
            $.rentValue.test = s("orderasc");
            $.nareaValue.test = s("orderasc");
        },
        showProp: function(record) {
            var row = [];
            var index = 0;
            for (var i in record) {
                index++;
                var length = record.length;
                reProp.propertyList.push(record[i].number);
                record[i]["order"] = index + "/" + length;
                record[i]["win"] = win;
                var result = Alloy.createController("reProp/rePropTmpl1", record[i]).getView();
                row.push(result);
            }
            $.rePropTmpl1Table.setData(row);
        },
        setSortSearchOption: function() {
            var t = this;
            $.priceSelImg.addEventListener("click", orderDialog);
            $.nareaSelImg.addEventListener("click", orderDialog);
            $.rentSelImg.addEventListener("click", orderDialog);
            $.addrSelImg.addEventListener("click", orderDialog);
            $.priceValue.addEventListener("click", orderDialog);
            $.nareaValue.addEventListener("click", orderDialog);
            $.rentValue.addEventListener("click", orderDialog);
            $.addrValue.addEventListener("click", orderDialog);
            $.submitBtn.addEventListener("click", function() {
                var orderClause = [];
                $.priceValue.value && orderClause.push("price " + $.priceValue.value);
                $.rentValue.value && orderClause.push("rent " + $.priceValue.value);
                $.priceValue.value && orderClause.push("c_premises " + $.priceValue.value);
                $.nareaValue.value && orderClause.push("NETAREA " + $.nareaValue.value);
                if (orderClause.length) {
                    orderClause = orderClause.join();
                    orderClause = "order by " + orderClause;
                }
                var property = getProp.getList(propgroup, {}, orderClause);
                property && t.showProp(property);
            });
            var sortShow = 1;
            var animateShow = Ti.UI.createAnimation({
                right: 0,
                duration: 150
            });
            $.rePropImgParaView.addEventListener("postlayout", function() {
                $.rePropImgHold.height = $.rePropImgParaView.size.height;
            });
            $.rePropImgParaView.addEventListener("swipe", function(e) {
                sortShow = "left" == e.direction ? 0 : 1;
                $.rePropImgHold.fireEvent("click");
            });
            $.rePropImgHold.addEventListener("click", function() {
                if (sortShow) {
                    var animateHide = Ti.UI.createAnimation({
                        right: "-" + pToD($.rePropSearchView.toImage().width),
                        duration: 150
                    });
                    {
                        pToD($.rePropSearchView.toImage().width);
                    }
                    $.rePropImgParaView.animate(animateHide);
                    sortShow = 0;
                } else {
                    sortShow = 1;
                    $.rePropImgParaView.animate(animateShow);
                }
            });
        },
        addEvent: function() {
            $.rePropTmpl1Table.addEventListener("click", function(e) {
                if (botBar) selectRow(e); else {
                    var obj = {
                        propertyList: reProp.propertyList,
                        propgroup: e.row.propgroup,
                        record: e.row.record,
                        index: e.index,
                        layout: propPage
                    };
                    {
                        Alloy.createController("reProp/rePropDetail", obj);
                    }
                }
            });
            $.rePropTmpl1Table.addEventListener("longpress", function(e) {
                bottomBar.show();
                botBar = true;
                selectRow(e);
            });
        }
    };
    var orderDialog = function(e) {
        var opts = {
            cancel: 2,
            options: [ s("orderAsc"), s("orderDesc"), "取消" ],
            selectedIndex: 2
        };
        var text = "";
        var value = "";
        var dialog = Ti.UI.createOptionDialog(opts);
        dialog.show();
        dialog.addEventListener("click", function(e1) {
            switch (e1.index) {
              case 0:
                text = s("orderAsc");
                value = "asc";
                break;

              case 1:
                text = s("orderDesc");
                value = "desc";
                break;

              default:
                text = " ";
            }
            if (text) if (null != e.source.chSource) {
                eval("$." + e.source.chSource + ".text=text");
                eval("$." + e.source.chSource + ".value=value");
            } else {
                eval("$." + e.source.id + ".text=text");
                eval("$." + e.source.id + ".value=value");
            }
        });
    };
    var selectRow = function(e) {
        if (e.row.backgroundColor == selectedColor) {
            reProp.emailProp = _.filter(reProp.emailProp, function(num) {
                return num != e.row.propertyid;
            });
            e.row.backgroundColor = "#E6E6E6";
        } else {
            -1 == reProp.emailProp.indexOf(e.row.propertyid) && reProp.emailProp.push(e.row.propertyid);
            e.row.backgroundColor = selectedColor;
        }
        bottomBar.setProperty(reProp.emailProp);
    };
    var cancelSet = function() {
        reProp.emailProp = [];
        _.each($.rePropTmpl1Table.data[0].rows, function(e) {
            e.backgroundColor = "#E6E6E6";
        });
        botBar = false;
    };
    reProp.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;