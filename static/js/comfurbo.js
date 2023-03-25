let currentPlayer = 1;
let grid = [[]];
let gameOver = false;
for (let i = 0; i < 3; i++) {
	grid.push([]);
	for (let j = 0; j < 3; j++) {
		grid[i][j] = null;
	}
}

// X è min
// O è max

let isWinner = false;
let cells = document.querySelectorAll('.cell');
let cellOccupied = true;
let Punteggio1 = 0;
let Punteggio2 = 0;
let partitaTerminata = false;

function printGrid(grid) {
	grid.forEach((el, i) => {
		console.log(`${el[0]} | ${el[1]} | ${el[2]}`);
	});
}

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', function (e) {
		e.preventDefault();
		//console.log('ETEETETETTTTTT');
		cellOccupied =
			e.currentTarget.classList.contains('player2') ||
			e.currentTarget.classList.contains('player1');

		if (!cellOccupied && !partitaTerminata) {
			//faccio controllo cella (fatto)
			//rimepo cella con classe giusta (fatto)
			//chiamo funzione getecc
			document.getElementById('player1Counter').classList.remove('bordered');
			document.getElementById('player2Counter').classList.add('bordered');

			e.currentTarget.classList.add('player1');
			grid[e.currentTarget.dataset.yaxis][e.currentTarget.dataset.xaxis] = currentPlayer;
			if (checkWinner(currentPlayer) === true) {
				Punteggio1++;
				document.getElementById('counterText1').innerHTML = `P1: ${Punteggio1}`;
				partitaTerminata = true;
				showModal(2000);
			}
			let mossa = getBestMove(grid, 2);
			currentPlayer = 2;
			// console.log(mossa);
			let quadratino = document.querySelector(
				`.cell[data-xaxis="${mossa[1]}"][data-yaxis="${mossa[0]}"]`
			);
			grid[mossa[0]][mossa[1]] = currentPlayer;
			quadratino.classList.add('player2');
			if (checkWinner(currentPlayer)) {
				Punteggio2++;
				document.getElementById('counterText2').innerHTML = `P2: ${Punteggio2}`;
				showModal(2000);
			}
			currentPlayer = 1;
		}
	});
}

function showModal(time) {
	document.querySelector('#winner').innerHTML = currentPlayer === 2 ? 'O' : 'X';
	document.querySelector('.modal-content').classList.toggle('open');
	setTimeout(function () {
		document.querySelector('.modal-content').classList.toggle('open');
	}, time);
}

function mainDiagonalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[2][2] === currentPlayer
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

function checkWinner(p) {
	if (mainDiagonalCheck(p)) {
		return true;
	} else if (secondDiagonalCheck(p)) {
		return true;
	} else if (horizontalCheck(p)) {
		return true;
	} else if (verticalCheck(p)) {
		return true;
	} else {
		return false;
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
	gameOver = false;
	document.getElementById('player2Counter').classList.remove('bordered');
	document.getElementById('player1Counter').classList.add('bordered');
}

function getEmptyCells(board) {
	let emptyCells = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === null) {
				let vettorino = [i, j];
				emptyCells.push(vettorino);
			}
		}
	}

	return emptyCells;
}

function printBoard(board) {
	for (let i = 0; i < 3; i++) {
		console.log(board[i][0], ' - ', board[i][1], ' - ', board[i][2]);
	}
}

function getBestMove(board, player) {
	console.log('entro in getbestmove');
	let min = 1;
	let max = 2;
	let bestScore;

	if (player === min) {
		bestScore = Infinity;
	} else {
		bestScore = -Infinity;
	}

	let bestMove;
	let emptyCells = getEmptyCells(board);

	emptyCells.forEach((element) => {
		let i = element[0];
		let j = element[1];

		board[i][j] = player;
		let currentCellScore = minimax(board, player);
		console.log('currentCellScore -> ', currentCellScore);
		console.log('move             -> ', i, j);

		if (player === min && currentCellScore <= bestScore) {
			//vuol dire che vogliamo minimizzare il punteggio
			bestScore = currentCellScore;
			bestMove = [i, j];
		} else if (player === max && currentCellScore >= bestScore) {
			//massimizziamo il punteggio
			bestScore = currentCellScore;
			bestMove = [i, j];
		}
		board[i][j] = null;

		/*if (currentCellScore > bestScore) {
			bestScore = currentCellScore;
			bestMove = [i, j];
		}*/
	});
	console.log('BESTMOVE -> ', bestMove);
	return bestMove;
}

function minimax(board, player) {
	//minimax deve prendde in input matrice e player e restituisce un punteggio
	let min = 1;
	let max = 2;
	let bestScore;

	if (player === min) {
		bestScore = Infinity;
	} else {
		bestScore = -Infinity;
	}

	let controllo = getEmptyCells(board);
	if (checkWinner(player) || controllo.length === 0) {
		return chiHaVinto(player);
	} else {
		// Qui facciamo la ricorsione
		if (player === max) {
			let emptyCells = getEmptyCells(board);
			emptyCells.forEach((element) => {
				let i = element[0];
				let j = element[1];

				board[i][j] = player;
				let currentCellScore = minimax(board, min);
				board[i][j] = null;
				bestScore = Math.max(bestScore, currentCellScore);
			});
		} else {
			let emptyCells = getEmptyCells(board);
			emptyCells.forEach((element) => {
				let i = element[0];
				let j = element[1];

				board[i][j] = player;
				let currentCellScore = minimax(board, max);
				board[i][j] = null;
				bestScore = Math.min(bestScore, currentCellScore);
			});
		}

		// console.log(bestScore);
		return bestScore;
	}
}

function chiHaVinto(player) {
	/**has to return who won among the two players
	 *
	 */
	let winner = 0;
	[1, 2].forEach((element) => {
		if (checkWinner(element) === true) {
			winner = element;
		}
	});
	console.log('winner -> ', winner);

	if (winner === 0) {
		return 0;
	} else if (winner === 1) {
		return -1;
	} else return 1;
}

/*function getBestMove(board) {
	//||getEmptyCells;

	return getEmptyCells(board)[0];
	//ritorna prima cosa disponibile
	/*
    ?dove
    ?come
    ?per cosa */

/**
 *!CASUALE
 **function getBestMove(board, player = 2) {
	//||getEmptyCells;

    return getEmptyCells(board)[random(0, getEmptyCells.length)]
    //ritorna coso casuale

    //!vedi domande sopra
    }
 */
