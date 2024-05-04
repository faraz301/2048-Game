const gameContainer = document.getElementById('game-container');
let grid = [];
let score = 0;

function initGame() {
  score = 0;
  updateScore();
  createGrid();
  addNewTile();
  addNewTile();
}

function createGrid() {
  grid = [];
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      grid[i][j] = 0;
    }
  }
  updateGrid();
}

function updateGrid() {
  gameContainer.innerHTML = '';
  grid.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (cell !== 0) {
        tile.textContent = cell;
        tile.style.backgroundColor = getTileColor(cell);
      }
      gameContainer.appendChild(tile);
    });
  });
}

function addNewTile() {
  const availableCells = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        availableCells.push({ x: i, y: j });
      }
    });
  });

  if (availableCells.length > 0) {
    const { x, y } = availableCells[Math.floor(Math.random() * availableCells.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    updateGrid();
  }
}

function move(direction) {
  let moved = false;
  switch (direction) {
    case 'up':
      moved = moveUp();
      break;
    case 'down':
      moved = moveDown();
      break;
    case 'left':
      moved = moveLeft();
      break;
    case 'right':
      moved = moveRight();
      break;
  }
  if (moved) {
    addNewTile();
  }
}

function moveUp() {
  let moved = false;
  for (let j = 0; j < 4; j++) {
    for (let i = 1; i < 4; i++) {
      if (grid[i][j] !== 0) {
        let k = i;
        while (k > 0 && grid[k - 1][j] === 0) {
          grid[k - 1][j] = grid[k][j];
          grid[k][j] = 0;
          k--;
          moved = true;
        }
        if (k > 0 && grid[k - 1][j] === grid[k][j]) {
          grid[k - 1][j] *= 2;
          score += grid[k - 1][j];
          grid[k][j] = 0;
          moved = true;
        }
      }
    }
  }
  updateGrid();
  updateScore();
  return moved;
}

function moveDown() {
  let moved = false;
  for (let j = 0; j < 4; j++) {
    for (let i = 2; i >= 0; i--) {
      if (grid[i][j] !== 0) {
        let k = i;
        while (k < 3 && grid[k + 1][j] === 0) {
          grid[k + 1][j] = grid[k][j];
          grid[k][j] = 0;
          k++;
          moved = true;
        }
        if (k < 3 && grid[k + 1][j] === grid[k][j]) {
          grid[k + 1][j] *= 2;
          score += grid[k + 1][j];
          grid[k][j] = 0;
          moved = true;
        }
      }
    }
  }
  updateGrid();
  updateScore();
  return moved;
}

function moveLeft() {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (grid[i][j] !== 0) {
        let k = j;
        while (k > 0 && grid[i][k - 1] === 0) {
          grid[i][k - 1] = grid[i][k];
          grid[i][k] = 0;
          k--;
          moved = true;
        }
        if (k > 0 && grid[i][k - 1] === grid[i][k]) {
          grid[i][k - 1] *= 2;
          score += grid[i][k - 1];
          grid[i][k] = 0;
          moved = true;
        }
      }
    }
  }
  updateGrid();
  updateScore();
  return moved;
}

function moveRight() {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (grid[i][j] !== 0) {
        let k = j;
        while (k < 3 && grid[i][k + 1] === 0) {
          grid[i][k + 1] = grid[i][k];
          grid[i][k] = 0;
          k++;
          moved = true;
        }
        if (k < 3 && grid[i][k + 1] === grid[i][k]) {
          grid[i][k + 1] *= 2;
          score += grid[i][k + 1];
          grid[i][k] = 0;
          moved = true;
        }
      }
    }
  }
  updateGrid();
  updateScore();
  return moved;
}

function updateScore() {
  document.querySelector('h1').textContent = `2048 - Score: ${score}`;
}

function restartGame() {
  initGame();
}

function getTileColor(value) {
  switch (value) {
    case 2: return '#eee4da';
    case 4: return '#ede0c8';
    case 8: return '#f2b179';
    case 16: return '#f59563';
    case 32: return '#f67c5f';
    case 64: return '#f65e3b';
    case 128: return '#edcf72';
    case 256: return '#edcc61';
    case 512: return '#edc850';
    case 1024: return '#edc53f';
    case 2048: return '#edc22e';
    default: return '#ccc0b3';
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    event.preventDefault();
    move('up');
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    event.preventDefault();
    move('down');
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    event.preventDefault();
    move('left');
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    event.preventDefault();
    move('right');
  }
});

// Initialize the game
initGame();
