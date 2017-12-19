//banner部分轮播图
$('#details_Slider').slider({
        speed: 200,
        autoplay: 2000,
        lazyLoad: true
});
//倒计时
function GetRTime(){
    var EndTime= new Date('2017/09/6 00:00:00');
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
    $(".t_d").text(d);
    $(".t_h").text(h);
    $(".t_m").text(m);
    $(".t_s").text(s);
  }

 setInterval(GetRTime,0);