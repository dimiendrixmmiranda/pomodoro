import { criarTopico } from "./criarTopico.js"

export function adicionarTopicoFormulario(btnAdicionarTopicoFormulario) {
    btnAdicionarTopicoFormulario.addEventListener('click', (e) => {
        e.preventDefault()
        const containerFormularioTopicos = e.target.parentElement.querySelector('.principal-tarefas-lista-item-detalhes-formularioTopicos')
        const input = containerFormularioTopicos.querySelector('.principal-tarefas-lista-item-detalhes-formularioTopicos-input')
        const btn = containerFormularioTopicos.querySelector('.principal-tarefas-lista-item-detalhes-formularioTopicos-botao')
        
        btnAdicionarTopicoFormulario.style.display = 'none'
        containerFormularioTopicos.style.display = 'flex'
        
        input.focus()
        btn.addEventListener('click', (e) => criarTopico(e))
    })
}