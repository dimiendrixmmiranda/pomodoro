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
    
    const divConteudoDetalhes = criarElemento('div', 'principal-tarefas-lista-item-detalhes')
    const divConteudoDetalhesTitulo1 = criarElemento('h4', 'principal-tarefas-lista-item-detalhes-titulo', 'Descrição/Resumo')
    const divConteudoDetalhesDescricao = criarElemento('p', 'principal-tarefas-lista-item-detalhes-descricao', objetoInformacoesTarefa.descricaoTarefa)
    const divConteudoDetalhesTitulo2 = criarElemento('h4', 'principal-tarefas-lista-item-detalhes-titulo', 'Tópicos')
    const listaDeTopicos = criarElemento('ul', 'principal-tarefas-lista-item-detalhes-lista')
    btnConcluir.addEventListener('click', (e) => {
        e.preventDefault()

        const li = e.target.closest('.principal-tarefas-lista-item')
        const btnVerDetalhes = li.querySelector('.principal-tarefas-lista-item-btnDetelhes')
        if (objetoInformacoesTarefa.tarefaConcluida === false) {
            const li = e.target.closest('.principal-tarefas-lista-item')
            li.classList.add('concluido')
            btnVerDetalhes.classList.add('concluido')
            listaDeTopicos.querySelectorAll('li').forEach(li => li.classList.add('concluido'))
            arrayTarefas[acharElementoDentroDoArrayPeloId(li.id)].tarefaConcluida = true
        } else if (objetoInformacoesTarefa.tarefaConcluida === true) {
            arrayTarefas[acharElementoDentroDoArrayPeloId(li.id)].tarefaConcluida = false
            btnVerDetalhes.classList.remove('concluido')
            li.classList.remove('concluido')
            listaDeTopicos.querySelectorAll('li').forEach(li => li.classList.remove('concluido'))
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
    btnAlterar.addEventListener('click', (e) => {
        const tarefaAtual = e.target.closest('.principal-tarefas-lista-item')

        if (btnAlterar.classList.contains('btn-alterar-ativo')) {
            console.log('nao tem')
            btnAlterar.classList.remove('btn-alterar-ativo')
            const alterarFormulario = tarefaAtual.children[tarefaAtual.children.length - 1]
            alterarFormulario.remove()
        } else {
            console.log('tem')
            btnAlterar.classList.add('btn-alterar-ativo')
            const form = criarFormularioAlterarTarefa()
            const formElemento = form.outerHTML
            tarefaAtual.insertAdjacentHTML("beforeend", formElemento);
            adicionarEventoNoFormulario(objetoInformacoesTarefa)
        }
    })

    const btnTopicos = criarElemento('button', 'principal-tarefas-lista-item-topicos', '<i class="fa-solid fa-heart"></i>')
    divContainer.appendChild(btnConcluir)
    divContainer.appendChild(btnExcluir)
    divContainer.appendChild(btnAlterar)
    divContainer.appendChild(btnTopicos)

    const btnVerDetalhes = criarElemento('button', 'principal-tarefas-lista-item-btnDetelhes', 'Ver Detalhes')
    btnVerDetalhesAtivo(btnVerDetalhes)

    if (objetoInformacoesTarefa.listaDeTopicos.length > 0) {
        divConteudoDetalhesTitulo2.style.display = 'block'
        objetoInformacoesTarefa.listaDeTopicos.forEach(itemTopico => {
            const li = criarElemento('li', 'principal-tarefas-lista-item-detalhes-lista-item', '', itemTopico.id)
            li.id = itemTopico.idTopico
            const disco = document.createElement('span')
            disco.innerHTML = '<i class="fa-solid fa-circle"></i>'
            const p = document.createElement('p')
            p.innerHTML = itemTopico.conteudoTopico

            const containerBtns = document.createElement('div')
            const btnExcluir = document.createElement('button')
            btnExcluir.type = 'button'
            btnExcluir.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
            const btnAlterar = document.createElement('button')
            btnAlterar.type = 'button'
            btnAlterar.innerHTML = '<i class="fa-solid fa-pencil"></i>'
            btnAlterar.id = 'alterarTopicoAtual'
            containerBtns.appendChild(btnAlterar)
            containerBtns.appendChild(btnExcluir)

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

            // PRECISO IMPLEMENTAR AQUI
            btnAlterar.addEventListener('click', (e) => {
                e.preventDefault()
                const idLiTarefaPai = e.target.closest('.principal-tarefas-lista-item').id
                const li = e.target.closest('.principal-tarefas-lista-item-detalhes-lista-item')
                const formularioAlterarTopico = criarFormularioAlterarTopico(idLiTarefaPai)
                if(btnAlterar.classList.contains('alterarTopicoAtivo')){
                    console.log('btn desativado')
                    btnAlterar.classList.remove('alterarTopicoAtivo')
                    const formularioAlterarTopico = e.target.closest('.principal-tarefas-lista-item-detalhes-lista-item').querySelector('.alterarTopico')
                    formularioAlterarTopico.remove()
                }else{
                    btnAlterar.classList.add('alterarTopicoAtivo')
                    console.log('btn ativado')
                    li.appendChild(formularioAlterarTopico)
                }
                
            })
            li.appendChild(disco)
            li.appendChild(p)
            li.appendChild(containerBtns)
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

    verificarSeATarefaFoiConcluida(objetoInformacoesTarefa, itemTarefa, btnVerDetalhes, listaDeTopicos)

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

function verificarSeATarefaFoiConcluida(objetoInformacoesTarefa, itemTarefa, btnVerDetalhes, listaDeTopicos) {  
    if (objetoInformacoesTarefa.tarefaConcluida === true) {
        listaDeTopicos.querySelectorAll('li').forEach(li => li.classList.add('concluido'))
        itemTarefa.classList.add('concluido')
        btnVerDetalhes.classList.add('concluido')
        arrayTarefas[acharElementoDentroDoArrayPeloId(itemTarefa.id)].tarefaConcluida = true
    } else if (objetoInformacoesTarefa.tarefaConcluida === false) {
        if (arrayTarefas[acharElementoDentroDoArrayPeloId(itemTarefa.id)]) {
            arrayTarefas[acharElementoDentroDoArrayPeloId(itemTarefa.id)].tarefaConcluida = false
        }
        listaDeTopicos.querySelectorAll('li').forEach(li => li.classList.remove('concluido'))
        btnVerDetalhes.classList.remove('concluido')
        itemTarefa.classList.remove('concluido')
    }
}

function criarFormularioAlterarTarefa() {
    const form = criarElemento('form', 'principal-tarefas-lista-item-detalhes-formularioAlterarTarefa')
    const labelNovoTituloTarefa = criarElemento('label', 'formularioAlterarTarefa-titulo-tarefa-label', 'Novo titulo da tarefa')
    labelNovoTituloTarefa.setAttribute('for', 'novoTituloTarefa')
    const inputNovoTituloTarefa = criarElemento('input', 'formularioAlterarTarefa-titulo-tarefa-input', '', 'novoTituloTarefa')
    inputNovoTituloTarefa.type = 'text'
    const labelNovaDescricaoTarefa = criarElemento('label', 'formularioAlterarTarefa-descricao-tarefa-label', 'Nova Descrição/Resumo da Tarefa')
    labelNovaDescricaoTarefa.setAttribute('for', 'novaDescricaoTarefa')
    const textareaDescricaoTarefa = criarElemento('textarea', 'formularioAlterarTarefa-descricao-tarefa-textarea', '', 'novaDescricaoTarefa')
    const btnNovoAlterarTarefa = criarElemento('button', 'formularioAlterarTarefa-descricao-tarefa-btnAlterarTarefa', 'Alterar Tarefa')
    btnNovoAlterarTarefa.setAttribute('type', 'submit')


    form.appendChild(labelNovoTituloTarefa)
    form.appendChild(inputNovoTituloTarefa)
    form.appendChild(labelNovaDescricaoTarefa)
    form.appendChild(textareaDescricaoTarefa)
    form.appendChild(btnNovoAlterarTarefa)

    return form
}

function adicionarEventoNoFormulario(objetoInformacoesTarefa) {
    const form = document.querySelector('.principal-tarefas-lista-item-detalhes-formularioAlterarTarefa')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const liPai = e.target.closest('.principal-tarefas-lista-item')
        const novoTitulo = e.target.querySelector('.formularioAlterarTarefa-titulo-tarefa-input')
        const novaDescricao = e.target.querySelector('.formularioAlterarTarefa-descricao-tarefa-textarea')
        const objetoTarefaAterado = {
            descricaoTarefa: novaDescricao.value,
            id: objetoInformacoesTarefa.id,
            listaDeTopicos: objetoInformacoesTarefa.listaDeTopicos,
            tarefaConcluida: objetoInformacoesTarefa.tarefaConcluida,
            tituloTarefa: novoTitulo.value,
        }
        arrayTarefas[acharElementoDentroDoArrayPeloId(liPai.id)] = objetoTarefaAterado
        escreverInformacoesNoLocalStorage()

        // Alterando dados visuais
        liPai.querySelector('.principal-tarefas-lista-item-titulo').innerHTML = objetoTarefaAterado.tituloTarefa
        liPai.querySelector('.principal-tarefas-lista-item-detalhes-descricao').innerHTML = objetoTarefaAterado.descricaoTarefa

        const liBtnAlterar = liPai.querySelector(".btn-alterar-ativo")
        liBtnAlterar.classList.remove('btn-alterar-ativo')
        form.remove()
    })
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