const btnAdicionarTarefa = document.querySelector('.titulo-botao')
const formAdicionarTarefa = document.querySelector('#formAdicionarTarefa')
const btnSalvarTarefa = document.querySelector('#salvar-tarefa')

const inputTituloTarefa = document.querySelector('#input-titulo')
const inputDescricaoTarefa = document.querySelector('#input-descricao')


btnAdicionarTarefa.addEventListener('click', () => {    
    formAdicionarTarefa.classList.toggle('show')
})

formAdicionarTarefa.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('enviar')
    formAdicionarTarefa.classList.toggle('show')
    console.log(inputDescricaoTarefa.value)
})