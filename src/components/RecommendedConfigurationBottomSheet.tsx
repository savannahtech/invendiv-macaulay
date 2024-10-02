import { StyleSheet, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Text from './Text'

const RecommendedConfigurationBottomSheet = ({
    display
}: {
    display: boolean
}) => {    
    const bottomSheetOffset = useRef(new Animated.Value(display ? 0 : 1)).current 

    useEffect(() => {
        Animated.timing(bottomSheetOffset, {
            toValue: display ? 0 : 1,
            duration: 300, 
            useNativeDriver: true, 
        }).start()
    }, [display])

    const translateY = bottomSheetOffset.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'], 
    })

    return (
        <Animated.View style={[styles.bottomSheetContainer, { transform: [{ translateY }] }]}> 
            <View>
                <Text>RecommendedConfigurationBottomSheet</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        // Add other necessary styles here
    }
})

export default RecommendedConfigurationBottomSheet