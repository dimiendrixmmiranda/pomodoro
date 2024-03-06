import { adicionarTarefa } from "./adicionarTarefa.js"
import { alterarBanner } from "./alterarBanner.js"
import { configurarRelogio } from "./configurarRelogio.js"
import { iniciarRelogio } from "./iniciarRelogio.js"

const listaBtnsCategoria = document.querySelectorAll('#listaBtnsCategoria button')
const btnTimer = document.querySelector('#btnTimer')
const btnDescansoCurto = document.querySelector('#btnDescansoCurto')
const btnDescansoLongo = document.querySelector('#btnDescansoLongo')
const btnComecarPausar = document.querySelector('#comecarPausar')

btnTimer.addEventListener('click', () => {
    listaBtnsCategoria.forEach(btn => {
        btn.classList.remove('active__btn')
    })
    btnTimer.classList.add('active__btn')
    alterarBanner('btnTimer')
    configurarRelogio(1500)
})
btnDescansoCurto.addEventListener('click', () => {
    listaBtnsCategoria.forEach(btn => {
        btn.classList.remove('active__btn')
    })
    btnDescansoCurto.classList.add('active__btn')
    alterarBanner('btnDescansoCurto')
    configurarRelogio(300)
})
btnDescansoLongo.addEventListener('click', () => {
    listaBtnsCategoria.forEach(btn => {
        btn.classList.remove('active__btn')
    })
    btnDescansoLongo.classList.add('active__btn')
    alterarBanner('btnDescansoLongo')
    configurarRelogio(900)
})

btnComecarPausar.addEventListener('click', (e) => {
    e.preventDefault()
    iniciarRelogio()
})

configurarRelogio(1500)
adicionarTarefa()

function btnDetalhesTarefaAtual() {
    const btnVerDetalhesTarefaAtual = document.querySelector('.tarefa__atual__item__detalhes')
    btnVerDetalhesTarefaAtual.addEventListener('click', (e) => {
        e.preventDefault()
        const tarefaDescricao = document.querySelector('.tarefa__atual__item__descricao')
        tarefaDescricao.classList.toggle('tarefa__atual__active')
    })
}

btnDetalhesTarefaAtual()