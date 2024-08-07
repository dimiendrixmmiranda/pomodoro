import criarElemento from "./criarElemento.js";

export default function gerarCaixaDeMensagem(mensagem){
    const containerMensagem = criarElemento('div', 'caixa-mensagem')
    const p = criarElemento('p', 'caixa-mensagem-texto', mensagem)
    const btnSim = criarElemento('button', 'caixa-mensagem-botao', 'Sim', 'btnSim')
    const btnNao = criarElemento('button', 'caixa-mensagem-botao', 'Não', 'btnNao')
    containerMensagem.appendChild(p)
    containerMensagem.appendChild(btnSim)
    containerMensagem.appendChild(btnNao)
    return containerMensagem
}