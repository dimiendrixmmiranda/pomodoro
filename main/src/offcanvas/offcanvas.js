const btnAbrirOffcanvas = document.querySelector('#btnOffcanvas')
const btnFecharOffcanvas = document.querySelector('#btnOffcanvasFechar')
const elementoOffcanvas = document.querySelector('#offcanvas')

export default function offcanvas(){
    btnAbrirOffcanvas.addEventListener('click', (e) => {
        e.preventDefault()
        elementoOffcanvas.setAttribute('style', 'display: grid; right: 0%')
    })

    btnFecharOffcanvas.addEventListener('click', (e) => {
        e.preventDefault()
        elementoOffcanvas.setAttribute('style', 'right: -80%, display: none')
    })
}