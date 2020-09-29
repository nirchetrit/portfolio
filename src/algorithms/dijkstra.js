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

import { FibonacciHeap } from "@tyriar/fibonacci-heap";

// 23      return dist[], prev[]
const dijkstra = (grid, startNode, finishNode) => {
  let visitedNodesByOrder = [];
  let fib = new FibonacciHeap();
  let dist = [];
  let prev = {};
  var q = [];
  grid.forEach((row) => {
    row.forEach((v) => {
      if (!v.isWall) {
        dist[v.index] = Infinity;
        prev[v.index] = undefined;
        q.push(v.index);
      }
    });
  });
  fib.insert(0, startNode);

  while (q.length) {
    let u = fib.extractMinimum(); /// this is the node with min dist
    visitedNodesByOrder.push(u.value);
    for (let i = 0; i < q.length; i++) {
      ///remove u from q
      if (q[i] === u.value.index) {
        q.splice(i, 1);
      }
    }
    if (u.value === finishNode) {
      prev[startNode.index] = undefined;
      return [dist, prev, visitedNodesByOrder];
    }

    var neighbours = getNeighbours(u.value, grid);

    for (let i = 0; i < neighbours.length; i++) {
      let v = neighbours[i];
      if (!v.isWall && v !== startNode) {
        let alt = u.key + v.weight + 1;
        if (alt < dist[v.index]) {
          dist[v.index] = alt;
          fib.insert(alt, v);
          prev[v.index] = u.value.index;
        }
      }
    }
  }

  prev[startNode.index] = undefined;
  return [dist, prev, visitedNodesByOrder];
};
export default dijkstra;

const getNeighbours = (node, grid) => {
  const neighbours = [];
  const height = grid.length;
  const width = grid[0].length;
  if (node.row - 1 >= 0) {
    const neighbourNode = grid[node.row - 1][node.col];
    neighbours.push(neighbourNode);
  }
  if (node.row + 1 < height) {
    const neighbourNode = grid[node.row + 1][node.col];
    neighbours.push(neighbourNode);
  }
  if (node.col - 1 >= 0) {
    const neighbourNode = grid[node.row][node.col - 1];
    neighbours.push(neighbourNode);
  }
  if (node.col + 1 < width) {
    const neighbourNode = grid[node.row][node.col + 1];
    neighbours.push(neighbourNode);
  }

  return neighbours;
};
