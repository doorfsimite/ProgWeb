(function () {

  const FPS = 1;
  //  let gameDimensions = [1243, 960];
  let gameDimensions = [621.5, 480];

  //  let focoDimensions = [100, 130];
  let focoDimensions = [50, 65];

  //  let caveiraDimensions = [120, 136];
  let caveiraDimensions = [60, 68];

  //  let destruicaoDimensions = [250, 250];
  let destruicaoDimensions = [125, 125];

  let probFoco = 25;
  let reserva;
  let focos = [];
  let caveiras = [];
  let gameLoop;
  let hp = 5;
  let destruicoes = [];
  let caveiraAgendada = false;
  let totalFrames = 0;
  let tempoMinCaveira = 5000;
  let tempoMaxCaveira = 15000;
  let velocidade = 1000;

  function init() {
    placar = new Placar();
    reserva = new Reserva();
    mensagem = new Mensagem("newGame", "green");
    window.addEventListener("keydown", function (e) {
      if (e.key === 's') {
        mensagem.element.remove();
        gameLoop = setInterval(run, velocidade / FPS);
      }
    });
  }
  let pausado = false;
  window.addEventListener("keydown", function (e) {
    if (e.key === 'p') {
      window.alert("jogo pausado");
    }
  });

  class Mensagem {
    constructor(mensagem, color) {

      this.element = document.createElement("div");
      this.element.className = "caixa-de-mensagem";
      this.element.style.backgroundColor = color;
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      reserva.element.appendChild(this.element);

      let msg;
      let texto = document.createElement("h1");
      if (mensagem === "newGame") {
        msg = "Aperte S para iniciar";
        texto.style.top = "25%";
      }
      else {
        msg = "Fim de jogo, aperte S para jogar novamente";
        texto.style.top = "15%";
      }


      texto.className = "mensagem";
      texto.textContent = msg;
      texto.style.fontSize = "64px";
      texto.style.color = "white";
      this.element.appendChild(texto);



    }
  }


  class Reserva {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;


      // let agua = document.createElement("div");
      // agua.style.color = "red";
      // agua.style.backgroundColor = "red";
      // agua.style.zIndex = '5';
      // agua.style.position = 'absolute';
      // agua.style.width = `140px`;
      // agua.style.height = `240px`;
      // agua.style.left = `0px`;
      // agua.style.top = `240px`;
      // this.element.appendChild(agua);

      document.body.appendChild(this.element);
    }
  }

  function forbidenArea(x, y) {
    let areas = [[280, 630, -9999, 130], [-99999, 160, 200, 480]];
    for (let index = 0; index < areas.length; index++) {
      const element = areas[index];
      if (x > element[0] && x < element[1] && y > element[2] && y < element[3]) {
        return true;
      }
    }
    return false;

  }


  class FocoIncendio {

    constructor() {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      while (true) {
        this.x = Math.floor((Math.random() * (gameDimensions[0] - focoDimensions[0])));
        this.y = Math.floor((Math.random() * (gameDimensions[1] - focoDimensions[1])));
        if (!forbidenArea(this.x, this.y)) {
          console.log("x: ",this.x," y ",this.y);
          break;
        }
      }
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;//`${topDistance - (focos.length * focoDimensions[1])}px`;
      reserva.element.appendChild(this.element);

      let getElemento = this.element;
      this.explosion = new Promise(function (resolve) {

        getElemento.onclick = function (event) {
          //          focos.shift();
          event.target.remove();
          resolve(false);
        };
        window.setTimeout(function () { resolve(true) }, 2000);
      });
    }
  }

  class Caveira {

    constructor() {
      this.element = document.createElement("div");
      this.element.className = "caveira";
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;
      while (true) {
        this.x = Math.floor((Math.random() * (gameDimensions[0] - focoDimensions[0])));
        this.y = Math.floor((Math.random() * (gameDimensions[1] - focoDimensions[1])));
        if (!forbidenArea(this.x, this.y)) {
          break;
        }
      }
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;//`${topDistance - (focos.length * focoDimensions[1])}px`;
      reserva.element.appendChild(this.element);


      let getElemento = this.element;
      this.explosion = new Promise(function (resolve) {

        getElemento.onclick = function (event) {
          //          focos.shift();
          event.target.remove();
          resolve(false);
        };
        window.setTimeout(function () { resolve(true) }, 2000);
      });
    }
  }

  class Vidas {
    receberDano(dano) {
      for (let index = 0; index < dano; index++) {
        try {
          this.element.removeChild(this.element.lastChild);
        } catch { };
      }
    }

    constructor() {
      this.element = document.createElement("div");
      this.element.className = "arvores-div";
      for (let index = 0; index < hp; index++) {
        let arvore = document.createElement("div");
        arvore.className = "arvore";
        this.element.appendChild(arvore);
      }
    }
  }
  let vidas = new Vidas();


  class Pontuacao {

    adicionarPontos(pontos) {
      let pontosAtuais = Number.parseInt(this.element.textContent);
      pontosAtuais = pontosAtuais + pontos
      let zeros = '';
      for (let index = 0; index < (5 - pontosAtuais.toString().length); index++) {
        zeros = zeros.concat("0");

      }
      this.element.textContent = zeros.concat(pontosAtuais.toString());
    }
    constructor() {
      this.element = document.createElement("h1");
      this.element.textContent = "00000";
      this.element.className = "pontuacao";
    }
  }
  let pontos = new Pontuacao();


  class Placar {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "placar";
      this.element.style.width = `${gameDimensions[0]}px`;
      let header = document.createElement("div");
      header.appendChild(this.element);
      document.body.appendChild(header);


      this.element.appendChild(vidas.element);
      this.element.appendChild(pontos.element);

    }
  }
  class Destruicao {
    constructor(grande, x, y) {
      this.element = document.createElement("div");
      this.element.className = "destruicao";
      this.element.style.width = `${grande ? destruicaoDimensions[0] + 50 : destruicaoDimensions[0]}px`;
      this.element.style.height = `${grande ? destruicaoDimensions[1] + 50 : destruicaoDimensions[1]}px`;
      this.element.style.left = `${x - (grande ? destruicaoDimensions[0] + 50 : destruicaoDimensions[0]) / 2}px`;
      this.element.style.top = `${y - (grande ? destruicaoDimensions[0] + 50 : destruicaoDimensions[0]) / 2}px`;
    }
  }

  function receberDano(dano) {
    hp = hp - dano
    vidas.receberDano(dano);

  }

  function gameover() {
    window.addEventListener("keydown", function (e) {
      if (e.key === 's' || e.key === 'S') {
        window.location.reload();
      }
    });

    clearInterval(gameLoop);
    mensagem = new Mensagem("gameOver", "red");
    return null;
  }
  function speedUp() {
    velocidade = velocidade - velocidade * 0.3;
    clearInterval(gameLoop);
    gameLoop = setInterval(run, velocidade / FPS);
  }
  function run() {

    totalFrames = totalFrames + 1;
    if (totalFrames % 60 == 0) {
      speedUp();
    }
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      foco.explosion.then(
        function (explodiu) {
          if (explodiu) {
            let destruicao = new Destruicao(false, foco.x + focoDimensions[0] / 2, foco.y + focoDimensions[1] / 2);

            reserva.element.appendChild(destruicao.element);

            foco.element.remove();
            receberDano(1);
            if (hp <= 0) {
              gameover();
            }

          }
          else {
            pontos.adicionarPontos(10);
          }
        }
      );
      focos.push(foco);
    }


    if (!caveiraAgendada) {
      caveiraAgendada = true;
      let proxCaveira = Math.floor(tempoMinCaveira + (Math.random() * tempoMaxCaveira));
      window.setTimeout(criaCaveira, proxCaveira);
    }
  }

  init();

  function criaCaveira() {
    let caveira = new Caveira();
    caveira.explosion.then(
      function (explodiu) {
        if (explodiu) {
          let destruicao = new Destruicao(true, caveira.x + caveiraDimensions[0] / 2, caveira.y + caveiraDimensions[1] / 2);
          reserva.element.appendChild(destruicao.element);
          caveira.element.remove();
          receberDano(2);
          if (hp <= 0) {
            gameover();
          }
        }
        else {
          pontos.adicionarPontos(10);
        }
      }
    );
    caveiras.push(caveira);
    caveiraAgendada = false;
  }

})();
