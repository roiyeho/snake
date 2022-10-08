import Apple from "./apple.js";
import Snake from "./snake.js";

class GameController {  
  #canvas
  #ctx
  #scoreLabel
  #gridSize
  #speed
  #score  
  #boardWidth
  #boardHeight  
  #snake
  #apple
  #timer
  #allowPressKeys

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {HTMLSpanElement} scoreLabel
   * @param {*} gridSize 
   * @param {*} speed 
   */
  constructor(canvas, scoreLabel, gridSize = 15, speed = 100) {  
    this.#canvas = canvas;  
    this.#ctx = canvas.getContext('2d');
    this.#scoreLabel = scoreLabel;
    this.#gridSize = gridSize;
    this.#speed = speed;    
    this.#boardWidth = Math.floor(canvas.width / gridSize);
    this.#boardHeight = Math.floor(canvas.height / gridSize);    
  }

  startGame() {
    this.#snake = new Snake(this.#ctx, this.#gridSize, this.#boardWidth, this.#boardHeight); 
    this.#apple = new Apple(this.#ctx, this.#gridSize, this.#boardWidth, this.#boardHeight);
    this.#apple.chooseRandomPosition(this.#snake);

    this.#snake.draw();
    this.#apple.draw(); 
    this.#handleKeyboardEvents();
    this.#resetScore();
    
    this.#timer = setInterval(() => { 
      this.#runGame(); 
    }, this.#speed);  
    this.#allowPressKeys = true;
  }

  #runGame() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    const moveType = this.#snake.move(this.#apple);
    switch (moveType) {
      case Snake.MoveType.INVALID:
        this.#gameOver();          
        return;        
      case Snake.MoveType.APPLE_EATEN:
        this.#apple.chooseRandomPosition(this.#snake);
        this.#updateScore();
        break;
    }       

    this.#snake.draw();
    this.#apple.draw(); 
  }

  restartGame() {
    this.pauseGame();       
    this.startGame();
  }

  pauseGame() {
    clearInterval(this.#timer);
    this.#allowPressKeys = false;
  }

  resumeGame() {
    this.#timer = setInterval(() => { 
      this.#runGame(); 
    }, this.#speed);
    this.#allowPressKeys = true;
  }

  #handleKeyboardEvents() {
    document.addEventListener('keydown', e => {
      if (!this.#allowPressKeys) {
        return;
      }
      this.#snake.changeDirection(e.key);
    });
  }

  #updateScore() {
    this.#score++;
    this.#scoreLabel.textContent = this.#score;
  }

  #gameOver() {
    clearInterval(this.#timer);    
    alert(`Game over. Your score was ${this.#score}`);
    this.#resetScore();
  }

  #resetScore() {
    this.#score = 0;
    this.#scoreLabel.textContent = this.#score;
  }  
}

export default GameController;