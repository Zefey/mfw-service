
//原型模式 与 构造函数形式 都是通过 new 构造方法的形式创建
//此处使用 原型模式
function DateUtil(){

}
DateUtil.prototype.now = new Date();//当前日期
DateUtil.prototype.timestamp = new Date().getTime();//时间戳
DateUtil.prototype.nowDayOfWeek = DateUtil.prototype.now.getDay(); //今天本周的第几天
DateUtil.prototype.nowDay = DateUtil.prototype.now.getDate(); //当前日
DateUtil.prototype.nowMonth = DateUtil.prototype.now.getMonth(); //当前月
DateUtil.prototype.nowYear = DateUtil.prototype.now.getFullYear(); //当前年

//格式化日期：yyyy-MM-dd HH:mm:ss
DateUtil.prototype.formatDate = function(date,options) {
    var myyear = date.getFullYear(),
        mymonth = date.getMonth()+1,
        myweekday = date.getDate(),
        myhour = date.getHours(),
        myminute = date.getMinutes(),
        mysecond = date.getSeconds(),
        format = options?options:"yyyy-MM-dd";

    if(mymonth < 10){
        mymonth = "0" + mymonth;
    }
    if(myweekday < 10){
        myweekday = "0" + myweekday;
    }

    if (myhour<10) {
        myhour = "0"+myhour;
    }
    if (myminute<10) {
        myminute = "0"+myminute;
    }
    if (mysecond<10) {
        mysecond = "0"+mysecond;
    }

    format = format.replace('yyyy',myyear);
    format = format.replace('MM',mymonth);
    format = format.replace('dd',myweekday);

    format = format.replace('HH',myhour);
    format = format.replace('mm',myminute);
    format = format.replace('ss',mysecond);

    return format;
}



//获得某月的天数
DateUtil.prototype.getMonthDays = function(myMonth){
    var monthStartDate = new Date(this.nowYear, myMonth, 1);
    var monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
    var days = (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
    return  days;
}

//获得本季度的开始月份
DateUtil.prototype.getQuarterStartMonth = function(){
    var quarterStartMonth = 0;
    if(this.nowMonth<3){
        quarterStartMonth = 0;
    }
    if(2<this.nowMonth && this.nowMonth<6){
        quarterStartMonth = 3;
    }
    if(5<this.nowMonth && this.nowMonth<9){
        quarterStartMonth = 6;
    }
    if(this.nowMonth>8){
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}

//获得本周的开始日期
DateUtil.prototype.getWeekStartDate = function(options){
    var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek);
    return this.formatDate(weekStartDate,options);
}

//获得本周的结束日期
DateUtil.prototype.getWeekEndDate = function(options){
    var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek));
    return this.formatDate(weekEndDate,options);
}

//获得本月的开始日期
DateUtil.prototype.getMonthStartDate = function(options){
    var monthStartDate = new Date(this.nowYear, this.nowMonth, 1);
    return this.formatDate(monthStartDate,options);
}
//获得本月的结束日期
DateUtil.prototype.getMonthEndDate = function(options){
    var monthEndDate = new Date(this.nowYear, this.nowMonth, this.getMonthDays(this.nowMonth));
    return this.formatDate(monthEndDate,options);
}
//获得下月的开始日期
DateUtil.prototype.getNextMonthStartDate = function(options){
    var monthStartDate = new Date(this.nowYear, this.nowMonth+1, 1);
    return this.formatDate(monthStartDate,options);
}
//获得上月的开始日期
DateUtil.prototype.getLastMonthStartDate = function(options){
    var lastMonthDate = new Date();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var lastYear = lastMonthDate.getFullYear();
    var lastMonth = lastMonthDate.getMonth();

    var monthEndDate = new Date(lastYear, lastMonth, 1);
    return this.formatDate(monthEndDate,options);
}
//获得上月的结束日期
DateUtil.prototype.getLastMonthEndDate = function(options){
    var lastMonthDate = new Date();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var lastYear = lastMonthDate.getFullYear();
    var lastMonth = lastMonthDate.getMonth();

    var monthEndDate = new Date(lastYear, lastMonth, this.getMonthDays(lastMonth));
    return this.formatDate(monthEndDate,options);
}
//获得半年前（6个月前）的开始日期
DateUtil.prototype.getPreHalfYearStartDate = function(options){
    var tmpDate = new Date();
    tmpDate.setDate(1);
    tmpDate.setMonth(tmpDate.getMonth()-6);
    var year = tmpDate.getFullYear();
    var month = tmpDate.getMonth();

    var startDate = new Date(year, month, 1);
    return this.formatDate(startDate,options);
}

//获得本季度的开始日期
DateUtil.prototype.getQuarterStartDate = function(options){
    var quarterStartDate = new Date(this.nowYear, this.getQuarterStartMonth(), 1);
    return this.formatDate(quarterStartDate,options);
}

//或的本季度的结束日期
DateUtil.prototype.getQuarterEndDate = function(options){
    var quarterEndMonth = this.getQuarterStartMonth() + 2;
    var quarterStartDate = new Date(this.nowYear, quarterEndMonth, this.getMonthDays(quarterEndMonth));
    return this.formatDate(quarterStartDate,options);
}

module.exports = new DateUtil();
