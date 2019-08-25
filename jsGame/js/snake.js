;(function() {
  var arr = []
  // 蛇的数据
  function Snake(obj) {
    var obj = obj || {}
    this.width = obj.width || 20
    this.height = obj.height || 20
    this.direction = 'right'
    this.body = [
      { x: 3, y: 2, col: 'red' },
      { x: 2, y: 2, col: '#fff' },
      { x: 1, y: 2, col: '#fff' }
    ]
  }
  // 把蛇渲染到页面的方法
  Snake.prototype.render = function() {
    for (var i = 0, leng = arr.length; i < leng; i++) {
      map.removeChild(arr[0]) // 删除页面上的div
      arr.splice(0, 1) // 删除数组的数据
    }
    this.body.forEach(
      function(item) {
        var div = document.createElement('div')
        arr.push(div)
        div.style.width = this.width + 'px'
        div.style.height = this.height + 'px'
        div.style.left = item.x * this.width + 'px'
        div.style.top = item.y * this.height + 'px'
        div.style.background = item.col
        div.style.position = 'absolute'
        map.appendChild(div)
      }.bind(this)
    )
  }
  // 蛇移动的方法
  Snake.prototype.move = function() {
    // 蛇身体
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    // 蛇头坐标根据方向改变而改变
    switch (this.direction) {
      case 'left':
        this.body[0].x -= 1
        break
      case 'right':
        this.body[0].x += 1
        break
      case 'top':
        this.body[0].y -= 1
        break
      case 'bottom':
        this.body[0].y += 1
        break
    }
  }
  window.Snake = Snake
})()
