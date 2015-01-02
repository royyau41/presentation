function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
    var n = isFinite(+number) ? +number : 0, prec = isFinite(+decimals) ? Math.abs(decimals) : 0, sep = "undefined" == typeof thousands_sep ? "," : thousands_sep, dec = "undefined" == typeof dec_point ? "." : dec_point, s = "", toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return "" + (Math.round(n * k) / k).toFixed(prec);
    };
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    s[0].length > 3 && (s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep));
    if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
}

function round(value, precision, mode) {
    var m, f, isHalf, sgn;
    precision |= 0;
    m = Math.pow(10, precision);
    value *= m;
    sgn = value > 0 | -(0 > value);
    isHalf = value % 1 === .5 * sgn;
    f = Math.floor(value);
    if (isHalf) switch (mode) {
      case "PHP_ROUND_HALF_DOWN":
        value = f + (0 > sgn);
        break;

      case "PHP_ROUND_HALF_EVEN":
        value = f + f % 2 * sgn;
        break;

      case "PHP_ROUND_HALF_ODD":
        value = f + !(f % 2);
        break;

      default:
        value = f + (sgn > 0);
    }
    return (isHalf ? value : Math.round(value)) / m;
}

var mortgage = function(price, period, rate, percent) {
    this.price = price || 2e6;
    this.period = period || 20;
    this.rate = rate || 2.25;
    this.percent = percent || 70;
    this.payment_list = {};
    this.all_period = [ 5, 10, 15, 20, 25, 30 ];
    this.all_rate = [ 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6 ];
    this.list_mortgage();
    this.cal_stamp_duty();
    this.cal_commission();
    this.cal_totalpayment();
    this.cal_totalinterest();
    this.cal_deposit();
    this.cal_monthlypayment();
    this.cal_principal();
};

mortgage.prototype.setPrice = function($input) {
    this.price = $input;
};

mortgage.prototype.setPeriod = function($input) {
    this.period = $input;
};

mortgage.prototype.setRate = function($input) {
    this.rate = $input;
};

mortgage.prototype.setPercent = function($input) {
    this.percent = $input;
};

mortgage.prototype.getPrice = function() {
    return this.price;
};

mortgage.prototype.getPercent = function() {
    return this.percent;
};

mortgage.prototype.getRate = function() {
    return this.rate;
};

mortgage.prototype.getPeriod = function() {
    return this.period;
};

mortgage.prototype.getPaymentList = function() {
    return this.payment_list;
};

mortgage.prototype.getRateList = function() {
    return this.all_rate;
};

mortgage.prototype.getPeriodList = function() {
    return this.all_period;
};

mortgage.prototype.get2ndMortgagePremium = function() {
    return number_format(this.sec_mortgage_premium, 2, ".", ",");
};

mortgage.prototype.getStampDuty = function() {
    return number_format(this.stamp_duty, 2, ".", ",");
};

mortgage.prototype.getStampDutyDSD = function() {
    return number_format(this.stamp_duty_dsd, 2, ".", ",");
};

mortgage.prototype.getDeposit = function() {
    return number_format(this.deposit, 2, ".", ",");
};

mortgage.prototype.getCommission = function() {
    return number_format(this.commission, 2, ".", ",");
};

mortgage.prototype.getTotalPayment = function() {
    return number_format(this.totalpayment, 2, ".", ",");
};

mortgage.prototype.getTotalInterest = function() {
    return number_format(this.totalinterest, 2, ".", ",");
};

mortgage.prototype.getFullPaymentList = function() {
    return this.fulllist;
};

mortgage.prototype.getMonthlyPayment = function() {
    return number_format(this.monthlypayment, 2, ".", ",");
};

mortgage.prototype.getPrincipal = function() {
    this.cal_principal();
    return this.principal_price;
};

mortgage.prototype.cal_mortgage = function($rate_in, $period_in) {
    $principal = this.price * this.percent / 100;
    $rate = $rate_in / 100 / 12;
    $period = 12 * $period_in;
    $payment = round($principal * $rate * Math.pow(1 + $rate, $period) / (Math.pow(1 + $rate, $period) - 1), 2);
    return $payment;
};

mortgage.prototype.list_mortgage = function() {
    this.period = parseFloat(this.period);
    if (-1 == _.indexOf(this.all_period, this.period)) {
        this.all_period.push(this.period);
        this.all_period = this.all_period.sort(function(a, b) {
            return a - b;
        });
    }
    if (-1 == _.indexOf(this.all_rate, this.rate)) {
        this.all_rate.push(this.rate);
        this.all_rate = this.all_rate.sort(function(a, b) {
            a = round(100 * a);
            b = round(100 * b);
            return a - b;
        });
    }
    this.payment_list = {};
    for (var k in this.all_rate) for (var j in this.all_period) {
        $row = this.all_rate[k];
        $col = this.all_period[j];
        $rowNo = 100 * $row;
        $rowNo = $rowNo.toString();
        "undefined" == typeof this.payment_list[$rowNo] && (this.payment_list[100 * $row] = {});
        this.payment_list[$rowNo][$col] = this.cal_mortgage($row, $col);
    }
};

mortgage.prototype.cal_sec_mort_premium = function() {
    $principal = this.price * this.percent / 100;
    $sec_mort_rate = {};
    $sec_mort_rate[1] = {
        10: .55,
        15: .6,
        20: .65,
        25: .7,
        30: .75
    };
    $sec_mort_rate[2] = {
        10: 1,
        15: 1.15,
        20: 1.4,
        25: 1.5,
        30: 1.65
    };
    $sec_mort_rate[3] = {
        10: 1.55,
        15: 1.8,
        20: 2.15,
        25: 2.3,
        30: 2.4
    };
    $sec_mort_rate[4] = {
        10: 2.15,
        15: 2.5,
        20: 2.98,
        25: 3.35,
        30: 2.55
    };
    $sec_mort_rate[5] = {
        10: 2.48,
        15: 2.88,
        20: 3.38,
        25: 3.78,
        30: 3.98
    };
    switch (true) {
      case this.period <= 10:
        $cal_period = 10;
        break;

      case this.period > 10 && this.period <= 15:
        $cal_period = 15;
        break;

      case this.period > 15 && this.period <= 20:
        $cal_period = 20;
        break;

      case this.period > 20 && this.period <= 25:
        $cal_period = 25;
        break;

      case this.period > 25 && this.period <= 30:
        $cal_period = 30;
    }
    switch (true) {
      case this.percent > 70 && this.percent <= 75:
        $cal_rate = 1;
        break;

      case this.percent > 75 && this.percent <= 80:
        $cal_rate = 2;
        break;

      case this.percent > 80 && this.percent <= 85:
        $cal_rate = 3;
        break;

      case this.percent > 85 && this.percent <= 90:
        $cal_rate = 4;
        break;

      case this.percent > 90 && this.percent <= 95:
        $cal_rate = 5;
    }
    this.sec_mortgage_premium = round($principal * $sec_mort_rate[$cal_rate][$cal_period] / 100, 1);
};

mortgage.prototype.cal_stamp_duty = function() {
    $cal_stamp_duty = 0;
    switch (true) {
      case this.price > 0 && this.price <= 2e6:
        $cal_stamp_duty = 100;
        break;

      case this.price > 2e6 && this.price <= 2351760:
        $cal_stamp_duty = 100 + .1 * (this.price - 2e6);
        break;

      case this.price > 2351760 && this.price <= 3e6:
        $cal_stamp_duty = .015 * this.price;
        break;

      case this.price > 3e6 && this.price <= 3290320:
        $cal_stamp_duty = 45e3 + .1 * (this.price - 3e6);
        break;

      case this.price > 3290320 && this.price <= 4e6:
        $cal_stamp_duty = .0225 * this.price;
        break;

      case this.price > 4e6 && this.price <= 4428570:
        $cal_stamp_duty = 9e4 + .1 * (this.price - 4e6);
        break;

      case this.price > 4428570 && this.price <= 6e6:
        $cal_stamp_duty = .03 * this.price;
        break;

      case this.price > 6e6 && this.price <= 672e4:
        $cal_stamp_duty = 18e4 + .1 * (this.price - 6e6);
        break;

      case this.price > 672e4:
        $cal_stamp_duty = .0375 * this.price;
    }
    switch (true) {
      case this.price > 0 && this.price <= 2e6:
        $cal_stamp_duty_dsd = .015 * this.price;
        break;

      case this.price > 2e6 && this.price <= 2176470:
        $cal_stamp_duty_dsd = 3e4 + .2 * (this.price - 2e6);
        break;

      case this.price > 2176470 && this.price <= 3e6:
        $cal_stamp_duty_dsd = .03 * this.price;
        break;

      case this.price > 3e6 && this.price <= 3290330:
        $cal_stamp_duty_dsd = 9e4 + .2 * (this.price - 3e6);
        break;

      case this.price > 3290330 && this.price <= 4e6:
        $cal_stamp_duty_dsd = .045 * this.price;
        break;

      case this.price > 4e6 && this.price <= 4428580:
        $cal_stamp_duty_dsd = 18e4 + .2 * (this.price - 4e6);
        break;

      case this.price > 4428580 && this.price <= 6e6:
        $cal_stamp_duty_dsd = .06 * this.price;
        break;

      case this.price > 6e6 && this.price <= 672e4:
        $cal_stamp_duty_dsd = 36e4 + .2 * (this.price - 6e6);
        break;

      case this.price > 672e4 && this.price <= 2e7:
        $cal_stamp_duty_dsd = .075 * this.price;
        break;

      case this.price > 2e7 && this.price <= 21739130:
        $cal_stamp_duty_dsd = 15e5 + .2 * (this.price - 2e7);
        break;

      case this.price > 21739130:
        $cal_stamp_duty_dsd = .085 * this.price;
    }
    if ("" == this.price) {
        $cal_stamp_duty = 0;
        $cal_stamp_duty_dsd = 0;
    }
    this.stamp_duty = round($cal_stamp_duty, 1);
    this.stamp_duty_dsd = round($cal_stamp_duty_dsd, 1);
};

mortgage.prototype.cal_principal = function() {
    this.principal_price = round(this.price * (this.percent / 100), 0);
};

mortgage.prototype.cal_deposit = function() {
    this.deposit = round(this.price * (1 - this.percent / 100), 0);
};

mortgage.prototype.cal_commission = function() {
    this.commission = round(1 * this.price / 100, 0);
};

mortgage.prototype.cal_totalpayment = function() {
    this.totalpayment = 12 * this.payment_list[100 * this.rate][this.period] * this.period;
};

mortgage.prototype.cal_monthlypayment = function() {
    this.monthlypayment = this.payment_list[100 * this.rate][this.period];
};

mortgage.prototype.cal_totalinterest = function() {
    this.totalinterest = 12 * this.payment_list[100 * this.rate][this.period] * this.period - this.price + this.price * (1 - this.percent / 100);
};

mortgage.prototype.cal_mortgage_full_list = function() {
    $price = this.price;
    $mortgageRate = this.percent;
    $principal = $price * ($mortgageRate / 100);
    $rate = this.rate;
    $period = this.period;
    $pmt = $rate / 100 / 12 * ((0 + Math.pow(1 + $rate / 100 / 12, 12 * $period) * $principal) / (-1 + Math.pow(1 + $rate / 100 / 12, 12 * $period)));
    for ($i = 0; 12 * $period > $i; $i++) {
        $ratePayment = (0 == $i ? $principal : $fullpaymentlist[$i - 1]["remain"]) * ($rate / 100 / 12);
        $principalPayment = $pmt - $ratePayment;
        $remainPayment = (0 == $i ? $principal : $fullpaymentlist[$i - 1]["remain"]) - $principalPayment;
        $fullpaymentlist.push({
            rate: $ratePayment,
            principal: $principalPayment,
            pmt: $pmt,
            remain: $remainPayment
        });
    }
    this.fulllist = $fullpaymentlist;
};

module.exports = mortgage;