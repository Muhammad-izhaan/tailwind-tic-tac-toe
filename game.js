const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const gameHistoryTable = document.getElementById('gameHistory');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameCount = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e, index) {
    const cell = e.target;
    
    if (cell.textContent !== '' || !gameActive) return;
    
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'text-cyan-400' : 'text-yellow-400');
    gameBoard[index] = currentPlayer;
    
    if (checkWin()) {
        gameCount++;
        const winner = currentPlayer;
        winMessage.textContent = `Player ${winner} wins!`;
        winModal.classList.remove('hidden');
        addGameToHistory(winner);
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        gameCount++;
        winMessage.textContent = "It's a draw!";
        winModal.classList.remove('hidden');
        addGameToHistory('Draw');
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = "Player X's turn";
    status.classList.remove('text-yellow-400');
    status.classList.add('text-green-400');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('text-cyan-400', 'text-yellow-400');
    });
}

function closeWinModal() {
    winModal.classList.add('hidden');
    resetGame();
}

function addGameToHistory(winner) {
    const row = document.createElement('tr');
    row.className = 'dark:bg-gray-800 bg-white';
    row.innerHTML = `
        <td class="px-4 py-2 dark:text-white text-gray-900">Game ${gameCount}</td>
        <td class="px-4 py-2 dark:text-white text-gray-900">${winner}</td>
    `;
    gameHistoryTable.appendChild(row);
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => handleCellClick(e, index));
});

resetBtn.addEventListener('click', resetGame);

// Make closeWinModal available globally
window.closeWinModal = closeWinModal;
