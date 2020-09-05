const WINDOW_DIM = Math.floor(window.innerHeight * .97);
const MAIN_DIV = document.getElementsByClassName('container')[0];

function clearInputs() {
  // remove all child nodes of container div to make space for grid
  while (MAIN_DIV.hasChildNodes()) {
    MAIN_DIV.removeChild(MAIN_DIV.firstChild);
  }
}

function createId(node, value) {
  let id = document.createAttribute('id');
  id.value = value;
  node.setAttributeNode(id);
}

function createGrid(rowNum) {
  /*
  Make rowNum x rowNum grid that is adapted to the size of the browser window
  Also give each cell an id saying its row and column numbers
  */
  const SQUARE_DIM = Math.floor(WINDOW_DIM / rowNum);
  const table = document.createElement('table');

  for (let i = 0; i < rowNum; i++) {
    let row = document.createElement('tr');
    createId(row, i);

    for (let j = 0; j < rowNum; j++) {
      let datum = document.createElement('td');
      createId(datum, `${i},${j}`);
      row.appendChild(datum);
    }
    table.appendChild(row);
  }
  table.style.height = WINDOW_DIM + 'px';
  table.style.width = WINDOW_DIM + 'px';

  MAIN_DIV.appendChild(table);
}

function gameSetup() {
  const rows = parseInt(document.getElementsByTagName('input')[0].value);

  clearInputs();

  createGrid(rows);
}
