var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var args = arguments[0] || {};
var db=require('db').db;

var basicui=new baseUi(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getMainView();


var neEstateDetail={
	currentEstate:args.record,
	estateList:args.estateList,
	containers :[],
	currentPage:0,
	init:function(){
		
		
		mainView.add($.mainDetailView);
		win.open();

		this.setScrollView();

	}
	,setScrollView:function(){
		this.containers=[];
		var i=0;
		
		for (var k in this.estateList){
			var basic_view= Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FIll });
			this.containers.push(basic_view);
			
			if (this.estateList[k]==this.currentEstate){
				loadView(this.containers[i],this.estateList[k]);
				this.currentPage=i;
				$.neEstateDtlScrollView.currentPage=i;
				
			}
			i++;
		}
       // console.log(this);
        
        $.neEstateDtlScrollView.views=this.containers;
		$.neEstateDtlScrollView.addEventListener('scroll',this.setScrollEvent);
		$.neEstateDtlScrollView.setCurrentPage(this.currentPage);

		
	}
	,setScrollEvent:function(evt){
		
		if (neEstateDetail.currentPage!=evt.currentPage){
			neEstateDetail.currentPage=evt.currentPage;
		 	loadView(neEstateDetail.containers[evt.currentPage], neEstateDetail.estateList[evt.currentPage]);
		}
	}
};




function loadView(view, estateno) {
//	console.log(estateno);
    // empty out any children
    if (view){
	    if (view.children.length ) {
	      
	    }else {
	    // add new children
	     	
		   var obj={
		   //	propgroup:args.propgroup,
		   	estateno:estateno
		   };
		   view.add(Alloy.createController('neEstate/neEstateDetailTmpl2',obj).getView());
	   }
	   }
}

neEstateDetail.init();
