var loginInfo=Ti.App.Properties.getObject('loginInfo',false);
var args = arguments[0] || {};
var basicui=new baseUi(true);
var win=basicui.getBasic_win();
var mainView=basicui.getMainView();

var newdevDetail={
	currentNewdev:args.record,
	newdevList:args.newdevList,
	titleView:null,
	detailView:null,
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
		for (var k in this.newdevList){
			var basic_view= Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FIll });
			this.containers.push(basic_view);
			if (this.newdevList[k]==this.currentNewdev){
				loadView(this.containers[i],this.newdevList[k]);
				this.currentPage=i;
				$.newdevDtlScrollView.currentPage=i;
			}
			i++;
		}
       // console.log(this);
        
        
        $.newdevDtlScrollView.views=this.containers;
		$.newdevDtlScrollView.addEventListener('scroll',this.setScrollEvent);
		$.newdevDtlScrollView.currentPage=this.currentPage;


		
	}
	,setScrollEvent:function(evt){
		if (newdevDetail.currentPage!=evt.currentPage){
			newdevDetail.currentPage=evt.currentPage;
		 	loadView(newdevDetail.containers[evt.currentPage], newdevDetail.newdevList[evt.currentPage]);
		}
	
	}
};



/*
var database={
	getPropertylistNumber:function(){
		var $sql='select number from property where propgroupno='+args.propgroup;
		var res=db.getObjResultSet($sql);
		return res||{};
	}
};
*/
function loadView(view, newdevNo) {
	
    // empty out any children
       if (view){
	    if (view.children.length ) {
	      
	    }else {
	    // add new children
	     	
		    var obj={
		   	// propgroup:args.propgroup,
		   	 newdevNo:newdevNo
		    };
		   view.add(Alloy.createController('newdev/newdevDetailTmpl1',obj).getView());
	   }
	   }

}

newdevDetail.init();
