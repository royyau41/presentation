var viewFile = function(type, data, returnFileView, specData) {
    if (returnFileView) return getFileView(type, data, specData);
    switch (type) {
      case "image":
      case "img":
        var win = Alloy.createController("viewFile/viewFile").getView();
        ;
        var f;
        var image;
        var image = Ti.UI.createImageView({
            height: Ti.Platform.displayCaps.platformHeight - 10,
            image: data,
            opacity: 1,
            zIndex: 1,
            animating: true
        });
        var img1Wrapper = Ti.UI.createScrollView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            contentWidth: Ti.UI.FILL,
            contentHeight: Ti.UI.FILL,
            maxZoomScale: 4
        });
        img1Wrapper.add(image);
        win.children[1].add(img1Wrapper);
        win.open({
            theme: "Theme.noActionBar",
            transition: Titanium.UI.iPhone.AnimationStyle.CURL_UP
        });
        break;

      case "pdf":
        var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, specData.fileName || "test.pdf");
        f.write(data);
        var webView = Titanium.UI.createWebView({
            width: "100%",
            height: "100%",
            zIndex: 1
        });
        webView.setData(f.read());
        var webView2 = Ti.UI.iOS.createDocumentViewer();
        webView2.setUrl(Ti.Filesystem.tempDirectory + (specData.fileName || "test.pdf"));
        webView2.show();
        break;

      case "doc":
        var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, specData.fileName || "test.doc");
        f.write(data);
        var webView2 = Ti.UI.iOS.createDocumentViewer();
        webView2.setUrl(Ti.Filesystem.tempDirectory + (specData.fileName || "test.doc"));
        webView2.show();
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
        var image;
        var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, specData.fileName || "test.pdf");
        f.write(Ti.Utils.base64decode(data.attachment));
        var webView = Titanium.UI.createWebView({
            width: "100%",
            height: "100%",
            zIndex: 1
        });
        webView.setData(f.read());
        var itemView = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL
        });
        var openLabel = Ti.UI.createImageView({
            image: "/others/newOpen.png",
            top: "0dp",
            left: "0dp",
            width: "30dp",
            height: "30dp",
            zIndex: 100,
            backgroundColor: "black",
            opacity: .7,
            pdf: Ti.Utils.base64decode(data.attachment)
        });
        openLabel.addEventListener("click", function(e) {
            viewFile("pdf", e.source.pdf, false, {});
        });
        itemView.add(webView);
        itemView.add(openLabel);
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