export default function toggleBtnVerDetalhes(e, dados){
    e.preventDefault()
    const li = e.target.closest('.conteudo-tarefas-lista-lista-item')
    const containerDescricao = li.querySelector('.container:nth-child(2)')
    const btn = e.target
    if(btn.classList.contains('active-btn')){
        btn.classList.remove('active-btn')
        containerDescricao.setAttribute('style', 'display: none')
    }else{
        btn.classList.add('active-btn')
        if(dados.concluido){
            containerDescricao.setAttribute('style', 'display: flex; background-color: #059212!important;')
        }else{
            containerDescricao.setAttribute('style', 'display: flex; background-color: #16065f!important;')
        }
        
    }
}