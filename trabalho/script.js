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

// Funções básicas do jogo para evitar erros adicionais
function startGame() {
    estaJogando = true;
    pontuacao = 0;
    frameCount = 0;
    messageDisplay.textContent = '';
    loop();
}

function loop() {
    frameCount++;
    // Limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Atualiza e desenha player
    player.update();
    player.draw();
    // Atualiza pontuação
    scoreDisplay.textContent = pontuacao;
    if (estaJogando) {
        requestAnimationFrame(loop);
    }
}





















