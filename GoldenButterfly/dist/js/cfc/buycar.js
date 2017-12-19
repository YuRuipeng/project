//全选
$('#all').click(function(){
    $('.cell-right input').prop('checked',true);
});
//删除
$('.shanchu').click(function(){
    for(var i=0;i<$('.m-cell').length;i++){
        $(this).parent().eq(i).remove()  
    }
});