exports.mortagageTool = function(obj) {
    var basicui = new baseUi(true);
    var mor = basicui.getMortagageView();
    obj.win && obj.win.add(mor);
    var morImg = Ti.UI.createImageView({
        width: 27,
        height: 40,
        backgroundImage: "/temp/calculator1.png"
    });
    morImg.addEventListener("click", function() {
        Ti.UI.createAnimation({
            left: 10,
            duration: 200
        });
        for (var i = mor.left; 0 >= i; i += 1) mor.left = i;
    });
    return morImg;
};