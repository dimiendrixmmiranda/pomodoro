import criarElemento from "../assets/criarElemento.js"
import { escreverInformacoesNoLocalStorage } from "../assets/escreveInformacoesNoLocalStorage.js"
import gerarFormulario from "../assets/gerarFormulario.js"
import { arrayInformacoes } from "../informacoes/arrayInformacoes.js"

export default function alterarTarefa(e, dados){
    e.preventDefault()
    const formulario = gerarFormulario()
    const liPai = e.target.closest('.conteudo-tarefas-lista-lista-item')
    const btnAlterar = e.target.parentElement
    
    if(btnAlterar.classList.contains('form-active')){
        btnAlterar.classList.remove('form-active')
        liPai.querySelector('#formAlterarTarefa').remove()
    }else{
        btnAlterar.classList.add('form-active')
        liPai.appendChild(formulario)
        document.querySelector('#alterarTituloTarefa').focus()
        
        formulario.addEventListener('submit', (event) => {
            event.preventDefault()
            const id = liPai.id
            const idElemento = arrayInformacoes[0].findIndex(el => el.id === id)
            // console.log(arrayInformacoes[0][idElemento])
            const inputTitulo = event.target.querySelector('#alterarTituloTarefa') 
            const inputDescricao = event.target.querySelector('#alterarDescricaoTarefa') 

            const novoObjetoTarefa = {
                concluido: dados.concluido,
                descricao: inputDescricao.value.split(/\n/gi).filter(texto => texto),
                id: dados.id,
                titulo: inputTitulo.value
            }
            arrayInformacoes[0][idElemento] = novoObjetoTarefa
            escreverInformacoesNoLocalStorage()

            substituirVisualmente(novoObjetoTarefa, liPai)
            formulario.remove()
            btnAlterar.classList.remove('form-active')
        })

        formulario.addEventListener('reset', (event) => {
            event.preventDefault()
            formulario.remove()
            btnAlterar.classList.remove('form-active')
        })
    }
}

function substituirVisualmente(novoObjetoTarefa, liPai){
    const elementoTituloTarefa = liPai.querySelector('.titulo-tarefa p')
    elementoTituloTarefa.innerHTML = novoObjetoTarefa.titulo
    const elementoDescricaoTarefa = liPai.querySelector('.descricao')
    elementoDescricaoTarefa.innerHTML = ''
    novoObjetoTarefa.descricao.forEach(paragrafo => {
        const p = criarElemento('p', 'container-descricao-texto', paragrafo)
        elementoDescricaoTarefa.appendChild(p)
    })
}