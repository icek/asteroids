import { asteroids } from './Asteroids';

window.addEventListener('load', async function() {
  const canvas = document.getElementById('game');
  if(!canvas) {
    return;
  }

  await asteroids(canvas);
});
