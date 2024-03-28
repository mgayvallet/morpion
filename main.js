let currentPlayer = "x"

const squares = document.querySelectorAll(".cell")
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', ()=>{
        squares[i].textContent = currentPlayer
    })
}
