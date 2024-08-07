import gerarInputMusica from "./gerarInputMusica.js"
import gerarRelogio from "./gerarRelogio.js"

const listaCategoriaBotoes = document.querySelectorAll('.conteudo-categoria-botoes button')
const conteudoCategoriaRelogio = document.querySelector('#conteudoCategoriaRelogio')
const btnIniciar = document.querySelector('#btnControlarRelogio')

gerarRelogioPadrao()

export default function relogio() {
    ativarBotao()
    listaCategoriaBotoes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const categoria = btn.dataset.categoria
            switch (categoria) {
                case 'pomodoro':
                    conteudoCategoriaRelogio.innerHTML = ''
                    conteudoCategoriaRelogio.appendChild(gerarRelogio(1500))
                    conteudoCategoriaRelogio.appendChild(gerarInputMusica())
                    btnIniciar.setAttribute('data-tempo', `${1500}`)
                    btnIniciar.setAttribute('data-fator', `${1500}`)
                    break;
                case 'descanso-curto':
                    conteudoCategoriaRelogio.innerHTML = ''
                    conteudoCategoriaRelogio.appendChild(gerarRelogio(300))
                    conteudoCategoriaRelogio.appendChild(gerarInputMusica())
                    btnIniciar.setAttribute('data-tempo', `${300}`)
                    btnIniciar.setAttribute('data-fator', `${300}`)
                    break;
                case 'descanso-longo':
                    conteudoCategoriaRelogio.innerHTML = ''
                    conteudoCategoriaRelogio.appendChild(gerarRelogio(900))
                    conteudoCategoriaRelogio.appendChild(gerarInputMusica())
                    btnIniciar.setAttribute('data-tempo', `${900}`)
                    btnIniciar.setAttribute('data-fator', `${900}`)
                    break;
                default:
                    break;
            }
        })
    })
}

function ativarBotao() {
    listaCategoriaBotoes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            listaCategoriaBotoes.forEach(btn => btn.classList.remove('active'))
            btn.classList.add('active')
        })
    })
}

function gerarRelogioPadrao() {
    const relogioPadrao = gerarRelogio(1500)
    conteudoCategoriaRelogio.appendChild(relogioPadrao)
    conteudoCategoriaRelogio.appendChild(gerarInputMusica())
}