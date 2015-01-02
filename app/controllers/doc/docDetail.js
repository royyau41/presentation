var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var args = arguments[0] || {};

var basicui=new baseUi(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getMainView();


var rePropDetail={
	currentProperty:args.record,
	propertyNumberList:args.propertyList,
	titleView:null,
	detailView:null,
	containers :[],
	currentPage:0,
	init:function(){
		
		
		mainView.add($.mainDetailView);
		// var mor=basicui.getMortagageView();
		// win.add(mor);
		win.open();
		this.setScrollView();
	}
	,setScrollView:function(){
		this.containers=[];
		var i=0;
		for (var k in this.propertyNumberList){
			var basic_view= Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FIll });
			this.containers.push(basic_view);
			if (this.propertyNumberList[k]==this.currentProperty){
				loadView(this.containers[i],this.propertyNumberList[k]);
				this.currentPage=i;
				$.rePropDtlScrollView.currentPage=i;
			}
			i++;
		}
       
        
        
        $.rePropDtlScrollView.views=this.containers;
		$.rePropDtlScrollView.addEventListener('scroll',this.setScrollEvent);
		$.rePropDtlScrollView.currentPage=this.currentPage;


		
	}
	,setScrollEvent:function(evt){
		if (rePropDetail.currentPage!=evt.currentPage){
			rePropDetail.currentPage=evt.currentPage;
		 	loadView(rePropDetail.containers[evt.currentPage], rePropDetail.propertyNumberList[evt.currentPage]);
		}
	
	}
};



function loadView(view, propertyId) {
	
    // empty out any children
       if (view){
	    if (view.children.length ) {
	      
	    }else {
	    // add new children
	     	
		   var obj={
		   	win:win,
		   	propgroup:args.propgroup,
		   	propertyno:propertyId
		   };
		   view.add(Alloy.createController('reProp/rePropDetailTmpl1',obj).getView());
	   }
	   }

}

rePropDetail.init();
//$.rePropDetail.open();
