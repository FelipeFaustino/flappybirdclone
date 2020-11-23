console.log('Flappy Bird');

const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird ={
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  desenho(){
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, //posição em x e y
      flappyBird.largura, flappyBird.altura, //recorte do sprite
      flappyBird.x, flappyBird.y, 
      flappyBird.largura, flappyBird.altura,
    );
  }
}

function loop(){
  flappyBird.desenho();
  requestAnimationFrame(loop);
}

loop();
