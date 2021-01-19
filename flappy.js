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
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

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

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x + planoDeFundo.largura,
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
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenho() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX,
      flappyBird.spriteY,
      flappyBird.largura,
      flappyBird.altura,
      flappyBird.x,
      flappyBird.y,
      flappyBird.largura,
      flappyBird.altura
    );
  }
};

const menu = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  desenho() {
    contexto.drawImage(
      sprites,
      menu.sX,
      menu.sY,
      menu.w,
      menu.h,
      menu.x,
      menu.y,
      menu.w,
      menu.h
    );
  }
};

//
// telas
//
let telaAtiva = {};
function mudaTela(novaTela) {
  telaAtiva = novaTela;
}

const telas = {
  inicio: {
    desenho() {
      planoDeFundo.desenho();
      chao.desenho();
      flappyBird.desenho();
      menu.desenho();
    },
    atualiza() {}
  }
};

telas.jogo = {
  desenho() {
    planoDeFundo.desenho();
    chao.desenho();
    flappyBird.desenho();
  },
  atualiza() {
    flappyBird.atualiza();
  }
};

function loop() {
  telaAtiva.desenho();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

mudaTela(telas.inicio);

loop();
