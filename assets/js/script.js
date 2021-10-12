let seuVoto = document.querySelector('.divisao1-1 span');
let cargo = document.querySelector('.divisao1-2 span');
let descricao = document.querySelector('.divisao1-4');
let aviso = document.querySelector('.divisao2');
let divisaoDireita = document.querySelector('.divisao1-right');

let numeros = document.querySelector('.divisao1-3');


let etapaAtual = 0;
let numero = '';
let votoEmBranco = false;
let votos = [];

function exibirEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoEmBranco = false;

    for(let i =0; i < etapa.numeros; i++){
        if (i === 0) {
            numeroHtml += '  <div class="numero pisca"></div>';
        }else{
            numeroHtml += '  <div class="numero"></div>';
        }
    }

    seuVoto.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    divisaoDireita.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero === numero) {
            return true;
        }else{
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br> PARTIDO: ${candidato.partido}`;

        let fotoCandidato = '';

        for(let i in candidato.fotos){
            if (candidato.fotos[i].small) {
                fotoCandidato += `<div class="divisao1-image small"> <img src="assets/images/${candidato.fotos[i].url}" alt="imagem do prefeito">${candidato.fotos[i].legenda}</div>`;
                
            }else{
                fotoCandidato += `<div class="divisao1-image"> <img src="assets/images/${candidato.fotos[i].url}" alt="imagem do prefeito">${candidato.fotos[i].legenda}</div>`;
            }
        
         }

        divisaoDireita.innerHTML = fotoCandidato;
    }else{
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO !!!</div>';
    }
}


//funções
function clicou(n){
    let elementoNumero = document.querySelector('.numero.pisca');
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca');
        if (elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add('pisca');
        }else{
           atualizaInterface();
        }
    }
}

function branco(){
    if (numero === '') {
        votoEmBranco = true;

        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO !!!</div>';
    }else{
        alert('Para votar em branco, não digite nenhum valor');
    }
}

function corrige(){
    exibirEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    let confirmaVoto = false;

    if (votoEmBranco === true) {
          confirmaVoto = true;  
          votos.push({
              etapa: etapas[etapaAtual.titulo],
              voto:'branco'
          });
    }else if(numero.length === etapa.numeros){
        confirmaVoto = true;

        votos.push({
            etapa: etapas[etapaAtual.titulo],
            voto:numero
        });

    }

    if (confirmaVoto) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            exibirEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-final pisca">FIM !!!</div>';
            console.log(votos);
        }
    }
}

exibirEtapa();