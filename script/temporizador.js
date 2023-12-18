const btnIniciar = document.querySelector('#btn-iniciar')
const hh = document.querySelector('#hh')
let intervaloId = null


function iniciarTemporizador() {
    btnIniciar.innerHTML = 'Pausar'

    // pausar temporizador
    if (intervaloId != null) {
        limparSetInterval()
        btnIniciar.innerHTML = 'Iniciar'
        return
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
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    elementoTempo.innerHTML = tempoFormatado
}

btnIniciar.addEventListener('click', () => {
    iniciarTemporizador()
})