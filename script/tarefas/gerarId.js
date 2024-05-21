export function gerarId(){
    const array = []

    for (let i = 0; i <= 5; i++) {
        array.push(parseInt(Math.random() * 10))
    }
    
    return array.join('')
}