/* funcao para hacker o intagram */
function hackear(){
    let titulo = document.getElementById("titulo");
    titulo.innerText = "VOCE FOI HACKEADO!";
    titulo.style.color = "#f00";
    titulo.style.fontSize = "50px";
    titulo.style.fontWeight = "bold";
}

function enviarForm(){
    let nome  = document.getElementById("nome");
    let email = document.getElementById("email");

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "<h1>Nome: " + nome.value + "</h1>";
    resultado.innerHTML += "<h2>Email: " + email.value + "</h2>";

    return false;
}