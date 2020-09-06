const WINDOW_DIM = Math.floor(window.innerHeight * .97);
const GRID_DIV = document.getElementsByClassName('gridContainer')[0];
const BUTTON_DIV = document.getElementsByClassName('buttonContainer')[0];
const EMPTY_BACKGROUND = 'white';
const FULL_BACKGROUND = 'black';

function clearInputs() {
  // remove all child nodes of container div to make space for grid
  while (GRID_DIV.hasChildNodes()) {
    GRID_DIV.removeChild(GRID_DIV.firstChild);
  }
}

function changeBackground() {
  if (event.target.style.backgroundColor === EMPTY_BACKGROUND) {
    event.target.style.backgroundColor = FULL_BACKGROUND;
  } else {
    event.target.style.backgroundColor = EMPTY_BACKGROUND;
  }
}

function createGrid(rowNum) {
  /*
  Make rowNum x rowNum grid that is adapted to the size of the browser window
  Also give each cell an id saying its row and column numbers
  */
  const SQUARE_DIM = Math.floor(WINDOW_DIM / rowNum);
  const table = document.createElement('table');
  table.style.backgroundColor = FULL_BACKGROUND;

  for (let i = 0; i < rowNum; i++) {
    let row = document.createElement('tr');
    row.id = i;

    for (let j = 0; j < rowNum; j++) {
      let datum = document.createElement('td');
      datum.style.backgroundColor = EMPTY_BACKGROUND;
      datum.id = `${i},${j}`;
      datum.onclick = changeBackground;
      row.appendChild(datum);
    }
    table.appendChild(row);
  }
  table.style.height = WINDOW_DIM + 'px';
  table.style.width = WINDOW_DIM + 'px';

  GRID_DIV.appendChild(table);
}

function startGame() {
  console.log('started');
}

function gameSetup() {
  const rows = parseInt(document.getElementsByTagName('input')[0].value);
  clearInputs();
  createGrid(rows);

  const startButton = document.createElement('button');
  startButton.innerHTML = 'Start game!';
  startButton.onclick = startGame;
  BUTTON_DIV.style.height = WINDOW_DIM + 'px';
  BUTTON_DIV.appendChild(startButton);
}
