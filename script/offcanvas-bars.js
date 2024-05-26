const btnBars = document.querySelector('#btn-bars')
const offcanvasBars = document.querySelector('#offcanvas-bars')
const offcanvasBarsBtnFechar = document.querySelector('#offcanvas-bars-btnfechar')

btnBars.addEventListener('click', fadeIn)
offcanvasBarsBtnFechar.addEventListener('click', fadeOut)

function fadeIn(){
    offcanvasBars.style.display = 'grid'
    offcanvasBars.style.left = '10%'
}

function fadeOut(){
    offcanvasBars.style.left = '100%'
}