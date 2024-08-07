export default function gerarId() {
    const array = []
    for (let i = 0; i <= 5; i++) {
        array.push(Math.floor(Math.random() * 10))
    }
    return array.join('')
}