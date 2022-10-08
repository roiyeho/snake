import GameController from "./game-controller.js";

const canvas = document.getElementById('canvas');
const btnPlay = document.getElementById('btnPlay');
const btnRestart = document.getElementById('btnRestart');
const btnPause = document.getElementById('btnPause');
const btnResume = document.getElementById('btnResume');
const scoreLabel = document.getElementById('score');

const controller = new GameController(canvas, scoreLabel);

btnPlay.addEventListener('click', () => {
  controller.startGame();
  btnPlay.hidden = true;
  btnRestart.hidden = false;
});

btnRestart.addEventListener('click', () => {
  controller.restartGame();
});

btnPause.addEventListener('click', () => {
  controller.pauseGame();
  btnPause.hidden = true;
  btnResume.hidden = false;
});

btnResume.addEventListener('click', () => {
  controller.resumeGame();
  btnPause.hidden = false;
  btnResume.hidden = true;
});


