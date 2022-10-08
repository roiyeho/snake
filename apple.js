import Snake from "./snake.js"

class Apple {
  #ctx
  #gridSize
  #boardWidth
  #boardHeight  
  #image
  #position

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {*} gridSize 
   * @param {*} boardWidth 
   * @param {*} boardHeight 
   * @param {Snake} snake 
   */
  constructor(ctx, gridSize, boardWidth, boardHeight) {
    this.#ctx = ctx;
    this.#gridSize = gridSize;
    this.#boardWidth = boardWidth;
    this.#boardHeight = boardHeight;    
    this.#loadImage();    
  }

  #loadImage() {
    this.#image = new Image();
    this.#image.src = 'apple.png';
    this.#image.onload = () => {
      this.draw();
    };
  }

  /**
   * 
   * @param {Snake} snake 
   */
  chooseRandomPosition(snake) {
    let x = this.#getRandomInt(this.#boardWidth);
    let y = this.#getRandomInt(this.#boardHeight);

    while (snake.body.find(unit => unit.x === x && unit.y === x)) {
      x = this.#getRandomInt(this.#boardWidth);
      y = this.#getRandomInt(this.#boardHeight);
    }

    this.#position = { x, y };
  }

  #getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  draw() {    
    this.#ctx.drawImage(this.#image, this.#gridSize * this.#position.x, this.#gridSize * this.#position.y,
      this.#gridSize, this.#gridSize);
  }

  get position() {
    return this.#position;
  }
}

export default Apple;