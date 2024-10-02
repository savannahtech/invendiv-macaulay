import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const BackNext = ({goToPreviousStep, nextPressed}: {
    goToPreviousStep?: () => void
    nextPressed?: () => void
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                gap: 10
            }}
        >
            {
                goToPreviousStep ? (
                    <Button
                        onPress={goToPreviousStep}
                        mode={'outlined'}
                        style={{flexGrow: 1}}
                    >
                        Back
                    </Button>
                ) : null
            }
            {
                nextPressed ? (
                    <Button
                        onPress={nextPressed}
                        mode={'contained'}
                        style={{flexGrow: 1}}
                    >
                        Next
                    </Button>
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({})

export default BackNext