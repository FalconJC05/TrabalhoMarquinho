const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

//Configuração do jogo
const GRAVIDADE = 0.6;
const CHAO_Y = canvas.height - 20; //Posição y do chão
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
    constructor(x, largura, altura) {
        this.x = x;
        this.largura = largura;
        this.altura = altura;
        this.y = CHAO_Y;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - this.altura, this.largura, this.altura);
    }

    update() {
        // Move o obstáculo para a esquerda baseado na velocidade do jogo
        this.x -= velocidadeJogo;
    }
}

// Lógica de Geração de Obstáculos (função de nível superior)
function gerarObstaculo() {
    const minLargura = 10;
    const maxLargura = 30;
    const largura = Math.random() * (maxLargura - minLargura) + minLargura;

    const minAltura = 20;
    const maxAltura = 50;
    const altura = Math.random() * (maxAltura - minAltura) + minAltura;

    const novoObstaculo = new Obstaculo(canvas.width, largura, altura);
    obstaculos.push(novoObstaculo);
}

// Função Principal do Jogo
function gameLoop() {
    if (!estaJogando) return;

    //1.Limpa o Canvas a cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2.Atualiza e Desenha o Personagem
    player.update();
    player.draw();

    //3.Atualiza, Desenha e Remove Obstáculos
    for (let i = obstaculos.length - 1; i >= 0; i--) {
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

        // Remove se saiu da tela
        if (obs.x + obs.largura < 0) {
            obstaculos.splice(i, 1);
        }
    }

    //5. Geração de Obstáculos (usa frameCount pra um timing de geração)
    frameCount++;
    const spawnInterval = Math.max(10, Math.floor(100 / (velocidadeJogo / VELOCIDADE_INICIAL)));
    if (frameCount % spawnInterval === 0) {
        gerarObstaculo();
    }

    //6. Pontuação e Aumento de Velocidade
    pontuacao++;
    scoreDisplay.textContent = `Pontuacao: ${pontuacao}`;

    //Aumenta a velocidade do jogo a cada 500 pontos
    if (pontuacao > 0 && pontuacao % 500 === 0) {
        velocidadeJogo += 0.5;
    }

    // Chama o loop do jogo novamente (ideal para animações)
    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
function startGame() {
    if (estaJogando) return;

    // Reseta o estado
    estaJogando = true;
    pontuacao = 0;
    velocidadeJogo = VELOCIDADE_INICIAL;
    obstaculos = [];
    player.y = CHAO_Y;
    player.vy = 0;
    player.isJumping = false;
    messageDisplay.style.display = 'none';

    // Inicia o Loop
    frameCount = 0;
    gameLoop();
}

// Finaliza o jogo
function gameOver() {
    estaJogando = false;
    messageDisplay.textContent = `Fim de jogo! Pontuação Final: ${pontuacao}. Pressione ESPAÇO ou Toque para Recomeçar.`;
    messageDisplay.style.display = 'block';

    // Desenha o personagem na cor da morte (na posição atual)
    ctx.fillStyle = 'grey';
    ctx.fillRect(player.x, player.y - player.altura, player.largura, player.altura);
}

// --- Controles ---
// 1. Teclado (Para Desktop)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        player.jump();
    }
});

// 2. toque/ clique (para Mobile e Desktop)
// Clique do mouse
document.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
        player.jump();
    }
});

// Toque na tela
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        player.jump();
    }
    // prevenindo comportamento padrão (scroll)
    e.preventDefault();
}, { passive: false });

// Mensagem inicial 
messageDisplay.style.display = 'block';

// Desenha o personagem em estado inicial (antes do start)
player.draw();