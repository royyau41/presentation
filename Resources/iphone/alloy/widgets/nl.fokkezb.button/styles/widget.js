function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.button/" + s : s.substring(0, index) + "/nl.fokkezb.button/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        navBarHidden: true,
        fullscreen: true,
        orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT ]
    }
}, {
    isApi: true,
    priority: 1000.0002,
    key: "Label",
    style: {
        color: "black"
    }
}, {
    isApi: true,
    priority: 1000.0003,
    key: "TextField",
    style: {
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        font: {
            fontSize: 14
        },
        color: "black"
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "TextArea",
    style: {
        color: "black"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "outer",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "inner",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal"
    }
} ];