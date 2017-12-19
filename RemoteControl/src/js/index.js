var indexRender = (function () {
    //顶部导航切换
    function active1(){
        $('.index-view-nav li').on('click',function(){
            $('.index-view-nav li').removeClass('active')
            $(this).addClass('active')
        })
    }
    //底部导航active切换
    function active2(){
        $('.tabbar-item').on('click',function(){
            //切换文字颜色
            $('.tabbar-item').removeClass('tabbar-active')
            $(this).addClass('tabbar-active')
            //切换图片
            $('.tabbar-item').find('.tabbar-icon .img2').css('display','none')
            $('.tabbar-item').find('.tabbar-icon .img1').css('display','block')
            $('.tabbar-item').find('.tabbar-icon1 .img2').css('display','block')
            $('.tabbar-item').find('.tabbar-icon1 .img1').css('display','none')
            $(this).find('.tabbar-icon .img2').css('display','block')
            $(this).find('.tabbar-icon .img1').css('display','none')
        })
        $('.tabbar-item').on('click',function(){
            $(this).find('.tabbar-icon1 .img2').css('display','none')
            $(this).find('.tabbar-icon1 .img1').css('display','block')
        })
    }
    //轮播banner
    function swiper(){
        var swiper2 = new Swiper('.index-view-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }
    return {
        init: function () {
            //主播推荐轮播
            var swiper1 = new Swiper('.swiper-container1', {
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 30
            });
            active1();//头部导航切换
            active2();//底部导航切换
            swiper();//轮播banner
        }
    }
})();
indexRender.init();
