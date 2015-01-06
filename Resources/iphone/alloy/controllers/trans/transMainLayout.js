function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setActNonBtn(type, state, source) {
        switch (type) {
          case "est":
          case "estate":
            switch (state) {
              case 1:
                source.backgroundGradient = transMain.estNonActColor;
                source.image = "";
                source.active = 0;
                break;

              case 0:
                source.backgroundGradient = transMain.estActColor;
                source.image = "/temp/tick.png";
                source.active = 1;
            }
            break;

          case "dist":
          case "district":
            switch (state) {
              case 1:
                source.backgroundGradient = transMain.distNonActColor;
                source.image = "";
                source.active = 0;
                break;

              case 0:
                source.backgroundGradient = transMain.distActColor;
                source.image = "/temp/tick.png";
                source.active = 1;
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "trans/transMainLayout";
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
    $.__views.transMainLayout = Ti.UI.createView({
        left: "0dp",
        height: Ti.UI.FILL,
        id: "transMainLayout"
    });
    $.__views.transMainLayout && $.addTopLevelView($.__views.transMainLayout);
    $.__views.tranResMain = Ti.UI.createView({
        layout: "vertical",
        id: "tranResMain"
    });
    $.__views.transMainLayout.add($.__views.tranResMain);
    $.__views.tranResBtn = Ti.UI.createView({
        width: "100%",
        height: Ti.UI.SIZE,
        zIndex: 100,
        left: 20,
        top: 0,
        id: "tranResBtn"
    });
    $.__views.tranResMain.add($.__views.tranResBtn);
    $.__views.tranResDistBtn = Ti.UI.createView({
        top: 0,
        width: "100%",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "tranResDistBtn"
    });
    $.__views.tranResBtn.add($.__views.tranResDistBtn);
    $.__views.tranResEstBtn = Ti.UI.createView({
        top: 40,
        width: "100%",
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "tranResEstBtn",
        visible: "false"
    });
    $.__views.tranResBtn.add($.__views.tranResEstBtn);
    $.__views.tranRes = Ti.UI.createView({
        layout: "horizontal",
        width: "90%",
        top: 10,
        id: "tranRes"
    });
    $.__views.tranResMain.add($.__views.tranRes);
    $.__views.tranScroll = Ti.UI.createScrollView({
        top: 0,
        width: "100%",
        height: Ti.UI.FILL,
        contentWidth: "auto",
        scrollType: "horizontal",
        borderRadius: 5,
        id: "tranScroll"
    });
    $.__views.tranRes.add($.__views.tranScroll);
    $.__views.tranResHeader = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
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
        color: "#FFFFFF",
        id: "tranResHeader"
    });
    $.__views.unit = Ti.UI.createLabel({
        color: "#ffffff",
        text: "單位",
        id: "unit",
        width: "110",
        left: "15",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.unit);
    $.__views.floor = Ti.UI.createLabel({
        color: "#ffffff",
        text: "樓層",
        id: "floor",
        width: "60",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.floor);
    $.__views.garea = Ti.UI.createLabel({
        color: "#ffffff",
        text: "建築\n面積",
        id: "garea",
        width: "65",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.garea);
    $.__views.narea = Ti.UI.createLabel({
        color: "#ffffff",
        text: "實用\n面積",
        id: "narea",
        width: "65",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.narea);
    $.__views.price = Ti.UI.createLabel({
        color: "#ffffff",
        text: "成交價",
        id: "price",
        width: "120",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.price);
    $.__views.avaprice = Ti.UI.createLabel({
        color: "#ffffff",
        text: "建築\n呎價",
        id: "avaprice",
        width: "65",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.avaprice);
    $.__views.avnprice = Ti.UI.createLabel({
        color: "#ffffff",
        text: "實用\n呎價",
        id: "avnprice",
        width: "65",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.avnprice);
    $.__views.date = Ti.UI.createLabel({
        color: "#ffffff",
        text: "成交\n日期",
        id: "date",
        width: "100",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.date);
    $.__views.usage = Ti.UI.createLabel({
        color: "#ffffff",
        text: "類別",
        id: "usage",
        width: "65",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.usage);
    $.__views.source = Ti.UI.createLabel({
        color: "#ffffff",
        text: "資料\n來源",
        id: "source",
        width: "80",
        top: "5"
    });
    $.__views.tranResHeader.add($.__views.source);
    var __alloyId105 = [];
    $.__views.__alloyId106 = Ti.UI.createTableViewRow({
        id: "__alloyId106"
    });
    __alloyId105.push($.__views.__alloyId106);
    $.__views.transItem = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        color: "#676767",
        backgroundSelectedColor: "#f4f4f4",
        id: "transItem"
    });
    $.__views.__alloyId106.add($.__views.transItem);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        color: "black",
        text: "單位",
        id: "__alloyId107",
        width: "110",
        left: "15",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createLabel({
        color: "black",
        text: "高",
        id: "__alloyId108",
        width: "60",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createLabel({
        color: "black",
        text: "6000",
        id: "__alloyId109",
        width: "65",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        color: "black",
        text: "5000",
        id: "__alloyId110",
        width: "65",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        color: "black",
        text: "10,252,123",
        id: "__alloyId111",
        width: "120",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createLabel({
        color: "black",
        text: "1000",
        id: "__alloyId112",
        width: "65",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createLabel({
        color: "black",
        text: "1000",
        id: "__alloyId113",
        width: "65",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        color: "black",
        text: "2014/03/02",
        id: "__alloyId114",
        width: "100",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createLabel({
        color: "black",
        text: "工業",
        id: "__alloyId115",
        width: "65",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createLabel({
        color: "black",
        text: "田土廳",
        id: "__alloyId116",
        width: "80",
        top: "10"
    });
    $.__views.transItem.add($.__views.__alloyId116);
    $.__views.tranReslist = Ti.UI.createTableView({
        top: 0,
        width: "100%",
        borderWidth: 1,
        borderColor: Alloy.Globals.showdowColor,
        zIndex: 1,
        borderRadius: 5,
        data: __alloyId105,
        headerView: $.__views.tranResHeader,
        id: "tranReslist"
    });
    $.__views.tranScroll.add($.__views.tranReslist);
    exports.destroy = function() {};
    _.extend($, $.__views);
    loginInfo = Ti.App.Properties.getObject("loginInfo", false);
    var getData = require("getData").trans;
    var disBtnArr = [];
    var estBtnArr = {};
    var distArray = [];
    var args = arguments[0] || {};
    args.win;
    var transMain = {
        distNonActColor: {
            type: "linear",
            colors: [ {
                color: "#4DB2B6",
                offset: 0
            }, {
                color: "#409295",
                offset: 1
            } ]
        },
        estNonActColor: {
            type: "linear",
            colors: [ {
                color: "#C8C8C8",
                offset: 0
            }, {
                color: "#919191",
                offset: 1
            } ]
        },
        distActColor: {
            type: "linear",
            colors: [ {
                color: "#295E61",
                offset: 0
            }, {
                color: "#214D4F",
                offset: 1
            } ]
        },
        estActColor: {
            type: "linear",
            colors: [ {
                color: "#646464",
                offset: 0
            }, {
                color: "#4D4D4D",
                offset: 1
            } ]
        },
        tableField: {
            flat: {
                width: "110dp",
                left: "15dp",
                top: "10dp"
            },
            floor: {
                width: "60dp",
                top: "10dp"
            },
            grossarea: {
                width: "65dp",
                top: "10dp",
                datatype: "number"
            },
            netarea: {
                width: "65dp",
                top: "10dp",
                datatype: "number"
            },
            consideration: {
                width: "120dp",
                top: "10dp",
                datatype: "number"
            },
            averageprice: {
                width: "65dp",
                top: "10dp",
                datatype: "number"
            },
            netaverage: {
                width: "65dp",
                top: "10dp",
                datatype: "number"
            },
            transacdate: {
                width: "100dp",
                top: "10dp"
            },
            stage: {
                width: "65dp",
                top: "10dp"
            },
            infosource: {
                width: "80dp",
                top: "10dp"
            }
        },
        init: function() {
            this.showTransData();
            this.showDistEst();
        },
        showTransData: function(data) {
            var obj = {
                c_district: this.getNonSelect("dist"),
                c_estate: this.getNonSelect("est")
            };
            var data = [];
            var transData = getData.getList(obj);
            for (var k1 in transData) {
                var RowView = Ti.UI.createView({
                    layout: "horizontal",
                    height: 45,
                    color: "#676767",
                    backgroundSelectedColor: "#f4f4f4"
                });
                for (var k in this.tableField) {
                    var rowField = Ti.UI.createLabel({
                        text: transData[k1][k.toLowerCase()] || "",
                        color: "black",
                        width: this.tableField[k].width,
                        top: this.tableField[k].top,
                        left: this.tableField[k].left
                    });
                    switch (this.tableField[k].datatype) {
                      case "number":
                        rowField.text = comjs.addCommas(transData[k1][k.toLowerCase()]);
                    }
                    RowView.add(rowField);
                }
                var row = Ti.UI.createTableViewRow();
                row.add(RowView);
                data.push(row);
            }
            $.tranReslist.data = data;
        },
        showDistEst: function() {
            var distEstData = getData.getDistEst();
            var dist = [];
            var est = {};
            for (var k in distEstData) {
                var cdist_string = distEstData[k].c_district;
                var cest_string = distEstData[k].c_estate;
                if (-1 == dist.indexOf(cdist_string)) {
                    dist.push(cdist_string);
                    est[cdist_string] = [];
                    est[cdist_string].push(cest_string);
                    var distBtn = Ti.UI.createButton({
                        title: cdist_string,
                        width: 95,
                        height: 35,
                        top: 5,
                        left: 5,
                        active: 0,
                        right: "10dp",
                        dist: cdist_string,
                        font: {},
                        color: "#FFFFFF",
                        borderRadius: 5,
                        backgroundGradient: this.distNonActColor
                    });
                    disBtnArr.push(distBtn);
                    $.tranResDistBtn.add(distBtn);
                    var estBtn = Ti.UI.createButton({
                        title: cest_string,
                        dist: cdist_string,
                        est: cest_string,
                        width: 95,
                        height: 35,
                        top: 5,
                        left: 5,
                        active: 0,
                        right: "10dp",
                        font: {},
                        color: "#FFFFFF",
                        borderRadius: 5,
                        backgroundGradient: this.estNonActColor
                    });
                    estBtnArr[cdist_string] = [];
                    estBtnArr[cdist_string].push(estBtn);
                    $.tranResEstBtn.add(estBtn);
                    distBtn.addEventListener("click", function(e) {
                        if (e.source.active) {
                            setActNonBtn("dist", e.source.active, e.source);
                            for (var k in estBtnArr[e.source.dist]) setActNonBtn("est", 1, estBtnArr[e.source.dist][k]);
                        } else {
                            setActNonBtn("dist", e.source.active, e.source);
                            for (var k in estBtnArr[e.source.dist]) setActNonBtn("est", 0, estBtnArr[e.source.dist][k]);
                        }
                        transMain.showTransData();
                    });
                } else {
                    est[cdist_string].push(cest_string);
                    var estBtn = Ti.UI.createButton({
                        title: cest_string,
                        dist: cdist_string,
                        est: cest_string,
                        active: 0,
                        width: 114,
                        height: 40,
                        top: 10,
                        right: "10dp",
                        font: {
                            fontSize: "15dp"
                        },
                        color: "#FFFFFF",
                        borderRadius: 5,
                        backgroundGradient: this.estActColor
                    });
                    estBtnArr[cdist_string].push(estBtn);
                    $.tranResEstBtn.add(estBtn);
                }
                estBtn.addEventListener("click", function(e) {
                    if (e.source.active) setActNonBtn("est", e.source.active, e.source); else {
                        setActNonBtn("est", e.source.active, e.source);
                        for (var k in disBtnArr) e.source.dist == disBtnArr[k].title && setActNonBtn("dist", 0, disBtnArr[k]);
                    }
                    transMain.showTransData();
                });
            }
        },
        getNonSelect: function(type) {
            switch (type) {
              case "district":
              case "dist":
                distArray = [];
                var reStr = [];
                for (var k in disBtnArr) 0 == disBtnArr[k].active && reStr.push(disBtnArr[k].dist);
                if (reStr.length > 0) {
                    distArray = reStr;
                    return "'" + reStr.join("','") + "'";
                }
                return "";

              case "est":
              case "estate":
                var reStr = [];
                for (var k in estBtnArr) if (-1 == _.indexOf(distArray, k) || 0 == distArray.length) for (e in estBtnArr[k]) 0 == estBtnArr[k][e].active && reStr.push(estBtnArr[k][e].est);
                return reStr.length > 0 ? "'" + reStr.join("','") + "'" : "";

              default:
                return "";
            }
        }
    };
    transMain.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;