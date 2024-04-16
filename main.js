const players = { human: 'O', ai: 'X' };
let gameActive = true;
let timer, countdownTimer;

const start = document.querySelector(".start");
const play = document.querySelector(".btn1");
const rules = document.querySelector(".btn2");
const container = document.querySelector(".game-container");
const retour = document.querySelector('.retour');
const rulesText = document.querySelector(".rules");
const retour2 = document.querySelector('.retour2');
const currentPlayerDisplay = document.querySelector('.current-player');
const timerDisplay = document.querySelector('.timer');

const squares = document.querySelectorAll(".cell");

function checkWin(board) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function isMovesLeft(board) {
    return board.includes(null);
}

function minimax(board, depth, isMax) {
    let score = checkWin(board);

    if (score === players.ai) return 10 - depth;
    if (score === players.human) return depth - 10;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
        let best = -1000;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = players.ai;
                best = Math.max(best, minimax(board, depth + 1, !isMax));
                board[i] = null;
            }
        }
        return best;
    } else {
        let best = 1000;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = players.human;
                best = Math.min(best, minimax(board, depth + 1, !isMax));
                board[i] = null;
            }
        }
        return best;
    }
}

function findBestMove(board) {
    let bestVal = -1000;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = players.ai;
            let moveVal = minimax(board, 0, false);
            board[i] = null;
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

function aiPlay() {
    const board = Array.from(squares, s => s.textContent || null);
    const bestMove = findBestMove(board);
    if (bestMove !== -1) {
        squares[bestMove].textContent = players.ai;
        squares[bestMove].classList.add('ai-move');
        setTimeout(() => {
            checkGameStatus();
            if (gameActive) {
                resetTimer(); // Reset the timer right after AI's move
            }
        }, 100);
    }
}

squares.forEach((square, i) => {
    square.addEventListener('click', () => {
        if (!square.textContent && gameActive) {
            square.textContent = players.human;
            square.classList.add('human-move');
            resetTimer(); // Reset the timer right after human's move
            setTimeout(() => {
                checkGameStatus();
                if (gameActive) aiPlay();
            }, 100);
        }
    });
});

function checkGameStatus() {
    const board = Array.from(squares, s => s.textContent || null);
    const winner = checkWin(board);

    if (winner) {
        alert(`Joueur ${winner} a gagné!`);
        gameActive = false;
        stopTimer();
        return;
    }

    if (!isMovesLeft(board)) {
        alert("Match nul");
        gameActive = false;
        stopTimer();
        return;
    }
}

function resetGame() {
    squares.forEach(square => {
        square.textContent = '';
        square.classList.remove('human-move', 'ai-move');
    });
    gameActive = true;
    updatePlayerDisplay(players.human);
    resetTimer();
}

document.getElementById('resetButton').addEventListener('click', resetGame);

play.addEventListener('click', () => {
    container.style.display = "block";
    start.style.display = "none";
    resetGame();
});

retour.addEventListener('click', () => {
    container.style.display = "none";
    start.style.display = "block";
    stopTimer();
});

rules.addEventListener('click', () => {
    start.style.display = "none";
    rulesText.style.display = "block";
});

retour2.addEventListener('click', () => {
    rulesText.style.display = "none";
    start.style.display = "block";
});

function updatePlayerDisplay(player) {
    currentPlayerDisplay.textContent = `Au tour du joueur ${player}`;
}

function resetTimer() {
    if (timer) clearTimeout(timer);
    if (countdownTimer) clearInterval(countdownTimer);

    timer = setTimeout(() => {
        alert("Temps écoulé! Changement de joueur.");
        if (gameActive) aiPlay();
    }, 30000);

    let countdown = 30;
    timerDisplay.textContent = countdown;
    countdownTimer = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);
}

function stopTimer() {
    clearTimeout(timer);
    clearInterval(countdownTimer);
}

updatePlayerDisplay(players.human);  // Initialize player display
