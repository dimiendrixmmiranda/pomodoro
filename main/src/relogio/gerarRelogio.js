import criarElemento from "../assets/criarElemento.js"

export default function gerarRelogio(tempo){
    const t = new Date(tempo * 1000)
    const tempoFormatado = t.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })

    const div = criarElemento('div', 'relogio')
    div.innerHTML = `
        <div class="relogio-circulo">
            <div class="relogio-circulo-dot tempo-dot"></div>
                <svg>
                    <circle cx="90" cy="90" r="90"></circle>
                    <circle cx="90" cy="90" r="90" id="tt"></circle>
                </svg>
            <div id="tempo" class="relogio-circulo-tempo">${tempoFormatado}</div>
        </div>
    `
    return div
}