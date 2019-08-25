;(function() {
  function Game() {
    this.food = new Food()
    this.snake = new Snake()
  }
  Game.prototype.start = function() {
    // 1、让食物和蛇渲染出来
    this.food.render()
    this.snake.render()
    // 2、让蛇动起来
    var timeId = setInterval(
      function() {
        this.snake.move()
        // 3、判断蛇是否撞墙了
        var maxX = map.offsetWidth / this.snake.width - 1
        var maxY = map.offsetHeight / this.snake.height - 1
        // 判断蛇头是否超出了地图
        var head = this.snake.body[0]
        if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
          alert('Game Over!')
          clearInterval(timeId)
          return
        }
        // 4、蛇吃到食物，让食物重新渲染，蛇变长
        // 4.1 获取蛇头的坐标，判断蛇头是否和食物坐标重合
        var x = this.snake.body[0].x * this.snake.width
        var y = this.snake.body[0].y * this.snake.height
        if (this.food.x == x && this.food.y == y) {
          this.food.render()
          // 让蛇变长(获取原来蛇的最后一节，赋值给新蛇添加上来的最后一节)
          var last = this.snake.body[this.snake.body.length - 1]
          this.snake.body.push({
            x: last.x,
            y: last.y,
            col: last.col
          })
        }
        this.snake.render()
      }.bind(this),
      150
    )
    // 3、给蛇注册键盘事件
    document.onkeydown = function(e) {
      // console.log(e.keyCode)
      switch (e.keyCode) {
        case 37:
          if (this.snake.direction === 'right') break
          this.snake.direction = 'left'
          break
        case 38:
          if (this.snake.direction === 'bottom') break
          this.snake.direction = 'top'
          break
        case 39:
          if (this.snake.direction === 'left') break
          this.snake.direction = 'right'
          break
        case 40:
          if (this.snake.direction === 'top') break
          this.snake.direction = 'bottom'
      }
    }.bind(this)
  }
  window.Game = Game
})()
