// 通用倒计时，包括倒计时所在容器，倒数秒数，显示方式，回调。
function countdown(element, options){
    var self = this;
    options = $.extend({
        start: 60,
        secondOnly: false,
        callback: null
    }, options || {});
    var t = options.start;
    var sec = options.secondOnly;
    var fn = options.callback;
    var d = +new Date();
    var diff = Math.round((d + t * 1000) / 1000);
    this.timer = timeout(element, diff, fn);
    this.stop = function() {
        clearTimeout(self.timer);
    };

    function timeout(element, until, fn) {
        var str = '',
            started = false,
            left = {d: 0, h: 0, m: 0, s: 0, t: 0},
            current = Math.round(+new Date() / 1000),
            data = {d: ' 天 ', h: ' 时 ', m: ' 分 ', s: ' 秒 '};

        left.s = until - current;

        if (left.s < 0) {
            return;
        }
        else if(left.s == 0) {
            fn && fn();
        }
        if(!sec) {
            if (Math.floor(left.s / 86400) > 0) {
                left.d = Math.floor(left.s / 86400);
                left.s = left.s % 86400;
                str += '<font>'+toTime(left.d)+'</font>' + data.d;
                started = true;
            }
            if (Math.floor(left.s / 3600) > 0) {
                left.h = Math.floor(left.s / 3600);
                left.s = left.s % 3600;
                started = true;
            }
        }
        if (started) {
            str += '<font>' + toTime(left.h)+'</font>' + data.h;
            started = true;
        }
        if(!sec) {
            if (Math.floor(left.s / 60) > 0) {
                left.m = Math.floor(left.s / 60);
                left.s = left.s % 60;
                started = true;
            }
        }
        if (started) {
            str += '<font>' + toTime(left.m)+'</font>' + data.m;
            started = true;
        }
        if (Math.floor(left.s) > 0) {
            started = true;
        }
        if (started) {
            str += '<font>' + toTime(left.s)+'</font>' + data.s;
            started = true;
        }

        $(element).html(str);


        return setTimeout(function() {timeout(element, until,fn);}, 1000);
    }
}

function toTime(n){
    return n<10?"0"+n:n;
}

//= 通用日期转换函数
Date.format = function(value, formats) {
    if(formats) {
        formats = formats.match(/^([yY]{2,4})([.:\/-])([mM]{1,2})\3([dD]{1,2})$/gi);
    }

    value = new Date(+value);

    var year = value.getFullYear();
    var month = value.getMonth() + 1;
    var day = value.getDate();

    return year + '.' + month + '.' + day;
};