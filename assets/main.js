let col = document.querySelectorAll('.col'),
    overlay = document.getElementById('overlay'),
    winner = document.getElementById('winner'),
    button = document.getElementById('button'),
    option = document.getElementById('option'),
    playX = document.getElementById('playX'),
    playO = document.getElementById('playO');

let count = 0;
let player = 0;

let xWin = false;
let oWin = false;
let squareX = [];
let squareO = [];