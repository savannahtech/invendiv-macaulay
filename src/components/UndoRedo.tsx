import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../core/store'

const UndoRedo = () => {
    const dispatch = useDispatch()
    const canUndo = useSelector((state: RootState) => state.configuration.past.length > 0)
    const canRedo = useSelector((state: RootState) => state.configuration.future.length > 0)
    
    return (
        <View style={styles.container}>
            <Button
                mode={'outlined'}
                onPress={() => {
                    dispatch(UndoActionCreators.undo())
                }}
                disabled={!canUndo}
            >
                Undo
            </Button>
            
            <Button
                mode={'outlined'}
                onPress={() => {
                    dispatch(UndoActionCreators.redo())
                }}
                disabled={!canRedo}
            >
                Redo
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    }
})

export default UndoRedo