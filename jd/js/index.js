// 把动态获取轮播图高度放进一个自执行函数当中（沙箱），不会被别人影响 也 不影响别人
(function() {
  // 1.动态设置轮播图高度
  // 这一步不能漏掉：表示在一进入页面就要调用一次获取高度
  // 如果没有这样一步。一进入页面是没有高度的，后面的代码就都上去了看不见了。要调整下高宽才显示出来
  setBannerHeight();
  // 2.倒计时
  downTime();
  // 3.头部滚动变色
  setHeader();
  // 4.京东快报无缝效果
  news();
  // 5.轮播图
  banner();

  // 一、1.动态设置轮播图高度
  // 由于轮播图的li标签全部定位 脱标，父盒子的高度为0
  // 并且图片自适应布局，无法设置图片的高度，遂用js动态设置高度
  function setBannerHeight() {
    // 把图片的高度赋值给父盒子ul
    document.querySelector(".jd-banner").style.height =
      document.querySelector(".jd-banner ul img").offsetHeight + "px";
  }
  // 调用浏览器的监听事件 监听图片高度的变化  resize:调整大小
  window.onresize = function() {
    setBannerHeight();
  };

  // 二、倒计时功能
  function downTime() {
    // 假设倒计时是5个小时
    var t = 5 * 60 * 60; //总计多少秒
    // 获取元素
    var spans = document.querySelectorAll(
      ".jd-seckill .time span:nth-child(odd)"
    );

    var timer = setInterval(function() {
      var h = Math.floor(t / 3600); //多少小时
      var m = Math.floor((t % 3600) / 60); // 不足1小时算分钟
      var s = t % 60; // 不足1分钟算秒

      // 转换成00:00:00的格式
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      // 让时间动态显示在span中
      spans[0].innerHTML = h;
      spans[1].innerHTML = m;
      spans[2].innerHTML = s;

      // 每更新一次时间，让t递减
      t--;
      // 判断是否越界
      if (t < 0) {
        t = 5 * 60 * 60;
      }
    }, 1000);
  }

  // 三、头部滚动变色功能
  function setHeader() {
    var banner = document.querySelector(".jd-banner");
    var header = document.querySelector(".jd-header");
    //  监听页面滚动事件
    window.addEventListener("scroll", function() {
      var top = window.pageYOffset; // 获取页面滚动的距离
      var height = banner.offsetHeight; // 获取轮播图的高度
      // 计算比值value 然后把value设置成 头部颜色的透明度
      var value = top / height;
      // 控制value值得范围，最大为1
      if (value > 1) {
        value = 1;
      }
      header.style.backgroundColor = "rgba(222,24,27, " + value + ")";
    });
  }

  // 四、京东快报无缝功能
  function news() {
    // 1.获取元素
    var ul = document.querySelector(".jd-news ul");
    // var lis = document.querySelector('.jd-news ul li')
    var lis = ul.querySelectorAll("li");
    // 2.让ul做动画：动画本质就是让一个变量发生变化，然后把这个变化值赋值给盒子的某个属性，动画就产生了
    var index = 0; // 定义一个变量
    setInterval(function() {
      index++; // 让变量变化
      // 添加过度
      ul.style.transition = "transform 0.5s";
      ul.style.webkitTransition = "transform 0.5s"; //处理兼容
      // 根据变量做动画
      ul.style.transform = "translateY(" + -index * 30 + "px)";
      ul.style.webkitTransform = "translateY(" + -index * 30 + "px)"; //处理兼容
    }, 1000);

    // 监听ul动画事件
    ul.addEventListener("transitionend", function() {
      // 在每次动画做完间隙，判断变量index是否达到零界点，如果到了最大值5 立即调回0
      if (index >= lis.length - 1) {
        index = 0; // 变量归位
        // 清除过度
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
        // ul位置复位
        ul.style.transform = "translateY(0)";
        ul.style.webkitTransform = "translateY(0)";
      }
    });
  }

  // 五、轮播功能
  // 1.定时器切换
  // 2.移动端触屏切换
  function banner() {
    var banner = document.querySelector(".jd-banner");
    var ul = banner.querySelector("ul");
    var width = banner.offsetWidth;
    var points = banner.querySelectorAll("ol li");
    var index = 1;
    // 1.定时器切换
    var timer = setInterval(turn, 2000);
    //  监听ul动画事件
    ul.addEventListener("transitionend", function() {
      //  判断index的临界点
      if (index >= 9) {
        index = 1;
        // 清除过渡
        removeTransition(); 
        // 让ul瞬间移动到真正的第一张图片
        setTranslateX(-index * width); 
      }
      if (index <= 0) {
        index = 8;
        // 清除过渡
        removeTransition()
        // 让ul位移
        setTranslateX(-index * width)
      }
      // 此时index经过重重判断，一定是合理的
      // 调用切换小圆点函数。把当前轮播图的下标传入，因为有替补的假图，所以轮播图的下标要比小圆点的下标大1
      setPoints(index - 1);
    });

    // 封装定时器
    function turn (){
      index++;
      // 添加过渡
      addTransition()
      //  根据index让轮播图动起来
      setTranslateX(-index * width)
    };

    // 添加过渡
    function addTransition () {
      ul.style.transition = "transform 0.4s";
      ul.style.webkitTransition = "transform 0.4s";  // 处理兼容
    }
    // 删除过渡
    function removeTransition () {
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";  // 处理兼容
    }
    // ul位移
    function setTranslateX (x) {
      ul.style.transform = "translate(" + x + "px)";
      ul.style.webkitTransform = "translate(" + x + "px)"; //处理兼容
    }
    // 切换小圆点功能
    function setPoints(index) {
      // 1.排他
      points.forEach(function(v, i) {
        //原生js方法 classList.add()/remove() 相当于 $('li').removeClass('current)
        v.classList.remove("current"); // 删除所有li的current类
      });
      // 2.突出显示自己(给当前li添加current类)
      points[index].classList.add("current");
    }

    //4-触屏切换轮播图
    //4-1触屏开始
    //  清除定时器    记录触点的坐标值
    //4-2触屏移动
    //  记录当前移动后坐标值
    //  计算出距离差
    //  ul跟随手移动  移动距离 = 距离差
    //4-3触屏结束
    //  判断手指移动距离是否大于屏幕宽度的1/3，如果是切换，否则不切换
    //  切换：判断上一张还是下一张
    //  判断 distanceX > 0  右滑  index--
    //      distanceX < 0   左滑  index++
    //  根据index值让轮播图移动

    // 开启定时器
    // 数据重置

    // 定义变量接收数据
    var startX = 0;
    var moveX = 0;
    var distanceX = 0; // 差值   distance：距离、间隔
    banner.addEventListener("touchstart", function(e) {
      console.log("start");
      clearInterval(timer);
      startX = e.targetTouches[0].clientX; // 获取触屏起始坐标值
    });

    banner.addEventListener("touchmove", function(e) {
      console.log("move");
      moveX = e.targetTouches[0].clientX; // 获取移动后的坐标值
      distanceX = moveX - startX; // 计算距离差
      // ul跟随手指移动。移动的距离 = 之前ul已经移动的距离 + distanceX
      // 移动之前 清除过渡
      removeTransition();
      // ul移动
      setTranslateX(-index * width + distanceX)
    });

    banner.addEventListener("touchend", function(e) {
      console.log("end");
      // 判断是否需要切换图片. 只有移动的距离大于了图片的1/3 就切换 Math.abs()绝对值
      if (Math.abs(distanceX) > width / 3) {
        //  切换 上一张？下一张？
        if (distanceX > 0) {
          index--;
        }
        if (distanceX < 0) {
          index++;
        }
      }
      // 添加过渡
      addTransition();
      // 根据index值让ul做动画
      setTranslateX(-index * width);
      // 重置数据
      startX = 0;
      moveX = 0;
      distanceX = 0;
      // 开启定时器
      timer = setInterval(turn,2000)
    });
    
    // 当浏览器窗口尺寸变化后，重新获取屏幕的宽度，让轮播图基于新的宽度进行移动
    window.addEventListener('resize', function(){
      width = banner.offsetWidth  // 重新获取banner的宽度
      // 清除过渡
      removeTransition()
      // 让ul重新移动下
      setTranslateX(-index * width)
    })



  }
})();
