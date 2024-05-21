const btnAdicionarTopico = document.querySelector('#btnAdicionarTopico')
btnAdicionarTopico.addEventListener('click', (e) => {
    e.preventDefault()
    const listaTopicos = document.querySelector('.principal-tarefas-formulario-topicos-lista')
    btnAdicionarTopico.style.display = 'none'
    const div = btnAdicionarTopico.parentElement.querySelector('#containerInserirTopico')
    div.style.display = 'flex'

    const btnAdicionarTopicoSecundario = div.querySelector('#btnAdicionarTopicoNaLista')
    btnAdicionarTopicoSecundario.addEventListener('click', (e) => {
        e.preventDefault()
        const input = e.target.parentElement.querySelector('.principal-tarefas-formulario-topicos-input')
        listaTopicos.style.display = 'flex'
        const li = criarLi(input)
        listaTopicos.appendChild(li)
        input.value = ''
        input.focus()
    })
})


function criarLi(input) {
    const li = document.createElement('li')
    li.classList.add('principal-tarefas-formulario-topicos-lista-item')
    const p = document.createElement('p')
    p.innerHTML = input.value
    const btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    btnExcluir.addEventListener('click', (e) => {
        e.preventDefault()
        const li = e.target.closest('.principal-tarefas-formulario-topicos-lista-item')
        li.remove()
    })
    li.appendChild(p)
    li.appendChild(btnExcluir)
    return li
}