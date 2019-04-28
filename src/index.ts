import { Asteroids } from './Asteroids';

window.addEventListener('load', () => {
  const canvas = document.getElementById('game');
  if(!canvas) {
    return;
  }

  const asteroids = new Asteroids(canvas, canvas.clientWidth, canvas.clientHeight);
  asteroids.start();
});
