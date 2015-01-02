
var viewFile=function(type,data,returnFileView,specData){
	
	if (returnFileView){
		return getFileView(type,data,specData);
	}else {
		switch(type){
		case 'image':
		case 'img':
		
			var win=Alloy.createController('viewFile/viewFile').getView();
			if(OS_IOS){
				var image=Ti.UI.createImageView({
					//width:Ti.Platform.displayCaps.platformWidth,
					height:Ti.Platform.displayCaps.platformHeight-10,
					image:data,
					opacity:1,
					zIndex:1
				});
				win.children[1].add(image);
					var pinching=false;
					var scale=1;
					var subScale=1;
					var dummyScale=1;
					var deltaX, deltaY;
				//init image parameter
				var olt = Titanium.UI.create2DMatrix();
				win.children[1].addEventListener('pinch', function(e) {
					pinching=true;
					var test=1;
					
					if (e.scale.toFixed(2)!=scale){
					//console.log(e.scale);
						test=1+(e.scale-scale);
					
					//dummyScale=subScale*e.scale;
					//var t = Ti.UI.create2DMatrix();
					scale=e.scale.toFixed(2);
					
					if (test>0){
					olt=olt.scale(test);
					}
				 	image.transform = olt; 
				  }
				}); //resize by finger
				image.addEventListener('touchend',function(e){
					
					pinching=false;
					
				});			
					image.addEventListener('touchstart', function(e) {
						
						scale=1;
					    curX = e.x;
					    curY = e.y;
					});
				image.addEventListener('touchmove', function(e) {
						if (!pinching){
					     deltaX = e.x - curX, deltaY = e.y - curY;
					     
					    olt = olt.translate(deltaX, deltaY);
					     image.animate({
					         transform : olt,
					         duration : 100
					     });
					  }
					});
				win.open({theme: "Theme.noActionBar",transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP});
			}
			else {
				var titouchgallery = require('com.gbaldera.titouchgallery');
				Ti.API.info("module is => " + JSON.stringify(titouchgallery));
				var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'test.jpg');
					f.write(data); // write to the file
					
				var image=titouchgallery.createTouchGallery({
					images: [
				      	   Ti.Filesystem.tempDirectory+'/test.jpg'
					        ]
					
					});
				image.addEventListener("singletap", function(e){
			        win.children[1].fireEvent('click');
			        Ti.API.debug("SingleTap event fired: " + JSON.stringify(e));
			    });
				win.children[1].add(image);
				win.open();
			}	
		break;
		case 'pdf':
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,(specData.fileName||'test.pdf'));
		f.write(data); // write to the file
			if (OS_IOS){
				var webView= Titanium.UI.createWebView({width:'100%',height:'100%',zIndex:1});
				webView.setData(f.read());
			
				var webView2=Ti.UI.iOS.createDocumentViewer();
				webView2.setUrl(Ti.Filesystem.tempDirectory+(specData.fileName||'test.pdf'));
				webView2.show();
			
			}else {
			
					Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
				        action: Ti.Android.ACTION_VIEW,
				        type: 'application/pdf',
				        data: f.getNativePath()
			    	}));
				
			}
			
		break;
		case 'doc':
			if (OS_IOS){
				var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,(specData.fileName||'test.doc'));
				f.write(data); // write to the file
				
					var webView2=Ti.UI.iOS.createDocumentViewer();
					webView2.setUrl(Ti.Filesystem.tempDirectory+(specData.fileName||'test.doc'));
					webView2.show();
				
			}
			
		break;
	}
	}
};




var getFileView=function(type,data,specData){
	
	switch(type){
		case 'jpg':
		case 'png':
		case 'jpeg':
			if (data.attachment)
				var img=data.attachment;
				else if (data.image) img =data.image;
					else if (data.img) img =data.img;
					
				
			var image=Ti.UI.createImageView({
					image:Ti.Utils.base64decode(img),								
				});			
			image.addEventListener('click',function(e){					
							viewFile('img',e.source.image);
			});
			return image;
		break;
		case 'pdf':
			if (OS_IOS){
			var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,(specData.fileName||'test.pdf'));
			f.write(Ti.Utils.base64decode(data.attachment)); 
			var webView= Titanium.UI.createWebView({width:'100%',height:'100%',zIndex:1});
			webView.setData(f.read());			
			var itemView=Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL
			});
			var openLabel=Ti.UI.createImageView({
				image:'/others/newOpen.png',
				top:'0dp',
				left:'0dp',
				width:'30dp',
				height:'30dp',
				zIndex:100,
				backgroundColor:'black',
				opacity:0.7,
				pdf:Ti.Utils.base64decode(data.attachment)
				});				
				openLabel.addEventListener('click',function(e){
					viewFile('pdf',e.source.pdf,false,{});
				});
				itemView.add(webView);
				itemView.add(openLabel);
			}else {
				var image=Ti.UI.createImageView({
					image:'/others/pdf.png',
					pdf:Ti.Utils.base64decode(data.attachment),
					focusable:true
				});
				image.addEventListener('click',function(e){
					viewFile('pdf',e.source.pdf,false,{});
				});
				itemView=image;
			}
				
				return itemView;
			break;
			case 'doc':				
				var image=Ti.UI.createImageView({
					image:'/others/Office_DOC.png',
					doc:Ti.Utils.base64decode(data.attachment),
					width:'100%',
					height:'100%',
					focusable:true
				});
				image.addEventListener('click',function(e){
					viewFile('doc',e.source.doc,false,{});
				});
				return image;
			break;
		}
};


exports.viewFile=viewFile;