import { arrayTarefas } from "./arrayDeTarefa.js";

export function acharElementoDentroDoArrayPeloId(idElemento){
    return arrayTarefas.findIndex(el => el.id == idElemento)
}