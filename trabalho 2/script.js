//Referências aos elementos HTML
const palpiteInput = document.getElementById('palpiteInput');
const enviartBtn = document.getElementById('enviarBtn');
const tentativasAnteriores = document.getElementById('tentativasAnteriores');
const ultimoResultado = document.getElementById('ultimoResultado');
const restantesDisplay = document.getElementById('restantes');
const gameArea = document.querySelector('.game-area');

//Variáveis de Estado do Jogo
let numeroAlearorio;
let contagemPalpites = 1;
let historicoPalpiets = [];

//Função para iniciar ou reiniciar o jogo
function iniciarJogo() {
    //1. Gera um número aleatório entre 1 e 100
    numeroAlearorio = Math.floor(Math.random() * 100) + 1;

    //2. Reseta o estado do jogo
    contagemPalpites = 1;
    historicoPalpiets = [];

    //3. Reseta a interface
    tentativasAnteriores.textContent = 'Tentativas anteriores: ';
    ultimoResultado.textContent = 'Aguardando palpite...';
    ultimoResultado.style.backgroundColor = 'transparent';
    restantesDisplay.textContent = 'Tentativas restantes: 10';

//4. Remove o botão de reiniciar, se existir
const reiniciarBtn = document.getElementById('reiniciarBtn');
if (reiniciarBtn) {
    reiniciarBtn.remove();
    }
//5. Habilita os controles 
enviartBtn.disabled = false;
palpiteInput.disabled = false;
palpiteInput.value = '';//Limpa o campo

//Adiciona o listener de novo para enviar múltiplos binds ao reiniciar
enviartBtn.addEventListener('click', verificarPalpite), {once:true};
}

//Função principal de verificação do palpite
function verificarPalpite() {
    const palpiteUsuario = Number(palpiteInput.value);

    //Validação básica
    if (palpiteUsuario < 1 || palpiteUsuario > 100 || isNaN(palpiteUsuario)) {
        alert('Por favor, insira um número válido entre 1 e 100.');
        //Re-adciona o litener pois o 'once:true' o removeu
        enviartBtn.addEventListener('click', verificarPalpite, {once:true});
        return;
    }
//1. Registra a tentativa
historicoPalpites.push(palpiteUsuario);
tentativasAnteriores.textContent = 'Tentativas anteriores: ' + historicoPalpiets.join(', ');

//2. Verifica o resultado
if (palpiteUsuario === numeroAlearorio) {
    //ACERTOU
    ultimoResultado.textContent = 'Parabéns! Você acertou!';
    ultimoResultado.style.backgroundColor = '#d4edda';//Verde claro
    finalizarJogo();
} else if (contagemPalpites === 10) {
    //Esgotou as tentativas
    ultimoResultado.textContent = `Fim de jogo! O número secreto era:
    ${numeroAlearorio}.`;
    ultimoResultado.style.backgroundColor = '#f0dada';
    finalizarJogo();
} else {
    //TENTATIVA ERRADA
    if (palpiteUsuario < numeroAlearorio) {
        ultimoResultado.textContent = 'Errado! O número é maior.';
    } else {
        ultimoResultado.textContent = 'Errado! O número é menor.';
    }
    ultimoResultado.style.backgroundColor = '#fff3cd';//Amarelo claro

contagemPalpites++;
restantesDisplay.textContent = `Tentativas restantes: ${11 - contagemPalpites}`;

//Mantém o loop de jogo permitido a próxima tentaiva
enviartBtn.addEventListener('click', verificarPalpite, {once:true});
}

palpiteInput.value = '';//Limpa o campo
palpiteInput.focus();//Foca no campo para nova digitação


//Função para desativar controles e adcionar botão de reiniciar
function finalizarJogo() {
    enviartBtn.disabled = true;
    palpiteInput.disabled = true;

    //Cria o botão de reiniciar
    const reiniciarBtn = document.createElement('button');
    reiniciarBtn.id = 'reiniciarBtn';
    reiniciarBtn.textContent = 'Iniciar Novo Jogo';
    gameArea.appendChild(reiniciarBtn);

    reiniciarBtn.addEventListener('click', iniciarJogo);
}

//Inicia o jogo ao carregar a página
iniciarJogo();

    scoreDisplay.textContent= `Pontuacao: ${pontuacao}`;
}

    //Aumenta a velocidade do jogo a cada 500 pontos
    if (pontuacao % 500 === 0) {
        velocidadeJogo += 0.5;
    }
