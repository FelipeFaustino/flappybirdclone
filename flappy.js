console.log("Flappy Bird");

const som_HIT = new Audio();
som_HIT.src = "./efeitos/hit.wav";

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

function colisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function novoFlappy() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log("devo pular");
      console.log("[antes]", flappyBird.velocidade); //demonstração
      flappyBird.velocidade = -flappyBird.pulo;
      console.log("[depois]", flappyBird.velocidade); //demonstração
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (colisao(flappyBird, chao)) {
        console.log("fez colisao");
        som_HIT.play();

        setTimeout(() => {
          mudaTela(telas.inicio);
        }, 500);
        mudaTela(telas.inicio);
        return;
      }

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
  return flappyBird;
}

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
const globais = {};
let telaAtiva = {};
function mudaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  inicio: {
    inicializa() {
      globais.flappyBird = novoFlappy();
    },
    desenho() {
      planoDeFundo.desenho();
      chao.desenho();
      globais.flappyBird.desenho();
      menu.desenho();
    },
    click() {
      mudaTela(telas.jogo);
    },
    atualiza() {}
  }
};

telas.jogo = {
  desenho() {
    planoDeFundo.desenho();
    chao.desenho();
    globais.flappyBird.desenho();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.flappyBird.atualiza();
  }
};

function loop() {
  telaAtiva.desenho();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaTela(telas.inicio);

loop();
