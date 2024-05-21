import { identificarRelogio } from "./gerarRelogio.js";
const listaDeBotoes = document.querySelectorAll('.principal-timers-botoes-btn')
listaDeBotoes.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        if(btn.classList.contains('botao-ativo')){
            const tipoRelogio = btn.dataset.tipo
            identificarRelogio(tipoRelogio)
        }
    })
})

identificarRelogio(listaDeBotoes[0].dataset.tipo)