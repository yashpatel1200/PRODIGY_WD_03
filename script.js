document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const resetButton = document.getElementById("reset-btn");
    const winnerHistoryElement = document.getElementById("winner-history");
    const cells = [];
    let currentPlayer = "X";
    let winner = null;
    let moves = 0;
    let winnerHistory = [];

    // Initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", handleCellClick);
                board.appendChild(cell);
                cells.push(cell);
            }
        }
    }

    // Reset the game board
    function resetBoard() {
        winner = null;
        moves = 0;
        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    // Handle cell click event
    function handleCellClick() {
        if (!winner) {
            if (!this.textContent) {
                moves++;
                this.textContent = currentPlayer;
                if (checkWinner()) {
                    winner = currentPlayer;
                    winnerHistory.push(currentPlayer);
                    winnerHistoryElement.textContent = `Winner History: ${winnerHistory.join(", ")}`;
                    alert(`${winner} wins!`);
                    resetBoard();
                } else if (moves === 9) {
                    winner = "Draw";
                    winnerHistory.push("Draw");
                    winnerHistoryElement.textContent = `Winner History: ${winnerHistory.join(", ")}`;
                    alert("It's a draw!");
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }
    }

    // Check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent;
        });
    }

    // Reset the game when reset button is clicked
    resetButton.addEventListener("click", function () {
        resetBoard();
        winnerHistory = [];
        winnerHistoryElement.textContent = `Winner History: ${winnerHistory.join(", ")}`;
    });

    // Initialize the game
    initializeBoard();
});
