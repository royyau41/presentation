var args = arguments[0] || {};
var userInfo;
var xhrData=require('xhrData').xhrData;
var db=require('db').db;
var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var serverInfo={};
var dlindex=1;
var win=args.win;
var base_ui=new baseUi(true,false);
var progress=base_ui.getProgressBar();
var menuStyle=Ti.App.Properties.getInt('menuStyle',0);
win.add(progress);
progress.hide();
Alloy.Globals.Loading=progress;


var login={
	init:function(){
		
		if (loginInfo){
			$.USERCODE.value=loginInfo.USERCODE;
			$.USERPASSWORD.value=loginInfo.USERPASSWORD;
			$.sn.value=loginInfo.sn;
			$.IP.value=loginInfo.ip;
			serverInfo={
				ip:loginInfo.ip
			};

			this.setPropGroupBtn();
			
		}
		this.setPropPage();
		this.setMenuStyle();
		this.setLang();
		this.setEventListener();
	}
	,setPropGroupBtn:function(){	
		var sql='select filename,number from propgroup where deletedate =0 order by updateinfo ';
		var filename=db.getObjResultSet(sql);
		
		for (var k in $.propGroupBtnView.children){
			if ($.propGroupBtnView.children.hasOwnProperty(0)){
				
				$.propGroupBtnView.remove($.propGroupBtnView.children[0]);
			}
		}
		var switchAry=[];
		
		for (var i=0 ; i<filename.length;i++){
			
			switchAry[i]=Ti.UI.createButton({
				title:filename[i].filename,
				propgroup:filename[i].number,
				width:Ti.UI.SIZE,
				left:'10dp',
				height : Ti.UI.SIZE,
				font: {
					fontSize: "15dp",
				},
				color:'#FFFFFF',
				borderRadius:4,
				backgroundGradient: Alloy.Globals.btnInitColor
				//backgroundImage:'/temp/commonBtn.png'
			});
			switchAry[i].width=pToD(switchAry[i].toImage().width)+10;
			$.propGroupBtnView.add(switchAry[i]);
			 
			switchAry[i].addEventListener('touchstart',function(e){
				for (var k=0;k<switchAry.length;k++){	
					switchAry[k].setBackgroundGradient( Alloy.Globals.btnInitColor);
				}
				e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				Ti.App.Properties.setInt('propgroup',e.source.propgroup);
			});
		}
		//init set select propgroup
		if (Ti.App.Properties.getInt('propgroup',0)){
			for (var i=0 ; i<switchAry.length;i++){
				if (switchAry[i].propgroup==Ti.App.Properties.getInt('propgroup',0))
				switchAry[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor);
			}
		}
	}
	,setPropPage:function(){
		var switchAry=[];
		for (var i=0 ; i<2;i++){
		switchAry[i]=Ti.UI.createButton({
				title:(i+1),
				pageStyle:(i+1),
				width:Ti.UI.SIZE,
				left:'10dp',
				height : Ti.UI.SIZE,
				font: {
					fontSize: "15dp",
				},
				color:'#FFFFFF',
				borderRadius:4,
				backgroundGradient: Alloy.Globals.btnInitColor
				//backgroundImage:'/temp/commonBtn.png'
			});
			switchAry[i].width=pToD(switchAry[i].toImage().width)+10;
			$.switchPage.add(switchAry[i]);
			 
			switchAry[i].addEventListener('click',function(e){
				for (var k=0;k<switchAry.length;k++){	
					switchAry[k].setBackgroundGradient( Alloy.Globals.btnInitColor);
				}
				e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				Ti.App.Properties.setInt('propPage',e.source.pageStyle);
			});
		}
		if (Ti.App.Properties.getInt('propPage',1)){
			
			for (var i=0 ; i<switchAry.length;i++){
				console.log(switchAry[i].pageStyle+'    '+Ti.App.Properties.getInt('propPage',1));
				if (switchAry[i].pageStyle==Ti.App.Properties.getInt('propPage',1)){
					
					switchAry[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				}
			}
		}
	}
	,setLang:function(){
		var langAry=['c','e'];
		var langIsoAry=['zh','en'];
		var langTitleAry=['中文','Eng'];
		var switchAry=[];
		for (var i=0 ; i<2;i++){
		switchAry[i]=Ti.UI.createButton({
				title:langTitleAry[i],
				lang:langAry[i],
				langIso:langIsoAry[i],
				width:Ti.UI.SIZE,
				top:0,
				left:'10dp',
				height : Ti.UI.SIZE,
				font: {
					fontSize: "15dp",
				},
				color:'#FFFFFF',
				borderRadius:4,
				backgroundGradient: Alloy.Globals.btnInitColor
				//backgroundImage:'/temp/commonBtn.png'
			});
			switchAry[i].width=pToD(switchAry[i].toImage().width)+10;
			$.switchLang.add(switchAry[i]);
			 
			switchAry[i].addEventListener('click',function(e){
				for (var k=0;k<switchAry.length;k++){	
					switchAry[k].setBackgroundGradient( Alloy.Globals.btnInitColor);
				}
				e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				Ti.App.Properties.setString('lang',e.source.lang);
				Ti.App.Properties.setString('langIso',e.source.langIso);
				Alloy.Globals.langIso=e.source.langIso;
				Alloy.Globals.lang=e.source.lang;
				
				var data={
					menu:menuStyle
				};
				Ti.App.fireEvent('MenuStyle',data);
				
			});
		}
		if (Ti.App.Properties.getString('lang','c')){
			
			for (var i=0 ; i<switchAry.length;i++){
				//console.log(switchAry[i].pageStyle+'    '+Ti.App.Properties.getInt('menuStyle',0));
				if (switchAry[i].lang==Ti.App.Properties.getString('lang','c')){
					
					switchAry[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				}
			}
			
		}
	}
	,setMenuStyle:function(){
		var switchAry=[];
		for (var i=0 ; i<2;i++){
		switchAry[i]=Ti.UI.createButton({
				title:(i+1),
				menuStyle:(i),
				width:Ti.UI.SIZE,
				left:'10dp',
				height : Ti.UI.SIZE,
				font: {
					fontSize: "15dp",
				},
				color:'#FFFFFF',
				borderRadius:4,
				backgroundGradient: Alloy.Globals.btnInitColor
				//backgroundImage:'/temp/commonBtn.png'
			});
			switchAry[i].width=pToD(switchAry[i].toImage().width)+10;
			$.switchMenu.add(switchAry[i]);
			 
			switchAry[i].addEventListener('click',function(e){
				for (var k=0;k<switchAry.length;k++){	
					switchAry[k].setBackgroundGradient( Alloy.Globals.btnInitColor);
				}
				e.source.setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				Ti.App.Properties.setInt('menuStyle',e.source.menuStyle);
				menuStyle=e.source.menuStyle
				var data={
					menu:e.source.menuStyle
				};
				Ti.App.fireEvent('MenuStyle',data);
				
			});
		}
		if (Ti.App.Properties.getInt('menuStyle',0)){
			
			for (var i=0 ; i<switchAry.length;i++){
				//console.log(switchAry[i].pageStyle+'    '+Ti.App.Properties.getInt('menuStyle',0));
				if (switchAry[i].menuStyle==Ti.App.Properties.getInt('menuStyle',0)){
					
					switchAry[i].setBackgroundGradient(Alloy.Globals.btnSelectedColor);
				}
			}
			
		}
	}
	,setEventListener:function(){
		$.loginBtn.addEventListener('click',function(e){
			Alloy.Globals.Loading.setMessage('');
			if (login.checkValidation())
				login.checkLogin();
			else {
				alert('Error');
			}
		});
		$.dlData.addEventListener('click',function(e){
			 loginInfo=Ti.App.Properties.getObject('loginInfo',false);
			 if (loginInfo){
			 	dlindex=1;
				 dldata.dlProcess();
			}
		
		});
		
		$.dlEstate.addEventListener('click',function(e){
				test();
			});
		
		$.sqlBtn.addEventListener('click',function(e){
			console.log(db.getObjResultSet($.sqlArea.value));
		});
		
	}
	
	
	//after click event
	,checkLogin:function(){
		Ti.App.Properties.removeProperty('loginInfo');
		$.sn.value='';
		serverInfo={
			ip:$.IP.value
		};

		var passToServer=this.getLogininfo();
		xhrData.request({
				success:function(e){
					switch(e.NUMBER){
						case '-1':
						alert('invalid user');
						progress.hide();
						break;
						case '-2':
						alert('incorrect password!');
						progress.hide();
						break;
						default:
						login.successLogin(e.NUMBER,passToServer);
					}
						
				}
				,error:function(e){
					
				} 
			},serverInfo,passToServer);
		
	}
	,successLogin:function(sn,storeObj){
		db.deleteData();
		this.setPropGroupBtn();
		Ti.App.Properties.setInt('propgroup',0);
		storeObj.sn=sn;
		storeObj.ip=$.IP.value;
		$.sn.value=sn;
		Ti.App.Properties.setObject('loginInfo',storeObj);
		Alloy.Globals.LoadingShow('Login Success!');
	}
	,checkValidation:function(){
		if ($.USERCODE.value)
			if ($.USERPASSWORD.value){
				return true;
			}
			else {return false;}
		else {	return false;}
	}
	,getLogininfo:function(){
		var passToServer={
			FUNCTIONNAME:'Register',
			USERCODE:$.USERCODE.value.toUpperCase(),
			USERPASSWORD:$.USERPASSWORD.value,
			Device_ID:Ti.Platform.id
		};
		return passToServer;

	}
	//xhr get Property data and insert
	
};

var dldata={
	propgroup:[]
	,property:[]
	,estate:[]
	,newdev:[]
	,doc:[]
	,dlProcess:function(index,info){
		if (index==''||index==null){index=dlindex;dlindex++;}else {dlindex=index;dlindex++;}
		loginInfo=Ti.App.Properties.getObject('loginInfo',false);
		serverInfo={
				ip:loginInfo.ip
			};
		if (loginInfo){
			
			switch(index){
				case 1://get propgroup
					Alloy.Globals.Loading.setMessage('下載樓盤組合中');

					this.getDataRequest(0,'PROPGROUP','propgroup',true,'NUMBER');
				break;
				case 2:
					login.setPropGroupBtn();
					var sql='select number as propgroup from propgroup as p where not exists(select id from property as f where f.propgroupno=p.number) and deletedate=0 ';
					this.propgroup=db.getObjResultSet(sql);
					Alloy.Globals.Loading.setMessage('下載樓盤中');

					this.getDataRequest(0,'PROPERTIES','property',false,'RECORDGROUP');
				break;
				case 3:
					var sql='select propertyno,propgroupno as propgroup from property as p where not exists(select id from propertyfile as f where f.propertyno=p.propertyno and f.propgroupno=p.propgroupno) ';
					this.property=db.getObjResultSet(sql);
					Alloy.Globals.Loading.setMessage('下載樓盤圖片中');

					this.getDataRequest(0,'PROPERTIESFILES','propertyfile',false,'PROPGROUPNO');
				break;
				case 4:
					Alloy.Globals.Loading.setMessage('下載屋苑資料中');
					this.getDataRequest(0,'ESTATES','estate',true,'DELETEDATE');

				break;
				case 5:
					var sql='select ESTATENO from estate as e where not exists(select id from estatefile as f where f.estateno=e.estateno ) and deletedate =0 ';
					this.estate=db.getObjResultSet(sql);
					
					Alloy.Globals.Loading.setMessage('下載屋苑圖片中');
					this.getDataRequest(0,'ESTATESFILES','estatefile',false,'ESTATENO');
				break;
				case 6:
					Alloy.Globals.Loading.setMessage('下載一手樓盤資料中');
					//this.getNewDev();
					this.getDataRequest(0,'NEWDEV','newdev',true,'NUMBER');
				break;
				case 7:
				var sql='select number from newdev as e where not exists(select id from newdevfile as f where f.newdevelopmentno=e.number )';
				//'deletedate =0 ';
					this.newdev=db.getObjResultSet(sql);
					
					Alloy.Globals.Loading.setMessage('下載一手樓盤檔案中');
					this.getDataRequest(0,'NEWDEVFILES','newdevfile',false,'NEWDEVELOPMENTNO');
				break;
				case 8:
					Alloy.Globals.Loading.setMessage('下載成交資料中');
					//this.getTransaction();
					this.getDataRequest(0,'TRANSACTIONS','trans',true,'TRANSACDATE');
				break;
				case 9:
					Alloy.Globals.Loading.setMessage('下載文件中');
					//this.getTransaction();
					this.getDataRequest(0,'DOCTYPE','doctype',true,'NUMEBR');
				break;
				case 10:
					Alloy.Globals.Loading.setMessage('下載文件項目中');
					var sql='select number from doctype as p where not exists(select id from document as f where f.DOCUMENTTYPE=p.number) and (deletedate=0) group by number';
					
					this.doc=db.getObjResultSet(sql);
					console.log(this.doc);
					this.getDataRequest(0,'DOCUMENTS','document',false,'NUMBER');
				break;
				case 99:
					dlindex=0;
					Alloy.Globals.LoadingShow('下載失敗');
				break;
				default:
					dlindex=0;
					Alloy.Globals.LoadingShow('下載完成');
				break;				
			}
		}
	}
	,modifyData:function(xmlFunction,data){
		switch(xmlFunction){
			case 'PROPERTIES':
				data['RECORDGROUP'].PROPGROUPNO=data['PROPGROUPNO'];
				data['RECORDGROUP'].ATTACHMENT=data['ATTACHMENT']||'';
				data=data['RECORDGROUP'];
			break;
			case 'PROPERTIESFILES':
			break;
			
		}
		return data;	
	}
	,getDataRequest:function(index,xmlFunction,table,master,checkField,test){
		
		if (index==''||index==null)index=0;
		var passToServer= this.getPassData(xmlFunction,index);
		if (passToServer){
			
				xhrData.request({  
				success:function(e){
				if (test){
						console.log(e);
				}else {
					if (e){
						if (e[checkField]){
							db.insertData(table,dldata.modifyData(xmlFunction,e));
						}else {
							for (var i in e ){
								db.insertData(table,dldata.modifyData(xmlFunction,e[i]));
							}
						}
					}	
					index++;
					if (!master){
						dldata.getDataRequest(index,xmlFunction,table,master,checkField);
							
						}
					else {
						 dldata.dlProcess();
						 }
				}
			}
				,error:function(e){
					dldata.dlProcess(99,e);	
				}
			},serverInfo,passToServer);
		}else {
			dldata.dlProcess();
		}
		
	}

	
	
	,getPassData:function(functioname,index){
		var basePassData={
				FUNCTIONNAME:functioname,
				USERCODE:loginInfo.USERCODE,
				USERNO:loginInfo.sn,
				Device_ID:Ti.Platform.id
			};
		var mergeObj={};
		switch(functioname){
			case 'PROPGROUP':
				var updateinfo=db.getObjResultSet('Select max(updateinfo) as updateinfo  from propgroup ');
				mergeObj={
					UPDATEINFO:updateinfo[0].updateinfo||0,
				};
			break;
			case 'PROPERTIES':

				if (this.propgroup[index]){
					console.log('test:'+this.propgroup[index].propgroup);
					mergeObj={
					USERNO:this.propgroup[index].propgroup
					};
				}else {
					return false;
				}
				
			break;
			case 'PROPERTIESFILES':
				if (dldata.property[index]){
					var mergeObj={
						RECORDNO:dldata.property[index].propertyno,
						GROUPNO:dldata.property[index].propgroup
					};
				}else {
					return false;
				}
				
			break;
			case 'ESTATES':
			console.log('test');
				var updateinfo=db.getObjResultSet('Select max(updateinfo) as updateinfo  from estate ');
				var mergeObj={
					UPDATEINFO:updateinfo[0].updateinfo||0,
				};		
			break;
			case 'ESTATESFILES':
				if (this.estate[index]){
					var mergeObj={
						RECORDNO:this.estate[index].estateno
					};
				}else {
					return false;
				}
			
			break;
			case 'NEWDEV':
				var updateinfo=db.getObjResultSet('Select max(updateinfo) as updateinfo  from newdev ');
				var mergeObj={
					UPDATEINFO:updateinfo[0].updateinfo||0,
				};	
			break;
			case 'NEWDEVFILES':
				if (this.newdev[index]){
					var mergeObj={
						RECORDNO:this.newdev[index].number
					};
				}else {
					return false;
				}
			break;
			case 'TRANSACTIONS':
			var updateinfo=db.getObjResultSet('Select max(transacdate) as updateinfo  from trans ');
			var mergeObj={
					UPDATEINFO:updateinfo[0].updateinfo||0,
				};
			break;
			case 'doctype':
			var updateinfo=db.getObjResultSet('Select max(transacdate) as updateinfo  from trans ');
			var mergeObj={
					UPDATEINFO:updateinfo[0].updateinfo||0,
				};
			break;
			case 'DOCUMENTS':
				if (this.doc[index]){
					var mergeObj={
						RECORDNO:this.doc[index].number
					};
				}else {
					return false;
				}
			break;
			
		}
			
		var returnObj = {};
	    for (var attrname in basePassData) { returnObj[attrname] = basePassData[attrname]; }
	    for (var attrname in mergeObj) { returnObj[attrname] = mergeObj[attrname]; }
	    return returnObj;
	
	}
};




login.init();






















var test=function(){
	
	var url='http://192.168.0.13/titaniumTest/CityPointSBCover-P109.pdf';
		Alloy.Globals.Loading.show();
		var xhr = Titanium.Network.createHTTPClient({
			timeout:30000
		});
		
		//data=data||{};
		
		xhr.open('POST', url);
		xhr.onload = function(e) {
			Ti.API.info('responseText.length: ' + this.responseText.length);
			
			var database = Ti.Database.open('astPresentation');
			console.log('test');
			var attach=Ti.Utils.base64encode(this.responseData);
			database.execute('INSERT INTO newdevfile (attachment, newdevelopmentno,filename) VALUES (?, ?,?)',attach.toString(), 13,'test123.pdf');
			database.close();
			
			
			
			Alloy.Globals.Loading.hide();
		};
		xhr.ondatastream = function(e)
			{
				Alloy.Globals.Loading.value=e.progress;
				
			};
		xhr.onerror = function(e) {
			Alloy.Globals.Loading.hide();
			console.log('error');
		};
	
		x
		//xhr.setRequestHeader('Content-Type', 'text/xml');

		
		xhr.send();
};
