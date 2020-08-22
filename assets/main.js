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

let possibleMoves = [];
let aiMove = "";
let computerLetter;

let winConditions = [
    /(?=.*1)(?=.*2)(?=.*3)/,
	/(?=.*4)(?=.*5)(?=.*6)/,
	/(?=.*7)(?=.*8)(?=.*9)/,

	/(?=.*1)(?=.*4)(?=.*7)/,
	/(?=.*2)(?=.*5)(?=.*8)/,
	/(?=.*3)(?=.*6)(?=.*9)/,

	/(?=.*1)(?=.*5)(?=.*9)/,
	/(?=.*3)(?=.*5)(?=.*7)/
]
