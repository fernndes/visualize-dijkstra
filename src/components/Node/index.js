import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

function Node(props) {
    // const [show, setShow] = useState(false )

    // useEffect(() => {
    //     setTimeout(() => { setShow(true) }, props.id * 100)
    // }, [])

    return (
        <View style={[props.isWall ? styles.isWall : props.isStart ? styles.isStart : (props.isFinish ? styles.isFinish : (props.isPath ? styles.isPath : (props.isOpen ? styles.container : styles.isClosed)))]} {...props} />
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 20,
        width: 20,
        margin: 1
    },
    isStart: {
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'transparent',
        height: 20,
        width: 20,
        margin: 1
    },
    isFinish: {
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'transparent',
        height: 20,
        width: 20,
        margin: 1
    },
    isClosed: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: 'transparent',
        height: 20,
        width: 20,
        margin: 1
    },
    isPath: {
        backgroundColor: '#4dffff',
        borderWidth: 1,
        borderColor: 'transparent',
        height: 20,
        width: 20,
        margin: 1
    },
    isWall: {
        backgroundColor: '#884dff',
        borderWidth: 1,
        borderColor: '#884dff',
        height: 20,
        width: 20,
        margin: 1
    }
})

export default Node
