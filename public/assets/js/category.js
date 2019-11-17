//添加分类 发生提交行为的时候
$('#addCategory').on('submit',function(){
    const formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
});

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
      // 将服务器端返回的数据和HTML模板进行拼接
      const html = template('categoryListTpl', {
        data: response
      });
      // 将拼接好的内容放到页面中
      $('#categoryBox').html(html);
    }
  });
  
  // 为编辑按钮添加点击事件
  $('#categoryBox').on('click', '.edit', function () {
    // 获取要修改的分类数据的id
    const id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
      type: 'get',
      url: `/categories/${id}`,
      success: function (response) {
        console.log(response)
        const html = template('modifyCategoryTpl', response);
        $('#formBox').html(html);
      }
    })
  });
//编辑按钮发生提交行为
  $('#formBox').on('submit','#modifyCategory',function(){
      const formData = $(this).serialize();
      const id = $(this).attr('data-id');
      $.ajax({
          type:'put',
          url:`/categories/${id}`,
          data:formData,
          success: function(){
            location.reload();
          }
      })
      return  false;
  });

  //删除功能
  $('#categoryBox').on('click','.delete',function(){
      if(confirm('你确定要执行删除操作吗')){
          const id =$(this).attr('data-id');

          $.ajax({
              type:'delete',
              url:`/categories/${id}`,
              success: function(){
                  location.reload();
              }
          })
      }
  })
