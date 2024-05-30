const principalTimersRelogio = document.querySelector('.principal-timers-relogio')
let tempo = 1500
let intervaloId = null
const audioIniciar = new Audio('../../assets/audios/iniciar.mp3')
const audioPausar = new Audio('../../assets/audios/pausar.mp3')
const audioDespertar = new Audio('../../assets/audios/despertar.mp3')

export function identificarRelogio(tipoRelogio) {
    switch (tipoRelogio) {
        case 'ciclo':
            tempo = 1500
            criarElementoVisualDoRelogio(tempo)
            break;
        case 'descanso-curto':
            tempo = 300
            criarElementoVisualDoRelogio(tempo)
            break;
        case 'descanso-longo':
            tempo = 900
            criarElementoVisualDoRelogio(tempo)
            break;
        default:
            break;
    }
}


function criarElementoVisualDoRelogio(tempo) {
    const btnIniciar = criarBotaoIniciar()
    criarTempo(tempo)
    const listaBtns = document.querySelectorAll('.principal-timers-botoes-btn')

    btnIniciar.addEventListener('click', (e) => {
        e.preventDefault()
        listaBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault()
                const t = e.target.dataset.tempo
                tempo = t
                zerarIntervalo()
            })
        })
        if (intervaloId) {
            btnIniciar.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar'
            audioPausar.play()
            zerarIntervalo()
            return
        } else {
            btnIniciar.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar'
            audioIniciar.play()
        }
        
        intervaloId = setInterval(() => {
            if (tempo < 1) {
                zerarIntervalo()
                tempo = 0
                // TOCAR
                audioDespertar.loop = true
                audioDespertar.play()
                const elementoPrincipalTimers = document.querySelector('.principal-timers')
                const btnParar = criarBotaoDeParar()
                elementoPrincipalTimers.appendChild(btnParar)
                return
            }
            tempo -= 1
            inserirTempoNaTela(tempo)

            const fatorTempo = document.querySelector('.botao-ativo').dataset.tempo
            const relogioCirculo = document.querySelector('#tt')
            const novoDashoffset = (565 - ((565 * tempo) / fatorTempo)) * -1
            relogioCirculo.style.strokeDashoffset = novoDashoffset

            const tempoDot = document.querySelector('.tempo-dot')
            tempoDot.style.transform = `rotate(${(tempo * (360 / fatorTempo)) * - 1}deg)`
        }, 1000);
    })
    principalTimersRelogio.appendChild(btnIniciar)
}

function criarTempo(tempo) {
    const elementoTempo = document.querySelector('#tempo')
    const t = new Date(tempo * 1000)
    const tempoFormatado = t.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    document.querySelector('#tempo').innerHTML = tempoFormatado
    elementoTempo.innerHTML = tempoFormatado
    elementoTempo.id = 'tempo'
}

function criarBotaoIniciar() {
    const btn = document.createElement('button')
    const p = document.createElement('p')
    p.innerHTML = 'Iniciar'
    btn.id = 'btnIniciar'

    btn.innerHTML = '<i class="fa-solid fa-play"></i>'
    btn.appendChild(p)
    return btn
}


function inserirTempoNaTela(tempo) {
    const t = new Date(tempo * 1000)
    const tempoFormatado = t.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    document.querySelector('#tempo').innerHTML = tempoFormatado
}

function zerarIntervalo() {
    clearInterval(intervaloId)
    intervaloId = null
}

function criarBotaoDeParar(){
    const div = document.createElement('div')
    div.classList.add('container-botao-parar')
    const button = document.createElement('button')
    button.innerHTML = 'Parar Alarme!'
    
    button.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.reload(true)
    })
    
    div.appendChild(button)
    return div
}