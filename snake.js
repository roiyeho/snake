import Apple from "./apple.js";
import Direction from "./direction.js";

class Snake {
  static #initialSize = 5;
  static #startPos = { x: 5, y: 5 };
  static #color = 'blue';
  static MoveType = {
    INVALID: -1,
    VALID: 0,
    APPLE_EATEN: 1
  };

  static directionsDeltas = new Map([
    [Direction.RIGHT, [1, 0]],
    [Direction.DOWN, [0, 1]],
    [Direction.LEFT, [-1, 0]],
    [Direction.UP, [0, -1]]
  ]);

  #ctx
  #gridSize
  #boardWidth
  #boardHeight
  /** @type {Array} */
  #body  
  #currentDirection
  
  constructor(ctx, gridSize, boardWidth, boardHeight) {
    this.#ctx = ctx;
    this.#gridSize = gridSize;
    this.#boardWidth = boardWidth;
    this.#boardHeight = boardHeight;

    this.#createBody();
    this.#currentDirection = Direction.RIGHT;
  }

  #createBody() {
    this.#body = [];
    for (let i = 0; i < Snake.#initialSize; i++) {
      this.#body.push({ x: Snake.#startPos.x + i, y: Snake.#startPos.y });
    }
  }

  draw() {
    this.#ctx.fillStyle = Snake.#color;

    for (const unit of this.#body) {
      this.#ctx.fillRect(this.#gridSize * unit.x, this.#gridSize * unit.y, 
        this.#gridSize, this.#gridSize);
    }
  }

  /**
   * 
   * @param {Apple} apple 
   * @returns 
   */
  move(apple) {    
    const currHead = this.#body[this.#body.length - 1];
    const delta = Snake.directionsDeltas.get(this.#currentDirection);    
    const newHead = { x: currHead.x + delta[0], y: currHead.y + delta[1] };

    if (!this.#isValidPos(newHead))
      return Snake.MoveType.INVALID;

    this.#body.push(newHead);

    // Check if the apple was eaten
    if (newHead.x === apple.position.x && newHead.y === apple.position.y) {
      return Snake.MoveType.APPLE_EATEN;
    }

    this.#body.shift();
    return Snake.MoveType.VALID;
  }

  #isValidPos(pos) {
    // Check collision with the walls
    if (pos.x < 0 || pos.x >= this.#boardWidth || pos.y < 0 || pos.y >= this.#boardHeight) {
      return false;
    }

    // Check collision with itself
    if (this.#body.find(unit => unit.x === pos.x && unit.y === pos.y)) {
      return false;
    }

    return true;
  }

  changeDirection(key) {
    switch (key) {
      case 'ArrowRight':
        this.#currentDirection = Direction.RIGHT;
        break;
      case 'ArrowDown':
        this.#currentDirection = Direction.DOWN;
        break;
      case 'ArrowLeft':
        this.#currentDirection = Direction.LEFT;
        break;
      case 'ArrowUp':
        this.#currentDirection = Direction.UP;
        break;
    }
  }

  get body() {
    return this.#body;
  }
}

export default Snake;