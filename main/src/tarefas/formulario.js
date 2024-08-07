import { escreverInformacoesNoLocalStorage } from "../assets/escreveInformacoesNoLocalStorage.js"
import gerarId from "../assets/gerarId.js"
import verificarListaDeTarefasVazia from "../assets/verificarListaDeTarefasVazia.js"
import { arrayInformacoes } from "../informacoes/arrayInformacoes.js"
import gerarTarefa from "./gerarTarefa.js"

const formulario = document.querySelector('#formTarefas')
const listaDeTarefas = document.querySelector("#listaDeTarefas")
arrayInformacoes[0].forEach(tarefa => {
    const elementoTarefa = gerarTarefa(tarefa)
    listaDeTarefas.appendChild(elementoTarefa)
})


export default function tarefas() {
    acionarFerramenta('negrito')
    acionarFerramenta('italico')
    acionarFerramenta('sup')
    acionarFerramenta('sub')
    acionarFerramenta('sublinhado')
    acionarFerramenta('uppercase')
    acionarFerramenta('lowercase')
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        const tituloTarefa = e.target.querySelector('#tituloTarefa')
        const descricaoTarefa = e.target.querySelector('#descricaoTarefa')

        console.log(window.getSelection().toString()) // FUNCIONA

        const dados = {
            titulo: tituloTarefa.value,
            descricao: descricaoTarefa.value.split(/\n/gi).filter(texto => texto),
            id: gerarId(),
            concluido: false
        }
        arrayInformacoes[0].push(dados)
        escreverInformacoesNoLocalStorage()

        const elementoTarefa = gerarTarefa(dados)
        listaDeTarefas.appendChild(elementoTarefa)
        verificarListaDeTarefasVazia()
        formulario.classList.remove('active')
        formulario.setAttribute('style', 'display: none;')
        limparFormulario([tituloTarefa, descricaoTarefa])
    })
}

function limparFormulario(arrayInputs) {
    arrayInputs.forEach(input => {
        input.value = ''
    })
}

function acionarFerramenta(ferramenta) {
    const elementoFerramenta = document.querySelector(`#${ferramenta}`)
    const descricaoTarefa = document.querySelector('#descricaoTarefa')
    elementoFerramenta.addEventListener('click', (e) => {
        e.preventDefault()
        let descricaoTotal = descricaoTarefa.value
        const textoSelecionado = window.getSelection().toString()
        switch (ferramenta) {
            case 'negrito':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, textoSelecionado.bold())
                break;
            case 'italico':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, textoSelecionado.italics())
                break;
            case 'sub':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, textoSelecionado.sub())
                break;
            case 'sup':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, textoSelecionado.sup())
                break;
            case 'sublinhado':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, `<sublinhado>${textoSelecionado}</sublinhado>`)
                break;
            case 'uppercase':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, textoSelecionado.toUpperCase())
                break;
            case 'lowercase':
                descricaoTarefa.value = descricaoTotal.replace(textoSelecionado, textoSelecionado.toLowerCase())
                break;
            default:
                break;
        }
    })
}