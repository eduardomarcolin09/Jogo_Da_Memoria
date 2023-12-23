// Função para criar um tabuleiro de memória com pares de números
const criarTabuleiro = (quantidadePares = 8) => {
    if (quantidadePares % 2 === 1) {
        console.log("A quantidade de pares deve ser par!")
        return
    }

    const tabuleiro = []

    let contador = 0
    while (contador < quantidadePares * 2) {
        const numeroAleatorio = Math.ceil(Math.random() * quantidadePares)
        
        // Garante que cada número aparece no máximo duas vezes no tabuleiro
        if (tabuleiro.filter(x => x === numeroAleatorio).length >= 2) {
            continue
        }

        tabuleiro.push(numeroAleatorio)
        contador++
    }

    return tabuleiro
}

// Definição de jogadores
const jogadores = ['Jogador 1', 'Jogador 2']
const placares = []
let jogadorAtual = 0
let jogadas = []
let bloquearJogo = false

// Elemento HTML para exibir jogadores
const divJogadores = document.getElementById('jogadores')

// Inicialização dos jogadores
jogadores.forEach((nomeJogador, index) => {
    const span = document.createElement('span')
    span.innerHTML = nomeJogador
    
    const placar = document.createElement('i')
    placar.innerHTML = '0'
    placares.push(placar)
    
    span.appendChild(placar)
    divJogadores.appendChild(span)
})

// Adição de classe para indicar o jogador ativo
const spansJogadores = Array.from(divJogadores.children)
spansJogadores[jogadorAtual].classList.add('jogadorAtivo')


// Criação do tabuleiro e vinculação ao elemento HTML
const tabuleiro = criarTabuleiro()
const divTabuleiro = document.getElementById('tabuleiro')

tabuleiro.forEach(numero => {
    const botao = document.createElement('button')
    botao.setAttribute('type', 'button')
    
    botao.addEventListener('click', () => {
        if (bloquearJogo) return

        botao.innerHTML = numero
        
        // Evita clique duplo no mesmo botão
        if (jogadas.some(jogada => jogada === botao)) return
        jogadas.push(botao)

        if (jogadas.length === 2) {
            bloquearJogo = true

            if (jogadas[0].innerHTML === jogadas[1].innerHTML) {
                // Pontuação e desativação de botões em caso de acerto
                placares[jogadorAtual].innerHTML = parseInt(placares[jogadorAtual].innerHTML) + 1
                jogadas[0].disabled = true
                jogadas[1].disabled = true
                bloquearJogo = false

                // Verificação de fim de jogo
                const pontuacaoJogador1 = parseInt(placares[0].innerHTML)
                const pontuacaoJogador2 = parseInt(placares[1].innerHTML)

                if (pontuacaoJogador1 + pontuacaoJogador2 === tabuleiro.length / 2) {
                    if (pontuacaoJogador1 > pontuacaoJogador2) {
                        alert('Jogador 1 venceu')
                    } else if (pontuacaoJogador1 < pontuacaoJogador2) {
                        alert('Jogador 2 venceu')
                    } else {
                        alert('O jogo terminou empatado!')
                    }
                }

                console.log('Você acertou!')
                jogadas = []
            } else {
                // Tratamento de erro e troca de jogador em caso de erro
                console.log('Você errou!')
                jogadorAtual = (jogadorAtual + 1) % jogadores.length
                spansJogadores.forEach(span => span.classList.remove('jogadorAtivo'))
                spansJogadores[jogadorAtual].classList.add('jogadorAtivo')

                // Limpa os botões após um intervalo
                setTimeout(() => {
                    jogadas.forEach(botao => botao.innerHTML = "")
                    jogadas = []
                    bloquearJogo = false
                }, 1000)
            }
        }
    })

    divTabuleiro.appendChild(botao)
})

