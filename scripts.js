const WINDOW_DIM = Math.floor(window.innerHeight * .97);
const GRID_DIV = document.getElementsByClassName('gridContainer')[0];
const BUTTON_OUTER_DIV = document.getElementsByClassName('buttonContainer')[0];
const BUTTON_DIV = document.getElementsByClassName('subButtonContainer')[0];
const EMPTY_BACKGROUND = 'white';
const FULL_BACKGROUND = 'black';

function clearChildren(node) {
  // remove all child nodes of container div to make space for grid
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function changeBackground() {
  // for when user clicks a grid cell to set game up
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

function createButtons() {
  // set up game setup instructions and start game button
  BUTTON_OUTER_DIV.style.height = WINDOW_DIM + 'px';

  const instructionsText = document.createElement('p');
  const startButton = document.createElement('button');
  instructionsText.innerHTML = 'Click anywhere in the grid to place as many\
<br>starting cells as you\'d like, then press "Start game!"';
  startButton.innerHTML = 'Start game!';
  startButton.id = 'start';
  startButton.onclick = startGame;

  BUTTON_DIV.appendChild(instructionsText);
  BUTTON_DIV.appendChild(startButton);
}

function getNeighborNodes(node) {
  const nodeId = node.id.split(',');
  const nodeRow = parseInt(nodeId[0]);
  const nodeCol = parseInt(nodeId[1]);
  let liveNeighbors = 0;

  for (let row = nodeRow - 1; row <= nodeRow + 1; row++) {
    for (let col = nodeCol - 1; col <= nodeCol + 1; col++) {
      if (`${row},${col}` !== node.id) {
        let neighbor = document.getElementById(`${row},${col}`);
        if (neighbor) {
          if (neighbor.style.backgroundColor === FULL_BACKGROUND) {
            liveNeighbors += 1;
          }
        }
      }
    }
  }

  return liveNeighbors;
}

function runGame(table) {
  const nodesToChange = [];

  for (let row of table.childNodes) {
    for (let cell of row.childNodes) {
      let aliveAround = getNeighborNodes(cell);
      if (cell.style.backgroundColor === FULL_BACKGROUND && (! [2, 3].includes(aliveAround))) {
        nodesToChange.push(cell);
      } else if (cell.style.backgroundColor === EMPTY_BACKGROUND && aliveAround === 3) {
        nodesToChange.push(cell);
      }
    }
  }

  for (let node of nodesToChange) {  // ugh can I not make this a function
    if (node.style.backgroundColor === EMPTY_BACKGROUND) {
      node.style.backgroundColor = FULL_BACKGROUND;
    } else {
      node.style.backgroundColor = EMPTY_BACKGROUND;
    }
  }
}

function startGame() {
  const instructions = BUTTON_DIV.childNodes[0];
  const stopButton = BUTTON_DIV.childNodes[1];
  instructions.innerHTML = 'Press "Stop game" to end the simulation';
  stopButton.innerHTML = 'Stop game';
  const tableElem = document.getElementsByTagName('table')[0];
  setInterval(runGame, 250, tableElem);
}

function gameSetup() {
  const rows = parseInt(document.getElementsByTagName('input')[0].value);
  clearChildren(GRID_DIV);
  createGrid(rows);
  createButtons();
}
