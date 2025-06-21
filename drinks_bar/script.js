// script.js
const urlBase = "https://drinks-bar-817d7-default-rtdb.firebaseio.com/perfil";

function adicionar(){
    const nome = $("#nome").val();
    const idade = $("#idade").val();
    const perfil = $("#perfil").val();
    const dados = JSON.stringify({nome, idade, perfil});

    $.post(`${urlBase}.json`, dados, () => {
        alert("Dados adicionados com sucesso!");
        $("#nome").val("");
        $("#idade").val("");
        $("#perfil").val("");
        listar();
    });
}

function listar(){
    $.get(`${urlBase}.json`, data => {
        $("#lista").html("");
        for(const id in data){
            const usuario = data[id];
            $("#lista").append(`
                <li class="list-group-item d-flex justify-content-between 
                            align-items-center">
                    <div>
                        <strong>${usuario.nome}</strong> - ${usuario.idade}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-warning me-2" 
                            onclick="editar('${id}', '${usuario.nome}', 
                                            '${usuario.idade}', 
                                            '${usuario.perfil}' )">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" 
                            onclick="excluir('${id}')">
                            Excluir
                        </button>
                    </div>
                </li>
            `);
        }
    });
}

function editar(id, nome, idade, perfil){
    const novoNome = prompt("Novo nome:", nome);
    const novaIdade = prompt("Nova idade:", idade);
    const novoPerfil = prompt("Novo perfil:", perfil);
    const dados = JSON.stringify({
        nome: novoNome, 
        idade: novaIdade,  
        perfil: novoPerfil
    });
    $.ajax({
        url: `${urlBase}/${id}.json`,
        method: "PUT", 
        data: dados, 
        success: listar
    });
}
function excluir(id){
    $.ajax({
        url: `${urlBase}/${id}.json`, 
        method: "DELETE", 
        success: listar
    });
}

$(document).ready(() => {
    listar();
});