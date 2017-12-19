$('.bot p').click(function(){
    $('.student-back').css("display","block");
});
$('#girs').click(function(){
    $('.student-back').css("display","none");
    $('.bot p').html('<i class="iconfont icon-iconfontnv2 sex"></i>')
});
$('#boys').click(function(){
    $('.student-back').css("display","none");
    $('.bot p').html('<i class="iconfont icon-nan sex"></i>')
});