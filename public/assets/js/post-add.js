//向服务器端 请求数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        const html = template('categoryTpl',{
            data:response
        });
        $('#category').html(html)
    },
});

//管理员选择文件的时候 触发事件
$('#feature').on('change',function(){
    //获取到管理员选择到的文件
    const file = this.files[0];
    //创建formData对象  实现二进制文件上传
    const formData = new FormData();
    //将选择到的文件追加到formData对象中
    formData.append('cover',file);

    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,
        //告诉$.ajax方法 不要处理data属性对应的参数 不要变成 xxx=xx&xxx=xx 的形式
        processData:false,
        //告诉$.ajax方法 不要设置参数类型 formData里面已经处理过参数类型
        contentType:false,
        success: function(response){
            console.log(response);
            $('#thumbnail').val(response[0].cover);
        },
    })
});

//当添加文章表单的时候触发
$('#addForm').on('submit',function(){
     const formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data: formData,
        success: function(){
            location.href = '/admin/posts.html';
        },
    })
    return false;
});

const id = getUrlParams("id");
// 修改/编辑文章操作
if(id != -1){
    $.ajax({
        type:'get',
        url:`/posts/${id}`,
        success: function(response){
            $.ajax({
                type:'get',
                url:'/categories',
                success: function(categories){
                    response.categories=categories;
                    console.log(response);
                    const html = template('modifyTpl',response);
                    $('#parentBox').html(html);
                }
            })
        },
    })
};

//编辑文章时 跳转页面 从浏览器地址栏获取查询参数
//location.search  获取到的是  ?id=xxxxxx&age=xxxxx的数据  
// substr() 从指定位置开始截取
//split() 将字符串以某种符号进行分割  返回结果是一个数组
function getUrlParams(name) {
    const paramsAry = location.search.substr(1).split('&');
    console.log(location.search);
    console.log(paramsAry);
    for( let i =0; i<paramsAry.length; i++){
        const tmp = paramsAry[i].split('=');
        console.log(tmp);
        
        if(tmp[0] == name){
            return tmp[1];
        }
    }
    return -1;
};
//修改文章信息发生提交行为  点击修改按钮的时候
$('#parentBox').on('submit','#modifyForm',function(){
    //获取表单中输入的内容
    const formData = $(this).serialize();
    // 返回指定属性的值 ID
    const  id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:`/posts/${id}`,
        data:formData,
        success: function(){
            location.href = 'admin/posts.html'
        }
    })
    return false;
})