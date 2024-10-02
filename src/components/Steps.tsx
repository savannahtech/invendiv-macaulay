import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'

const Steps = ({
    activeStep = 0,
    totalSteps
}: {
    activeStep: number
    totalSteps: number
}) => {
    return (
        <View
            style={styles.container}
        >
            {
                [...Array(totalSteps)].map((_, index) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.step,
                                {
                                    borderBottomColor: index == activeStep ? '#000' : '#f0f0f0',
                                    borderLeftWidth: index == 0 ? 0 : 1,
                                }
                            ]}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                {index + 1}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    step: {
        flex: 1,
        padding: 15,
        textAlign: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
        alignItems: 'center'
    }
})

export default Steps