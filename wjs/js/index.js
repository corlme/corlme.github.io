// jQuery实现轮播图滑动功能
$(function() {
   banner();

   // 设置轮播图切换时间
    $('.carousel').carousel({
           interval: 2000
    });

    // 动态设置ul的宽度
    setWidth();
   // 给轮播图绑定触屏事件
   //  触屏开始
   //   获取触屏开始的x坐标值
   //  触屏移动
   //    获取移动后的x坐标值
   //    计算距离差
   //    根据距离差让图片移动
   //  触屏结束
   //    判断上一张 还是下一张

    // 触屏轮播图的函数
    function banner() {
        // 定义变量存储数据
        var startX = 0;
        var moveX = 0;
        var distanceX = 0;

        // 给banner绑定事件、
        $(".wjs-banner").on("touchstart", function (e) {

            // 开始触屏滑动之前 暂停定时器
            $('.carousel').carousel('pause');

            console.log(e);
            startX = e.originalEvent.targetTouches[0].clientX;
            // console.log(startX);
        });

        $(".wjs-banner").on("touchmove", function (e) {
            moveX = e.originalEvent.targetTouches[0].clientX;
            distanceX = moveX - startX;
        });

        $(".wjs-banner").on("touchend", function () {
            if(distanceX > 0) {
                // 上一张
                // 调用插件bootstrap的方法 上一张
                $('.carousel').carousel('prev');
            }
            if(distanceX < 0) {
                // 下一张
                // 调用插件bootstrap的方法 下一张
                $('.carousel').carousel('next');
            }

            // 数据重置
             startX = 0;
             moveX = 0;
             distanceX = 0;

             // 开启自动轮播
            $(".carousel").carousel('cycle');

        });
    }

    // 设置ul的宽度
    function setWidth(){
        var width = 0;
        // 遍历li 然后相加
        $(".wjs-product .product-taps li").each(function(i, e){
            // outerWidth(true)：获取元素的所有宽度（包括padding border margin）
            width += $(this).outerWidth(true); // 累加li的宽度
        });
        // 赋值给ul
        $(".wjs-product .product-taps").width(width);
    }

});
