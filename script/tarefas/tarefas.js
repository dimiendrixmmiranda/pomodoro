import { acharElementoDentroDoArrayPeloId } from "./acharElementoDentroDoArrayPeloId.js";
import { btnNovaTarefaAtivo } from "./adicionarNovaTarefaAtivo.js";
import { adicionarTopicoFormulario } from "./adicionarTopicoFormulario.js";
import { arrayTarefas } from "./arrayDeTarefa.js";
import { btnVerDetalhesAtivo } from "./btnVerDetalhesAtivo.js";
import { escreverInformacoesNoLocalStorage } from "./escreverInformacoesLocalStorage.js";
import { gerarId } from "./gerarId.js";

const principalTarefasFormulario = document.querySelector('#principalTarefasFormulario')
const adicionarNovaTarefa = document.querySelector('#adicionarNovaTarefa')
const listaDeTarefas = document.querySelector('.principal-tarefas-lista')
arrayTarefas.forEach(tarefa => listaDeTarefas.appendChild(criarTarefa(tarefa)))

btnNovaTarefaAtivo(principalTarefasFormulario)

// Botao Adicionar Tarefa
principalTarefasFormulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const tituloTarefa = e.target.querySelector('#tituloTarefa')
    const inputTopicos = e.target.querySelector('#inputAdicionarTopico')
    const descricaoTarefa = e.target.querySelector('#descricaoTarefa')
    const listaDeTopicos = []
    e.target.querySelectorAll('.principal-tarefas-formulario-topicos-lista li').forEach(li => {
        const informacoesTopico = {
            conteudoTopico: li.querySelector('p').innerHTML,
            idTopico: gerarId()
        }
        listaDeTopicos.push(informacoesTopico)
    });


    const objetoInformacoesTarefa = {
        tituloTarefa: tituloTarefa.value,
        descricaoTarefa: descricaoTarefa.value,
        listaDeTopicos: listaDeTopicos,
        tarefaConcluida: false
    }

    if (objetoInformacoesTarefa.id) {
        objetoInformacoesTarefa.id = objetoInformacoesTarefa.id
    } else {
        objetoInformacoesTarefa.id = gerarId()
    }

    const itemTarefa = criarTarefa(objetoInformacoesTarefa)
    listaDeTarefas.appendChild(itemTarefa)
    arrayTarefas.push(objetoInformacoesTarefa)
    escreverInformacoesNoLocalStorage()

    limparFormulario(tituloTarefa, descricaoTarefa, inputTopicos)
    adicionarNovaTarefa.classList.remove('botao-ativo')
    principalTarefasFormulario.style.display = 'none'
})

function limparFormulario(tituloTarefa, descricaoTarefa, inputTopicos) {
    tituloTarefa.value = ''
    descricaoTarefa.value = ''
    inputTopicos.value = ''
    limparListaDeTopicos()
}

function limparListaDeTopicos() {
    document.querySelector('.principal-tarefas-formulario-topicos-lista').innerHTML = ''
}

function criarTarefa(objetoInformacoesTarefa) {
    const itemTarefa = criarElemento('li', 'principal-tarefas-lista-item')
    itemTarefa.id = objetoInformacoesTarefa.id
    const tituloTarefa = criarElemento('h4', 'principal-tarefas-lista-item-titulo', objetoInformacoesTarefa.tituloTarefa)

    const divContainer = criarElemento('div', 'principal-tarefas-lista-item-container')
    const btnConcluir = criarElemento('button', 'principal-tarefas-lista-item-concluir', '<i class="fa-solid fa-check"></i>')
    btnConcluir.addEventListener('click', (e) => {
        e.preventDefault()

        const li = e.target.closest('.principal-tarefas-lista-item')
        const btnVerDetalhes = li.querySelector('.principal-tarefas-lista-item-btnDetelhes')
        if (objetoInformacoesTarefa.tarefaConcluida === false) {
            const li = e.target.closest('.principal-tarefas-lista-item')
            li.classList.add('concluido')
            btnVerDetalhes.classList.add('concluido')
            arrayTarefas[acharElementoDentroDoArrayPeloId(li.id)].tarefaConcluida = true
        } else if (objetoInformacoesTarefa.tarefaConcluida === true) {
            arrayTarefas[acharElementoDentroDoArrayPeloId(li.id)].tarefaConcluida = false
            btnVerDetalhes.classList.remove('concluido')
            li.classList.remove('concluido')
        }
        escreverInformacoesNoLocalStorage()
    })

    const btnExcluir = criarElemento('button', 'principal-tarefas-lista-item-excluir', '<i class="fa-solid fa-xmark"></i>')
    btnExcluir.addEventListener('click', (e) => {
        e.preventDefault()
        const li = e.target.closest('.principal-tarefas-lista-item')
        arrayTarefas.splice(acharElementoDentroDoArrayPeloId(li.id), 1)
        li.remove()
        escreverInformacoesNoLocalStorage()
    })

    const btnAlterar = criarElemento('button', 'principal-tarefas-lista-item-alterar', '<i class="fa-regular fa-pen-to-square"></i>')
    const btnTopicos = criarElemento('button', 'principal-tarefas-lista-item-topicos', '<i class="fa-solid fa-heart"></i>')
    divContainer.appendChild(btnConcluir)
    divContainer.appendChild(btnExcluir)
    divContainer.appendChild(btnAlterar)
    divContainer.appendChild(btnTopicos)

    const btnVerDetalhes = criarElemento('button', 'principal-tarefas-lista-item-btnDetelhes', 'Ver Detalhes')
    btnVerDetalhesAtivo(btnVerDetalhes)

    const divConteudoDetalhes = criarElemento('div', 'principal-tarefas-lista-item-detalhes')
    const divConteudoDetalhesTitulo1 = criarElemento('h4', 'principal-tarefas-lista-item-detalhes-titulo', 'Descrição/Resumo')
    const divConteudoDetalhesDescricao = criarElemento('p', 'principal-tarefas-lista-item-detalhes-descricao', objetoInformacoesTarefa.descricaoTarefa)
    const divConteudoDetalhesTitulo2 = criarElemento('h4', 'principal-tarefas-lista-item-detalhes-titulo', 'Tópicos')
    const listaDeTopicos = criarElemento('ul', 'principal-tarefas-lista-item-detalhes-lista')

    if (objetoInformacoesTarefa.listaDeTopicos.length > 0) {
        divConteudoDetalhesTitulo2.style.display = 'block'
        objetoInformacoesTarefa.listaDeTopicos.forEach(itemTopico => {
            const li = criarElemento('li', 'principal-tarefas-lista-item-detalhes-lista-item', '', itemTopico.id)
            const p = document.createElement('p')
            p.innerHTML = itemTopico.conteudoTopico
            const btnExcluir = document.createElement('button')
            btnExcluir.type = 'button'
            btnExcluir.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'

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
            listaDeTopicos.appendChild(li)
        })
    } else {
        divConteudoDetalhesTitulo2.style.display = 'none'
    }

    ocultarListaDeTopicos(listaDeTopicos)

    const formularioAdicionarTopico = criarElemento('div', 'principal-tarefas-lista-item-detalhes-formularioTopicos')
    const inputFormularioAdicionarTopico = criarElemento('input', 'principal-tarefas-lista-item-detalhes-formularioTopicos-input')
    const botaoFormularioAdicionarTopico = criarElemento('button', 'principal-tarefas-lista-item-detalhes-formularioTopicos-botao', 'Adicionar Novo Tópico <i class="fa-solid fa-plus"></i>', 'btnAdicionarTopico', 'button')

    formularioAdicionarTopico.appendChild(inputFormularioAdicionarTopico)
    formularioAdicionarTopico.appendChild(botaoFormularioAdicionarTopico)

    const btnAdicionarNovoTopico = criarElemento('button', 'principal-tarefas-lista-item-detalhes-botao', 'Adicionar Novo Tópico <i class="fa-solid fa-plus"></i>', '', 'button')
    adicionarTopicoFormulario(btnAdicionarNovoTopico)

    divConteudoDetalhes.appendChild(divConteudoDetalhesTitulo1)
    divConteudoDetalhes.appendChild(divConteudoDetalhesDescricao)
    divConteudoDetalhes.appendChild(divConteudoDetalhesTitulo2)
    divConteudoDetalhes.appendChild(listaDeTopicos)
    divConteudoDetalhes.appendChild(formularioAdicionarTopico)
    divConteudoDetalhes.appendChild(btnAdicionarNovoTopico)

    itemTarefa.appendChild(tituloTarefa)
    itemTarefa.appendChild(divContainer)
    itemTarefa.appendChild(btnVerDetalhes)
    itemTarefa.appendChild(divConteudoDetalhes)

    escreverInformacoesNoLocalStorage()

    verificarSeATarefaFoiConcluida(objetoInformacoesTarefa, itemTarefa, btnVerDetalhes)

    return itemTarefa
}

function criarElemento(tipoElemento, classe, conteudo = '', id = '', type = '') {
    const el = document.createElement(tipoElemento)
    el.classList.add(classe)

    if (conteudo != '') {
        el.innerHTML = conteudo
    }

    if (id != '') {
        el.id = id
    }

    if (type != '') {
        el.setAttribute('type', type)
    }

    return el
}


function ocultarListaDeTopicos(listaDeTopicos) {
    if (listaDeTopicos.querySelectorAll('li').length <= 0) {
        listaDeTopicos.style.display = 'none'
    } else {
        listaDeTopicos.style.display = 'flex'
    }
}

function verificarSeATarefaFoiConcluida(objetoInformacoesTarefa, itemTarefa, btnVerDetalhes){
    if (objetoInformacoesTarefa.tarefaConcluida === true) {
        itemTarefa.classList.add('concluido')
        btnVerDetalhes.classList.add('concluido')
        arrayTarefas[acharElementoDentroDoArrayPeloId(itemTarefa.id)].tarefaConcluida = true
    } else if (objetoInformacoesTarefa.tarefaConcluida === false) {
        if(arrayTarefas[acharElementoDentroDoArrayPeloId(itemTarefa.id)]){
            arrayTarefas[acharElementoDentroDoArrayPeloId(itemTarefa.id)].tarefaConcluida = false
        }
        btnVerDetalhes.classList.remove('concluido')
        itemTarefa.classList.remove('concluido')
    }
}