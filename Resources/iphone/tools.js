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
        var slideIn = Ti.UI.createAnimation({
            left: 10,
            duration: 200
        });
        mor.animate(slideIn);
    });
    return morImg;
};