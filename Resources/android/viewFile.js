var viewFile = function(type, data, returnFileView, specData) {
    if (returnFileView) return getFileView(type, data, specData);
    switch (type) {
      case "image":
      case "img":
        var win = Alloy.createController("viewFile/viewFile").getView();
        var image;
        ;
        ;
        ;
        ;
        ;
        ;
        var titouchgallery = require("com.gbaldera.titouchgallery");
        Ti.API.info("module is => " + JSON.stringify(titouchgallery));
        var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "test.jpg");
        f.write(data);
        var image = titouchgallery.createTouchGallery({
            images: [ Ti.Filesystem.tempDirectory + "/test.jpg" ]
        });
        image.addEventListener("singletap", function(e) {
            win.children[1].fireEvent("click");
            Ti.API.debug("SingleTap event fired: " + JSON.stringify(e));
        });
        win.children[1].add(image);
        win.open();
        break;

      case "pdf":
        var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, specData.fileName || "test.pdf");
        f.write(data);
        ;
        ;
        Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            type: "application/pdf",
            data: f.getNativePath()
        }));
        break;

      case "doc":
        var f;
        ;
    }
};

var getFileView = function(type, data, specData) {
    switch (type) {
      case "jpg":
      case "png":
      case "jpeg":
        if (data.attachment) var img = data.attachment; else data.image ? img = data.image : data.img && (img = data.img);
        var image = Ti.UI.createImageView({
            image: Ti.Utils.base64decode(img)
        });
        image.addEventListener("click", function(e) {
            viewFile("img", e.source.image);
        });
        return image;

      case "pdf":
        ;
        ;
        var itemView;
        ;
        var image = Ti.UI.createImageView({
            image: "/others/pdf.png",
            pdf: Ti.Utils.base64decode(data.attachment),
            focusable: true
        });
        image.addEventListener("click", function(e) {
            viewFile("pdf", e.source.pdf, false, {});
        });
        itemView = image;
        return itemView;

      case "doc":
        var image = Ti.UI.createImageView({
            image: "/others/Office_DOC.png",
            doc: Ti.Utils.base64decode(data.attachment),
            width: "100%",
            height: "100%",
            focusable: true
        });
        image.addEventListener("click", function(e) {
            viewFile("doc", e.source.doc, false, {});
        });
        return image;
    }
};

exports.viewFile = viewFile;