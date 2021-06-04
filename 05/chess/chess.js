'use strict'

window.onload = function() {
    renderChessBoard();
    placementShapes();
    moveShape(24, 44);
    moveShape(76, 56);
    moveShape(13, 35);
    moveShape(82, 63);
};

let cell_size = ( document.documentElement.scrollHeight ) / 10;

function renderChessBoard() {
    document.getElementById("chess-board").innerHTML += `<table style="margin: auto; border-collapse: collapse; text-align: center;" border="0px"><tbody id="chess"><tr id="chess_alphabet" height="${cell_size/2}"><td width="${cell_size/2}">`;
    for(let i = 'A'.charCodeAt(0); i <= 'H'.charCodeAt(0); i++) document.getElementById("chess_alphabet").innerHTML += `<td width="${cell_size}"><b>${String.fromCharCode(i)}</b></td>`;
    document.getElementById("chess").innerHTML += `<tr height="${cell_size}"><td>1</td><td id="chess_in" colspan="8" rowspan="8" style="margin: 0; padding: 0;"></td></tr>`;
    for(let i = 2; i <= 8; i++) document.getElementById("chess").innerHTML += `<tr height="${cell_size}"><td><b>${i}</b></td></tr>`;

    document.getElementById("chess_in").innerHTML += `<table style="border-collapse: collapse; text-align: center;" border="1px"><tbody id="board">`;
    for(let x = 1; x < 9; x++) {
        document.getElementById("board").innerHTML += `<tr id="chess-line-${x}" height="${cell_size}px">`;
        for(let y = 1; y < 9; y++) {
            document.getElementById("chess-line-"+x).innerHTML += `<td id="c${x*10+y}" width="${cell_size}px" style="padding: 0; background: ${ (y - x % 2) % 2 ? "#bbb" : "#555" };">`;
        }
    }
}

function placementShapes() {
    let plShapes = ["r", "h", "e", "q", "k", "e", "h", "r"]
    for(let i = 1; i <= 8; i++) {
        document.getElementById("c1"+i).innerHTML += `<img src="img/${plShapes[i-1]}w.svg" alt="" height="${cell_size/1.5}px" />`;
        document.getElementById("c2"+i).innerHTML += `<img src="img/pw.svg" alt="" height="${cell_size/1.5}px" />`;
        document.getElementById("c7"+i).innerHTML += `<img src="img/pb.svg" alt="" height="${cell_size/1.5}px" />`;
        document.getElementById("c8"+i).innerHTML += `<img src="img/${plShapes[i-1]}b.svg" alt="" height="${cell_size/1.5}px" />`;
    }
}

function moveShape(from, to) {
    document.getElementById("c"+to).innerHTML = document.getElementById("c"+from).innerHTML;
    document.getElementById("c"+from).innerHTML = "";
}