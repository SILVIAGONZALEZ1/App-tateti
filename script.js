let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function playerMove(cellIndex) {
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
        
        if (checkWinner()) {
            showModal(`${currentPlayer} ha ganado!`);
        } else if (board.every(cell => cell !== '')) {
            showModal('¡Empate!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.innerText = '';
        cell.onclick = () => playerMove(Array.from(document.getElementsByClassName('cell')).indexOf(cell));
    });
}

function showModal(message) {
    document.getElementById('winnerText').innerText = message;
    document.getElementById('winnerModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('winnerModal').style.display = 'none';
    resetGame();
}