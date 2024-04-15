const players = [1, 2];
let currentIndex = 0;
let gameActive = true; // Un nouveau drapeau pour vérifier si le jeu est actif
let play = document.querySelector(".btn1")
let container = document.querySelector(".game-container")
let start = document.querySelector(".start")
let retour = document.querySelector('.retour')
let rules = document.querySelector(".btn2")
let rulesText = document.querySelector(".rules")
let retour2 = document.querySelector('.retour2')

function getNextPlayer() {
    const player = players[currentIndex];
    currentIndex = 1 - currentIndex;
    return player;
}

const squares = document.querySelectorAll(".cell");

squares.forEach(square => {
    square.addEventListener('click', () => {
        // Vérifie si la case est vide et si le jeu est toujours actif
        if (square.textContent === '' && gameActive) {
            const player = getNextPlayer();
            square.textContent = player === 1 ? "X" : "O";
            checkWin();
        }
    });
});

let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    for (let condition of win) {
        const [a, b, c] = condition;
        if (squares[a].textContent && squares[a].textContent === squares[b].textContent && squares[a].textContent === squares[c].textContent) {
            alert(`Le joueur ${squares[a].textContent} a gagné !`);
            gameActive = false;
            return;
        }
    }

    const isDraw = Array.from(squares).every(square => square.textContent !== '');
    if (isDraw) {
        alert("Draw!");
        gameActive = false;
        return;
    }
}

function resetGame() {
    squares.forEach(square => {
        square.textContent = '';
    });
    gameActive = true; 
    currentIndex = 0; 
}

document.getElementById('resetButton').addEventListener('click', resetGame);


play.addEventListener('click', ()=>{
    container.style.display = "block"
    start.style.display = "none"
})

retour.addEventListener('click', ()=>{
    container.style.display ="none"
    start.style.display = "block"
})

rules.addEventListener('click', ()=>{
    start.style.display = "none"
    rulesText.style.display = "block"
})

retour2.addEventListener('click', ()=>{
    rulesText.style.display = "none"
    start.style.display = "block"
})