export default function criarElemento(tag, classe = '', conteudo = '', id = ''){
    const elemento = document.createElement(tag)
    if(classe != ''){
        elemento.classList.add(classe)
    }
    if(conteudo != ''){
        elemento.innerHTML = conteudo
    }
    if(id != ''){
        elemento.id = id
    }
    return elemento
}