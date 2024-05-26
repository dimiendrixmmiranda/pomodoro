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
    const disco = document.createElement('span')
    disco.innerHTML = '<i class="fa-solid fa-circle"></i>'
    const p = document.createElement('p')
    p.innerHTML = input.value

    const containerBtns = document.createElement('div')

    const btnExcluir = document.createElement('button')
    btnExcluir.type = 'button'
    btnExcluir.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    const btnAlterar = document.createElement('button')
    btnAlterar.id = 'alterarTopicoAtual'
    btnAlterar.type = 'button'
    btnAlterar.innerHTML = '<i class="fa-solid fa-pencil"></i>'

    containerBtns.appendChild(btnAlterar)
    containerBtns.appendChild(btnExcluir)

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

    // PRECISO IMPLEMENTAR AQ
    btnAlterar.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('aq')
        const idLiTarefaPai = e.target.closest('.principal-tarefas-lista-item').id
        const li = e.target.closest('.principal-tarefas-lista-item-detalhes-lista-item')
        const formularioAlterarTopico = criarFormularioAlterarTopico(idLiTarefaPai)
        if (btnAlterar.classList.contains('alterarTopicoAtivo')) {
            console.log('btn desativado')
            btnAlterar.classList.remove('alterarTopicoAtivo')
            const formularioAlterarTopico = e.target.closest('.principal-tarefas-lista-item-detalhes-lista-item').querySelector('.alterarTopico')
            formularioAlterarTopico.remove()
        } else {
            btnAlterar.classList.add('alterarTopicoAtivo')
            console.log('btn ativado')
            li.appendChild(formularioAlterarTopico)
        }
    })

    li.appendChild(disco)
    li.appendChild(p)
    li.appendChild(containerBtns)



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

function criarFormularioAlterarTopico(idLiTarefaPai) {
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Informe o novo tópico'

    const btnSalvar = document.createElement('button')
    btnSalvar.innerHTML = 'Salvar'

    // AINDA NÃO ESTA ESCREVENDO NO LOCALSTORAGE
    btnSalvar.addEventListener('click', (e) => {
        e.preventDefault()
        const input = e.target.closest('.alterarTopico').querySelector('input')
        const liPai = e.target.closest('.principal-tarefas-lista-item-detalhes-lista-item')
        liPai.querySelector('p').innerHTML = input.value
        e.target.closest('.alterarTopico').remove()
        const idLiTopico = liPai.id
        const idLiTarefa = idLiTarefaPai

        const listaDeTopicos = arrayTarefas[acharElementoDentroDoArrayPeloId(idLiTarefa)].listaDeTopicos
        const topicoAlterar = listaDeTopicos.findIndex(elemento => elemento.idTopico === idLiTopico)

        const dadosDoNovoTopico = {
            conteudoTopico: input.value,
            idTopico: idLiTopico
        }
        listaDeTopicos[topicoAlterar] = dadosDoNovoTopico
        escreverInformacoesNoLocalStorage()
        console.log(listaDeTopicos)

        // removendo botaoAtivoTopico
        liPai.querySelector('#alterarTopicoAtual').classList.remove('alterarTopicoAtivo')
    })


    const div = document.createElement('div')
    div.classList.add('alterarTopico')
    div.appendChild(input)
    div.appendChild(btnSalvar)

    return div
}