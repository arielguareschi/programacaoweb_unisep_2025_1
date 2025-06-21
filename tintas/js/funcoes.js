const urlBase = "https://tintasweb-b7f7a-default-rtdb.firebaseio.com/tintas";

function gravar() {
    const cor = $('#cor').val();
    const valor = $('#valor').val();
    const dados = JSON.stringify({ cor, valor });

    $.ajax({
        beforeSend: function () {
            $('#loading').show();
        },
        type: 'POST',
        url: `${urlBase}.json`,
        data: dados,
        success: function () {
            $('#loading').hide();
            listar();
        }
    });
}

function listar() {
    $.ajax({
        beforeSend: function () {
            $('#loading-tintas').show();
            $('#tabela-tintas').html('');
            $('#tab-tintas').hide();
        },
        type: 'GET',
        url: `${urlBase}.json`,
        success: function (dados) {
            for (const id in dados) {
                const tinta = dados[id];
                const linha = `<tr>
                <td>${tinta.cor}</td>
                <td>${tinta.valor}</td>
                <td>
                    <span id="${id}" style="display: none;">
                        <img src="images/loading.gif" height="30" />
                    </span>
                    <button class="btn btn-danger" id="btn-${id}" onclick="excluir('${id}')">Excluir</button>
                </td>
                </tr>`;
                $('#tabela-tintas').append(linha);
            }
        },
        complete: function () {
            $('#loading-tintas').hide();
            $('#tab-tintas').show();
        },
        error: function (xhr, status, error) {
            alert(`Erro ao carregar dados: 
                Código: ${xhr.status}
                Status: ${status}
                Mensagem: ${error}`);
        }
    });
}

function excluir(id) {
    $.ajax({
        beforeSend: function () {
            $(`#btn-${id}`).hide();
            $(`#${id}`).show();
        },
        type: 'DELETE',
        url: `${urlBase}/${id}.json`,
        success: function () {
            listar();
        },
        complete: function () {
            $(`#${id}`).hide();
            $(`#btn-${id}`).show();
        }
    });
}

$(document).ready(function () {
    listar();
});