let currentPlayer = 1;
let grid = [[]];
for (let i = 0; i < 3; i++) {
	grid.push([]);
	for (let j = 0; j < 3; j++) {
		grid[i][j] = null;
	}
}

let isWinner = false;
let cells = document.querySelectorAll('.cell');
let cellOccupied = true;
let Punteggio1 = 0;
let Punteggio2 = 0;
let partitaTerminata = false;

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', function (e) {
		e.preventDefault();
		console.log('ETEETETETTTTTT');
		cellOccupied =
			e.currentTarget.classList.contains('player2') ||
			e.currentTarget.classList.contains('player1');

		if (!cellOccupied && !partitaTerminata) {
			if (currentPlayer === 1) {
				e.currentTarget.classList.add('player1');
				grid[e.currentTarget.dataset.yaxis][e.currentTarget.dataset.xaxis] = currentPlayer;
				if (checkWinner(currentPlayer) === true) {
					Punteggio1++;
					document.getElementById('counterText1').innerHTML = `P1: ${Punteggio1}`;
					partitaTerminata = true;
				}
				currentPlayer = 2;
			} else {
				e.currentTarget.classList.add('player2');
				grid[e.currentTarget.dataset.yaxis][e.currentTarget.dataset.xaxis] = currentPlayer;
				if (checkWinner(currentPlayer)) {
					Punteggio2++;
					document.getElementById('counterText2').innerHTML = `P2: ${Punteggio2}`;
				}
				currentPlayer = 1;
			}
		}
	});
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
	if (mainDiagonalCheck(currentPlayer)) {
		return true;
	} else if (secondDiagonalCheck(currentPlayer)) {
		return true;
	} else if (horizontalCheck(currentPlayer)) {
		return true;
	} else if (verticalCheck(currentPlayer)) {
		return true;
	}
}

function resetSymbols() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			grid[i][j] = null;
		}
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].classList.remove('player1');
		cells[i].classList.remove('player2');
	}
	currentPlayer = 1;
	partitaTerminata = false;
}
