import { escreverInformacoesNoLocalStorage } from "../assets/escreveInformacoesNoLocalStorage.js"
import { arrayInformacoes } from "../informacoes/arrayInformacoes.js"

export default function concluirTarefa(e) {
    e.preventDefault()
    const li = e.target.closest('.conteudo-tarefas-lista-lista-item')
    const id = li.id
    let tarefaConcluida = arrayInformacoes[0][arrayInformacoes[0].findIndex(tarefa => tarefa.id === id)].concluido
    if (tarefaConcluida) {
        arrayInformacoes[0][arrayInformacoes[0].findIndex(tarefa => tarefa.id === id)].concluido = false
        li.querySelectorAll('.container').forEach(container => {
            container.setAttribute('style', 'background-color: #16065f')
        })
        li.querySelector('.botao-ver-detalhes').setAttribute('style', 'background-color: #2000af')
    } else {
        arrayInformacoes[0][arrayInformacoes[0].findIndex(tarefa => tarefa.id === id)].concluido = true
        li.querySelectorAll('.container').forEach(container => {
            container.setAttribute('style', 'background-color: #059212')
        })
        li.querySelector('.botao-ver-detalhes').setAttribute('style', 'background-color: #03580c')
    }
    escreverInformacoesNoLocalStorage()
}