// Dijkstra's Shortest Path Algorithm



function dijkstras(graph, source) {
    // SETUP
    let distance = {};

    // initialize all nodes to be Infinity distance away from the source
    for (let node in graph) {
        distance[node] = Infinity;
    }

    // the source is 0 distance away from itself
    distance[source] = 0;


    // initialize all nodes to be unvisited
    let unvisited = new Set(Object.keys(graph));

    // prepare an object to track the optimal paths
    let previous = {};

    // while some nodes are still unvisited
    while (unvisited.size > 0) {
        // find the closest unvisited node
        let currNode = minDistanceNode(unvisited, distance);
        // and mark is as visited
        unvisited.delete(currNode);

        // consider all neighbors of the current node
        for (let neighbor in graph[currNode]) {
            // calculate the total distance of the neighbor
            // if we travel through the current node to get to that neighbor
            let distanceFromCurrToNeighbor = graph[currNode][neighbor];
            let totalNeighborDistance = distance[currNode] + distanceFromCurrToNeighbor;

            // if the total distance is better than the old distance we calculated for neighbor,
            if (distance[neighbor] > totalNeighborDistance) {
                // then replace it
                distance[neighbor] = totalNeighborDistance;
                // and now we say that the optimal path has `currNode` followed by `neighbor`
                previous[neighbor] = currNode;
            }
        }
    }

    return { distance, previous };
}

// this helper function will find the unvisited node with the smallest distance
function minDistanceNode(nodes, distance) {
    return Array.from(nodes).reduce((minNode, node) => (
        distance[node] < distance[minNode] ? node : minNode
    ));
}


let graph = {
    'a': { 'c': 1, 'b': 7 },
    'b': { 'a': 7, 'd': 12, 'e': 13 },
    'c': { 'a': 1, 'd': 20, 'f': 4 },
    'd': { 'b': 12, 'c': 20, 'e': 5 },
    'e': { 'b': 13, 'd': 5, 'f': 9 },
    'f': { 'c': 4, 'e': 9 }
};

console.log(dijkstras(graph, 'a'));
