// 封装触屏点击事件
// 创建一个命名空间(不会全局污染，属于自己的代码空间，跟比人不会重复)
var itcast = {
  tap: function (selector, callback) {
    //  获取要绑定事件的元素
    var box = document.querySelector(selector || 'body');

    var isMove = false;  //是否触屏移动
    var startTime = 0    //触屏的起始时间

    box.addEventListener('touchstart', function () {
      startTime = Date.now()
    })

    box.addEventListener('touchmove', function () {
      isMove = true;
    })

    box.addEventListener('touchend', function (e) {
      var distance = Date.now() - startTime
      if(!isMove&&distance < 150){
          // 满足点击事件的条件  执行回调函数
          callback&&callback.call(box,e); //如果callback存在就执行callback()
      }
    })
   
  }
}