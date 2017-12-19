$(".classify-tab").find("ul").on("click", "li",function(){
	$(".classify-tab").find("ul").find("li").removeClass('active');
    
	if($(this).hasClass("active")){
		$(this).removeClass("active")
	}else{
		$(".classify-tab").find("ul").find("li").removeClass('active');
		$(this).addClass("active").siblings().removeClass('active');
	}
})
//选项卡切换
$(function(){
 $(".classify-tab ul li").click(function(){
 $(this).addClass("on").siblings().removeClass("active"); //切换选中的按钮高亮状态
 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
 $(".tabs-text .tabs-2").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
 });
});

