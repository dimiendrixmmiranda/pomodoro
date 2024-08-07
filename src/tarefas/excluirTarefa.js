import { escreverInformacoesNoLocalStorage } from "../assets/escreveInformacoesNoLocalStorage.js"
import gerarCaixaDeMensagem from "../assets/gerarCaixaDeMensagem.js"
import verificarListaDeTarefasVazia from "../assets/verificarListaDeTarefasVazia.js"
import { arrayInformacoes } from "../informacoes/arrayInformacoes.js"

const conteudoTarefas = document.querySelector('#conteudoTarefas')
export default function excluirTarefa(e) {
    e.preventDefault()
    const caixaDeMensagem = gerarCaixaDeMensagem('Deseja realmente excluir essa tarefa?')
    conteudoTarefas.appendChild(caixaDeMensagem)

    caixaDeMensagem.querySelector('#btnSim').addEventListener('click', (event) => {
        event.preventDefault()
        const li = e.target.closest('.conteudo-tarefas-lista-lista-item')
        const id = li.id
        arrayInformacoes[0].splice(arrayInformacoes[0].findIndex(tarefa => tarefa.id === id), 1)
        escreverInformacoesNoLocalStorage()
        verificarListaDeTarefasVazia()
        if (li.parentElement.querySelectorAll('li').length < 2) {
            li.closest('.conteudo-tarefas-lista').setAttribute('style', 'display: none')
        } else {
            li.closest('.conteudo-tarefas-lista').setAttribute('style', 'display: grid')
        }
        li.remove()
        caixaDeMensagem.remove()
    })
    
    caixaDeMensagem.querySelector('#btnNao').addEventListener('click', (event) => {
        event.preventDefault()
        caixaDeMensagem.remove()
    })
}