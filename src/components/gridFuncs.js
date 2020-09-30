const generateNodes = (config, onClick) => {
  let nodes = [];
  for (let row = 0; row < config.height; row++) {
    let currentRow = [];
    for (let col = 0; col < config.width; col++) {
      ///read on clousre
      const currentNode = {
        index: row * config.width + col,
        row,
        col,
        isStart: !(config.startRow === row && config.startCol === col)
          ? false
          : true,
        isFinish: !(config.finishRow === row && config.finishCol === col)
          ? false
          : true,
        isVisited: false,
        isWall: false,
        isSolution: false,
        weight: 0,
        onClick: onClick,
      };
      currentRow.push(currentNode);
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const deafultConfig = {
  width: 35,
  height: 15,
  startRow: 5,
  startCol: 5,
  finishRow: 5,
  finishCol: 29,
};
const getNeighbours = (node, grid) => {
  const neighbours = [];
  const height = grid.length;
  const width = grid[0].length;
  if (node.row > 0) {
    const neighbourNode = grid[node.row - 1][node.col];
    neighbours.push(neighbourNode);
  }
  if (node.row + 1 < height) {
    const neighbourNode = grid[node.row + 1][node.col];
    neighbours.push(neighbourNode);
  }
  if (node.col > 0) {
    const neighbourNode = grid[node.row][node.col - 1];
    neighbours.push(neighbourNode);
  }
  if (node.col + 1 < width) {
    const neighbourNode = grid[node.row][node.col + 1];
    neighbours.push(neighbourNode);
  }

  return neighbours;
};

module.exports = {
  generateNodes,
  deafultConfig,
  getNeighbours,
};
