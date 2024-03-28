const players = [1, 2];
let currentIndex = 0;

function getNextPlayer() {
  const player = players[currentIndex];
  currentIndex = 1 - currentIndex; 
  return player;
}

const squares = document.querySelectorAll(".cell");
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.textContent === '') {
            const player = getNextPlayer();
            if (player === 1) {
                square.textContent = "X";
            } else if (player === 2) {
                square.textContent = "O";
            }
        }
    });
});
