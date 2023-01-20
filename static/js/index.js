let currentPlayer = 'X';
let grid = [[null, null, null][(null, null, null)][(null, null, null)]];
let isWinner = false;
let moveCounter = 0;
let cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener();
}

function mainDiagonalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[0][1] === currentPlayer &&
		grid[0][2] === currentPlayer
	) {
		return true;
	}
}

function secondDiagonalCheck(currentPlayer) {
	if (
		grid[0][2] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[2][0] === currentPlayer
	) {
		return true;
	}
}

function horizontalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[0][1] === currentPlayer &&
		grid[0][2] === currentPlayer
	) {
		return true;
	} else if (
		grid[1][0] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[1][2] === currentPlayer
	) {
		return true;
	} else if (
		grid[2][0] === currentPlayer &&
		grid[2][1] === currentPlayer &&
		grid[2][2] === currentPlayer
	) {
		return true;
	}
}

function verticalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[1][0] === currentPlayer &&
		grid[2][0] === currentPlayer
	) {
		return true;
	} else if (
		grid[0][1] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[2][1] === currentPlayer
	) {
		return true;
	} else if (
		grid[0][2] === currentPlayer &&
		grid[1][2] === currentPlayer &&
		grid[2][2] === currentPlayer
	) {
		return true;
	}
}

function checkWinner(currentPlayer) {
	if (moveCounter >= 4) {
		if (mainDiagonalCheck) {
			isWinner = true;
		} else if (secondDiagonalCheck) {
			isWinner = true;
		} else if (horizontalCheck) {
			isWinner = true;
		} else if (verticalCheck) {
			isWinner = true;
		}
	}
}
