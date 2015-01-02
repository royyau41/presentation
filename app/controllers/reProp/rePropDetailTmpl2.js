var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var Map = require('ti.map');
var viewFile=require('viewFile').viewFile;
var getProp=require('getData').property;
var args = arguments[0] || {};
var win=args.win;
var propdetail;
var lang=Ti.App.Properties.getString('lang','c');

var rePropDetailTmpl2={
	check:0,
	init:function(){
		this.setDetail();
		//rePropDetailTmpl2.setMap();
		$.smallImgSrlView.addEventListener('postlayout',function(){
			if (rePropDetailTmpl2.check==0){
				rePropDetailTmpl2.setImage();
				rePropDetailTmpl2.check++;
			}
		});
		
		var obj={
			win:win,
			price:args.price
		};
		
		/**********     ADD CAL     ***********************/
		var img=tools.mortagageTool(obj);
		img.left='80%';
		$.priceItemView.add(img);
		

		
	}
	,setDetail:function(){
		
		 propdetail=getProp.getDetail(args.propertyno,args.propgroup);
		
		$.premises.text=propdetail[lang+'_premises'];
	
		
		
		$.price.text=comjs.addCommas(propdetail['price']*100);
		$.avgprice.text='@'+comjs.addCommas(propdetail['averageprice']);
		$.avgrent.text='@'+comjs.addCommas(propdetail['averagerent']);
		$.rent.text=comjs.addCommas(propdetail['rent']);
		$.netarea.text=comjs.addCommas(propdetail['netarea'])+'呎';
		$.grossarea.text=comjs.addCommas(propdetail['grossarea'])+'呎';
		$.otherItemRemarks.text=propdetail[lang+'_remarks'];
		// 沒有租價
		if (propdetail['rent']==0 ||propdetail['rent']==''){
			$.leftSrlView.remove($.rentView);
		}
		// 沒有售價轉出租
		if (propdetail['price']==0 ||propdetail['price']==''){
			$.leftSrlView.remove($.priceView);
			$.leftTitle.setText('出租');
		}
		
		
	}
	,setMap:function(addr){		
		//mapHeight=pToD($.bottomView.size.height-$.iconLabel.size.height-$.iconView.size.height)-50;
		var mapHeight='50%';
		var xhrLocationCode = Ti.Network.createHTTPClient();
		xhrLocationCode.setTimeout(120000);
		 
		var requestUrl = "http://maps.google.com/maps/api/geocode/json?address="+addr 
		requestUrl += "&sensor=" + (Ti.Geolocation.locationServicesEnabled == true);
		xhrLocationCode.open("GET", requestUrl);
		//Define the content type
		xhrLocationCode.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		//Send request
		xhrLocationCode.send();
		//If error occurs
		xhrLocationCode.onerror = function(e) {
		//TODO: code to handle error
		};
		//On Success
		xhrLocationCode.onload = function(e) {
			
			var response = JSON.parse(this.responseText);
			//Check the response
			if (response.status == 'OK' && response.results != undefined && response.results.length > 0) {
				
				var mapView=Map.createView({
					animate : true,                                                        //Map region animated
					regionFit : true,                                                       //Fits the  aspect ratio
					//userLocation : false, 
					location:{
						latitude: response.results[0].geometry.location.lat,
						longitude: response.results[0].geometry.location.lng,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005
					},  
					region:{
						latitude: response.results[0].geometry.location.lat,
						longitude: response.results[0].geometry.location.lng,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005
					},                                             //To display user location
					top:20,
					width:Ti.UI.FILL,
					height:mapHeight,
					mapType:Map.NORMAL_TYPE
					});
				$.middleSrlView.add(mapView);	
				//Get the response
			 
			//Define annotation to show location
			var objLocationAnnotation = Map.createAnnotation({
				latitude: response.results[0].geometry.location.lat,
				longitude: response.results[0].geometry.location.lng,
				title: addr,
				subtitle: addr,
				animate:true,
				id: 1
				//pincolor:Map.ANNOTATION_GREEN
			});
			mapView.addAnnotation(objLocationAnnotation);
			
			objLocationAnnotation = null;
			}
			response = null;
		}; 
	}
	,setImage:function(){
		/*
		  
		$.bigImageContainer.height=pToD($.rightSubView.toImage().height*0.5);
		$.bigImageContainer.width=pToD($.rightSubView.toImage().width);
		*/
		var propImage =getProp.getImage(args.propertyno,args.propgroup);
		
		if (propImage){
			/*var bigImage=Ti.UI.createImageView({
				image:Ti.Utils.base64decode(propImage[0].image),
			});
			
			bigImage.addEventListener('click',function(e){
						viewFile('img',e.source.image);
			});

		
			$.bigImageContainer.add(bigImage);
			//smallImageScroll
			var imageHeight=pToD($.smallImageScroll.toImage().height);
			*/
			var viewW=($.rightSubView.size.width/2)-15;
			
			for (var i=0 ;i<(propImage.length);i++){
				
				var smallImageItemView=Ti.UI.createView({
					width:viewW,
					height:140,
					right:6,
					bottom:6,
					borderColor:'#CACACA',
					borderWidth:1
				
				});
				if (propImage[i]){
						
					var image=viewFile('jpg',propImage[i],true);
					smallImageItemView.add(image);
					
					
				}
				$.rightSubView.add(smallImageItemView);
	
			}
				
		setTimeout(function(){
		    rePropDetailTmpl2.setMap(propdetail[lang+'_premises']);
		}, 2000);
			
		}
		
		
		
	}
};


rePropDetailTmpl2.init();
