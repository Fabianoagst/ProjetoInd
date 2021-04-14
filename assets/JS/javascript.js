//--------------------MENU--------------------
var produtos = JSON.parse(localStorage.getItem("produtos"));
if (produtos==null){
    produtos=[]
}
reescreveLista()
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

//--------------------VALIDAÇÃO DE CAMPO VAZIO--------------------

function trataFormulario(e){
    e.preventDefault()
    if (e.target.elements.tipodeTransacao.value == ""){
        e.target.elements.tipodeTransacao.parentElement.querySelector("span").style.display = "block";
        return false    
    }
    if (e.target.elements.mercadoria.value == ""){
        e.target.elements.mercadoria.parentElement.querySelector("span").style.display = "block";
        return false
    }
    if (e.target.elements.valor.value <= 0){
        e.target.elements.valor.parentElement.querySelector("span").style.display = "block";
        return false
    }
    var novoProduto = {
        tipo: e.target.elements.tipodeTransacao.value,
        nome: e.target.elements.mercadoria.value,
        valor: e.target.elements.valor.value
    }
    document.querySelector("form").reset()
    produtos.push(novoProduto)
    reescreveLista()
    localStorage.setItem("produtos", JSON.stringify(produtos))

    return false
}

//--------------------------ITENS--------------------

document.getElementById('meuForm').addEventListener('submit',trataFormulario);

//Limpar erros
function clearErros(ev){
   ev.target.parentElement.querySelector("span").style.display = "none";
}

// Lista do extrato
function reescreveLista(){
    document.querySelector(".itens").innerHTML =""
    var total = 0
    for(let i =0; i<produtos.length; i++){
        if(produtos[i].tipo == "venda"){
            tipodeTransacao = "+"
        }else{
            tipodeTransacao = "-"
        }
        document.querySelector(".itens").innerHTML +=`
        <div id="item" class="item" onclick="removeItem(event,`+ i + `)">
            <div class="mercadoria">
                <div class="sinal">`+ tipodeTransacao +`</div>
                <div class="nomemercadoria">`+ produtos[i].nome +`</div>
            </div>
            <div class="valormercadoria">`+ produtos[i].valor +`</div>
        </div>`
        
        total+= parseFloat((tipodeTransacao+produtos[i].valor).replace(/\./g,"").replace(",","."))
    }

    //Inserção do valor total
    document.querySelector("#valorTotal").innerHTML ="R$"+ total
    
    //Prejuízo ou Lucro
    if (total<0){
        document.querySelector(".lucro").innerHTML = "[PREJUÍZO]"
    }else if(total>0){
        document.querySelector(".lucro").innerHTML = "[LUCRO]" 
    }else{
        document.querySelector(".lucro").innerHTML = ""
    }
    if (produtos.length==0){
    document.querySelector(".itens").innerHTML =`
    <div class="nomemercadoria addvazia">Por favor, adicione uma nova transação.</div>
    `
    }
}

//Remove item
function removeItem(evt, index){
    produtos.splice(index, 1)
    localStorage.setItem("produtos", JSON.stringify(produtos))
    reescreveLista()
}

function limparDados(){
    localStorage.clear()     
    console.log("funcionou")
}

//--------------------VALIDAÇÃO CAMPO VALOR-----------------------
function applyMask(evt) {
    evt.preventDefault()
    if(["0","1","2","3","4","5","6","7","8","9"].indexOf(evt.key) == -1) {
        // console.log("letra")
    } else { 
        // console.log("1",evt.target.value)
        let value = evt.target.value.replace(/^0,/, "").replace(",","").replace(/\./g, "") + evt.key
        if(value.length <= 2) {
            evt.target.value = "0," +value
            // console.log("2",evt.target.value, value.length, value)
        } else {
            evt.target.value = value.slice(0,-2) + ',' + value.slice(value.length-2,value.length) 
            // console.log("3",evt.target.value, value.length, value, value.slice(0,value.length-2), value.slice(value.length-2,value.length))
        }
        lastIndex = -1
        value = evt.target.value.replace(/^0,[0-9]+/, "").replace(/,[0-9]+$/,"").replace(/\./g, "")
        // console.log(value)
        if (value.length >= 4) {
            valuefinal = [];
            for (let i = value.length; i>=0; i--) {
                if ((value.length-i)%3 == 0 && value.slice(i-3, i)) {
                    valuefinal.push(value.slice(i-3, i))
                    lastIndex=i
                }
            }
            // console.log(valuefinal)
            valufinalstring = valuefinal.reverse().join(".")
            evt.target.value = valufinalstring + "," + evt.target.value.replace(/^[0-9.]+,/, "")
            if (value.slice(0,lastIndex-3)) {
                evt.target.value = value.slice(0,lastIndex-3) + '.' + evt.target.value
            }
            
        }
    }
}