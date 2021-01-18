console.log("Flappy Bird");

const sprites = new Image();
sprites.src = "sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

//código para cenário
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenho() {
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
  }
};

//código para desenhar o chão
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenho() {
    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY,
      chao.largura,
      chao.altura,
      chao.x,
      chao.y,
      chao.largura,
      chao.altura
    );

    contexto.drawImage(
      //redesenha o chão, porém completa a lacuna do lado direito
      sprites,
      chao.spriteX,
      chao.spriteY,
      chao.largura,
      chao.altura,
      chao.x + chao.largura,
      chao.y,
      chao.largura,
      chao.altura
    );
  }
};

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  desenho() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX,
      flappyBird.spriteY, //posição em x e y
      flappyBird.largura,
      flappyBird.altura, //recorte do sprite
      flappyBird.x,
      flappyBird.y,
      flappyBird.largura,
      flappyBird.altura
    );
  }
};

function loop() {
  flappyBird.desenho();
  chao.desenho();
  requestAnimationFrame(loop);
}

loop();
