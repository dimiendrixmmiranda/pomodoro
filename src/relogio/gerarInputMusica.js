import criarElemento from "../assets/criarElemento.js";

export default function gerarInputMusica(){
    const div = criarElemento('div', 'conteudo-categoria-musica')
    const input = criarElemento('input', 'conteudo-categoria-musica-input', '', 'inputMusica')
    input.setAttribute('type', 'checkbox')
    div.appendChild(input)
    return div
}