var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

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

Alloy.Globals.lang = "c";

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

Alloy.Globals.DisplayWidth = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.DisplayHeight = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth;

Alloy.Globals.Loading = "";

Alloy.Globals.LoadingShow = function(text, timer) {
    text && Alloy.Globals.Loading.setMessage(text);
    Alloy.Globals.Loading.show();
    setTimeout(function() {
        Alloy.Globals.Loading.hide();
    }, timer || 2e3);
};

Alloy.createController("index");