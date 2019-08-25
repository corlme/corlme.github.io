;(function() {
  var container // 用于存储食物
  // 食物的代码
  function Food(obj) {
    obj = obj || {}
    this.width = obj.width || 20
    this.height = obj.height || 20
    this.bgc = obj.bgc || '#fff'
    this.x = obj.x || 0
    this.y = obj.y || 0
  }
  // 把食物渲染在页面上的方法
  Food.prototype.render = function() {
    if (container) {
      map.removeChild(container)
    }
    var div = document.createElement('div')
    container = div
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.bgc
    div.style.borderRadius = '2px'
    // 规定食物独占一格
    // 水平方向 0~39的随机整数 * 盒子的宽度
    // 垂直方向 0~29的随机整数 * 盒子的高度
    this.x = Tool.getRandom(0, map.offsetWidth / this.width - 1) * this.width
    this.y = Tool.getRandom(0, map.offsetHeight / this.height - 1) * this.height
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    div.style.position = 'absolute'
    map.appendChild(div)
  }
  window.Food = Food
})()
