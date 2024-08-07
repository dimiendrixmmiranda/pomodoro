export default function definirTema() {
    const inputTema = document.querySelectorAll('#tema')
    inputTema.forEach(input => {
        input.addEventListener('change', (e) => {
            e.preventDefault()
            if (input.checked) {
                document.body.dataset.tema = 'dark'
            } else {
                document.body.dataset.tema = 'ligth'
            }
        })
    })
}