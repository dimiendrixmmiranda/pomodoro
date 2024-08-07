import { arrayInformacoes } from "../informacoes/arrayInformacoes.js";

export function escreverInformacoesNoLocalStorage(){
    localStorage.setItem('informacoes', JSON.stringify(arrayInformacoes))
}