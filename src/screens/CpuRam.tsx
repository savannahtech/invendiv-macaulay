import { Alert, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Text from '../components/Text'
import { ConfigurationStateInterface, setBaseModel, setCpu, setRam } from '../core/configuration/ConfigurationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { RootState } from '../core/store'
import BackNext from '../components/BackNext'

interface RamOptionInterface {
    value: ConfigurationStateInterface['ram']
    enabled: boolean
}

const CpuRam = ({
    goToPreviousStep,
    goToNextStep
}: {
    goToPreviousStep: () => void
    goToNextStep: () => void
}) => {
    const dispatch = useDispatch()
    const {cpu, ram, baseModel} = useSelector((state: RootState) => state.configuration.present)
    const cpuOptions: ConfigurationStateInterface['cpu'][] = ['i5', 'i7', 'i9']
    
    // Memoize ramOptions to prevent recalculation on every render
    const ramOptions = useMemo<RamOptionInterface[]>(() => ([
        {
            value: 8,
            enabled: true,
        },
        {
            value: 16,
            enabled: true,
        },
        {
            value: 32,
            enabled: true,
        },
        {
            value: 64,
            enabled: true,
        },
    ]), [])

    // useCallback for memoized event handlers
    const cpuSelected = useCallback((selectedCpu: ConfigurationStateInterface['cpu']) => {
        dispatch(setCpu(selectedCpu))
    }, [dispatch])

    const ramSelected = useCallback((selectedRam: RamOptionInterface) => {
        if (selectedRam.value && selectedRam.value > 8 || cpu !== 'i9') {
            dispatch(setRam(selectedRam.value))
        }
    }, [cpu, dispatch])

    const nextPressed = useCallback(() => {
        if (cpu == null) {
            Alert.alert("Please select a CPU")
            return
        }
        if (ram == null) {
            Alert.alert("Please select a RAM")
            return
        }

        goToNextStep()
    }, [cpu, ram, goToNextStep])

    // useEffect for side effects related to baseModel and ram
    useEffect(() => {
        if (baseModel === 'Starter' && ram != null && ram > 16) {
            dispatch(setRam(16))
            Alert.alert("Your RAM configuration is too high for your base configuration model. We have set it to 16GB")
        } else if (baseModel === 'Pro' && ram != null && ram > 32) {
            dispatch(setRam(32))
            Alert.alert("Your RAM configuration is too high for your base configuration model. We have set it to 32GB")
        }
    }, [baseModel, ram, dispatch])

    // useEffect for side effects related to cpu and ram
    useEffect(() => {
        if (cpu === 'i9' && ram && ram <= 8) {
            dispatch(setRam(16))
            Alert.alert("Your RAM configuration is too low for your i9 CPU. We have set it to 16GB")
        }
    }, [cpu, ram, dispatch])

    return (
        <View
            style={styles.container}
        >
            <View style={{flex: 1, padding: 20}}>
                <ScrollView
                    contentContainerStyle={{paddingBottom: 20}}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.pageHeaderText}>
                            Select CPU
                        </Text>

                        {
                            cpuOptions.map((eachOption, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{marginVertical: 10}}
                                        onPress={() => cpuSelected(eachOption)}
                                    >
                                        <View
                                            style={[styles.baseModelBox, {
                                                borderColor: cpu === eachOption ? '#000' : '#ccc'
                                            }]}
                                        >
                                            <Text>
                                                {eachOption}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.pageHeaderText}>
                            Select RAM
                        </Text>
                        {
                            cpu === 'i9' && (
                                <Text style={{color: 'red', fontSize: 12, marginBottom: 5}}>
                                    Minimum of 16GB RAM is required for i9 CPU
                                </Text>
                            )
                        }

                        {
                            ramOptions.map((eachOption, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{marginVertical: 10}}
                                        onPress={() => ramSelected(eachOption)}
                                    >
                                        <View
                                            style={[styles.baseModelBox, {
                                                borderColor: ram === eachOption.value ? '#000' : '#ccc'
                                            }]}
                                        >
                                            <Text
                                                style={{color: cpu === 'i9' && eachOption.value && eachOption.value <= 8 ? '#ccc' : '#000'}}
                                            >
                                                {eachOption.value}GB
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
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

export default CpuRam