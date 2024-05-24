const btnBars = document.querySelector('#btn-bars')
const offcanvasBars = document.querySelector('#offcanvas-bars')
const offcanvasBarsBtnFechar = document.querySelector('#offcanvas-bars-btnfechar')

btnBars.addEventListener('click', fadeIn)
offcanvasBarsBtnFechar.addEventListener('click', fadeOut)

function fadeIn(){
    console.log(offcanvasBars)
    offcanvasBars.style.display = 'grid'
}

function fadeOut(){
    const offcanvasBars = document.querySelector('#offcanvas-bars')
    offcanvasBars.style.display = 'none'
}