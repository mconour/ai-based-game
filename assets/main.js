const column = document.querySelectorAll('.column'),
	intro = document.getElementById('intro'),
	winnerDisplay = document.getElementById('display-winner'),
	btn = document.getElementById('btn'),
	option = document.getElementById('option'),
	playX = document.getElementById('playX'),
	playO = document.getElementById('playO');

let count = 0;
let player = 0;

let xWin = false;
let oWin = false;
let squareX = [];
let squareO = [];

let potentialMoves = [];
let aiMove = '';
let computerLetter;

const winConditions = [
	/(?=.*1)(?=.*2)(?=.*3)/,
	/(?=.*4)(?=.*5)(?=.*6)/,
	/(?=.*7)(?=.*8)(?=.*9)/,

	/(?=.*1)(?=.*4)(?=.*7)/,
	/(?=.*2)(?=.*5)(?=.*8)/,
	/(?=.*3)(?=.*6)(?=.*9)/,

	/(?=.*1)(?=.*5)(?=.*9)/,
	/(?=.*3)(?=.*5)(?=.*7)/
];

intro.style.display = 'none';

isEmpty = (el) => {
	return !el.hasChildNodes();
}

resetGame = () => {
	xWin = false;
	oWin = false;
	squareX = [];
	squareO = [];
	potentialMoves = [];
	aiMove = '';
	option.style.display = 'none';

	for (let i = 0; i < 9; i++) {
		column[i].innerHTML = '';
	}
}

checkWinner = (square, text, x, o) => {
	const match = square.join();
	for (let i = 0; i < 8; i++) {
		if (winConditions[i].test(match)) {
			winnerDisplay.innerHTML = text;
			intro.style.display = '';
			xWin = x;
			oWin = o;
		}
	}
	checkScratch();
}

checkScratch = () => {
	if (count > 8 && !xWin && !oWin) {
		winnerDisplay.innerHTML = `Scratch`;
		intro.style.display = '';
	}
}

function startGame() {
	if (player === 1 && isEmpty(this) && count % 2 === 0) {
		this.innerHTML = '<i class="fa fa-times"></i>';
		squareX.push(this.id);
		count++;
		checkWinner(squareX, `You win!`, true, false);
		if (!xWin) computerO();
	} else if (player === 2 && isEmpty(this) && count % 2 === 0) {
		this.innerHTML = '<i class="fa fa-circle-o"></i>';
		squareO.push(this.id);
		count++;
		checkWinner(squareO, `You win!`, false, true);
		if (!oWin) computerX();
	}
}

random = (square) => {
	if (count % 2 !== 0 && potentialMoves.length > 0) {
		aiMove = potentialMoves[Math.floor(Math.random() * potentialMoves.length)];
		const move = document.getElementById(aiMove);
		move.innerHTML = computerLetter;
		square.push(aiMove);
		count++;
	}
}

computerO = () => {
	potentialMoves = [];

	Array.prototype.forEach.call(column, function (el, i) {
		if (isEmpty(el)) {
			potentialMoves.push(el.id);
		}
	});

	if (potentialMoves.indexOf('5') > -1) {
		potentialMoves = ['5'];
		random(squareO);
	} else if (potentialMoves.indexOf('5') === -1 && squareX.length === 1) {
		potentialMoves = ['1', '3', '7', '9'];
		random(squareO);
	} else if ((/(?=.*1)(?=.*9)/.test(squareX) || /(?=.*3)(?=.*7)/.test(squareX)) && squareX.length === 2) {
		potentialMoves = ['2', '4', '6', '8'];
		random(squareO);
	} else if (/(1)|(3)|(7)|(9)/.test(squareX) && squareX.indexOf('5') === 0 && squareX.length === 2) {
		potentialMoves = ['1', '3', '7', '9'];

		const index = potentialMoves.indexOf(squareX[1]);
		potentialMoves.splice(index, 1);

		const aiTaken = potentialMoves.indexOf(squareO[0]);
		potentialMoves.splice(aiTaken, 1);

		pushSquare(squareO, squareX);
		random(squareO);
	} else {
		pushSquare(squareO, squareO);
		pushSquare(squareO, squareX);
		random(squareO);
	}

	checkWinner(squareO, 'Computer wins', false, true);
}

computerX = () => {
	const oppositeCorner = (10 - squareX[0]).toString();
	const firstAiMove = potentialMoves.indexOf(squareX[0]);
	const indexOfOpposite = potentialMoves.indexOf(oppositeCorner);
	potentialMoves = [];

	Array.prototype.forEach.call(column, function (el, i) {
		if (isEmpty(el)) {
			potentialMoves.push(el.id);
		}
	});

	if (squareO.length === 0) {
		potentialMoves = ['1', '3', '7', '9'];
		random(squareX);
	} else if (squareO.indexOf('5') === 0 && squareO.length === 1) {
		potentialMoves = ['1', '3', '7', '9'];
		potentialMoves = oppositeCorner;

		random(squareX);
	} else if (/(2)|(4)|(6)|(8)/.test(squareO) && squareO.length === 1) {
		potentialMoves = ['1', '3', '7', '9'];
		potentialMoves.splice(firstAiMove, 1);
		potentialMoves.splice(indexOfOpposite, 1);

		random(squareX);
	} else if (/(2)|(4)|(6)|(8)/.test(squareO) && squareO.length === 2 && potentialMoves.indexOf('5') > -1) {
		potentialMoves = ['5'];
		random(squareX);
	} else {
		pushSquare(squareX, squareX);
		pushSquare(squareX, squareO);
		random(squareX);
	}

	checkWinner(squareX, 'Computer wins', true, false);
}

doAiMove = (square) => {
	const conditions = {
		rows: {
			a: /(?=.*1)(?=.*2)/,
			b: /(?=.*1)(?=.*3)/,
			c: /(?=.*2)(?=.*3)/,
			d: /(?=.*4)(?=.*5)/,
			e: /(?=.*4)(?=.*6)/,
			f: /(?=.*5)(?=.*6)/,
			g: /(?=.*7)(?=.*8)/,
			h: /(?=.*7)(?=.*9)/,
			i: /(?=.*8)(?=.*9)/
		},
		columns: {
			a: /(?=.*1)(?=.*4)/,
			b: /(?=.*1)(?=.*7)/,
			c: /(?=.*4)(?=.*7)/,
			d: /(?=.*2)(?=.*5)/,
			e: /(?=.*2)(?=.*8)/,
			f: /(?=.*5)(?=.*8)/,
			g: /(?=.*3)(?=.*6)/,
			h: /(?=.*3)(?=.*9)/,
			i: /(?=.*6)(?=.*9)/
		},
		diagonals: {
			a: /(?=.*1)(?=.*5)/,
			b: /(?=.*1)(?=.*9)/,
			c: /(?=.*5)(?=.*9)/,
			d: /(?=.*3)(?=.*5)/,
			e: /(?=.*3)(?=.*7)/,
			f: /(?=.*5)(?=.*7)/
		}
	}

	const squareString = square.join();

	if (count % 2 !== 0) {

		if (conditions.rows.a.test(squareString) && potentialMoves.indexOf('3') > -1) {
			aiMove = '3';
			count++;
		} else if (conditions.rows.b.test(squareString) && potentialMoves.indexOf('2') > -1) {
			aiMove = '2';
			count++;
		} else if (conditions.rows.c.test(squareString) && potentialMoves.indexOf('1') > -1) {
			aiMove = '1';
			count++;
		} else if (conditions.rows.d.test(squareString) && potentialMoves.indexOf('6') > -1) {
			aiMove = '6';
			count++;
		} else if (conditions.rows.e.test(squareString) && potentialMoves.indexOf('5') > -1) {
			aiMove = '5';
			count++;
		} else if (conditions.rows.f.test(squareString) && potentialMoves.indexOf('4') > -1) {
			aiMove = '4';
			count++;
		} else if (conditions.rows.g.test(squareString) && potentialMoves.indexOf('9') > -1) {
			aiMove = '9';
			count++;
		} else if (conditions.rows.h.test(squareString) && potentialMoves.indexOf('8') > -1) {
			aiMove = '8';
			count++;
		} else if (conditions.rows.i.test(squareString) && potentialMoves.indexOf('7') > -1) {
			aiMove = '7';
			count++;
		} else if (conditions.columns.a.test(squareString) && potentialMoves.indexOf('7') > -1) {
			aiMove = '7';
			count++;
		} else if (conditions.columns.b.test(squareString) && potentialMoves.indexOf('4') > -1) {
			aiMove = '4';
			count++;
		} else if (conditions.columns.c.test(squareString) && potentialMoves.indexOf('1') > -1) {
			aiMove = '1';
			count++;
		} else if (conditions.columns.d.test(squareString) && potentialMoves.indexOf('8') > -1) {
			aiMove = '8';
			count++;
		} else if (conditions.columns.e.test(squareString) && potentialMoves.indexOf('5') > -1) {
			aiMove = '5';
			count++;
		} else if (conditions.columns.f.test(squareString) && potentialMoves.indexOf('2') > -1) {
			aiMove = '2';
			count++;
		} else if (conditions.columns.g.test(squareString) && potentialMoves.indexOf('9') > -1) {
			aiMove = '9';
			count++;
		} else if (conditions.columns.h.test(squareString) && potentialMoves.indexOf('6') > -1) {
			aiMove = '6';
			count++;
		} else if (conditions.columns.i.test(squareString) && potentialMoves.indexOf('3') > -1) {
			aiMove = '3';
			count++;
		} else if (conditions.diagonals.a.test(squareString) && potentialMoves.indexOf('9') > -1) {
			aiMove = '9';
			count++;
		} else if (conditions.diagonals.b.test(squareString) && potentialMoves.indexOf('5') > -1) {
			aiMove = '5';
			count++;
		} else if (conditions.diagonals.c.test(squareString) && potentialMoves.indexOf('1') > -1) {
			aiMove = '1';
			count++;
		} else if (conditions.diagonals.d.test(squareString) && potentialMoves.indexOf('7') > -1) {
			aiMove = '7';
			count++;
		} else if (conditions.diagonals.e.test(squareString) && potentialMoves.indexOf('5') > -1) {
			aiMove = '5';
			count++;
		} else if (conditions.diagonals.f.test(squareString) && potentialMoves.indexOf('3') > -1) {
			aiMove = '3';
			count++;
		}
	}
}

pushSquare = (push, check) => {
	doAiMove(check);
	const move = document.getElementById(aiMove);
	if (move !== null) {
		move.innerHTML = computerLetter;
		push.push(aiMove);
	}
}

play = () => {
	for (let i = 0; i < 9; i++) {
		column[i].addEventListener('click', startGame);
	}
}

playAgain = () => {
	intro.style.display = 'none';
	option.style.display = '';
}

playAsX = () => {
	count = 0;
	player = 1;
	computerLetter = `<i class="fa fa-circle-o"></i>`;
	resetGame();
}

playAsO = () => {
	count = 1;
	player = 2;
	computerLetter = `<i class="fa fa-times"></i>`;
	resetGame();
	computerX();
}

play();
btn.addEventListener('click', playAgain);
playX.addEventListener('click', playAsX);
playO.addEventListener('click', playAsO);