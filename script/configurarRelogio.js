const elementoTempo = document.querySelector('#tempo')
export function configurarRelogio(tempoADecorrer) {
    inserirTempoNaTela(tempoADecorrer)
    if(tempoADecorrer === 1500){
        elementoTempo.dataset.tempoFator = 1500
    }else if(tempoADecorrer === 900){
        elementoTempo.dataset.tempoFator = 900
    }else{
        elementoTempo.dataset.tempoFator = 300
    }
}

function inserirTempoNaTela(tempoADecorrer){
    elementoTempo.dataset.tempo = tempoADecorrer
    const tempo = new Date(tempoADecorrer * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit'})
    elementoTempo.innerHTML = tempoFormatado
}
