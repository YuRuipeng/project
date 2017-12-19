
//点击选中
$(".classlistsec").on("click", function(){
	if($(this).attr("class")=="classlistfirst"){
		console.log(1)
		return false
	}
	if($(this).hasClass("active")){
		$(this).removeClass("active")
	}else{
		//$(".classlistsec").removeClass('active');
		$(this).addClass("active");
	}
})
//点击全选  全部选中  再点击  取消选中
var all=true;
$(".classlist-all").on("click",function(){
	
	if(all){
		$(".classlistsec").addClass("active");
		all=false;
	}else{
		$(".classlistsec").removeClass("active");
		all=true;
	}
})
$(".classlist-footer").find("a").on("click",function(){
	console.log($(".active").length)
	if($(".active").length==0){
		YDUI.dialog.alert("请选中至少一位")
		return false;
	}else{
		YDUI.dialog.alert("签到成功")
		$(".active").find("p").text("已签到")
		$(".active").find("p").css("color","#999")
		$(".active").find("span").css("display","none");
		$(".active").attr("class","classlistfirst")
		$("li").removeClass("active")
	}
})
//图片懒加载
$('img.lazy').lazyLoad();
