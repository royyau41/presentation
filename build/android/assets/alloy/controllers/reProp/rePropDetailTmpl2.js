function __processArg(e,t){var i=null;return e&&(i=e[t]||null,delete e[t]),i}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="reProp/rePropDetailTmpl2",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var e=this,t={};e.__views.tmpl2Main=Ti.UI.createView({backgroundColor:"white",height:"90%",top:20,left:30,right:30,borderWidth:1,borderColor:"#CACACA",id:"tmpl2Main"}),e.__views.tmpl2Main&&e.addTopLevelView(e.__views.tmpl2Main),e.__views.leftSrlView=Ti.UI.createScrollView({showVerticalScrollIndicator:!1,showHorizontalScrollIndicator:!1,scrollType:"vertical",left:"0",height:Ti.UI.FILL,layout:"vertical",width:"30%",id:"leftSrlView"}),e.__views.tmpl2Main.add(e.__views.leftSrlView),e.__views.leftTitle=Ti.UI.createLabel({color:"white",font:{fontSize:24,fontWeight:"bold"},top:15,left:15,height:50,width:Ti.UI.FILL,textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,borderRadius:"5",backgroundColor:"#65c200",id:"leftTitle",text:"出售"}),e.__views.leftSrlView.add(e.__views.leftTitle),e.__views.priceView=Ti.UI.createView({top:"15",height:Ti.UI.SIZE,width:Ti.UI.FILL,id:"priceView"}),e.__views.leftSrlView.add(e.__views.priceView),e.__views.__alloyId42=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId42"}),e.__views.priceView.add(e.__views.__alloyId42),e.__views.priceLabel=Ti.UI.createLabel({color:"white",backgroundColor:"#74DF00",font:{fontSize:17,fontWeight:"bold"},textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,left:15,width:30,height:70,id:"priceLabel",text:"售價"}),e.__views.__alloyId42.add(e.__views.priceLabel),e.__views.__alloyId43=Ti.UI.createView({width:Ti.UI.FILL,left:50,height:Ti.UI.SIZE,layout:"vertical",id:"__alloyId43"}),e.__views.__alloyId42.add(e.__views.__alloyId43),e.__views.priceItemView=Ti.UI.createView({left:10,height:Ti.UI.SIZE,id:"priceItemView"}),e.__views.__alloyId43.add(e.__views.priceItemView),e.__views.price=Ti.UI.createLabel({color:"black",font:{fontSize:32,fontFamily:"CodaCaption-Heavy"},left:0,width:"70%",height:Ti.UI.SIZE,verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,textAlign:"left",id:"price",text:"1,630"}),e.__views.priceItemView.add(e.__views.price),e.__views.priceUnit=Ti.UI.createLabel({color:"black",left:"62%",height:Ti.UI.SIZE,textAlign:"bottom",font:{fontSize:20,fontWeight:"bold"},id:"priceUnit",text:"萬元"}),e.__views.priceItemView.add(e.__views.priceUnit),e.__views.__alloyId44=Ti.UI.createView({left:10,height:Ti.UI.SIZE,id:"__alloyId44"}),e.__views.__alloyId43.add(e.__views.__alloyId44),e.__views.avgprice=Ti.UI.createLabel({color:"#28bee4",left:0,top:0,textAlign:"bottom",font:{fontSize:21,fontWeight:"bold"},text:"@ 111",id:"avgprice"}),e.__views.__alloyId44.add(e.__views.avgprice),e.__views.__alloyId45=Ti.UI.createView({bottom:0,height:1,left:15,borderColor:"#CACACA",width:Ti.UI.FILL,borderWidth:2,id:"__alloyId45"}),e.__views.priceView.add(e.__views.__alloyId45),e.__views.rentView=Ti.UI.createView({top:"15",height:Ti.UI.SIZE,width:Ti.UI.FILL,id:"rentView"}),e.__views.leftSrlView.add(e.__views.rentView),e.__views.__alloyId46=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId46"}),e.__views.rentView.add(e.__views.__alloyId46),e.__views.priceLabel=Ti.UI.createLabel({color:"white",backgroundColor:"#74DF00",font:{fontSize:17,fontWeight:"bold"},textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,left:15,width:30,height:70,id:"priceLabel",text:"租金"}),e.__views.__alloyId46.add(e.__views.priceLabel),e.__views.__alloyId47=Ti.UI.createView({width:Ti.UI.FILL,left:50,height:Ti.UI.SIZE,layout:"vertical",id:"__alloyId47"}),e.__views.__alloyId46.add(e.__views.__alloyId47),e.__views.__alloyId48=Ti.UI.createView({left:10,height:Ti.UI.SIZE,id:"__alloyId48"}),e.__views.__alloyId47.add(e.__views.__alloyId48),e.__views.rent=Ti.UI.createLabel({color:"black",font:{fontSize:30},left:0,height:Ti.UI.SIZE,textAlign:"center",id:"rent",text:"1234"}),e.__views.__alloyId48.add(e.__views.rent),e.__views.__alloyId49=Ti.UI.createView({left:10,height:Ti.UI.SIZE,id:"__alloyId49"}),e.__views.__alloyId47.add(e.__views.__alloyId49),e.__views.avgrent=Ti.UI.createLabel({color:"#28bee4",left:0,top:0,textAlign:"bottom",font:{fontSize:21,fontWeight:"bold"},text:"@ 111",id:"avgrent"}),e.__views.__alloyId49.add(e.__views.avgrent),e.__views.__alloyId50=Ti.UI.createView({bottom:0,height:1,left:15,borderColor:"#CACACA",width:Ti.UI.FILL,borderWidth:2,id:"__alloyId50"}),e.__views.rentView.add(e.__views.__alloyId50),e.__views.__alloyId51=Ti.UI.createView({layout:"horizontal",top:"15",height:Ti.UI.SIZE,id:"__alloyId51"}),e.__views.leftSrlView.add(e.__views.__alloyId51),e.__views.__alloyId52=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId52"}),e.__views.__alloyId51.add(e.__views.__alloyId52),e.__views.areaLabel=Ti.UI.createLabel({color:"white",backgroundColor:"#74DF00",font:{fontSize:17,fontWeight:"bold"},textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,left:15,width:30,height:70,id:"areaLabel",text:"面積"}),e.__views.__alloyId52.add(e.__views.areaLabel),e.__views.__alloyId53=Ti.UI.createView({width:Ti.UI.FILL,left:50,height:Ti.UI.SIZE,layout:"vertical",id:"__alloyId53"}),e.__views.__alloyId52.add(e.__views.__alloyId53),e.__views.__alloyId54=Ti.UI.createView({left:10,height:Ti.UI.SIZE,id:"__alloyId54"}),e.__views.__alloyId53.add(e.__views.__alloyId54),e.__views.netareaUnit=Ti.UI.createLabel({color:"black",left:"0",height:Ti.UI.SIZE,textAlign:"bottom",font:{fontSize:20,fontWeight:"bold"},id:"netareaUnit",text:"實用 :"}),e.__views.__alloyId54.add(e.__views.netareaUnit),e.__views.netarea=Ti.UI.createLabel({color:"black",id:"netarea",text:"1,146 呎"}),e.__views.__alloyId54.add(e.__views.netarea),e.__views.__alloyId55=Ti.UI.createView({left:10,height:Ti.UI.SIZE,id:"__alloyId55"}),e.__views.__alloyId53.add(e.__views.__alloyId55),e.__views.netareaUnit=Ti.UI.createLabel({color:"black",left:"0",height:Ti.UI.SIZE,textAlign:"bottom",font:{fontSize:20,fontWeight:"bold"},id:"netareaUnit",text:"建築 :"}),e.__views.__alloyId55.add(e.__views.netareaUnit),e.__views.grossarea=Ti.UI.createLabel({color:"black",id:"grossarea",text:"1,146 呎"}),e.__views.__alloyId55.add(e.__views.grossarea),e.__views.__alloyId56=Ti.UI.createView({bottom:0,height:1,left:15,borderColor:"#CACACA",width:Ti.UI.FILL,borderWidth:2,id:"__alloyId56"}),e.__views.__alloyId51.add(e.__views.__alloyId56),e.__views.otherMainView=Ti.UI.createView({top:"15",height:Ti.UI.SIZE,width:Ti.UI.FILL,id:"otherMainView"}),e.__views.leftSrlView.add(e.__views.otherMainView),e.__views.__alloyId57=Ti.UI.createView({top:0,left:10,width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId57"}),e.__views.otherMainView.add(e.__views.__alloyId57),e.__views.othersLabel=Ti.UI.createLabel({color:"black",backgroundColor:"#74DF00",font:{fontSize:17,fontWeight:"bold"},textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,left:5,top:5,bottom:5,width:30,height:Ti.UI.SIZE,text:"其他資料",id:"othersLabel"}),e.__views.__alloyId57.add(e.__views.othersLabel),e.__views.__alloyId58=Ti.UI.createView({left:40,top:0,height:Ti.UI.SIZE,layout:"vertical",id:"__alloyId58"}),e.__views.__alloyId57.add(e.__views.__alloyId58),e.__views.__alloyId59=Ti.UI.createView({top:5,height:Ti.UI.SIZE,id:"__alloyId59"}),e.__views.__alloyId58.add(e.__views.__alloyId59),e.__views.__alloyId60=Ti.UI.createLabel({color:"black",width:"38%",left:10,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16,fontWeight:"bold"},text:"入伙年份：",id:"__alloyId60"}),e.__views.__alloyId59.add(e.__views.__alloyId60),e.__views.__alloyId61=Ti.UI.createLabel({color:"#151ba5",left:"38%",width:Ti.UI.FILL,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16},text:"1967年",id:"__alloyId61"}),e.__views.__alloyId59.add(e.__views.__alloyId61),e.__views.__alloyId62=Ti.UI.createView({top:5,height:Ti.UI.SIZE,id:"__alloyId62"}),e.__views.__alloyId58.add(e.__views.__alloyId62),e.__views.__alloyId63=Ti.UI.createLabel({color:"black",width:"38%",left:10,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16,fontWeight:"bold"},text:"管理費：",id:"__alloyId63"}),e.__views.__alloyId62.add(e.__views.__alloyId63),e.__views.__alloyId64=Ti.UI.createLabel({color:"#151ba5",left:"38%",width:Ti.UI.FILL,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16},text:"約2000（每月）",id:"__alloyId64"}),e.__views.__alloyId62.add(e.__views.__alloyId64),e.__views.__alloyId65=Ti.UI.createView({top:5,height:Ti.UI.SIZE,id:"__alloyId65"}),e.__views.__alloyId58.add(e.__views.__alloyId65),e.__views.__alloyId66=Ti.UI.createLabel({color:"black",width:"38%",left:10,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16,fontWeight:"bold"},text:"間隔：",id:"__alloyId66"}),e.__views.__alloyId65.add(e.__views.__alloyId66),e.__views.__alloyId67=Ti.UI.createLabel({color:"#151ba5",left:"38%",width:Ti.UI.FILL,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16},text:"3房2廳",id:"__alloyId67"}),e.__views.__alloyId65.add(e.__views.__alloyId67),e.__views.__alloyId68=Ti.UI.createView({top:5,height:Ti.UI.SIZE,id:"__alloyId68"}),e.__views.__alloyId58.add(e.__views.__alloyId68),e.__views.__alloyId69=Ti.UI.createLabel({color:"black",width:"38%",left:10,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16,fontWeight:"bold"},text:"座向景觀：",id:"__alloyId69"}),e.__views.__alloyId68.add(e.__views.__alloyId69),e.__views.__alloyId70=Ti.UI.createLabel({color:"#151ba5",left:"38%",width:Ti.UI.FILL,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16},text:"向南,園景",id:"__alloyId70"}),e.__views.__alloyId68.add(e.__views.__alloyId70),e.__views.__alloyId71=Ti.UI.createView({top:5,height:Ti.UI.SIZE,id:"__alloyId71"}),e.__views.__alloyId58.add(e.__views.__alloyId71),e.__views.__alloyId72=Ti.UI.createLabel({color:"black",width:"38%",left:10,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16,fontWeight:"bold"},text:"裝修：",id:"__alloyId72"}),e.__views.__alloyId71.add(e.__views.__alloyId72),e.__views.__alloyId73=Ti.UI.createLabel({color:"#151ba5",left:"38%",width:Ti.UI.FILL,top:0,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16},text:"原裝間隔,柚木地,冷",id:"__alloyId73"}),e.__views.__alloyId71.add(e.__views.__alloyId73),e.__views.__alloyId74=Ti.UI.createView({bottom:0,height:1,left:15,borderColor:"#CACACA",width:Ti.UI.FILL,borderWidth:2,id:"__alloyId74"}),e.__views.otherMainView.add(e.__views.__alloyId74),e.__views.otherMainView=Ti.UI.createView({top:"15",height:Ti.UI.SIZE,width:Ti.UI.FILL,id:"otherMainView"}),e.__views.leftSrlView.add(e.__views.otherMainView),e.__views.__alloyId75=Ti.UI.createView({top:0,left:10,width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId75"}),e.__views.otherMainView.add(e.__views.__alloyId75),e.__views.otherItemRemarksLabel=Ti.UI.createLabel({color:"black",backgroundColor:"#74DF00",font:{fontSize:17,fontWeight:"bold"},textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,left:5,top:15,bottom:5,width:30,height:Ti.UI.SIZE,text:"備註",id:"otherItemRemarksLabel"}),e.__views.__alloyId75.add(e.__views.otherItemRemarksLabel),e.__views.otherItemRemarks=Ti.UI.createLabel({color:"black",left:50,width:Ti.UI.FILL,top:15,textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,font:{fontSize:16},text:"業主自讓:有蓋車位,全包,不售,清靜,獨立工人房.工作間",id:"otherItemRemarks"}),e.__views.__alloyId75.add(e.__views.otherItemRemarks),e.__views.__alloyId76=Ti.UI.createView({bottom:0,height:1,left:15,borderColor:"#CACACA",width:Ti.UI.FILL,borderWidth:2,id:"__alloyId76"}),e.__views.otherMainView.add(e.__views.__alloyId76),e.__views.__alloyId77=Ti.UI.createView({top:"15",height:Ti.UI.SIZE,width:Ti.UI.FILL,id:"__alloyId77"}),e.__views.leftSrlView.add(e.__views.__alloyId77),e.__views.__alloyId78=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId78"}),e.__views.__alloyId77.add(e.__views.__alloyId78),e.__views.likeBtn=Ti.UI.createButton({width:"77dp",height:"37dp",left:15,backgroundImage:"/temp/likeBtn.png",id:"likeBtn"}),e.__views.__alloyId78.add(e.__views.likeBtn),e.__views.emailBtn=Ti.UI.createButton({width:"112dp",height:"37dp",left:15,backgroundImage:"/temp/emailBtn.png",id:"emailBtn"}),e.__views.__alloyId78.add(e.__views.emailBtn),e.__views.rightView=Ti.UI.createView({top:15,right:15,left:"32%",height:Ti.UI.FILL,layout:"vertical",width:Ti.UI.FILL,id:"rightView"}),e.__views.tmpl2Main.add(e.__views.rightView),e.__views.topView=Ti.UI.createView({top:0,height:Ti.UI.SIZE,id:"topView"}),e.__views.rightView.add(e.__views.topView),e.__views.premises=Ti.UI.createLabel({color:"#006865",left:0,textAlign:"left",font:{fontSize:24,fontWeight:"bold"},text:"金鐘柯布連道89號力寶中心",id:"premises"}),e.__views.topView.add(e.__views.premises),e.__views.__alloyId79=Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.SIZE,id:"__alloyId79"}),e.__views.topView.add(e.__views.__alloyId79),e.__views.hotBtn=Ti.UI.createButton({backgroundImage:"/temp/hot.png",width:"52dp",height:"37dp",right:0,id:"hotBtn"}),e.__views.__alloyId79.add(e.__views.hotBtn),e.__views.bottomView=Ti.UI.createView({borderColor:"#CACACA",borderWidth:"1",top:10,layout:"horizontal",height:Ti.UI.FILL,width:Ti.UI.FILL,id:"bottomView"}),e.__views.rightView.add(e.__views.bottomView),e.__views.middleSrlView=Ti.UI.createScrollView({showVerticalScrollIndicator:!1,showHorizontalScrollIndicator:!1,scrollType:"vertical",top:20,left:20,height:"100%",layout:"vertical",width:"46%",id:"middleSrlView"}),e.__views.bottomView.add(e.__views.middleSrlView),e.__views.iconLabel=Ti.UI.createLabel({color:"#FFFFFF",backgroundColor:"black",width:Ti.UI.FILL,height:Ti.UI.SIZE,textAlign:"center",text:"設施／鄰近設施",id:"iconLabel"}),e.__views.middleSrlView.add(e.__views.iconLabel),e.__views.iconView=Ti.UI.createView({top:0,width:Ti.UI.FILL,height:Ti.UI.SIZE,layout:"horizontal",id:"iconView"}),e.__views.middleSrlView.add(e.__views.iconView),e.__views.__alloyId80=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId80"}),e.__views.iconView.add(e.__views.__alloyId80),e.__views.__alloyId81=Ti.UI.createImageView({image:"/propertyIcon/carparking.jpg",id:"__alloyId81"}),e.__views.__alloyId80.add(e.__views.__alloyId81),e.__views.__alloyId82=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId82"}),e.__views.iconView.add(e.__views.__alloyId82),e.__views.__alloyId83=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/swimmingPool.ico",id:"__alloyId83"}),e.__views.__alloyId82.add(e.__views.__alloyId83),e.__views.__alloyId84=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId84"}),e.__views.iconView.add(e.__views.__alloyId84),e.__views.__alloyId85=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/taxi.png",id:"__alloyId85"}),e.__views.__alloyId84.add(e.__views.__alloyId85),e.__views.__alloyId86=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId86"}),e.__views.iconView.add(e.__views.__alloyId86),e.__views.__alloyId87=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/train.png",id:"__alloyId87"}),e.__views.__alloyId86.add(e.__views.__alloyId87),e.__views.__alloyId88=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId88"}),e.__views.iconView.add(e.__views.__alloyId88),e.__views.__alloyId89=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/bicycle.png",id:"__alloyId89"}),e.__views.__alloyId88.add(e.__views.__alloyId89),e.__views.__alloyId90=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId90"}),e.__views.iconView.add(e.__views.__alloyId90),e.__views.__alloyId91=Ti.UI.createImageView({image:"/propertyIcon/carparking.jpg",id:"__alloyId91"}),e.__views.__alloyId90.add(e.__views.__alloyId91),e.__views.__alloyId92=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId92"}),e.__views.iconView.add(e.__views.__alloyId92),e.__views.__alloyId93=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/swimmingPool.ico",id:"__alloyId93"}),e.__views.__alloyId92.add(e.__views.__alloyId93),e.__views.__alloyId94=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId94"}),e.__views.iconView.add(e.__views.__alloyId94),e.__views.__alloyId95=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/taxi.png",id:"__alloyId95"}),e.__views.__alloyId94.add(e.__views.__alloyId95),e.__views.__alloyId96=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId96"}),e.__views.iconView.add(e.__views.__alloyId96),e.__views.__alloyId97=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/train.png",id:"__alloyId97"}),e.__views.__alloyId96.add(e.__views.__alloyId97),e.__views.__alloyId98=Ti.UI.createView({top:10,width:50,height:50,left:5,borderColor:"black",borderWidth:1,id:"__alloyId98"}),e.__views.iconView.add(e.__views.__alloyId98),e.__views.__alloyId99=Ti.UI.createImageView({width:50,height:50,image:"/propertyIcon/bicycle.png",id:"__alloyId99"}),e.__views.__alloyId98.add(e.__views.__alloyId99),e.__views.smallImgSrlView=Ti.UI.createScrollView({showVerticalScrollIndicator:!1,showHorizontalScrollIndicator:!1,scrollType:"vertical",left:10,height:Ti.UI.FILL,layout:"vertical",width:Ti.UI.FILL,id:"smallImgSrlView"}),e.__views.bottomView.add(e.__views.smallImgSrlView),e.__views.rightSubView=Ti.UI.createView({height:Ti.UI.SIZE,layout:"horizontal",width:Ti.UI.FILL,top:20,id:"rightSubView"}),e.__views.smallImgSrlView.add(e.__views.rightSubView),t.destroy=function(){},_.extend(e,e.__views),Ti.App.Properties.getObject("loginInfo",!1);var i,o=require("ti.map"),r=require("viewFile").viewFile,l=require("getData").property,a=arguments[0]||{},n=a.win,s=Ti.App.Properties.getString("lang","c"),d={check:0,init:function(){this.setDetail(),e.smallImgSrlView.addEventListener("postlayout",function(){0==d.check&&(d.setImage(),d.check++)});var t={win:n,price:a.price},i=tools.mortagageTool(t);i.left="80%",e.priceItemView.add(i)},setDetail:function(){i=l.getDetail(a.propertyno,a.propgroup),e.premises.text=i[s+"_premises"],e.price.text=comjs.addCommas(100*i.price),e.avgprice.text="@"+comjs.addCommas(i.averageprice),e.avgrent.text="@"+comjs.addCommas(i.averagerent),e.rent.text=comjs.addCommas(i.rent),e.netarea.text=comjs.addCommas(i.netarea)+"呎",e.grossarea.text=comjs.addCommas(i.grossarea)+"呎",e.otherItemRemarks.text=i[s+"_remarks"],(0==i.rent||""==i.rent)&&e.leftSrlView.remove(e.rentView),(0==i.price||""==i.price)&&(e.leftSrlView.remove(e.priceView),e.leftTitle.setText("出租"))},setMap:function(t){var i="50%",r=Ti.Network.createHTTPClient();r.setTimeout(12e4);var l="http://maps.google.com/maps/api/geocode/json?address="+t;l+="&sensor="+(1==Ti.Geolocation.locationServicesEnabled),r.open("GET",l),r.setRequestHeader("Content-Type","application/json; charset=utf-8"),r.send(),r.onerror=function(){},r.onload=function(){var r=JSON.parse(this.responseText);if("OK"==r.status&&void 0!=r.results&&r.results.length>0){var l=o.createView({animate:!0,regionFit:!0,location:{latitude:r.results[0].geometry.location.lat,longitude:r.results[0].geometry.location.lng,latitudeDelta:.005,longitudeDelta:.005},region:{latitude:r.results[0].geometry.location.lat,longitude:r.results[0].geometry.location.lng,latitudeDelta:.005,longitudeDelta:.005},top:20,width:Ti.UI.FILL,height:i,mapType:o.NORMAL_TYPE});e.middleSrlView.add(l);var a=o.createAnnotation({latitude:r.results[0].geometry.location.lat,longitude:r.results[0].geometry.location.lng,title:t,subtitle:t,animate:!0,id:1});l.addAnnotation(a),a=null}r=null}},setImage:function(){var t=l.getImage(a.propertyno,a.propgroup);if(t){for(var o=e.rightSubView.size.width/2-15,n=0;n<t.length;n++){var _=Ti.UI.createView({width:o,height:140,right:6,bottom:6,borderColor:"#CACACA",borderWidth:1});if(t[n]){var c=r("jpg",t[n],!0);_.add(c)}e.rightSubView.add(_)}setTimeout(function(){d.setMap(i[s+"_premises"])},2e3)}}};d.init(),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;