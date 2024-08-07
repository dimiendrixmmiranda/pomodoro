import criarElemento from "../assets/criarElemento.js";
import alterarTarefa from "./alterarTarefa.js";
import concluirTarefa from "./concluirTarefa.js";
import excluirTarefa from "./excluirTarefa.js";
import toggleBtnVerDetalhes from "./toggleBtnVerDetalhes.js";

export default function gerarTarefa(dados) {
    const li = criarElemento('li', 'conteudo-tarefas-lista-lista-item', '', dados.id)
    const container1 = criarElemento('div', 'container')

    const tituloTarefa = criarElemento('div', 'titulo-tarefa')
    const p = criarElemento('p', '', dados.titulo)
    tituloTarefa.appendChild(p)

    const containerAcoesTarefa = criarElemento('div', 'botoes-acoes-tarefa')
    const btnConcluirTarefa = criarElemento('button', 'concluir', '<i class="fa-regular fa-square-check"></i>')
    btnConcluirTarefa.addEventListener('click', (e) => { concluirTarefa(e) })

    const btnExcluirTarefa = criarElemento('button', 'excluir', '<i class="fa-regular fa-rectangle-xmark"></i>')
    btnExcluirTarefa.addEventListener('click', (e) => { excluirTarefa(e) })
    
    const btnAlterarTarefa = criarElemento('button', 'alterar', '<i class="fa-regular fa-pen-to-square"></i>')
    btnAlterarTarefa.addEventListener('click', (e) => { alterarTarefa(e, dados)})

    const btnArquivarTarefa = criarElemento('button', 'arquivar', '<i class="fa-solid fa-folder-open"></i>')
    containerAcoesTarefa.appendChild(btnConcluirTarefa)
    containerAcoesTarefa.appendChild(btnExcluirTarefa)
    containerAcoesTarefa.appendChild(btnAlterarTarefa)
    containerAcoesTarefa.appendChild(btnArquivarTarefa)

    const btnVerDetalhes = criarElemento('button', 'botao-ver-detalhes', 'Ver detalhes <i class="fa-solid fa-turn-down"></i>')
    btnVerDetalhes.addEventListener('click', (e) => {toggleBtnVerDetalhes(e, dados)})
    
    container1.appendChild(tituloTarefa)
    container1.appendChild(containerAcoesTarefa)
    container1.appendChild(btnVerDetalhes)

    const container2 = criarElemento('div', 'container')
    container2.classList.add('descricao')
    dados.descricao.forEach(texto => {
        const p = criarElemento('p', 'container-descricao-texto', texto)
        container2.appendChild(p)
    })


    verificarTarefaConcluida(dados, container1, container2, btnVerDetalhes)

    li.appendChild(container1)
    li.appendChild(container2)
    return li
}

function verificarTarefaConcluida(dados, container1, container2, btnVerDetalhes){
    if (dados.concluido) {
        container1.setAttribute('style', 'background-color: #059212')
        container2.setAttribute('style', 'background-color: #059212')
        btnVerDetalhes.setAttribute('style', 'background-color: #03580c')
    } else {
        container1.setAttribute('style', 'background-color: #16065f')
        container2.setAttribute('style', 'background-color: #16065f')
        btnVerDetalhes.setAttribute('style', 'background-color: #2000af')
    }
}