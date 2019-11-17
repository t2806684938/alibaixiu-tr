//添加用户
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
//添加头像
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
//模板拼接
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        console.log(response);
         const html = template('userTpl',{data:response});
         $('#userBox').html(html);
    }
});
//编辑按钮添加点击事件
$('#userBox').on('click','.edit',function(){
    const  id = $(this).attr('data-id');

    $.ajax({
        type:'get',
        // url:'/users/'+id,
        url:`/users/${id}`,
        success:function(response){
            console.log(response)
            const html = template('modifyTpl', response);
			$('#modifyBox').html(html);
        }
    })
});
//删除按钮添加点击事件
$('#userBox').on('click','.delete',function(){
    if(confirm('您确认要删除该用户吗')){
        let id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:`/users/${id}`,
            success: function(){
                location.reload();
            }
        })
    }
});

//修改用户界面
$('#modifyBox').on('submit','#modifyForm', function(){
    const formData = $(this).serialize();
    const id =$(this).attr('data-id');
    $.ajax({
        type:'put',
        // url:'/users/'+id,
        url:`/users/${id}`,
        data: formData,
        success:function(response){
            location.reload();
        }
    })
    return false
});
//全选按钮
 const  selectAll = $('#selectAll');
 //批量删除按钮
 const deleteMany = $('#deleteMany');
//点击的时候选中全部
 selectAll.on('change',function(){
     const status = $(this).prop('checked');

     if(status){
         deleteMany.show();
     }else{
         deleteMany.hide();
     }

     $('#userBox').find('input').prop('checked',status);
 });
//当用户列表的复选框发生改变
 $('#userBox').on('change','.userStatus',function(){
    const inputs = $('#userBox').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        selectAll.prop('checked',true);
    }else{
        selectAll.prop('checked',false);
    }
    if(inputs.filter(':checked').length>1){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
 })
//批量删除功能
deleteMany.on('click',function(){
    const ids =[];
    const checkedUser = $('#userBox').find('input').filter(':checked');

    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'));
    });
    if(confirm('您确定要批量删除选中的用户吗')){
        $.ajax({
            type:'delete',
            url:`/users/${ids.join('-')}`,
            success:function(){
                location.reload();
            }
        })
    }
})


