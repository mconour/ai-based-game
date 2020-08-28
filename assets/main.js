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

overlay.style.display = "none";

isEmpty = (el) => {
    return !el.hasChildNodes();
}

reset = () => {
    xWin = false;
    oWin = false;
    squareX = [];
    squareO = [];
    possibleMoves = [];
    aiMove = "";
    option.style.display = "none";

    for (let i = 0; i < 9; i++) {
        col[i].innerHTML = "";
    }
}

checkWin = () => {
    let match = square.join();
    for (let i = 0; i < 8; i++) {
        if (winConditions[i].test(match)) {
            winner.innerHTML = text;
            overlay.style.display = "";
            xWin = x;
            oWin = o;
        }
    }
    checkTie();
}

checkTie = () => {
    if (count > 8 && !xWin && !oWin) {
        winner.innerHTML = "Tie";
        overlay.style.display = "";
    }
}

playGame = () => {
    if (player === 1 && isEmpty(this) && count % 2 === 0) {
        this.innerHTML = '<i class="fa fa-times"></i>';
        squareX.push(this.id);
        count++;
        checkWin(squareX, 'Player wins', true, false);
        if (!xWin) computerO();
    } else if (player === 2 && isEmpty(this) && count % 2 === 0) {
        this.innerHTML = '<i class="fa fa-circle-o"></i>';
        squareO.push(this.id);
        count++;
        checkWin(squareO, 'Player wins', false, true);
        if (!oWin) computerX();
    }
}

doRandom = () => {
    if (count % 2 !== 0 && possibleMoves.length > 0) {
        aiMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        var move = document.getElementById(aiMove);
        move.innerHTML = computerLetter;
        square.push(aiMove);
        count++;
    }
}

computerO = () => {
	possibleMoves = [];
	
	Array.prototype.forEach.call(col, function(el, i){
		if (isEmpty(el)) {
			possibleMoves.push(el.id);
		}
	});

	if (possibleMoves.indexOf('5') > -1) {
		possibleMoves = ['5'];
		doRandom(squareO);
	} else if (possibleMoves.indexOf('5') === -1 && squareX.length === 1) {
		possibleMoves = ['1', '3', '7', '9'];
		doRandom(squareO);
	} else if ((/(?=.*1)(?=.*9)/.test(squareX) || /(?=.*3)(?=.*7)/.test(squareX)) && squareX.length === 2) {
		possibleMoves = ['2', '4', '6', '8'];
		doRandom(squareO);
	} else if (/(1)|(3)|(7)|(9)/.test(squareX) && squareX.indexOf('5') === 0 && squareX.length === 2) {
		possibleMoves = ['1', '3', '7', '9'];

		var index = possibleMoves.indexOf(squareX[1]);
		possibleMoves.splice(index, 1);

		var aiTaken = possibleMoves.indexOf(squareO[0]);
		possibleMoves.splice(aiTaken, 1);

		pushSquare(squareO, squareX);
		doRandom(squareO);
	} else {
		pushSquare(squareO, squareO);
		pushSquare(squareO, squareX);
		doRandom(squareO);
	}

	checkWin(squareO, 'Computer wins', false, true);
}