var $getCode = $('#J_GetCode');

    /* 定义参数 */
    $getCode.sendCode({
        disClass: 'btn-disabled',
        secs: 15,
        run: false,
        runStr: '{%s}秒后重新获取',
        resetStr: '重新获取验证码'
    });

    $getCode.on('click', function () {
        /* ajax 成功发送验证码后调用【start】 */
        YDUI.dialog.loading.open('发送中');
        setTimeout(function(){
            
            YDUI.dialog.loading.close();
            
            $getCode.sendCode('start');
            YDUI.dialog.toast('已发送', 'success', 1500);
            
        }, 1500);
    });