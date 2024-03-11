export function toggleVerDetalhes(e) {
    const divConteudoDetalhes = e.target.closest('.tarefas__lista__item').querySelector('.tarefa__lista__item__detalhes')
    divConteudoDetalhes.classList.toggle('active__tarefa__descricao')
}
