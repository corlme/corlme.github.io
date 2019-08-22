(function() {
  var dels = document.querySelectorAll(".del");
  var winBox = document.querySelector(".win-box");
  var delBox = document.querySelector(".del-box");
  var cancel = document.querySelector(".cancel");

  // // 因为del垃圾桶有很多，所有需要遍历 然后每一个都添加点击事件
  // dels.forEach(function(v, i) {
  //   v.addEventListener("click", function() {
  //     // 模态框出现
  //     winBox.style.display = "block";
  //     // 桶盖打开
  //     this.classList.add("open");
  //     // 让删除的盒子做动画
  //     delBox.classList.add("animated");
  //     delBox.classList.add("bounceInDown");
  //   });
  // });

  // // 点击取消按钮
  // cancel.addEventListener("click", function() {
  //   //  隐藏模态框
  //   winBox.style.display = "none";
  //   // 关闭桶盖 找到有 opan类的盒子，删除opan
  //   document.querySelector(".open").classList.remove("open");
  // });
  itcast.tap('.cancel', function () {
    winBox.style.display = 'none'; //模态框隐藏
    //找open类名的盒子 ，删除open类名
    document.querySelector('.open').classList.remove('open');
})

itcast.tap('.del', function () {        
   // 模态框出现
   winBox.style.display = 'block';
   //让删除盒子做用动画
   delBox.classList.add('animated');
   delBox.classList.add('bounceInDown');
   console.log(this);  // this --> window        
   //桶盖打开 
   this.classList.add('open');
})


})();
