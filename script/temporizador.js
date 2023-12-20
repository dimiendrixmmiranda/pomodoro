const btnIniciar = document.querySelector('#btn-iniciar')
const hh = document.querySelector('#hh')
let intervaloId = null

const audioPlay = new Audio('./assets/mp3/play.mp3')
const audioPause = new Audio('./assets/mp3/pause.mp3')
const fim = new Audio('./assets/mp3/fim.mp3')

function iniciarTemporizador() {
    // pausar temporizador
    if (intervaloId != null) {
        limparSetInterval()
        btnIniciar.innerHTML = `
            <i class="fa-solid fa-play"></i>
            <span>Iniciar</span>
        `
        audioPause.play()
        return
    } else {
        btnIniciar.innerHTML = `
            <i class="fa-solid fa-pause"></i>
            <span>Pausar</span>
        `
        audioPlay.play()
    }

    intervaloId = setInterval(() => {
        decrementarTempoDecorrido()
    }, 1000);
}


function decrementarTempoDecorrido() {
    tempoDecorridoEmSegundos -= 1
    if (tempoDecorridoEmSegundos < 0) {
        limparSetInterval()
        hh.style.strokeDashoffset = 377 + (377 * fator) / fator
        fim.play()
        return
    }
    inserirTemporizadorNaTela()
    hh.style.strokeDashoffset = 377 + (377 * tempoDecorridoEmSegundos) / fator

    let tempoDot = document.querySelector('.tempo-dot')
    tempoDot.style.transform = `rotate(${(tempoDecorridoEmSegundos * (360 / fator)) * -1}deg`;
}

function limparSetInterval() {
    clearInterval(intervaloId)
    intervaloId = null
}

function inserirTemporizadorNaTela() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    elementoTempo.innerHTML = tempoFormatado
}

btnIniciar.addEventListener('click', () => {
    iniciarTemporizador()
})