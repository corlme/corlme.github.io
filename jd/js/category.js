
(function(){
  // 实现左侧移动端滑动
  //1- 当前手指在left上移动式，ul跟随手指移动， 
    //2-在手指松开后，判断ul的位置是否越界  最大top ： 0   最小top: left高 - ul的高

    //具体步骤：
    //触屏开始
    //   获取触屏开始Y坐标值  
    //触屏移动
    //   获取移动后坐标值
    //   计算距离差  之前ul已经移动的距离 + 距离差
    //   ul根据距离进行移动 
    //触屏结束
    //  判断ul的top值是否越界， 如果越界，通过动画进行复位；
  function left () {
    //  获取元素
    var left = document.querySelector('.c-left')
    var ul = left.querySelector('ul')
    var minTop = left.offsetHeight - ul.offsetHeight

    // 定义变量 储存数据
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currentY = 0;
    // 给left绑定触屏事件
    left.addEventListener('touchstart', function(e){
       startY = e.targetTouches[0].clientY;
    })

    left.addEventListener('touchmove', function(e){
       moveY = e.targetTouches[0].clientY;
       distanceY = moveY - startY
      // 移动的时候 去除过渡效果
      ul.style.transition = 'none'
      // ul跟随距离差移动
      ul.style.transform = 'translateY('+ (currentY + distanceY) +'px)'
    })

    left.addEventListener('touchend', function(e){
      // 触屏结束后，更新最近ul的坐标值
      currentY += distanceY;
      // 判断滑动是否达到临界点
      if(currentY > 0){
        currentY = 0
      }
      if(currentY < minTop){
        currentY = minTop
      }
      // 添加过渡
      ul.style.transition = 'transform 0.3s'
      // ul复位
      ul.style.transform = 'translateY('+ currentY +'px)'
    })

  }
  
  left()

  // 右侧滚动，利用滚动插件 iScroll
  var myScroll = new IScroll('.c-right');

  // myScroll()


})()