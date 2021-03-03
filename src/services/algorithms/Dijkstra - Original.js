// vertices = [
//     [0, 1, 1, 0, 0, 0],
//     [0, 0, 1, 1, 1, 0],
//     [0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 1, 1],
//     [0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0]
// ]

// edges = [
//     [0, 5, 10, 0, 0, 0],
//     [0, 0, 3, 8, 2, 0],
//     [0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 4, 4],
//     [0, 0, 0, 0, 0, 6],
//     [0, 0, 0, 0, 0, 0]
// ]

// open = [true, true, true, true, true, true]

// estimative = [0, Infinity, Infinity, Infinity, Infinity, Infinity]

export function dijkstra() {
    var haveAnOpened = true
    var index = -1

    while (haveAnOpened === true) {

        function haveAnOpenedVertice() {
            for (i in open) {
                if (open[i] === true) {
                    haveAnOpened = true
                }
                if (open[open.length - 1] === false) {
                    haveAnOpened = false
                }
            }
        }
        haveAnOpenedVertice()

        if (haveAnOpened === false) {
            console.log(estimative[estimative.length - 1])
        }

        var short = Infinity

        function findShortestEstimative() {
            for (var i = 0; i < estimative.length; i++) {
                if (estimative[i] < short && open[i] === true) {
                    short = estimative[i]
                    index = i
                } else {
                    continue
                }
            }
            return index
        }

        var shortestValue = findShortestEstimative()
        open[shortestValue] = false

        function relieveTack() {
            for (i in edges[shortestValue])
                if (vertices[shortestValue][i] === 1 && open[i] === true) {
                    var newEstimative = estimative[shortestValue] + edges[shortestValue][i]
                    if (newEstimative < estimative[i])
                        estimative[i] = newEstimative
                } else {
                    continue
                }
        }

        relieveTack()

    }
}
