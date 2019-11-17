//修改密码
$('#modifyForm').on('submit',function(){
    const formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url:'/users/password',
        data:formData,
        success:function(){
            location.href="/admin/login.html"
        }
    })
    return false;
})