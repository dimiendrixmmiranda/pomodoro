const bannerTitulo = document.querySelector('#bannerTitulo')
const bannerImg = document.querySelector('#bannerImg')
export function alterarBanner(tipoBtn){
    if(tipoBtn == 'btnTimer'){
        bannerImg.setAttribute('src', '../assets/imgs/svg-1.svg')
        bannerTitulo.innerHTML = 'Pequenos esforços diários levam a grandes conquistas. <strong>Foque por 25 minutos!</strong>'
    }
    if(tipoBtn == 'btnDescansoCurto'){
        bannerImg.setAttribute('src', '../assets/imgs/svg-2.svg')
        bannerTitulo.innerHTML = 'Desacelere por um instante. <strong>Faça uma pausa de 5 minutos!</strong>'
    }
    if(tipoBtn == 'btnDescansoLongo'){
        bannerImg.setAttribute('src', '../assets/imgs/svg-3.svg')
        bannerTitulo.innerHTML = 'Tempo para nutrir corpo e mente com tranquilidade.<strong>Faça uma pausa de 15 minutos!</strong>'
    }
}