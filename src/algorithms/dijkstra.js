import Queue from "../data-structures/Queue";
var FibonacciHeap = require("@tyriar/fibonacci-heap");
// var heap = new FibonacciHeap();

const dijkstra = (grid, startNode, finishNode) => {
  if (!grid || !startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  // Initialization of all nodes with distance "infinite"; initialization of the starting node with 0
  // Marking of the distance of the starting node as permanent, all other distances as temporarily.
  // Setting of starting node as active.
  // Calculation of the temporary distances of all neighbour nodes of the active node by summing up its distance with the weights of the edges.
  // If such a calculated distance of a node is smaller as the current one, update the distance and set the current node as antecessor. This step is also called update and is Dijkstra's central idea.
  // Setting of the node with the minimal temporary distance as active. Mark its distance as permanent.
  // Repeating of steps 4 to 7 until there aren't any nodes left with a permanent distance, which neighbours still have temporary distances.

  //// Initialization
  const nodes = grid.map((row) => {
    return row.nodes.map((node) => {
      return node;
    });
  });
  nodes[startNode.row][startNode.col].distance = 0;

  return 1;
};
export default dijkstra;
