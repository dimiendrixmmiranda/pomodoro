export function sortearID() {
    const arrayNumerosSorteados = []
    for (let i = 0; i < 5; i++) {
        arrayNumerosSorteados.push((Math.random() * 9).toFixed(0))
    }
    return arrayNumerosSorteados
}