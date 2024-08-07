import criarElemento from "./criarElemento.js";

export default function gerarFormulario() {
    const formulario = criarElemento('form', 'alterar-tarefa', '', 'formAlterarTarefa')

    const novoTitulo = criarElemento('fieldset', 'alterar-tarefa-titulo', 
        `
            <label for="alterarTituloTarefa">Titulo da Tarefa:</label>
            <input type="text" name="alterarTituloTarefa" id="alterarTituloTarefa">
        `)
    const novoDescricao = criarElemento('fieldset', 'alterar-tarefa-descricao', 
        `
            <label for="alterarDescricaoTarefa">Descrição da Tarefa:</label>
            <textarea name="alterarDescricaoTarefa" id="alterarDescricaoTarefa"></textarea>
        `)
    const divBotoes = criarElemento('div', 'alterar-tarefa-botoes')
    const btnAlterar = criarElemento('button', 'alterar-tarefa-alterar', 'Alterar Tarefa')
    btnAlterar.setAttribute('type', 'submit')
    const btnCancelarAlteracao = criarElemento('button', 'alterar-tarefa-cancelar', 'Cancelar Alteração')
    btnCancelarAlteracao.setAttribute('type', 'reset')
    divBotoes.appendChild(btnAlterar)
    divBotoes.appendChild(btnCancelarAlteracao)

    formulario.appendChild(novoTitulo)
    formulario.appendChild(novoDescricao)
    formulario.appendChild(divBotoes)
    return formulario
}