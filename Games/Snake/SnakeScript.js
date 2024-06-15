document.addEventListener('DOMContentLoaded', function() {
    // Create a Pixi.js application
    var app = new PIXI.Application({
      width: 610,
      height: 610,
      backgroundColor: 0x008000,
    });
  
    // Add additional styles for the app view
    app.view.style.margin = '0';
    app.view.style.position = 'absolute';
    app.view.style.top = '50%';
    app.view.style.left = '50%';
    app.view.style.transform = 'translate(-50%, -50%)';
  
    // Add the Pixi.js canvas to the HTML document
    document.getElementById('game-board').appendChild(app.view);
  
    // Define the game constants
    var gridSize = 30;
    var gridWidth = app.view.width / gridSize;
    var gridHeight = app.view.height / gridSize;
  
    // Initialize the snake and food positions
    var snake = [{ x: 5, y: 5 }];
    var food = generateFood();
  
    // Initialize the direction of the snake
    var direction = 'right';
  
    // Initialize the score
    var score = 0;
    var scoreElement = document.getElementById('score');
  
    // Initialize the game state
    var gameRunning = false;
    var gameLoopInterval;
  
    // Get the start button and game over message element
    var startButton = document.getElementById('startButton');
    var gameOverMessage = document.getElementById('gameOverMessage');
  
    // Initialize the snake graphics
    var snakeGraphics = new PIXI.Graphics();
    app.stage.addChild(snakeGraphics);
  
    // Initialize the food graphics
    var foodGraphics = new PIXI.Graphics();
    app.stage.addChild(foodGraphics);
  
    // Initialize the sounds
    var startSound = new Audio('./Sounds/start.mp3');
    var loseSound = new Audio('./Sounds/lose.mp3');
    var bonusSound = new Audio('./Sounds/bonus.wav');
  
    // Add click event listener to the start button
    startButton.addEventListener('click', startGame);
  
    // Start the game
    function startGame() {
      // Reset the snake position, direction, and score
      snake = [{ x: 5, y: 5 }];
      direction = 'right';
      score = 0;
      scoreElement.textContent = "Score: " + score;
  
      // Generate new food
      food = generateFood();
  
      // Hide the game over message
      gameOverMessage.style.display = 'none';
  
      // Hide the game title
      document.getElementById('game-title').style.display = 'none';
  
      // Show the game board
      document.getElementById('game-board').style.display = 'block';
  
      // Disable the start button
      startButton.disabled = true;
  
      // Start the game loop
      gameRunning = true;
      gameLoopInterval = setInterval(gameLoop, 1000 / 10);
  
      // Play the start sound
      startSound.play();
    }
  
    // Restart the game
    function restartGame() {
      // Stop the game loop
      clearInterval(gameLoopInterval);
  
      // Reset the game state
      gameRunning = false;
  
      // Show the game over message
      gameOverMessage.style.display = 'block';
  
      // Show the game title
      document.getElementById('game-title').style.display = 'block';
  
      // Hide the game board
      document.getElementById('game-board').style.display = 'none';
  
      // Enable the start button
      startButton.disabled = false;
    }
  
    // Game loop
    function gameLoop() {
      update();
      draw();
    }
  
    // Update the game state
    function update() {
      var head = Object.assign({}, snake[0]); // Create a copy of the head segment
  
      // Update the head segment based on the current direction
      if (direction === 'up') {
        head.y -= 1;
      } else if (direction === 'down') {
        head.y += 1;
      } else if (direction === 'left') {
        head.x -= 1;
      } else if (direction === 'right') {
        head.x += 1;
      }
  
      // Add the new head segment to the snake
      snake.unshift(head);
  
      // Check if the snake eats the food
      if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // Generate new food
        score++; // Increment the score
        scoreElement.textContent = "Score: " + score; // Update the score display
        bonusSound.play(); // Play the bonus sound
      } else {
        snake.pop(); // Remove the tail segment of the snake
      }
  
      // Check if the snake hits itself or the wall
      if (checkSelfCollision() || checkWallCollision()) {
        loseSound.play(); // Play the lose sound
        restartGame();
      }
    }
  
    // Draw the game state
    function draw() {
      // Clear the canvas
      snakeGraphics.clear();
      foodGraphics.clear();
  
      // Draw the snake
      snakeGraphics.beginFill(0x00ff00);
      for (var i = 0; i < snake.length; i++) {
        var segment = snake[i];
        snakeGraphics.drawRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      }
      snakeGraphics.endFill();
  
      // Draw the food
      foodGraphics.beginFill(0xff0000);
      foodGraphics.drawRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
      foodGraphics.endFill();
    }
  
    // Check if the snake hits itself
    function checkSelfCollision() {
      var head = snake[0];
      for (var i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          return true;
        }
      }
      return false;
    }
  
    // Check if the snake hits the wall
    function checkWallCollision() {
      var head = snake[0];
      if (head.x < 0 || head.y < 0 || head.x >= gridWidth || head.y >= gridHeight) {
        return true;
      }
      return false;
    }
  
    // Generate a random position for the food
    function generateFood() {
      var x = Math.floor(Math.random() * gridWidth);
      var y = Math.floor(Math.random() * gridHeight);
      return { x: x, y: y };
    }
  
    // Handle keydown event to change the direction of the snake
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 37 && direction !== 'right') {
        direction = 'left';
      } else if (event.keyCode === 38 && direction !== 'down') {
        direction = 'up';
      } else if (event.keyCode === 39 && direction !== 'left') {
        direction = 'right';
      } else if (event.keyCode === 40 && direction !== 'up') {
        direction = 'down';
      }
    });
  });
  