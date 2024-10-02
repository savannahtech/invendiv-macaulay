import { Alert, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useMemo, useCallback } from 'react'
import Text from '../components/Text'
import { ConfigurationStateInterface, setBaseModel, setCooling, setCpu, setDisplay, setGpu, setRam, setStorage } from '../core/configuration/ConfigurationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { RootState } from '../core/store'
import BackNext from '../components/BackNext'

const DisplayCooling = ({
    goToPreviousStep,
    goToNextStep
}: {
    goToPreviousStep: () => void
    goToNextStep: () => void
}) => {
    const dispatch = useDispatch()
    const {display, cooling} = useSelector((state: RootState) => state.configuration.present)
    const displayOptions: ConfigurationStateInterface['display'][] = ['1080p 144Hz', '1440p 165Hz', '4K 60Hz']
    const coolingOptions: ConfigurationStateInterface['cooling'][] = ['Standard', 'Advanced', 'Liquid']

    useEffect(() => {
        if (display == '4K 60Hz' && cooling && cooling == 'Standard') {
            dispatch(setCooling('Advanced'))
            Alert.alert("Your cooling configuration is too low for your display. We have set it to Advanced")
        }
    }, [display, cooling])

    // Memoize the displaySelected callback
    const displaySelected = useCallback((selectedDisplay: ConfigurationStateInterface['display']) => {
        dispatch(setDisplay(selectedDisplay))
    }, [dispatch])

    // Memoize the coolingSelected callback
    const coolingSelected = useCallback((selectedCooling: ConfigurationStateInterface['cooling']) => {
        if (selectedCooling && selectedCooling != 'Standard' || display != '4K 60Hz') {
            dispatch(setCooling(selectedCooling))
        }
    }, [dispatch, display])

    // Memoize the nextPressed callback
    const nextPressed = useCallback(() => {
        if (display == null) {
            Alert.alert("Please select a display option")
            return
        }
        if (cooling == null) {
            Alert.alert("Please select a cooling option")
            return
        }

        goToNextStep()
    }, [display, cooling, goToNextStep])

    // Memoize the rendering of display options
    const displayOptionsView = useMemo(() => (
        <View style={{marginBottom: 20}}>
            <Text style={styles.pageHeaderText}>
                Select Display Option
            </Text>

            {
                displayOptions.map((eachOption, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{marginVertical: 10}}
                        onPress={() => displaySelected(eachOption)}
                    >
                        <View
                            style={[styles.baseModelBox, {
                                borderColor: display == eachOption ? '#000' : '#ccc'
                            }]}
                        >
                            <Text>
                                {eachOption}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    ), [display, displaySelected])

    // Memoize the rendering of cooling options
    const coolingOptionsView = useMemo(() => (
        <View style={{marginBottom: 20}}>
            <Text style={styles.pageHeaderText}>
                Select Cooling Option
            </Text>
            {
                display == '4K 60Hz' && (
                    <Text style={{color: 'red', fontSize: 12, marginBottom: 5}}>
                        Standard cooling option is not available for 4K 60Hz displays
                    </Text>
                )
            }

            {
                coolingOptions.map((eachOption, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{marginVertical: 10}}
                        onPress={() => coolingSelected(eachOption)}
                    >
                        <View
                            style={[styles.baseModelBox, {
                                borderColor: cooling == eachOption ? '#000' : '#ccc'
                            }]}
                        >
                            <Text
                                style={{color: display == '4K 60Hz' && eachOption && eachOption == 'Standard' ? '#ccc' : '#000'}}
                            >
                                {eachOption}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    ), [display, cooling, coolingSelected])

    return (
        <View
            style={styles.container}
        >
            <View style={{flex: 1, padding: 20}}>
                <ScrollView
                    contentContainerStyle={{paddingBottom: 20}}
                    showsVerticalScrollIndicator={false}
                >
                    {displayOptionsView}
                    {coolingOptionsView}
                </ScrollView>
            </View>

            <BackNext
                goToPreviousStep={goToPreviousStep}
                nextPressed={nextPressed}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20
    },
    pageHeaderText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    baseModelBox: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 10,
    }
})

export default DisplayCooling