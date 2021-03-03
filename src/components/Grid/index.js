import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'

import Node from '../Node/index'

import { dijkstra, getNodesInShortestPath } from '../../services/algorithms/Dijkstra'

const { height, width } = Dimensions.get('window')
var cols = parseInt(width / 30)
var rows = parseInt(height / 30)

function Grid(props) {
    const [grid, setGrid] = useState([])
    const [reRender, setReRender] = useState(false)

    useEffect(() => {
        setGrid(createGrid())
    }, [])

    function createGrid() {
        const grid = []
        for (let row = 0; row < rows; row++) {
            const currentRow = []
            for (let col = 0; col < cols; col++) {
                currentRow.push(createNode(cols, rows, col, row))
            }
            grid.push(currentRow)
        }
        return grid
    }
    function createNode(cols, rows, col, row) {
        return {
            col,
            row,
            estimative: Infinity,
            isOpen: true,
            isStart: checkStart(col, row) || false,
            isFinish: checkFinish(cols, rows, col, row) || false,
            isPath: false,
            previousNode: null,
            isWall: Math.floor(Math.random() * 10) > 7 && !checkStart(col, row) && !checkFinish(cols, rows, col, row) ? true : false
        }
    }
    function checkStart(col, row) {
        if (col === 0 && row === 0) {
            return true
        }
    }
    function checkFinish(cols, rows, col, row) {
        if (col == (cols - 1) && row == (rows - 1)) {
            return true
        }
    }

    function unAnimateDijkstra(closedNodes, nodesInShortestPath) {
        const newGrid = grid.slice()
        for (let i = 0; i < closedNodes.length; i++) {
            const node = closedNodes[i]            
            const newNode = {
                ...node,
                isOpen: false,
                isPath: nodesInShortestPath.find(obj => node.col === obj.col && node.row === obj.row) ? true : false
            }
            newGrid[node.row][node.col] = newNode            
        }
        setGrid(newGrid)
    }


    function runDijkstraAlgorithm() {
        const startNode = grid[0][0];
        const finishNode = grid[rows - 1][cols - 1];
        const closedNodes = dijkstra(grid, startNode, finishNode)
        const nodesInShortestPath = getNodesInShortestPath(finishNode)
        unAnimateDijkstra(closedNodes, nodesInShortestPath, grid)
    }
    return (
        <View>
            <View style={styles.container}>
                {grid.map((row, indexRow) => {
                    return (<View key={indexRow} style={styles.row}>
                        {row.map((node, indexNode) => {
                            return <Node key={indexNode} id={indexNode} {...node} cols={cols} rows={rows} />
                        })}
                    </View>)
                })}
            </View>
            <Button onPress={() => runDijkstraAlgorithm()} title="Run Algorithm" style={styles.button} color="#3655b3" />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
    }
})

export default Grid