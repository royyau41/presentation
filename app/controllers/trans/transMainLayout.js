loginInfo=Ti.App.Properties.getObject('loginInfo',false);
//var db=require('db').db;
var getData=require('getData').trans;
var disBtnArr=[];
var estBtnArr={};
var distArray=[];
var args = arguments[0] || {};
var win=args.win;

var transMain={
	distNonActColor:{
		type: 'linear',
        colors: [ { color: '#4DB2B6', offset: 0.0}, { color: '#409295', offset: 1 } ]
	}
	,estNonActColor:{
		type: 'linear',
		colors: [ { color: '#C8C8C8', offset: 0.0}, { color: '#919191', offset: 1 } ]
	}
	,distActColor:{
		type: 'linear',
        colors: [ { color: '#295E61', offset: 0.0}, { color: '#214D4F', offset: 1 } ]

	}
	,estActColor:{
		type: 'linear',
		colors: [ { color: '#646464', offset: 0.0}, { color: '#4D4D4D', offset: 1 } ]
	}
	,tableField:{
		 'flat':{width:'110dp',left:'15dp',top:'10dp'}
		,'floor':{width:'60dp',top:'10dp'}
		,'grossarea':{width:'65dp',top:'10dp',datatype:'number'}
		,'netarea':{width:'65dp',top:'10dp',datatype:'number'}
		,'consideration':{width:'120dp',top:'10dp',datatype:'number'}
		,'averageprice':{width:'65dp',top:'10dp',datatype:'number'}
		,'netaverage':{width:'65dp',top:'10dp',datatype:'number'}
		,'transacdate':{width:'100dp',top:'10dp'}
		,'stage':{width:'65dp',top:'10dp'}
		,'infosource':{width:'80dp',top:'10dp'}
}
	,init:function(){
		this.showTransData();
		this.showDistEst();
	}
	,showTransData:function(data){
		var notInDist=[];
		var notInEst=[];
		var obj={
			c_district:this.getNonSelect('dist'),
			c_estate:this.getNonSelect('est')
		};
		
	
		var data=[];
		
		var transData=getData.getList(obj);
		for (var k1 in transData){
			var RowView=Ti.UI.createView({			
				layout:'horizontal',
				height:45,
				//backgroundColor:"#2faf96",
				color:"#676767",
				backgroundSelectedColor:"#f4f4f4"
			});
			 for (var  k in this.tableField){
			 	var rowField=Ti.UI.createLabel({
			 		text:(transData[k1][k.toLowerCase()]||''),
			 		color:'black',
			 		width:this.tableField[k].width,
			 		top:this.tableField[k].top,
			 		left:this.tableField[k].left
			 	});
			 	switch(this.tableField[k].datatype){
			 		case 'number':
			 			rowField.text=comjs.addCommas(transData[k1][k.toLowerCase()]);
			 		break;
			 		default:
			 		break;
			 		
			 	}
			 	RowView.add(rowField);
			 }
			
			var row=Ti.UI.createTableViewRow();
			row.add(RowView);
			data.push(row);
		}
		$.tranReslist.data=data;
	}
	,showDistEst:function(){
		var distEstData=getData.getDistEst();
		var dist=[];
		
		var est={};
		//console.log(distEstData);
		for (var k in distEstData){
			var cdist_string=distEstData[k].c_district;
			var cest_string=distEstData[k].c_estate;
			if (dist.indexOf(cdist_string)==-1){
				
				
				dist.push(cdist_string);
				est[cdist_string]=[];
				est[cdist_string].push(cest_string);
				
				var distBtn=Ti.UI.createButton({
					title:cdist_string,
					width:95,
					height:35,	
					top:5,
					left:5,
					active:0,
					right:'10dp',
					dist:cdist_string,
					font: {
						//fontSize: "15dp",
					},
					color:'#FFFFFF',
					borderRadius:5,
					backgroundGradient:this.distNonActColor
					//backgroundImage:'/temp/arrow1.png'	
				});
				disBtnArr.push(distBtn);
				$.tranResDistBtn.add(distBtn);	
				var estBtn=Ti.UI.createButton({
						title:cest_string,
						dist:cdist_string,
						est:cest_string,
						width:95,
						height:35,
						top:5,
						left:5,
						active:0,
						right:'10dp',
						font: {
							//fontSize: "15dp",
						},
						color:'#FFFFFF',
						borderRadius:5,
						backgroundGradient:this.estNonActColor
//						backgroundImage:'/temp/greyBtn.png'		
				});
				estBtnArr[cdist_string]=[];
				estBtnArr[cdist_string].push(estBtn);
				$.tranResEstBtn.add(estBtn);
				
				distBtn.addEventListener('click',function(e){
					if (!e.source.active){
						setActNonBtn('dist',e.source.active,e.source);
						for (var k in estBtnArr[e.source.dist]){						
							setActNonBtn('est',0,estBtnArr[e.source.dist][k]);
						}
						
					}else {
						setActNonBtn('dist',e.source.active,e.source);
						for (var k in estBtnArr[e.source.dist]){
							setActNonBtn('est',1,estBtnArr[e.source.dist][k]);
						}
						
					}
					transMain.showTransData();
					
				});
				
				
			}else {
				est[cdist_string].push(cest_string);
				var estBtn=Ti.UI.createButton({
						title:cest_string,
						dist:cdist_string,
						est:cest_string,
						active:0,
						width:114,
						height:40,
						top:10,
						right:'10dp',
						font: {
							fontSize: "15dp",
						},
						color:'#FFFFFF',
						borderRadius:5,
						backgroundGradient:this.estActColor
//						backgroundImage:'/temp/greyBtn.png'		
				});
				estBtnArr[cdist_string].push(estBtn);
				$.tranResEstBtn.add(estBtn);
				
			}
			estBtn.addEventListener('click',function(e){
				//console.log(e.source.active);
					if (!e.source.active){
						
						setActNonBtn('est',e.source.active,e.source);
						for (var k in disBtnArr){
							if (e.source.dist==disBtnArr[k].title){
								setActNonBtn('dist',0,disBtnArr[k]);
							}
						}
						//e.source.image='/temp/tick.png';
						//e.source.active=1;
					}else {
						setActNonBtn('est',e.source.active,e.source);
						//e.source.image='';
						
						//e.source.active=0;						
					}
					transMain.showTransData();
				});
			
			
		}
	}
	,getNonSelect:function(type){
		switch(type){
			case 'district':
			case 'dist':
				distArray=[];
				var reStr=[];
				for (var k in disBtnArr){
					if (disBtnArr[k].active==0){
						reStr.push(disBtnArr[k].dist);
					}
				}
				if (reStr.length>0){
					distArray=reStr;
					return "'"+reStr.join("','")+"'";
				} 
				else return '';
			break;
			case 'est':
			case 'estate':
				var reStr=[];
				for (var k in estBtnArr){
					if (_.indexOf(distArray,k)==-1||distArray.length==0)
					for (e in estBtnArr[k])
					if (estBtnArr[k][e].active==0){
						
						reStr.push(estBtnArr[k][e].est);
					}
				}
				if (reStr.length>0){
					return "'"+reStr.join("','")+"'";
				} 
				else return '';
			break;
			default:
			return '';
		}
	}
};

function setActNonBtn(type,state,source){
	switch (type){
		case 'est':
		case 'estate':
		 switch (state){
		 	case 1:
		 					source.backgroundGradient=transMain.estNonActColor;
							source.image='';
							source.active=0;
		 	break;
		 	case 0:
		 					source.backgroundGradient=transMain.estActColor;
		 					if(OS_ANDROID)
		 						source.image='/temp/tick_32.png';
		 					else 
								source.image='/temp/tick.png';
							source.active=1;
		 	break;
		 }
		break;
		case 'dist':
		case 'district':
			switch (state){
			 	case 1:
			 				source.backgroundGradient=transMain.distNonActColor;
							source.image='';
							source.active=0;
			 	break;
			 	case 0:
			 				source.backgroundGradient=transMain.distActColor;
							if(OS_ANDROID)
		 						source.image='/temp/tick_32.png';
		 					else 
								source.image='/temp/tick.png';
							source.active=1;
			 	break;
			 }
		break;
	}
}


transMain.init();
