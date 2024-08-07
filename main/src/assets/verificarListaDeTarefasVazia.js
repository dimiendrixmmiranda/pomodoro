export default function verificarListaDeTarefasVazia(){
    const lista = document.querySelector('#listaDeTarefas')
    const elementosDaLista = document.querySelector('#listaDeTarefas li')
    if(elementosDaLista === null){
        lista.parentElement.setAttribute('style', 'display: none')
    }else{
        lista.parentElement.setAttribute('style', 'display: grid')
    }
}