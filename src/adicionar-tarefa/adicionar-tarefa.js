const btnAdicionarTarefa = document.querySelector('#adicionarTarefa')
const formulario = document.querySelector('#formTarefas')

export default function adicionarTarefa(){
    btnAdicionarTarefa.addEventListener('click', (e) => {
        e.preventDefault()
        if(!formulario.classList.contains('active')){
            formulario.classList.add('active')
        }else{
            formulario.classList.remove('active')
        }
    })
}