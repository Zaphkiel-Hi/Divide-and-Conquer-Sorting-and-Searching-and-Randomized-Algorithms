class KargerMinCutter {
    constructor(graphFile) {
        this._graph = {};
        this._totalEdges = 0;
        const fs = require('fs');
        const data = fs.readFileSync(graphFile, 'utf8');
        const lines = data.split('\n');
        for (let index = 0; index < lines.length; index++) {
            const numbers = lines[index].split(' ').map(Number);
            this._graph[numbers[0]] = numbers.slice(1);
            this._totalEdges += numbers.slice(1).length;
        }
    }

    findMinCut() {
        let minCut = Infinity;
        while (Object.keys(this._graph).length > 2) {
            const [v1, v2] = this._pickRandomEdge();
            this._totalEdges -= this._graph[v1].length;
            this._totalEdges -= this._graph[v2].length;
            this._graph[v1].push(...this._graph[v2]);
            for (const vertex of this._graph[v2]) {
                const index = this._graph[vertex].indexOf(v2);
                if (index !== -1) {
                    this._graph[vertex].splice(index, 1);
                    this._graph[vertex].push(v1);
                }
            }
            this._graph[v1] = this._graph[v1].filter(v => v !== v1);
            this._totalEdges += this._graph[v1].length;
            delete this._graph[v2];
        }
        for (const edges of Object.values(this._graph)) {
            minCut = Math.min(minCut, edges.length);
        }
        return minCut;
    }

    _pickRandomEdge() {
        let randEdge = Math.floor(Math.random() * this._totalEdges);
        for (const [vertex, vertexEdges] of Object.entries(this._graph)) {
            if (vertexEdges.length <= randEdge) {
                randEdge -= vertexEdges.length;
            } else {
                const fromVertex = vertex;
                const toVertex = vertexEdges[randEdge];
                return [fromVertex, toVertex];
            }
        }
    }
}

const minCutter = new KargerMinCutter('assignment3.txt');
let minCut = Infinity;

for (let i = 0; i < 40000; i++) {
    const cut = minCutter.findMinCut();
    minCut = Math.min(minCut, cut);
    console.log(minCut);
}

