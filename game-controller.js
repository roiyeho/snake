import Apple from "./apple.js";
import Snake from "./snake.js";

class GameController {  
  #canvas
  #ctx
  #speed
  #snake
  #apple
  #timer

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {*} gridSize 
   * @param {*} speed 
   */
  constructor(canvas, gridSize = 15, speed = 100) {  
    this.#canvas = canvas;  
    this.#ctx = canvas.getContext('2d');    
    this.#speed = speed;

    const boardWidth = Math.floor(canvas.width / gridSize);
    const boardHeight = Math.floor(canvas.height / gridSize);

    this.#snake = new Snake(this.#ctx, gridSize, boardWidth, boardHeight); 
    this.#apple = new Apple(this.#ctx, gridSize, boardWidth, boardHeight);
    this.#apple.chooseRandomPosition(this.#snake);

    this.#handleKeyboardEvents();
  }

  runGame() {
    this.#timer = setInterval(() => {
      this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
      this.#snake.draw();

      const moveType = this.#snake.move(this.#apple);
      switch (moveType) {
        case Snake.MoveType.INVALID:
          clearInterval(this.#timer);
          alert('Game over!');
          break;
        case Snake.MoveType.APPLE_EATEN:
          this.#apple.chooseRandomPosition(this.#snake);
          break;
      }       
      this.#apple.draw(); 
    }, this.#speed);  
  }  

  #handleKeyboardEvents() {
    document.addEventListener('keydown', e => {
      this.#snake.changeDirection(e.key);
    });
  }
}

export default GameController;