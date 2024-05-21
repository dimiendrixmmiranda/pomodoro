export function btnNovaTarefaAtivo(principalTarefasFormulario) {
    const adicionarNovaTarefa = document.querySelector('#adicionarNovaTarefa')
    adicionarNovaTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        if (adicionarNovaTarefa.classList.contains('botao-ativo')) {
            adicionarNovaTarefa.classList.remove('botao-ativo')
            principalTarefasFormulario.style.display = 'none'
        } else {
            adicionarNovaTarefa.classList.add('botao-ativo')
            principalTarefasFormulario.style.display = 'flex'
        }
    })
}