exports.getLoadingView = function(link, obj) {
    var style;
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Loading...",
        style: style,
        top: 10,
        left: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    var win = Ti.UI.createWindow({
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ],
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    var view;
    win.add(activityIndicator);
    win.open();
    activityIndicator.show();
    var view = Alloy.createController(link, obj).getView();
    activityIndicator.hide();
    win.close();
    return view;
};

exports.PixelsToDPUnits = function(ThePixels) {
    return ThePixels;
};

exports.DPUnitsToPixels = function(TheDPUnits) {
    return TheDPUnits;
};

exports.addCommas = function(number) {
    number += "";
    x = number.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) x1 = x1.replace(rgx, "$1,$2");
    return x1 + x2;
};

exports.displayValue = function(itemField, o_value) {
    switch (itemField.fieldType) {
      case "boolean":
        if (0 == o_value || "" == o_value) return "N/A";
        if (o_value) return "Y";
        break;

      case "number":
        var value = comjs.addCommas(o_value * (itemField.base || 1)) || "";
        return value;

      default:
        switch (itemField.returnType) {
          case "boolean":
            if (0 == o_value || "" == o_value) return "N/A";
            if (o_value) return "Y";

          default:
            return o_value || "";
        }
    }
};

exports.morAddCommas = function(s) {
    var output = "";
    if (s) {
        s = 100 * s;
        s = Math.round(s);
        s = s.toString();
        num = s.substring(0, s.length - 2);
        dec = s.substring(s.length - 2, s.length);
        var amount = new String(num);
        amount = amount.split("").reverse();
        var output = "";
        for (var i = 0; i <= amount.length - 1; i++) {
            output = amount[i] + output;
            (i + 1) % 3 == 0 && amount.length - 1 !== i && (output = "," + output);
        }
        output = output + "." + dec;
    }
    return output;
};

exports.changeColor = function(elm, win) {
    elm.addEventListener("longpress", function() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "取消", "backgroudColor", "color" ],
            message: "改變顏色",
            title: elm.id
        });
        dialog.addEventListener("click", function(colorE) {
            if (1 == colorE.index) {
                var basicui = new baseUi();
                var colorPicker = basicui.getColorPickerView({
                    width: 300,
                    height: 300,
                    selectedcolor: function(colPick) {
                        elm.backgroundColor = "#" + colPick.color;
                    },
                    clickCancel: function(colorPickview) {
                        win.remove(colorPickview);
                    }
                });
                win.add(colorPicker);
            }
            if (2 == colorE.index) {
                var basicui = new baseUi();
                var colorPicker = basicui.getColorPickerView({
                    width: 300,
                    height: 300,
                    selectedcolor: function(colPick) {
                        elm.color = "#" + colPick.color;
                    },
                    clickCancel: function(colorPickview) {
                        win.remove(colorPickview);
                    }
                });
                win.add(colorPicker);
            }
        });
        dialog.show();
    });
};