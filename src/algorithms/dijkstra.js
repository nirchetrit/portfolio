//https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm - Pseudocode
// function Dijkstra(Graph, source):
//  2
//  3      create vertex set Q
//  4
//  5      for each vertex v in Graph:
//  6          dist[v] ← INFINITY
//  7          prev[v] ← UNDEFINED
//  8          add v to Q
// 10      dist[source] ← 0
// 11
// 12      while Q is not empty:
// 13          u ← vertex in Q with min dist[u]
// 14
// 15          remove u from Q
// 16
// 17          for each neighbor v of u:           // only v that are still in Q
// 18              alt ← dist[u] + length(u, v)
// 19              if alt < dist[v]:
// 20                  dist[v] ← alt
// 21                  prev[v] ← u
// 22
// 23      return dist[], prev[]
const dijkstra = (grid, startNode, finishNode) => {
  if (!grid || !startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let solution = grid.slice();
  let q = [];
  solution.forEach((row) => {
    row.nodes.forEach((v) => {
      v.dist = Infinity;
      v.prev = undefined;
      q.push(v);
    });
  });
  solution[startNode.row].nodes[startNode.col].dist = 0;
  while (q.length) {
    q.sort((a, b) => {
      return a.dist - b.dist;
    });
    var u = q.shift();
    u.isVisited = true;
    if (u === finishNode) {
      return solution;
    }
    var neighbours = getNeighbours(u, solution);
    for (let index = 0; index < neighbours.length; index++) {
      const v = neighbours[index];
      let alt = u.dist + v.weight;
      if (alt < v.dist) {
        v.dist = alt;
        v.prev = u;
      }
    }
  }
  return solution;
};
export default dijkstra;

const getNeighbours = (node, grid) => {
  const neighbours = [];
  const height = grid.length;
  const width = grid[0].nodes.length;
  if (node.row - 1 >= 0 && !grid[node.row - 1].nodes[node.col].isVisited) {
    const neighbourNode = grid[node.row - 1].nodes[node.col];
    neighbours.push(neighbourNode);
  }
  if (node.row + 1 < height && !grid[node.row + 1].nodes[node.col].isVisited) {
    const neighbourNode = grid[node.row + 1].nodes[node.col];
    neighbours.push(neighbourNode);
  }
  if (node.col - 1 >= 0 && !grid[node.row].nodes[node.col - 1].isVisited) {
    const neighbourNode = grid[node.row].nodes[node.col - 1];
    neighbours.push(neighbourNode);
  }
  if (node.col + 1 < width && !grid[node.row].nodes[node.col + 1].isVisited) {
    const neighbourNode = grid[node.row].nodes[node.col + 1];
    neighbours.push(neighbourNode);
  }
  return neighbours;
};
