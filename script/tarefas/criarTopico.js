import { acharElementoDentroDoArrayPeloId } from "./acharElementoDentroDoArrayPeloId.js"
import { arrayTarefas } from "./arrayDeTarefa.js"
import { escreverInformacoesNoLocalStorage } from "./escreverInformacoesLocalStorage.js"
import { gerarId } from "./gerarId.js"

export function criarTopico(e) {
    const divPai = e.target.closest('.principal-tarefas-lista-item-detalhes-formularioTopicos')
    const input = divPai.querySelector('.principal-tarefas-lista-item-detalhes-formularioTopicos-input')
    const li = document.createElement('li')
    li.classList.add('principal-tarefas-lista-item-detalhes-lista-item')
    li.id = gerarId()
    const p = document.createElement('p')
    p.innerHTML = input.value
    const btnExcluir = document.createElement('button')
    btnExcluir.type = 'button'
    btnExcluir.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'

    const listaDeTopicos = e.target.closest('.principal-tarefas-lista-item').querySelector('.principal-tarefas-lista-item-detalhes-lista')
    listaDeTopicos.style.display = 'flex'

    btnExcluir.addEventListener('click', (e) => {
        e.preventDefault()
        if (listaDeTopicos.querySelectorAll('li').length < 2) {
            e.target.closest('.principal-tarefas-lista-item').querySelectorAll('.principal-tarefas-lista-item-detalhes-titulo')[1].style.display = 'none'
        }
        const topico = e.target.closest('.principal-tarefas-lista-item-detalhes-lista-item')
        const liPai = e.target.closest('.principal-tarefas-lista-item')
        const idLiPai = liPai.id

        const arrayListaDeTopicos = arrayTarefas[acharElementoDentroDoArrayPeloId(idLiPai)].listaDeTopicos
        arrayListaDeTopicos.splice(arrayListaDeTopicos.findIndex(el => el.idTopico == topico.id), 1)
        topico.remove()
        escreverInformacoesNoLocalStorage()

    })

    li.appendChild(p)
    li.appendChild(btnExcluir)



    if (listaDeTopicos.querySelectorAll('li').length >= 0) {
        e.target.closest('.principal-tarefas-lista-item').querySelectorAll('.principal-tarefas-lista-item-detalhes-titulo')[1].style.display = 'block'
    }

    listaDeTopicos.appendChild(li)

    const informacoesTopicos = {
        conteudoTopico: input.value,
        idTopico: li.id
    }

    const liPai = e.target.closest('.principal-tarefas-lista-item')
    arrayTarefas[acharElementoDentroDoArrayPeloId(liPai.id)].listaDeTopicos.push(informacoesTopicos)
    escreverInformacoesNoLocalStorage()

    input.value = ''
}