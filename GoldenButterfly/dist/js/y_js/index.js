//banner部分轮播图
$('#J_Slider').slider({
        speed: 500,
        autoplay: 3000,
        lazyLoad: true
});
//timebanner 限时抢购部分轮播图
$('#X_Slider').slider({
        speed: 600,
        autoplay: 4000,
        lazyLoad: true
});
//精品课程轮播
 var swiper = new Swiper('.swiper-container1', {
    slidesPerView: 'auto',
    paginationClickable: true,
});
//精品课程轮播
 var swiper = new Swiper('.swiper-container2', {
    slidesPerView: 'auto',
    paginationClickable: true,
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
 //图片懒加载
 $('img.lazy').lazyLoad();