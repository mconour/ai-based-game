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
    if(count > 8 && !xWin && !oWin) {
        winner.innerHTML = "Tie";
        overlay.style.display = "";
    }
}

playGame = () => {
    if (player === 1 && isEmpty(this) && count % 2 === 0) {
        this.innerHTML = `<i class="fa fa-times"></i>`;
        squareX.push(this.id);
        count++;
        checkWin(squareX, 'Player wins', true, false);
        if (!xWin) computerO();
    } else if (player === 2 && isEmpty(this) && count % 2 === 0) {
        this.innerHTML = `<i class="fa fa-circle-o"></i>`;
        squareO.push(this.id);
        count++;
        checkWin(squareO, 'Player wins', false, true);
        if (!oWin) computerX();
    } 
}