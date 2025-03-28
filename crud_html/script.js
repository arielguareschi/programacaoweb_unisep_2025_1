// declaracao das variaveis
const playerInput = document.getElementById('player-input');
const xpInput = document.getElementById('xp-input');
const tableBody = document.getElementById('table-body');
const updatePlayerInput = document.getElementById('update-player-input');
const updateXpInput = document.getElementById('update-xp-input');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');

// variavel para armazenar os dados dos jogadores
let players = JSON.parse(localStorage.getItem('players')) || [];
let currentPlayerId = null;

// funcao para adicionar um novo jogador
function addPlayer(){
    const player = playerInput.value.trim();
    const xp = xpInput.value.trim();
    if (player && xp != null){
        var id = 1;
        var val = players.map(
            function(x){
                return x.id;
            }
        ).indexOf(id);
        while (val != -1){
            id++;
            val = players.map(
                function(x){
                    return x.id;
                }
            ).indexOf(id);
        }

        const novo = {
            id: id,
            player: player,
            xp: xp
        };

        players.push(novo);
        localStorage.setItem('players', JSON.stringify(players));
        playerInput.value = '';
        xpInput.value = '';
        renderTable();
    } else{
        alert('Preencha todos os campos!');
    }
}