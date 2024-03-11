import { sortearID } from "./sortearId.js"
import { toggleVerDetalhes } from "./toggleVerDetalhes.js"

const btnAdicionarTarefa = document.querySelector('#adicionarTarefa')
const tarefaFormulario = document.querySelector('#tarefaFormulario')
const listaTarefas = document.querySelector('#listaTarefas')
const listaTarefasConcluidas = document.querySelector('#listaTarefasConcluidas')
const tarefaAtual = document.querySelector('.tarefa__atual__item')
const formAlterarTarefa = document.querySelector('#formAlterarTarefa')

const arrayTarefas = JSON.parse(localStorage.getItem("tarefas")) || [[], [], []]

export function adicionarTarefa() {
    // [0] = lista de tarefas
    // [1] = tarefa atual
    // [2] = tarefas concluidas
    
    arrayTarefas[0].forEach(tarefa => {
        criarTarefa(tarefa)
    });

    arrayTarefas[1].forEach(tarefa => {
        criarTarefaAtual(tarefa)
    })

    arrayTarefas[2].forEach(tarefaConcluida => {
        criarTarefaConcluida(tarefaConcluida)
        toggleContainerTarefasConcluidas()
    })

    btnAdicionarTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        tarefaFormulario.classList.toggle('tarefa__formulario__active')
        tarefaFormulario.querySelector('input').focus()
    })

    tarefaFormulario.addEventListener('submit', (e) => {
        e.preventDefault()
        tarefaFormulario.classList.toggle('tarefa__formulario__active')
        btnAdicionarTarefa.focus()

        const tarefaAtual = {
            tituloTarefa: e.target.closest('.tarefas').querySelector('#tituloTarefa').value,
            descricaoTarefa: e.target.closest('.tarefas').querySelector('#descricaoTarefa').value,
            id: sortearID().join('')
        }

        criarTarefa(tarefaAtual)
        arrayTarefas[0].push(tarefaAtual)
        localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
        limparFormulario()
    })

    concluirTarefaAtual()
    excluirTarefaAtual()
}

function limparFormulario() {
    const input = tarefaFormulario.querySelector('input')
    const textarea = tarefaFormulario.querySelector('textarea')
    input.value = ''
    textarea.value = ''
}

function criarTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('tarefas__lista__item')
    li.dataset.id = tarefa.id

    const h3 = document.createElement('h3')
    h3.classList.add('tarefas__lista__item__titulo')
    h3.innerHTML = `${tarefa.tituloTarefa}`

    const listaBtns = document.createElement('div')
    listaBtns.classList.add('tarefas__lista__item__btns')

    const btnAdicionarTarefaAtual = document.createElement('button')
    btnAdicionarTarefaAtual.classList.add('tarefas__lista__item__btns__adicionar')
    btnAdicionarTarefaAtual.innerHTML = '<i class="fa-solid fa-plus"></i>'
    btnAdicionarTarefaAtual.addEventListener('click', (e) => {
        e.preventDefault()
        adicionarTarefaAtual(e)
        excluirTarefa(e)
        /* Tenho que remover a tarefa atual da lista de tarefas normal. depois implementar a tarefa concluida da tarefa atual */
    })


    const btnConcluirTarefa = document.createElement('button')
    btnConcluirTarefa.classList.add('tarefas__lista__item__btns__concluir')
    btnConcluirTarefa.innerHTML = '<i class="fa-solid fa-square-check"></i>'
    btnConcluirTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        concluirTarefa(e)
        excluirTarefa(e)
        toggleContainerTarefasConcluidas()
    })


    const btnAlterarTarefa = document.createElement('button')
    btnAlterarTarefa.classList.add('tarefas__lista__item__btns__alterar')
    btnAlterarTarefa.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'

    btnAlterarTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        criarFormularioAlterarTarefa(e, tarefa)
    })


    const btnExcluirTarefa = document.createElement('button')
    btnExcluirTarefa.classList.add('tarefas__lista__item__btns__excluir')
    btnExcluirTarefa.innerHTML = '<i class="fa-solid fa-square-xmark"></i>'
    btnExcluirTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        excluirTarefa(e)
    })

    const btnVerDetalhes = document.createElement('button')
    btnVerDetalhes.classList.add('tarefas__lista__item__btn-detalhes')
    btnVerDetalhes.innerHTML = `
        Ver detalhes da tarefa
        <i class="fa-solid fa-play"></i>
    `

    const conteudoVerDetalhes = document.createElement('div')
    conteudoVerDetalhes.classList.add('tarefa__lista__item__detalhes')
    conteudoVerDetalhes.innerHTML = tarefa.descricaoTarefa

    btnVerDetalhes.addEventListener('click', (e) => {
        toggleVerDetalhes(e)
    })

    listaBtns.appendChild(btnAdicionarTarefaAtual)
    listaBtns.appendChild(btnConcluirTarefa)
    listaBtns.appendChild(btnAlterarTarefa)
    listaBtns.appendChild(btnExcluirTarefa)

    const divContainer = document.createElement('div')
    divContainer.classList.add('container__tarefa')

    divContainer.appendChild(h3)
    divContainer.appendChild(listaBtns)
    divContainer.appendChild(btnVerDetalhes)
    divContainer.appendChild(conteudoVerDetalhes)

    li.appendChild(divContainer)
    listaTarefas.appendChild(li)

}

function excluirTarefa(e) {
    const li = e.target.closest('.tarefas__lista__item')
    const idElemento = parseInt(li.dataset.id)
    arrayTarefas[0].splice(arrayTarefas[0].findIndex(tarefa => tarefa.id == idElemento), 1)
    li.remove()
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
}

export function concluirTarefa(e) {
    const tarefaConcluida = {
        tituloTarefa: e.target.closest('.tarefas__lista__item').querySelector('.tarefas__lista__item__titulo').innerHTML,
        descricaoTarefa: e.target.closest('.tarefas__lista__item').querySelector('.tarefa__lista__item__detalhes').innerHTML,
        id: sortearID().join('')
    }

    criarTarefaConcluida(tarefaConcluida)

    arrayTarefas[2].push(tarefaConcluida)
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
}



function excluirTarefaConcluida(e) {
    const li = e.target.closest('.tarefas__concluidas__item')
    const idElemento = parseInt(li.dataset.id)
    arrayTarefas[2].splice(arrayTarefas[2].findIndex(tarefa => tarefa.id == idElemento), 1)
    li.remove()
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
    toggleContainerTarefasConcluidas()
}

function adicionarTarefaAtual(e) {
    const objetoTarefaAtual = {
        tituloTarefa: e.target.closest('.tarefas__lista__item').querySelector('.tarefas__lista__item__titulo').innerHTML,
        descricaoTarefa: e.target.closest('.tarefas__lista__item').querySelector('.tarefa__lista__item__detalhes').innerHTML,
        qtdeCiclos: 0
    }
    criarTarefaAtual(objetoTarefaAtual)
    arrayTarefas[1][0] = objetoTarefaAtual
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
}

function criarTarefaAtual(objetoTarefaAtual) {
    tarefaAtual.dataset.tarefa = 'true'

    const tituloTarefaAtual = document.querySelector('.tarefa__atual__item h3')
    tituloTarefaAtual.innerHTML = objetoTarefaAtual.tituloTarefa

    const descricaoTarefa = document.querySelector('.tarefa__atual__item__descricao')
    descricaoTarefa.innerHTML = objetoTarefaAtual.descricaoTarefa

    const qtdeCiclos = document.querySelector('.tarefa__atual__item__ciclos p')
    qtdeCiclos.innerHTML = objetoTarefaAtual.qtdeCiclos

}

function concluirTarefaAtual() {
    const btnConcluirTarefaAtual = document.querySelector('#btnConcluirTarefaAtual')
    btnConcluirTarefaAtual.addEventListener('click', (e) => {
        if (tarefaAtual.dataset.tarefa == 'true') {
            const objetoTarefaConcluida = {
                tituloTarefa: e.target.closest('.tarefa__atual__item').querySelector('h3').innerHTML,
                descricaoTarefa: e.target.closest('.tarefa__atual__item').querySelector('.tarefa__atual__item__descricao').innerHTML,
                qtdeCiclos: e.target.closest('.tarefa__atual__item').querySelector('.tarefa__atual__item__ciclos p').innerHTML,
                id: sortearID().join('')
            }
            criarTarefaConcluida(objetoTarefaConcluida)
            arrayTarefas[2].push(objetoTarefaConcluida)
            limparTarefaAtual()
            tarefaAtual.dataset.tarefa = 'false'
            toggleContainerTarefasConcluidas()
            localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
        }
    })
}

function criarTarefaConcluida(tarefaConcluida) {
    const li = document.createElement('li')
    li.classList.add('tarefas__concluidas__item')
    li.dataset.id = tarefaConcluida.id

    const h3 = document.createElement('h3')
    h3.classList.add('tarefas__concluidas__item__titulo')
    h3.innerHTML = `${tarefaConcluida.tituloTarefa}`

    const divExcluirTarefaConcluida = document.createElement('div')
    divExcluirTarefaConcluida.classList.add('tarefas__concluidas__item__excluir')
    const btnExcluirTarefa = document.createElement('button')
    btnExcluirTarefa.innerHTML = '<i class="fa-solid fa-square-xmark"></i>'
    btnExcluirTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        excluirTarefaConcluida(e)
    })
    divExcluirTarefaConcluida.appendChild(btnExcluirTarefa)

    const btnVerDetalhes = document.createElement('button')
    btnVerDetalhes.classList.add('tarefas__concluidas__item__btn-detalhes')
    btnVerDetalhes.innerHTML = `
        Ver detalhes da tarefa
        <i class="fa-solid fa-play"></i>
    `

    const conteudoVerDetalhes = document.createElement('div')
    conteudoVerDetalhes.classList.add('tarefas__concluidas__item__descricao')
    conteudoVerDetalhes.innerHTML = tarefaConcluida.descricaoTarefa

    btnVerDetalhes.addEventListener('click', (e) => {
        const divDescricao = e.target.closest('.tarefas__concluidas__item').querySelector('.tarefas__concluidas__item__descricao')
        divDescricao.classList.toggle('tarefa__concluida__active')
    })

    li.appendChild(h3)
    li.appendChild(divExcluirTarefaConcluida)
    li.appendChild(btnVerDetalhes)
    li.appendChild(conteudoVerDetalhes)

    listaTarefasConcluidas.appendChild(li)
}

function excluirTarefaAtual() {
    const btnExcluirTarefaAtual = document.querySelector('#btnExcluirTarefaAtual')
    btnExcluirTarefaAtual.addEventListener('click', (e) => {
        if (tarefaAtual.dataset.tarefa == 'true') {
            const objetoTarefa = {
                tituloTarefa: e.target.closest('.tarefa__atual__item').querySelector('h3').innerHTML,
                descricaoTarefa: e.target.closest('.tarefa__atual__item').querySelector('.tarefa__atual__item__descricao').innerHTML,
                id: sortearID().join('')
            }
            criarTarefa(objetoTarefa)
            arrayTarefas[0].push(objetoTarefa)
            limparTarefaAtual()
            tarefaAtual.dataset.tarefa = 'false'
            localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
        }
    })
}

function limparTarefaAtual() {
    arrayTarefas[1][0].tituloTarefa = 'Adicione uma Tarefa'
    arrayTarefas[1][0].descricaoTarefa = ''
    arrayTarefas[1][0].qtdeCiclos = '0'
    document.querySelector('.tarefa__atual__item h3').innerHTML = 'Adicione uma Tarefa'
    document.querySelector('.tarefa__atual__item__descricao').innerHTML = ''
    document.querySelector('.tarefa__atual__item__ciclos p').innerHTML = '0'
}

function toggleContainerTarefasConcluidas() {
    const listaTarefas = document.querySelector('.tarefas')
    const listaTarefasConcluidas = document.querySelectorAll('#listaTarefasConcluidas li')
    const containerTarefasConcluidas = document.querySelector('.tarefas__concluidas')
    listaTarefas.style.gridColumn = '1/3'
    if (listaTarefasConcluidas.length > 0) {
        containerTarefasConcluidas.style.display = 'block'
        listaTarefas.style.gridColumn = '1/2'
        return
    } else {
        containerTarefasConcluidas.style.display = 'none'
        return
    }
}

function criarFormularioAlterarTarefa(e, tarefa){
    const liPai = e.target.closest('.tarefas__lista__item') 

    const formAlterarTarefa = document.createElement('form')
    formAlterarTarefa.classList.add('container__form')

    const labelNovoTituloTarefa = document.createElement('label')
    labelNovoTituloTarefa.setAttribute('for', 'novoTituloTarefa')
    labelNovoTituloTarefa.innerHTML = 'Novo título da tarefa:'
    const inputNovoTituloTarefa = document.createElement('input')
    inputNovoTituloTarefa.id = 'novoTituloTarefa'
    inputNovoTituloTarefa.value = tarefa.tituloTarefa
    inputNovoTituloTarefa.type = 'text'
    inputNovoTituloTarefa.focus()

    const labelNovoDescricaoTarefa = document.createElement('label')
    labelNovoDescricaoTarefa.setAttribute('for', 'novoDescricaoTarefa')
    labelNovoDescricaoTarefa.innerHTML = 'Nova descricão da tarefa'
    const textareaDescricaoTarefa = document.createElement('textarea')
    textareaDescricaoTarefa.id = 'novoDescricaoTarefa'
    textareaDescricaoTarefa.value = tarefa.descricaoTarefa
    textareaDescricaoTarefa.setAttribute('cols', '30')
    textareaDescricaoTarefa.setAttribute('rows', '10')

    const divBotoes = document.createElement('div')
    const buttonAlterarTarefa = document.createElement('button')
    buttonAlterarTarefa.type = 'submit'
    buttonAlterarTarefa.innerHTML = 'Alterar Tarefa'
    buttonAlterarTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        const tarefaAlterada = {
            tituloTarefa: e.target.closest('.container__form').querySelector('#novoTituloTarefa').value,
            descricaoTarefa: e.target.closest('.container__form').querySelector('#novoDescricaoTarefa').value,
            id: tarefa.id
        }
        liPai.querySelector('.tarefas__lista__item__titulo').innerHTML = tarefaAlterada.tituloTarefa
        liPai.querySelector('.tarefa__lista__item__detalhes').innerHTML = tarefaAlterada.descricaoTarefa
        const idTarefaAlterar = arrayTarefas[0].findIndex(t => parseInt(t.id) === parseInt(tarefa.id))
        arrayTarefas[0][idTarefaAlterar] = tarefaAlterada
        localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))

        e.target.closest('.container__form').remove()
    })

    const buttonCancelar = document.createElement('button')
    buttonCancelar.addEventListener('click', (e) => {
        e.preventDefault()
        e.target.closest('.container__form').remove()
    })

    buttonCancelar.innerHTML = 'Cancelar'
    divBotoes.appendChild(buttonAlterarTarefa)
    divBotoes.appendChild(buttonCancelar)

    formAlterarTarefa.appendChild(labelNovoTituloTarefa)
    formAlterarTarefa.appendChild(inputNovoTituloTarefa)
    formAlterarTarefa.appendChild(labelNovoDescricaoTarefa)
    formAlterarTarefa.appendChild(textareaDescricaoTarefa)
    formAlterarTarefa.appendChild(divBotoes)

    liPai.appendChild(formAlterarTarefa)
}