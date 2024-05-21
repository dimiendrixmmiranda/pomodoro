const listaDeBotoesTimer = document.querySelectorAll('.principal-timers-botoes-btn')
const principalTarefasFormulario = document.querySelector('#principalTarefasFormulario')
const listaDeTopicos = document.querySelector('.principal-tarefas-formulario-topicos-lista')

listaDeBotoesTimer.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        listaDeBotoesTimer.forEach(btn => btn.classList.remove('botao-ativo'))
        btn.classList.add('botao-ativo')
    })
})