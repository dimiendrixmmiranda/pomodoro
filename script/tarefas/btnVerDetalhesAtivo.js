export function btnVerDetalhesAtivo(btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const elementoDetelhes = e.target.closest('.principal-tarefas-lista-item').querySelector('.principal-tarefas-lista-item-detalhes')
        if (btn.classList.contains('btn-detalhes-active')) {
            btn.classList.remove('btn-detalhes-active')
            elementoDetelhes.style.display = 'none'
        } else {
            btn.classList.add('btn-detalhes-active')
            elementoDetelhes.style.display = 'block'
        }
    })
}