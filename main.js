import GameController from "./game-controller.js";

const canvas = document.getElementById('canvas');

const controller = new GameController(canvas);
controller.runGame();

