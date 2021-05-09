'use strict'

const $info = document.querySelector('#info');
const $gameField = document.querySelector('#game-field');
const tictactoe = ['zero.svg', 'cross.svg'];
const winCombination = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]];
var playerNow;


function renderGame() {
    playerNow = 1;
    $info.textContent = `Player ${playerNow} turn`;
    $gameField.textContent = '';
    for(let i = 1; i <= 9; $gameField.insertAdjacentHTML('beforeend', `<div class="cell" id="cell${i++}"></div>`));
}

$gameField.addEventListener('click', function(e) {
    if( e.target.id.indexOf('cell') != -1 ) {
        if(e.target.innerHTML.indexOf('img') == -1) {
            const image = document.createElement('img');
            image.src = tictactoe[playerNow - 1];
            image.width = 100;
            e.target.appendChild(image);
            e.target.setAttribute('data-cell', playerNow)
            if(checkWin()) {
                $info.textContent = `PLAYER ${playerNow} WIN!`;
                //renderGame();
                return;
            }
            if(playerNow++ > 1) playerNow = 1;
            $info.textContent = `Player ${playerNow} turn`;
        }
    }
});

function checkWin() {
    const $cells = $gameField.querySelectorAll('.cell');
    let winStatus = 0, cell = [];
    $cells.forEach(function(item) { cell.push(Number(item.getAttribute('data-cell'))); });
    winCombination.forEach(function(comb, i) {
        if(cell[comb[0]-1] == playerNow && cell[comb[1]-1] == playerNow && cell[comb[2]-1] == playerNow) {
            winStatus = 1;
            comb.forEach(function(e) { $cells[e-1].className = 'win' });
        }
    });
    return winStatus ? true : false;
} 

renderGame();