import { arrayTarefas } from "./arrayDeTarefa.js";

export function escreverInformacoesNoLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas))
}
