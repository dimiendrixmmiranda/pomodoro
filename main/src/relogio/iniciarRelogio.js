import gerarCaixaDeMensagem from "../assets/gerarCaixaDeMensagem.js"

const btnControlarRelogio = document.querySelector('#btnControlarRelogio')
const conteudoCategoria = document.querySelector('.conteudo-categoria')
const audioPlay = new Audio('../main/public/audios/play.mp3')
const audioPause = new Audio('../main/public/audios/pause.mp3')
const audioChuva = new Audio('../main/public/audios/chuva.mp3')
const audioDespertar = new Audio('../main/public/audios/despertar.mp3')
let intervalo = null

export default function iniciarRelogio() {
    btnControlarRelogio.addEventListener('click', (e) => {
        e.preventDefault()
        btnControlarRelogio.innerHTML = '<i class="fa-solid fa-play"></i> Pausar'

        const inputMusica = document.querySelector('#inputMusica')
        if (inputMusica.checked) {
            audioChuva.play()
            audioChuva.loop = true
        } else {
            audioChuva.pause()
        }

        if (intervalo) {
            zerarIntervalo()
            audioPause.play()
            audioChuva.pause()
            btnControlarRelogio.innerHTML = '<i class="fa-solid fa-play"></i> Iniciar'
            return
        }
        audioPlay.play()
        intervalo = setInterval(() => {
            const elementoTempo = document.querySelector('#tempo')
            let dataTempo = e.target.dataset.tempo

            if (dataTempo >= 1) {
                dataTempo -= 1
                inserirTempo(elementoTempo, dataTempo)
                e.target.dataset.tempo = dataTempo
            } else {
                zerarIntervalo()
                dataTempo = 0
                inserirTempo(elementoTempo, dataTempo)
                e.target.dataset.tempo = dataTempo
                audioDespertar.play()
                audioDespertar.loop = true
                audioChuva.pause()
                const caixaDeMensagem = gerarCaixaDeMensagem('Pausar desperdador!')
                caixaDeMensagem.querySelector('#btnSim').addEventListener('click', (e) => {
                    e.preventDefault()
                    window.location.reload(true)
                })
                conteudoCategoria.appendChild(caixaDeMensagem)
            }

            const relogioCirculo = document.querySelector('#tt')
            const fator = document.querySelector('[data-fator]').dataset.fator
            const novoDashoffset = (565 - ((565 * dataTempo) / fator)) * -1
            relogioCirculo.style.strokeDashoffset = novoDashoffset

            const tempoDot = document.querySelector('.tempo-dot')
            tempoDot.style.transform = `rotate(${(dataTempo * (360 / fator)) * -1}deg)`
        }, 1000);
    })
}

function inserirTempo(elementoTempo, tempo) {
    const t = new Date(tempo * 1000)
    const tempoFormatado = t.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    elementoTempo.innerHTML = tempoFormatado
}

function zerarIntervalo() {
    clearInterval(intervalo)
    intervalo = null
}

// const fatorTempo = document.querySelector('.botao-ativo').dataset.tempo
// const relogioCirculo = document.querySelector('#tt')
// const novoDashoffset = (565 - ((565 * tempo) / fatorTempo)) * -1
// relogioCirculo.style.strokeDashoffset = novoDashoffset

// const tempoDot = document.querySelector('.tempo-dot')
// tempoDot.style.transform = `rotate(${(tempo * (360 / fatorTempo)) * - 1}deg)`