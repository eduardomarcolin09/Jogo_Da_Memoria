let primeiroClique = true

// Função para criar um tabuleiro de memória com pares de números
function criarTabuleiro(quantidadePares = 8) {
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
let jogadores = ['Jogador 1', 'Jogador 2']
const placares = []
let jogadorAtual = 0
let jogadas = []
let bloquearJogo = false

const divJogadores = document.getElementById('jogadores')

// Função para editar o nome do jogador
function editarNomeJogador(indice) {
    if (!primeiroClique) return

    let novoNome = prompt('Digite o novo nome do jogador:')

    // Verifica se o novo nome não está vazio ou contém apenas espaços em branco
    while (novoNome !== null && novoNome.trim() === "") {
        novoNome = prompt('O nome não pode estar vazio. Digite o novo nome do jogador:')
    }

    if (novoNome !== null) {
        jogadores[indice] = novoNome
        spansJogadores[indice].firstChild.nodeValue = novoNome
    }
}

// Função pra desabilitar o botão de edição após o primeiro click no tabuleiro
function desabilitarBotaoEdicao() {
    const iconesEdicao = document.querySelectorAll('.fas.fa-pencil-alt')
    iconesEdicao.forEach(iconeEdicao => {
        iconeEdicao.style.display = 'none'
    })
}

// Inicialização dos jogadores
jogadores.forEach((nomeJogador, index) => {
    const span = document.createElement('span')
    span.innerHTML = nomeJogador

    // Adiciona ícone de edição
    const iconeEdicao = document.createElement('i')
    iconeEdicao.id = 'iconeEdicao'
    iconeEdicao.classList.add('fas', 'fa-pencil-alt')
    iconeEdicao.addEventListener('click', () => editarNomeJogador(index))
    span.appendChild(iconeEdicao)

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
        if (primeiroClique) {
            desabilitarBotaoEdicao()
            primeiroClique = false
        }
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
                        alert(jogadores[0] + ' Venceu!! Parabéns..')
                        setTimeout(function () {
                            reiniciarJogo()
                        }, 3000)
                    } else if (pontuacaoJogador1 < pontuacaoJogador2) {
                        alert(jogadores[1] + ' Venceu!! Parabéns..')
                        setTimeout(function () {
                            reiniciarJogo()
                        }, 3000)
                    } else {
                        alert('O jogo terminou empatado!')
                        setTimeout(function () {
                            reiniciarJogo()
                        }, 3000)
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

// Função pra reiniciar feita do jeito mais preguiçoso possível, ainda vou mudar isso
function reiniciarJogo() {
    // Resetar variáveis e o placar no HTML
    jogadorAtual = 0
    jogadas = []
    jogadores = ['Jogador 1', 'Jogador 2']
    bloquearJogo = false
    primeiroClique = true
    placares.forEach(placar => {
        placar.innerHTML = '0'
    })

    // Atualizar nomes dos jogadores no HTML
    spansJogadores.forEach((span, index) => {
        span.firstChild.nodeValue = jogadores[index]
    })

    // Remover ícones de edição / classes 
    const iconesEdicao = document.querySelectorAll('.fas.fa-pencil-alt')
    iconesEdicao.forEach(iconeEdicao => {
        iconeEdicao.style.display = 'inline'
    })
    spansJogadores.forEach(span => span.classList.remove('jogadorAtivo'))

    // Adicionar classe de jogador ativo ao primeiro jogador
    spansJogadores[jogadorAtual].classList.add('jogadorAtivo')

    // Limpar o tabuleiro
    const botoesTabuleiro = document.querySelectorAll('#tabuleiro button')
    botoesTabuleiro.forEach(botao => {
        botao.innerHTML = ''
        botao.disabled = false
    })
}