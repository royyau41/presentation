
var mortgage=function(price,period,rate,percent){
	this.price=(price||2000000);
	this.period=(period||20);
	this.rate=(rate||2.25);
	this.percent=(percent||70);
	 this.payment_list={};
	this.all_period = [5,10,15,20,25,30];
    

    this.all_rate = [2.00,2.25,2.50,2.75,3.00,3.25,3.50,3.75,4.00,4.25,4.50,4.75,5.00,5.25,5.50,5.75,6];
     

    this.list_mortgage();
   
     this.cal_stamp_duty();
     this.cal_commission();
	this.cal_totalpayment();
	this.cal_totalinterest();
	this.cal_deposit();
	
	this.cal_monthlypayment();
	this.cal_principal();
	
	//console.log(this.getPaymentList());
    //  console.log(this.payment_list);
};
 


mortgage.prototype.setPrice=function($input) {
      this.price = $input;
   };
mortgage.prototype.setPeriod=function($input) {
      this.period = $input;
   };
mortgage.prototype.setRate=function($input) {
      this.rate = $input;
  };
mortgage.prototype.setPercent=function($input) {
      this.percent = $input;
  };


mortgage.prototype.getPrice=function() {
       return this.price;
};
mortgage.prototype.getPercent=function() {
       return this.percent;
   };
mortgage.prototype.getRate=function() {
       return this.rate;
   };
mortgage.prototype.getPeriod=function() {
       return this.period;
   };


//   List out the relationship table between Rate & Period
    mortgage.prototype.getPaymentList=function() {
    	
       return this.payment_list;
   };
//   List out the Rate List
    mortgage.prototype.getRateList=function() {
       return this.all_rate;
   };
//   List out the Period List
   mortgage.prototype.getPeriodList=function() {
       return this.all_period;
   };
//   2nd Mortgage Premium
   mortgage.prototype.get2ndMortgagePremium=function() {
       return number_format(this.sec_mortgage_premium,2,'.',',');
   };
//   Stamp Duty
    mortgage.prototype.getStampDuty=function() {
       return number_format(this.stamp_duty,2,'.',',');
   };
//   Stamp Duty DSD
    mortgage.prototype.getStampDutyDSD=function() {
       return number_format(this.stamp_duty_dsd,2,'.',',');
   };   
//   Deposit
    mortgage.prototype.getDeposit=function() {
       return number_format(this.deposit,2,'.',',');
   };
//   Commission
    mortgage.prototype.getCommission=function() {
       return number_format(this.commission,2,'.',',');
   };
//   Full Payment (Loan + Interest)
    mortgage.prototype.getTotalPayment=function() {
       return number_format(this.totalpayment,2,'.',',');
   };
//   Total Interest
    mortgage.prototype.getTotalInterest=function() {
       return number_format(this.totalinterest,2,'.',',');
   };
//   List out the Payment in detail
    mortgage.prototype.getFullPaymentList=function() {
       return this.fulllist;
   };
//   Payment per month
    mortgage.prototype.getMonthlyPayment=function() {
       return number_format(this.monthlypayment,2,'.',',');
   };
//   Principal
    mortgage.prototype.getPrincipal=function() {
	   this.cal_principal();
       return this.principal_price;
   };



   mortgage.prototype.cal_mortgage=function($rate_in,$period_in){
      $principal = this.price * this.percent / 100;
      $rate = $rate_in / 100 / 12;
      $period = $period_in * 12;
     
      $payment = round(($principal * $rate * Math.pow(1+$rate,$period)) / (Math.pow(1+$rate,$period) - 1),2);
    
      return $payment;
   };

    mortgage.prototype.list_mortgage=function(){
      //this.all_period = [5,10,15,20,25,30];
      this.period=parseFloat(this.period);
      if (_.indexOf(this.all_period,this.period)==-1){
         this.all_period.push(this.period);
          this.all_period=this.all_period.sort(function(a, b){return a-b;});
         
      }

      //this.all_rate = [2.00,2.25,2.50,2.75,3.00,3.25,3.50,3.75,4.00,4.25,4.50,4.75,5.00,5.25,5.50,5.75,6];
     // console.log(typeof this.rate);
       if (_.indexOf(this.all_rate,this.rate)==-1){
         this.all_rate.push(this.rate);
         this.all_rate=this.all_rate.sort(function(a, b){a=round (a*100);b=round(b*100);return a-b;});
         
      }
     
	this.payment_list={};
       for (var k in this.all_rate) {
       	
         for (var j in this.all_period) {
         	$row=this.all_rate[k];
         	$col=this.all_period[j];
         	$rowNo=$row*100;
         	$rowNo=$rowNo.toString();
         	if (typeof this.payment_list[$rowNo]=='undefined'){this.payment_list[$row*100]={};}
            this.payment_list[$rowNo][$col] = this.cal_mortgage($row,$col);
         }
        
      }
   };


    mortgage.prototype.cal_sec_mort_premium=function(){
      $principal = this.price * this.percent / 100;

      $sec_mort_rate = {};
      $sec_mort_rate[1] = {10 : 0.55, 15 : 0.60, 20 : 0.65 , 25 : 0.70 , 30 : 0.75};
      $sec_mort_rate[2] = {10 : 1.00, 15 : 1.15, 20 : 1.40 , 25 : 1.50 , 30 : 1.65};
      $sec_mort_rate[3] = {10 : 1.55, 15 : 1.80, 20 : 2.15 , 25 : 2.30 , 30 : 2.40};
      $sec_mort_rate[4] = {10 : 2.15, 15 : 2.50, 20 : 2.98 , 25 : 3.35 , 30 : 2.55};
      $sec_mort_rate[5] = {10 : 2.48, 15 : 2.88, 20 : 3.38 , 25 : 3.78 , 30 : 3.98};

      switch(true)
      {
          case this.period<=10:
              $cal_period = 10;
              break;
          case this.period>10 && this.period<=15:
              $cal_period = 15;
              break;
          case this.period>15 && this.period<=20:
              $cal_period = 20;
              break;
          case this.period>20 && this.period<=25:
              $cal_period = 25;
              break;
          case this.period>25 && this.period<=30:
              $cal_period = 30;
              break;
      }

      switch(true)
      {
          case this.percent>70 && this.percent<=75:
              $cal_rate = 1;
              break;
          case this.percent>75 && this.percent<=80:
              $cal_rate = 2;
              break;
          case this.percent>80 && this.percent<=85:
              $cal_rate = 3;
              break;
          case this.percent>85 && this.percent<=90:
              $cal_rate = 4;
              break;
          case this.percent>90 && this.percent<=95:
              $cal_rate = 5;
              break;
      }

      this.sec_mortgage_premium = round($principal * $sec_mort_rate[$cal_rate][$cal_period] / 100, 1);
   };

    mortgage.prototype.cal_stamp_duty=function(){
    	$cal_stamp_duty=0;
    	
      switch(true)
      {
          case (this.price>0 && this.price<=2000000):
     
              $cal_stamp_duty = 100;
              break;
          case this.price>2000000 && this.price<=2351760:
              $cal_stamp_duty = 100 + (this.price - 2000000) * 0.1;
              break;
          case this.price>2351760 && this.price<=3000000:
              $cal_stamp_duty = this.price * 0.015;
              break;
          case this.price>3000000 && this.price<=3290320:
              $cal_stamp_duty = 45000 + (this.price - 3000000) * 0.1;
              break;
          case this.price>3290320 && this.price<=4000000:
              $cal_stamp_duty = this.price * 0.0225;
              break;
          case this.price>4000000 && this.price<=4428570:
              $cal_stamp_duty = 90000 + (this.price - 4000000) * 0.1;
              break;
          case this.price>4428570 && this.price<=6000000:
              $cal_stamp_duty = this.price * 0.03;
              break;
          case this.price>6000000 && this.price<=6720000:
              $cal_stamp_duty = 180000 + (this.price - 6000000) * 0.1;
              break;
          case this.price>6720000:
              $cal_stamp_duty = this.price * 0.0375;
              break;
      }
      switch(true)
      {
	      case this.price>0 && this.price<=2000000:
              $cal_stamp_duty_dsd = this.price * 0.015;
              break;
          case this.price>2000000 && this.price<=2176470:
              $cal_stamp_duty_dsd = 30000 + (this.price - 2000000) * 0.2;
              break;
          case this.price>2176470 && this.price<=3000000:
              $cal_stamp_duty_dsd = this.price * 0.03;
              break;
          case this.price>3000000 && this.price<=3290330:
              $cal_stamp_duty_dsd = 90000 + (this.price - 3000000) * 0.2;
              break;
          case this.price>3290330 && this.price<=4000000:
              $cal_stamp_duty_dsd = this.price * 0.045;
              break;
          case this.price>4000000 && this.price<=4428580:
              $cal_stamp_duty_dsd = 180000 + (this.price - 4000000) * 0.2;
              break;
          case this.price>4428580 && this.price<=6000000:
              $cal_stamp_duty_dsd = this.price * 0.06;
              break;
          case this.price>6000000 && this.price<=6720000:
              $cal_stamp_duty_dsd = 360000 + (this.price - 6000000) * 0.2;
              break;
          case this.price>6720000 && this.price<=20000000:
              $cal_stamp_duty_dsd = this.price * 0.075;
              break;
          case this.price>20000000 && this.price<=21739130:
              $cal_stamp_duty_dsd = 1500000 + (this.price - 20000000) * 0.2;
              break;
          case this.price>21739130:
              $cal_stamp_duty_dsd = this.price * 0.085;
              break;
	  }	  
      if (this.price=="") {
         $cal_stamp_duty = 0;
         $cal_stamp_duty_dsd = 0;
	  }	
      this.stamp_duty = round($cal_stamp_duty,1);
	  this.stamp_duty_dsd = round($cal_stamp_duty_dsd,1);	  
   };


    mortgage.prototype.cal_principal=function() {
       this.principal_price = round(this.price * (this.percent/100),0);
   };


   mortgage.prototype.cal_deposit=function() {
       this.deposit = round(this.price * (1-this.percent/100),0);
   };


    mortgage.prototype.cal_commission=function() {
       this.commission = round(this.price * 1/100,0);
   };


    mortgage.prototype.cal_totalpayment=function() {
      this.totalpayment = this.payment_list[this.rate * 100][this.period] * 12 * this.period;
   };


    mortgage.prototype.cal_monthlypayment=function(){
      this.monthlypayment = this.payment_list[this.rate * 100][this.period];
   };


    mortgage.prototype.cal_totalinterest=function() {
      this.totalinterest = (this.payment_list[this.rate * 100][this.period] * 12 * this.period) - this.price + this.price * (1-this.percent/100);
   };
   
   mortgage.prototype.cal_mortgage_full_list=function() {
        $price			= this.price;
        $mortgageRate	= this.percent;
        $principal		= $price * ( $mortgageRate / 100 );
        $rate			= this.rate;
        $period			= this.period;

        $pmt = $rate/100/12 * (
                   (  0 + Math.pow( ( 1+($rate/100/12) ), ($period*12) ) * $principal ) /
                   ( -1 + Math.pow( ( 1+($rate/100/12) ), ($period*12) ) )
               );

        for ($i=0; $i < ($period*12); $i++) {
            $ratePayment = ( ($i==0) ? $principal : $fullpaymentlist[($i-1)]['remain'] ) * ($rate /100 / 12);

            $principalPayment = $pmt - $ratePayment;

            $remainPayment = ( ($i==0) ? $principal : $fullpaymentlist[($i-1)]['remain'] ) - $principalPayment;

            $fullpaymentlist.push({
                                            'rate'      : $ratePayment,
                                            'principal' : $principalPayment,
                                            'pmt'       : $pmt,
											'remain'    : $remainPayment

            });
        }

       this.fulllist = $fullpaymentlist;

    };






module.exports = mortgage;


function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
};

function round(value, precision, mode) {
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
      case 'PHP_ROUND_HALF_DOWN':
        value = f + (sgn < 0); // rounds .5 toward zero
        break;
      case 'PHP_ROUND_HALF_EVEN':
        value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
        break;
      case 'PHP_ROUND_HALF_ODD':
        value = f + !(f % 2); // rounds .5 towards the next odd integer
        break;
      default:
        value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}