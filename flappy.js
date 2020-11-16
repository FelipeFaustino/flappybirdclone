console.log('Flappy Bird');

const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function loop(){
  contexto.drawImage(
    sprites,
    0, 0, //posição em x e y
    33, 24, //recorte do sprite
    10, 50, 
    33, 24
  );


  requestAnimationFrame(loop);
}

loop();
