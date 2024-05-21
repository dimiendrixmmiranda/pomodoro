const inputAltararModo = document.querySelectorAll('#alterarModo')
inputAltararModo.forEach(input => {
    input.addEventListener('change', (e) => {
        e.preventDefault()
        const bodyTema = document.querySelector('body')
        if(input.checked){
            bodyTema.dataset.tema = 'escuro'
        }else{
            bodyTema.dataset.tema = 'claro'
        }
    })
})