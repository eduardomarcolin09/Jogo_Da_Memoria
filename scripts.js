const criarTabuleiro = (max = 16) => {
    if (max % 2 == 1) {
        console.log("O número tem que ser par!")
        return;
    }
    const tab = []

    let k = 0
    while (k < max) {
        const n = Math.ceil(Math.random() * (max / 2) )
        if (tab.filter(x => x === n).length >= 2) continue
    
        tab.push(n)
        k++
    }

    return tab
}


const jogadores = ['Jogador 1', 'Jogador 2']
const spans = []
let jogador = 0 
let jogadas = []
let placar = []
let trancarJogo = false

const divJ = document.getElementById('jogadores')
jogadores.forEach(j => {
    const span = document.createElement('span')
    span.innerHTML = j
    const i = document.createElement('I')
    i.innerHTML = '0'
    placar.push(i)
    span.appendChild(i)
    divJ.appendChild(span)
    spans.push(span)
})


spans[jogador].classList.add('jogadorAtivo')


const tab = criarTabuleiro()
const div = document.getElementById('tabuleiro')
tab.forEach(n => {
    const btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    btn.addEventListener('click', () => {
        if (trancarJogo) return;

        btn.innerHTML = n 
        if (jogadas.some(j => j === btn)) return;
        jogadas.push(btn)
        
        if (jogadas.length === 2) { 
            trancarJogo = true

            if (jogadas[0].innerHTML === jogadas[1].innerHTML){
                placar[jogador].innerHTML = parseInt(placar[jogador].innerHTML)+1
                jogadas[0].disabled = true
                jogadas[1].disabled = true
                trancarJogo = false

                const p1 = parseInt(placar[0].innerHTML)
                const p2 = parseInt(placar[1].innerHTML)

                if (p1 + p2 === 8) {
                    if (p1 > p2) {
                        alert('Jogador 1 venceu')
                    }else if (p1 < p2) {
                        alert('Jogador 2 venceu')
                    }else {
                        alert('O jogo terminou empatado!')
                    }
                }

                console.log('Você acertou!')
                jogadas = []
            }else{    
                console.log('Você errou!')
                jogador = (jogador + 1) % jogadores.length
                spans.forEach(s => s.classList.remove('jogadorAtivo'))
                spans[jogador].classList.add('jogadorAtivo')
                setTimeout(() => {
                    jogadas.forEach(b => b.innerHTML = "")
                    jogadas = []
                    trancarJogo = false
                }, 1000)
            }
            
        }
    })
    div.appendChild(btn)
})
