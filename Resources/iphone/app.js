var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var comjs = require("common");

var pToD = comjs.PixelsToDPUnits;

var baseUi = require("basic_ui");

var tools = require("tools");

var funcBar = require("functionBar");

var s = require("string").reStr;

Alloy.Globals.s = require("string").reStr;

Alloy.Globals.getfieldTitle = function(field, type) {
    type || (type = "");
    var obj = {};
    switch (field) {
      case "garea":
        obj = {
            c: "建築面積:",
            e: "Gross Area:",
            eWidth: "100dp"
        };
        break;

      case "narea":
        obj = {
            c: "實用面積:",
            e: "Net Area:"
        };
        break;

      case "district":
        obj = {
            c: "區域:",
            e: "District:"
        };
        break;

      case "price":
        obj = {
            c: "售價:",
            e: "Price:",
            cWidth: "45dp",
            eWidth: "60dp"
        };
        break;

      case "rent":
        obj = {
            c: "租金:",
            e: "Rent:",
            cWidth: "45dp",
            eWidth: "60dp"
        };
        break;

      case "recdate":
        obj = {
            c: "落成日期:",
            e: ":"
        };
        break;

      case "recdate":
        obj = {
            c: "落成日期:",
            e: ":"
        };
        break;

      case "remarks":
        obj = {
            c: "備註:",
            e: "Remarks:"
        };
        break;

      case "developer":
        obj = {
            c: "發展商:",
            e: ""
        };
        break;

      case "floor":
        obj = {
            c: "樓層:",
            e: "floor:"
        };
        break;

      case "possession":
        obj = {
            c: "交易:",
            e: "possession:"
        };
        break;

      case "availability":
        obj = {
            c: "交吉:",
            e: "possession:"
        };
        break;

      case "decoration":
        obj = {
            c: "裝修:",
            e: "decoration:"
        };
        break;

      case "carpark":
        obj = {
            c: "停車場:",
            e: "carpark:"
        };
    }
    return obj[Ti.App.Properties.getString("lang", "c") + type];
};

Alloy.Globals.lang = Ti.App.Properties.getString("lang", "c");

Alloy.Globals.showdowColor = "#bbb";

Alloy.Globals.titleHeight = "";

Alloy.Globals.btnInitColor = {
    type: "linear",
    colors: [ {
        color: "#01DFD7",
        offset: 0
    }, {
        color: "#0B615E",
        offset: 1
    } ]
};

Alloy.Globals.btnTouchColor = {
    type: "linear",
    colors: [ {
        color: "#088A68",
        offset: 0
    }, {
        color: "#088A68",
        offset: 1
    } ]
};

Alloy.Globals.btnSelectedColor = {
    type: "linear",
    colors: [ {
        color: "#0B3B24",
        offset: 0
    }, {
        color: "#0B3B24",
        offset: 1
    } ]
};

Alloy.Globals.basicBackgroundColor = {
    type: "linear",
    startPoint: {
        x: "100%",
        y: "0%"
    },
    endPoint: {
        x: "100%",
        y: "100%"
    },
    colors: [ {
        color: "white",
        offset: 0
    }, {
        color: "#F2F2F2",
        offset: 1
    } ]
};

Alloy.Globals.currentWindow = [];

Alloy.Globals.DisplayWidth = pToD(Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight);

Alloy.Globals.DisplayHeight = pToD(Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth);

Alloy.Globals.Loading = "";

Alloy.Globals.progressView = "";

Alloy.Globals.LoadingShow = function(text, timer) {
    text && Alloy.Globals.Loading.setMessage(text);
    Alloy.Globals.Loading.show();
    setTimeout(function() {
        Alloy.Globals.Loading.hide();
    }, timer || 2e3);
};

Alloy.Globals.rightButton = "/title/recRt.png";

Alloy.Globals.checkLang = function(lang) {
    return Ti.App.Properties.getString("lang", "c") == lang;
};

Alloy.Globals.rotateLeft90 = Ti.UI.create2DMatrix().rotate(270);

Alloy.Globals.garea = {
    c: "建築面積:",
    e: "Gross Area:"
};

Alloy.Globals.district = {
    c: "區域:",
    e: "District:"
};

Alloy.Globals.price = {
    c: "售價:",
    e: "Price:"
};

Alloy.Globals.rent = {
    c: "租金:",
    e: "Rent:"
};

Alloy.Globals.narea = {
    c: "實用面積:",
    e: "Net Area:"
};

Alloy.Globals.recdate = {
    c: "落成日期:",
    e: ""
};

Alloy.Globals.remarks = {
    c: "備註:",
    e: "Remarks:"
};

Alloy.Globals.developer = {
    c: "發展商:",
    e: ""
};

Alloy.createController("index");