$('#userForm').on('submit', function () {
    const userData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: userData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('添加失败')
        }
    })
    return false;
});

$('#modifyBox').on('change','#avatar',function(){
    const formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,
        //让ajax不要解析请求参数和请求参数类型
        processData:false,
        contentType: false,
        success:function(response){
            console.log(response);
            //预览功能
            $('#preview').attr('src',response[0].avatar);
            //设置隐藏域的值，提交的时候发送给服务器
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});

$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        console.log(response);
         const html = template('userTpl',{data:response});
         $('#userBox').html(html);
    }
})

$('#userBox').on('click','.edit',function(){
    const  id = $(this).attr('data-id');

    $.ajax({
        type:'get',
        // url:'/users/'+id,
        url:`/users/${{id}}`,
        success:function(response){
            console.log(response)
            const html = template('modifyTpl', response);
			$('#modifyBox').html(html);
        }
    })
})

$('#modifyBox').on('submit','#modifyForm', function(){
    const formData = $(this).serialize();
    const id =$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:`/users/${{id}}`,
        data: formData,
        success:function(){
            location.reload();
        }
    })
    return false
})