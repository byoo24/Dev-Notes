function numRegions(graph) {
    const visited = new Set();
    let regions = 0;

    for(const node in graph) {
        if(isNewRegion(graph, node, visited)) regions++;
    }

    return regions;
}


function isNewRegion(graph, node, visited) {
    if(visited.has(node)) return false;
    
    visited.add(node);

    graph[node].forEach(neighbor => {
        isNewRegion(graph, neighbor, visited);
    });

    return true;
}

module.exports = {
    numRegions
};