const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

//Configuração do jogo
const GRAVIDADE = 0.6;
const CHAO_Y = canvas.height - 20;//Posição y do chão
const VELOCIDADE_INICIAL = 5;
let velocidadeJogo = VELOCIDADE_INICIAL;
let estaJogando = false;
let pontuacao = 0;
let frameCount = 0;

//Objeto personagem(Player)
const player = {
    x: 50,
    y: CHAO_Y,
    largura: 20,
    altura: 20,
    vy: 0, // VELOCIDADE VERTICAL
    isJumping: false,

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y - this.altura, this.largura, this.altura);
    },

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.vy = -12;

            if (!estaJogando) {
                startGame();
            }
        }
    },

    update() {
        // Aplica a gravidade
        this.vy += GRAVIDADE;
        this.y += this.vy;

        // Colisão com o chão
        if (this.y >= CHAO_Y) {
            this.y = CHAO_Y;
            this.vy = 0;
            this.isJumping = false;
        }
    }
};

//Array para armazenar os obstáculos
let obstaculos = [];


//Classe para Objeto Obstáculo
class Obstaculo {
    constructor() {x, largura, altura) {
        this.x = x
        this.largura = largura;
        this.altura = altura;
        this.y = CHAO_Y;
    }

draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y - this.altura, this.largura, this.altura);
}

update() {
//Lógica de Gerção de Obstáculos
function gerarObstaculo() {
    const minLargura =10;
    const maxLargura = 30;
    const largura = Math.random() * (maxLargura - minLargura) + minLargura;

    const minAltura = 20
    const maxAltura = 50;
    const altura = Math.random() * (maxAltura - minAltura) + minAltura;

    const novoObstaculo = new Obstaculo(canvas.width, largura, altura);
    obstaculos.push(novoObstaculo);
}

//Função Principal do Jogo
function gameLoop() {
    if (!estaJogando) return;
    
    //1.Limpa o Canvas a cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //2.Atualiza e Desenha o Personagem
    player.update();
    player.draw();

    //3.Atualiza, Desenha e Romove Obstáculos
    for(let i = obstaculos.length - 1; i >= 0; i--){
        const obs = obstaculos[i];
        obs.update();
        obs.draw();
    
    //4. Deteção de Colisão
    if (
        obs.x < player.x + player.largura &&
        obs.x + obs.largura > player.x &&
        obs.y - obs.altura < player.y &&
        obs.y > player.y - player.altura
    ) {
        gameOver();
        return;
    }
    if (obs.x + obs.largura < 0) {
        obstaculos.splice(i, 1);
        i--;
    }
}