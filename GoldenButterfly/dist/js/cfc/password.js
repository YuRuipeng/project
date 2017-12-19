
$('.password-btn').click(function(){
    if($('#news1').val()==$('#news2').val()){
        $('.password-warn').css("display","none")
    }else{
        $('.password-warn').css("display","block")
        $('.password-warn p').text("两次输入密码不一致")
    }
    
});

