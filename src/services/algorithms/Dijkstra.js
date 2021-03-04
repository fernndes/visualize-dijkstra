export function dijkstra(grid, startNode, finishNode) {

    var path = []

    startNode.estimative = 0

    const nodes = getArrayOfNodes(grid)

    while (!!nodes.length) {

        findShortestEstimative(nodes)

        let shortestValue = nodes.shift()

        if (shortestValue.isWall === true) continue

        if (shortestValue.estimative === Infinity) return path;

        shortestValue.isOpen = false

        path.push(shortestValue)

        if (shortestValue.isFinish === true) {
            return path
        }

        updateNodeEstimative(shortestValue, grid)
    }
}

function getArrayOfNodes(grid) {
    const array = []
    for (const row of grid) {
        for (const node of row) {
            array.push(node)
        }
    }
    return array
}

function findShortestEstimative(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.estimative - nodeB.estimative)
}

function getNeighbors(node, grid) {
    const allNeighbors = []
    const {col, row} = node
    if (row > 0) allNeighbors.push(grid[row - 1][col]) // Node Above
    if (row < grid.length - 1) allNeighbors.push(grid[row + 1][col]) // Node Bellow 
    if (col > 0) allNeighbors.push(grid[row][col - 1]) // Node Left 
    if (col < grid[0].length - 1) allNeighbors.push(grid[row][col + 1]) // Node Right 
    const filteredNeighbors = []
    for (var i = 0; i < allNeighbors.length; i++) {
        if(allNeighbors[i].isOpen === true) {
            filteredNeighbors.push(allNeighbors[i])
        }
    }
    return filteredNeighbors
}

function updateNodeEstimative(node, grid) {
    const neighbors = getNeighbors(node, grid)
    for (let neighbor of neighbors) {
        neighbor.estimative = node.estimative + 1
        neighbor.previousNode = node
    }
}

export function getNodesInShortestPath(finishNode) {
    const nodesInShortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
  }
