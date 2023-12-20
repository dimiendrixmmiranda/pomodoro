const btnIniciarPomodoro = document.querySelector('#iniciar')
const btnDescansoCurto = document.querySelector('#descanso-curto')
const btnDescansoLongo = document.querySelector('#descanso-longo')
const listaDeBotoes = document.querySelectorAll('.botoes button')

const elementoTempo = document.querySelector('#tempo-decorrido')
const img = document.querySelector('main img')
const texto = document.querySelector('main h3')
let tempoDecorridoEmSegundos = 1500
let fator = 1500

btnIniciarPomodoro.addEventListener('click', () => {
    alterarContextoImgH3('./assets/imgs/foco.png', 'Inicie uma nova jornada de estudos. <strong>Fique focado por 25 minutos!</strong>')
    tempoDecorridoEmSegundos = 1500
    fator = 1500
    inserirTemporizadorNaTela()
})
btnDescansoCurto.addEventListener('click', () => {
    alterarContextoImgH3('./assets/imgs/descanso-curto.png', 'E hora de ir pegar um café e relaxar. <strong>Faça uma pausa de 5 minutos!</strong>')
    tempoDecorridoEmSegundos = 300
    fator = 300
    inserirTemporizadorNaTela()
})
btnDescansoLongo.addEventListener('click', () => {
    alterarContextoImgH3('./assets/imgs/descanso-longo.png', 'Chegou a hora de ir tirar um cochilo! <strong>Faça uma pausa de 15 minutos.</strong>')
    tempoDecorridoEmSegundos = 900
    fator = 900
    inserirTemporizadorNaTela()
})
listaDeBotoes.forEach(btn => {
    btn.addEventListener('click', () => {
        listaDeBotoes.forEach(btn => {
            btn.classList.remove('active')
        })
        btn.classList.add('active')
    })
})


function alterarContextoImgH3(caminhoImg, textoH3) {
    img.src = caminhoImg
    texto.innerHTML = textoH3
}

function definirTempoDecorridoEmSegundos(tempo) {
    tempoDecorridoEmSegundos = tempo
}


inserirTemporizadorNaTela()
