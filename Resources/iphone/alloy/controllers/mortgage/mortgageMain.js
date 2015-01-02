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
    this.__controllerPath = "mortgage/mortgageMain";
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
    $.__views.morMainView = Ti.UI.createScrollView({
        borderColor: Alloy.Globals.showdowColor,
        borderRadius: 8,
        height: Ti.UI.FILL,
        layout: "vertical",
        top: "30",
        backgroundGradient: Alloy.Globals.basicBackgroundColor,
        width: "90%",
        id: "morMainView"
    });
    $.__views.morMainView && $.addTopLevelView($.__views.morMainView);
    $.__views.morTopView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "morTopView"
    });
    $.__views.morMainView.add($.__views.morTopView);
    $.__views.morTopSearchParaView = Ti.UI.createView({
        layout: "vertical",
        width: "50%",
        left: 0,
        height: Ti.UI.SIZE,
        top: 20,
        id: "morTopSearchParaView"
    });
    $.__views.morTopView.add($.__views.morTopSearchParaView);
    $.__views.__alloyId19 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId19"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 5,
        left: 0,
        width: "40%",
        text: "業主叫價：",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.price = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        font: {
            fontSize: 14
        },
        color: "black",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        top: 0,
        left: 0,
        width: "55%",
        value: "2000000",
        id: "price"
    });
    $.__views.__alloyId19.add($.__views.price);
    $.__views.__alloyId21 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId21"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 5,
        left: 0,
        width: "40%",
        text: "按揭比率(%)：",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.percent = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        font: {
            fontSize: 14
        },
        color: "black",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        top: 0,
        left: 0,
        width: "55%",
        value: "70",
        id: "percent"
    });
    $.__views.__alloyId21.add($.__views.percent);
    $.__views.__alloyId23 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId23"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 5,
        left: 0,
        width: "40%",
        text: "利率(%)：",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.rate = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        font: {
            fontSize: 14
        },
        color: "black",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        top: 0,
        left: 0,
        width: "55%",
        value: "2.25",
        id: "rate"
    });
    $.__views.__alloyId23.add($.__views.rate);
    $.__views.__alloyId25 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId25"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 5,
        left: 0,
        width: "40%",
        text: "按揭年期：",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.period = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        font: {
            fontSize: 14
        },
        color: "black",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        top: 0,
        left: 0,
        width: "55%",
        value: "20",
        id: "period"
    });
    $.__views.__alloyId25.add($.__views.period);
    $.__views.__alloyId27 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        id: "__alloyId27"
    });
    $.__views.morTopSearchParaView.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 5,
        left: 0,
        width: "40%",
        text: "貸款金額：",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.principal = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        font: {
            fontSize: 14
        },
        color: "black",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        top: 0,
        left: 0,
        width: "55%",
        id: "principal",
        editable: "false"
    });
    $.__views.__alloyId27.add($.__views.principal);
    $.__views.morTopSmlResView = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.SIZE,
        left: "50%",
        top: 20,
        layout: "vertical",
        id: "morTopSmlResView"
    });
    $.__views.morTopView.add($.__views.morTopSmlResView);
    $.__views.__alloyId29 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 15,
        height: Ti.UI.SIZE,
        id: "__alloyId29"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "首期：",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.Deposit = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 0,
        width: "60%",
        id: "Deposit"
    });
    $.__views.__alloyId29.add($.__views.Deposit);
    $.__views.__alloyId31 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 15,
        height: Ti.UI.SIZE,
        id: "__alloyId31"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "每用供款：",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.MonthlyPayment = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 0,
        width: "60%",
        id: "MonthlyPayment"
    });
    $.__views.__alloyId31.add($.__views.MonthlyPayment);
    $.__views.__alloyId33 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 15,
        height: Ti.UI.SIZE,
        id: "__alloyId33"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "總利息：",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.TotalInterest = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 0,
        width: "60%",
        id: "TotalInterest"
    });
    $.__views.__alloyId33.add($.__views.TotalInterest);
    $.__views.__alloyId35 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 15,
        height: Ti.UI.SIZE,
        id: "__alloyId35"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        left: 0,
        width: "30%",
        text: "總貸款金額：",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.TotalPayment = Ti.UI.createLabel({
        color: "black",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 0,
        width: "60%",
        id: "TotalPayment"
    });
    $.__views.__alloyId35.add($.__views.TotalPayment);
    $.__views.__alloyId37 = Ti.UI.createView({
        width: Ti.UI.FILL,
        layout: "horizontal",
        left: 10,
        top: 15,
        height: Ti.UI.SIZE,
        id: "__alloyId37"
    });
    $.__views.morTopSmlResView.add($.__views.__alloyId37);
    $.__views.morTopSmlResCal = Ti.UI.createButton({
        backgroundImage: "/others/Calculate.png",
        width: "120",
        height: "30",
        top: 10,
        left: 0,
        id: "morTopSmlResCal"
    });
    $.__views.__alloyId37.add($.__views.morTopSmlResCal);
    $.__views.morScroll = Ti.UI.createScrollView({
        top: 10,
        width: "80%",
        height: Ti.UI.FILL,
        contentWidth: "auto",
        scrollType: "horizontal",
        borderRadius: 5,
        id: "morScroll"
    });
    $.__views.morMainView.add($.__views.morScroll);
    $.__views.morResHeader = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
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
        id: "morResHeader"
    });
    $.__views.morReslist = Ti.UI.createTableView({
        headerView: $.__views.morResHeader,
        id: "morReslist"
    });
    $.__views.morScroll.add($.__views.morReslist);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mortgage = require("mortgage");
    var args = arguments[0] || {};
    args.win;
    var mor = {
        init: function() {
            this.setEvent();
            this.calPrincipal();
        },
        setEvent: function() {
            $.price.addEventListener("change", mor.calPrincipal);
            $.percent.addEventListener("change", mor.calPrincipal);
            $.morTopSmlResCal.addEventListener("click", function() {
                var percent = $.percent.value;
                var rate = $.rate.value;
                var period = $.period.value;
                var price = $.price.value;
                if (!(isNaN(percent) || isNaN(rate) || isNaN(period) || isNaN(price))) {
                    var mor = new mortgage(price, period, rate, percent);
                    $.TotalPayment.text = mor.getTotalPayment();
                    $.MonthlyPayment.text = mor.getMonthlyPayment();
                    $.TotalInterest.text = mor.getTotalInterest();
                    $.Deposit.text = mor.getDeposit();
                    var $vb2 = mor.getPeriodList();
                    var morFullList = mor.getPaymentList();
                    morTable.genResultTableHeader($vb2);
                    morTable.genMorFullList(morFullList, mor.getPeriod(), mor.getRate());
                }
            });
        },
        calPrincipal: function() {
            isNaN($.price.value) || isNaN($.percent.value) || ($.principal.value = comjs.addCommas($.price.value * $.percent.value / 100));
        }
    };
    var morTable = {
        genResultTableHeader: function(period) {
            for (i = $.morResHeader.children.length; i > 0; i--) $.morResHeader.remove($.morResHeader.children[i - 1]);
            var label1 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "black",
                text: "利率",
                width: "80"
            });
            $.morResHeader.add(label1);
            var i = 0;
            for (var k in period) {
                i++;
                $.morResHeader.add(Ti.UI.createLabel({
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black",
                    text: period[k] + "年",
                    width: "130",
                    height: 40
                }));
            }
            $.morReslist.setWidth(100 + 130 * i);
        },
        genMorFullList: function(list, period, rate) {
            var data = [];
            for (var k in list) {
                var tableViewRow = Ti.UI.createTableViewRow();
                var rowView = Ti.UI.createView({
                    layout: "horizontal",
                    color: "black",
                    height: 40
                });
                var color = k / 100 == rate ? "#086A87" : "#000000";
                var rateLabel = Ti.UI.createLabel({
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    color: color,
                    text: k / 100,
                    width: "80"
                });
                rowView.add(rateLabel);
                for (var i in list[k]) {
                    var color = i == period || k / 100 == rate ? "#086A87" : "#000000";
                    var dump_number = comjs.morAddCommas(list[k][i]);
                    rowView.add(Ti.UI.createLabel({
                        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                        color: color,
                        text: dump_number,
                        width: "130"
                    }));
                }
                tableViewRow.add(rowView);
                data.push(tableViewRow);
            }
            $.morReslist.data = data;
        }
    };
    mor.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;