const elementoTempo = document.querySelector('#tempo')
let intervaloId = null
const dashArray1 = 377
const dashArray2 = 409

const audioStart = new Audio('../assets/audio/start.mp3')
const audioPause = new Audio('../assets/audio/pause.mp3')
const musicaRelaxante = new Audio('../assets/audio/musica-relaxante.mp3')
musicaRelaxante.loop
const btnComecarPausar = document.querySelector('#comecarPausar')
const inputMusicaRelaxante = document.querySelector('#inputMusica')

export function iniciarRelogio() {
    const tempoADecorrer = parseInt(document.querySelector('#tempo').dataset.tempo)
    iniciarContagemRegressiva(tempoADecorrer)
    if(inputMusicaRelaxante.checked){
        musicaRelaxante.play()
    }else{
        musicaRelaxante.pause()
    }
}

function iniciarContagemRegressiva(tempoADecorrer) {
    contagemRegressiva(tempoADecorrer)
}

function contagemRegressiva(tempoADecorrer) {
    if (intervaloId) {
        zerarIntervalo()
        audioPause.play()
        btnComecarPausar.innerHTML = '<i class="fa-solid fa-play"></i>Iniciar'
        return
    }
    audioStart.play()
    btnComecarPausar.innerHTML = '<i class="fa-solid fa-pause"></i>Pausar'
    intervaloId = setInterval(() => {
        console.log(tempoADecorrer)
        if (tempoADecorrer <= 0) {
            zerarIntervalo()
            tempoADecorrer = parseInt(elementoTempo.dataset.tempoFator)
            return
        }
        tempoADecorrer -= 1
        elementoTempo.dataset.tempo = tempoADecorrer
        inserirTempoNaTela(tempoADecorrer)

        const tempo1 = document.querySelector('#tempo1')
        const tempo2 = document.querySelector('#tempo2')

        let tempoFator = elementoTempo.dataset.tempoFator
        // relogio
        tempo1.style.strokeDashoffset = (dashArray1 - (dashArray1 * tempoADecorrer) / tempoFator) * -1
        tempo2.style.strokeDashoffset = (dashArray2 - (dashArray2 * tempoADecorrer) / tempoFator) * -1
        // // dot
        const tempoDot = document.querySelector('#tempoDot')
        tempoDot.style.transform = `rotate(${(tempoADecorrer * (360 / tempoFator)) * -1}deg)`
    }, 1000);
}

function zerarIntervalo() {
    clearInterval(intervaloId)
    intervaloId = null
}

function inserirTempoNaTela(tempoADecorrer) {
    const tempo = new Date(tempoADecorrer * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    elementoTempo.innerHTML = tempoFormatado
}