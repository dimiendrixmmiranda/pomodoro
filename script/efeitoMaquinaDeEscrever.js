
const arrayDeFrases = [
    " com dedicação e conquiste seus sonhos.",
    " hoje para um futuro brilhante.",
    ", pois o conhecimento é poder.",
    " sempre, aprenda sempre.",
    " com paixão, vença com determinação.",
    " para ser a melhor versão de si mesmo.",
    ", o sucesso é a soma dos seus esforços.",
    " com foco, alcance a excelência.",
    ", o seu futuro agradece.",
    " para fazer a diferença no mundo.",
]
function maquinaDeEscrever(frase) {
    const texto = document.querySelector('.principal-frases-frase')
    const textoArray = frase.split('')
    textoArray.forEach((letra, i) => {
        setTimeout(() => {
            texto.innerHTML += letra
        }, 170 * i);
    });
}