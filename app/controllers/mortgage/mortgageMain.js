var mortgage=require('mortgage');
var args = arguments[0] || {};
var win=args.win;


var mor={
	init:function(){
		this.setEvent();
		this.calPrincipal();
	}
	,setEvent:function(){
		$.price.addEventListener('change',mor.calPrincipal);
		$.percent.addEventListener('change',mor.calPrincipal);
		
		$.morTopSmlResCal.addEventListener('click',function(e){
			var percent=$.percent.value;
			var rate=$.rate.value;
			var period=$.period.value;
			var price=$.price.value;
			
			if (!isNaN(percent)&&!isNaN(rate)&&!isNaN(period)&&!isNaN(price)){
				var mor=new mortgage(price,period,rate,percent);
				
				$.TotalPayment.text=mor.getTotalPayment();
				$.MonthlyPayment.text=mor.getMonthlyPayment();
				$.TotalInterest.text=mor.getTotalInterest();
				$.Deposit.text=mor.getDeposit();
				
				var $vb2 = mor.getPeriodList();
				var morFullList=mor.getPaymentList();
				
				morTable.genResultTableHeader($vb2);
				morTable.genMorFullList(morFullList,mor.getPeriod(), mor.getRate());

			}
		});
		
		
	}
	,calPrincipal:function(e){
		if (!(isNaN($.price.value))&&!(isNaN($.percent.value)))
		$.principal.value=comjs.addCommas($.price.value*$.percent.value/100);
	}
};

var morTable={
	genResultTableHeader:function(period){
		 for (i = $.morResHeader.children.length; i > 0; i--){
		        $.morResHeader.remove($.morResHeader.children[i - 1]);  
		    };
		
		
		var label1=Ti.UI.createLabel({
			textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
			color:'black',
			text:'利率',
			width:'80'
		});
		$.morResHeader.add(label1);
		var i=0;
		for (var k in period){
			i++;
			
			$.morResHeader.add(Ti.UI.createLabel({
				textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
				color:'black',
				text:period[k]+'年',
				width:'130',
				height:40
			})
			);
		}
		$.morReslist.setWidth((100+130*i));
	}
	,genMorFullList:function(list,period,rate){
		var data=[];
		//console.log(list);
		for (var k in list){
			//console.log(k);
			var tableViewRow=Ti.UI.createTableViewRow();
			var rowView=Ti.UI.createView({
				layout:'horizontal',
				color:'black',
				height:40
			});
			var color=(k/100==rate)?'#086A87':'#000000';
			var rateLabel=Ti.UI.createLabel({
				textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
				color:color,
				text:k/100,
				width:'80'
			});
			rowView.add(rateLabel);
			
			for(var i in list[k]){
				var color=(i==period||k/100==rate)?'#086A87':'#000000';
				var dump_number=comjs.morAddCommas(list[k][i]);
				
				//console.log(Math.round(list[k][i]));
				rowView.add(Ti.UI.createLabel({
				//	backgroundColor:color,
					textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
					color:color,
					text:dump_number,
					width:'130'
				}));
			}
			//console.log(list[k][i]);
			//rowView.setBackgroundColor(color);
			tableViewRow.add(rowView);
			data.push(tableViewRow);
		}
		$.morReslist.data=data;
	}

};

mor.init();

