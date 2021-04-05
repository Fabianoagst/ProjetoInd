//--------------------MENU--------------------

let menubutton = document.querySelector('#menubutton')
let menu = document.querySelector('.menu')
let fechar = document.querySelector('.fechar')

menubutton.addEventListener('click', function(){
    menu.classList.toggle('active')
})

fechar.addEventListener('click', function(){
    menu.classList.toggle('active')
    console.log('acionou')
})

//--------------------VALIDAÇÃO--------------------

function trataFormulario(e){
    e.preventDefault()
    console.log(e.target.elements)
    
    if (e.target.elements.tipodeTransacao.value == ""){
        e.target.elements.tipodeTransacao.parentElement.querySelector("span").style.display = "block";
         
    }
    if (e.target.elements.mercadoria.value == ""){
        e.target.elements.mercadoria.parentElement.querySelector("span").style.display = "block";
        return false;
    }
    if (e.target.elements.valor.value == ""){
        e.target.elements.valor.parentElement.querySelector("span").style.display = "block";
        return false;
    }

    if (e.target.elements.valor.value <= 0){
        alert("Digite um valor válido!")
        return false;
    }

    let tipodeTransacao = "-";

    if(e.target.elements.tipodeTransacao.value == "venda"){
        tipodeTransacao = "+"

    }

    return false
}


document.getElementById('meuForm').addEventListener('submit',trataFormulario)