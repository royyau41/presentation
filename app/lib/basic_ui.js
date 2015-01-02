/**
 * @author Roy Yau
 */
var picker = require('color_picker');

var basic_ui=function(newWin){
	this.close=1;
	this.win=Ti.UI.createWindow({
		theme: "Theme.noActionBar",
		navBarHidden:true,
		fullscreen:true,
		 orientationModes : [
	        Titanium.UI.LANDSCAPE_LEFT,
	        Titanium.UI.LANDSCAPE_RIGHT
	   	 ]
	});
	var win=this.win;

	if (newWin){
		var args={
			newWin:newWin,
			currentWin:this.win
		};
	}else {
		var args={
			currentWin:this.win
		};
	}
	this.title=Alloy.createController('title/title', args).getView();
	
	
	
	
	
	
	
};

basic_ui.prototype.getBasic_win=function(){
	this.win.add(this.title);
	
	return this.win;
};

basic_ui.prototype.getMainView=function(){
	//console.log(this.title.children[0].children[1]);
	var view=this.title.children[0].children[1];
	return view;
};



basic_ui.prototype.getProgressBar=function(){
	var progress=Ti.UI.createProgressBar({
			  
			  color: '#000000',
			  backgroundColor:'white',
			  min:0,
			  max:1,
			  value:0,
			  font: {  fontWeight:'bold'},
			  
			  bottom:'20dp',
			    
			  height:"auto",
			  width:'250dp'
			});
	return progress;
};

basic_ui.prototype.getMortagageView=function(obj){
	this.mor=Alloy.createController('mortgage/mortgageMain').getView();
	this.mor.top=30;
	this.mor.width=Ti.UI.FILL;
	this.mor.borderRadius=0;
	
 
		//  view.animate(slideRight);
	var view=Ti.UI.createView({
		borderRadius:5,
		width:'60%',
		height:'70%',
		left: -1000,
		
		bottom:10,
		zindex:10
	});
	
	var topBar=this.closeBar(view);
	view.add(topBar);
	view.add(this.mor);
	return view;
};



basic_ui.prototype.getColorPickerView=function(obj){
	
	if (typeof obj=='undefined')obj={};
	var pickerView = picker.createColorPicker({
		width:(obj.width||200),
		height:(obj.height||200),
	    hexColor : "#23456w"
	});
	
	
	var view=Ti.UI.createView({
		borderRadius:5,
		width:((obj.width)||200),
		height:((obj.height+50)||200),
		left: 0,
		
		opacity:0.8,
		zindex:10
	});
	var label=Ti.UI.createLabel({
		color:'black'
	});
	if (obj.selectedcolor){
		pickerView.addEventListener("selectedcolor", function(e) {
				label.text='color:#'+e.color;
			  obj.selectedcolor(e);
			});
	}
	var topBar=this.closeBar(view,obj);
	view.add(topBar);
	view.add(pickerView);
	view.add(label);
	return view;
};


//Sub function
basic_ui.prototype.closeBar=function(view,obj){
	if (typeof obj=='undefined')obj={};
	var topBar=Ti.UI.createView({
		backgroundColor:'#24AA91',
		top:0,
		height:30,
		width:Ti.UI.FILL
	});
	var close=Ti.UI.createButton({
		backgroundImage:'/others/cancel.png',
		width:30,
		height:30,
		top:0,
		right:0
	});
	
	close.addEventListener('click',function(e){
		
		 var slideRight = Ti.UI.createAnimation({
		    left: '-'+(view.size.width+1),
		    duration : 150
		   });
		   if (OS_IOS)
		  view.animate(slideRight);
		  else {
		  	for (var i=0;i>((view.size.width+10)*-1);i=i-35){
		  	view.left=i;	
		  	}
		  	//='-'+view.size.width;
		  }
		  this.close=1;
		  if (obj.clickCancel)obj.clickCancel(view);
		});
	topBar.add(close);
	return topBar;
};

module.exports = basic_ui;
