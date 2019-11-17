//向服务器请求文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success: function(response){
        console.log(response);
        const html = template('postsTpl',response);
        $('#postsBox').html(html);
        const page = template('pageTpl',response);
    }
});

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear()+'-'+ (date.getMonth()+1)+'-' +date.getDate()
};

function changePage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page,
        },
        success: function (response) {
            const html = template('postsTpl', response);
            $('#postsBox').html(html);
            const page = template('pageTpl', response);
          }
    })
};
// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
      console.log(response)
      var html = template('categoryTpl', {
        data: response
      });
      $('#categoryBox').html(html);
    }
  });
//进行筛选
$('#filterForm').on('submit',function(){
    const formData = $(this).serialize();

    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success: function (response) {
            const html = template('postsTpl', response);
            $('#postsBox').html(html);
            const page = template('pageTpl', response);
          }
    });
    return false;
})