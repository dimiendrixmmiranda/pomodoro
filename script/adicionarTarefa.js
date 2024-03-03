const btnAdicionarTarefa = document.querySelector('#adicionarTarefa')
const btnAdicionarTarefaLista = document.querySelector('#adicionarTarefaLista')
const tarefaFormulario = document.querySelector('#tarefaFormulario')
export function adicionarTarefa() {
    btnAdicionarTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        tarefaFormulario.classList.toggle('tarefa__formulario__active')
        tarefaFormulario.querySelector('input').focus()
    })
    
    btnAdicionarTarefaLista.addEventListener('click', (e) => {
        e.preventDefault()
        tarefaFormulario.classList.toggle('tarefa__formulario__active')
        limparFormulario()
        btnAdicionarTarefa.focus()
    })
}

function limparFormulario(){
    const input = tarefaFormulario.querySelector('input')
    const textarea = tarefaFormulario.querySelector('textarea')
    input.value = ''
    textarea.value = ''
}