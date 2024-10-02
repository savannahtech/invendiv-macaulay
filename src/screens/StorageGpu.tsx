import { Alert, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import Text from '../components/Text'
import { ConfigurationStateInterface, setBaseModel, setCpu, setGpu, setRam, setStorage } from '../core/configuration/ConfigurationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { RootState } from '../core/store'
import { comma } from '../helpers'
import BackNext from '../components/BackNext'

interface StorageOptionInterface {
    value: ConfigurationStateInterface['storage']
    enabled: boolean
}

const StorageGpu = ({
    goToPreviousStep,
    goToNextStep
}: {
    goToPreviousStep: () => void
    goToNextStep: () => void
}) => {
    const dispatch = useDispatch()
    const {storage, gpu} = useSelector((state: RootState) => state.configuration.present)
    const gpuOptions: ConfigurationStateInterface['gpu'][] = ['Integrated', 'RTX 3060', 'RTX 3070', 'RTX 3080']

    const storageOptions = useMemo<StorageOptionInterface[]>(() => ([
        {
            value: 256,
            enabled: true,
        },
        {
            value: 512,
            enabled: true,
        },
        {
            value: 1024,
            enabled: true,
        },
        {
            value: 2048,
            enabled: true,
        },
    ]), [])

    useEffect(() => {
        if (gpu == 'RTX 3080' && storage && storage <= 512) {
            dispatch(setStorage(512))
            Alert.alert("Your storage is too low for your GPU. We have set it to 512GB")
        }
    }, [gpu])

    const storageSelected = (selectedStorage: StorageOptionInterface) => {
        if (selectedStorage.value && selectedStorage.value >= 512 || gpu != 'RTX 3080') {
            dispatch(setStorage(selectedStorage.value))
        }
    }

    const gpuSelected = (selectedGpu: ConfigurationStateInterface['gpu']) => {
        dispatch(setGpu(selectedGpu))
    }

    const nextPressed = () => {
        if (storage == null) {
            Alert.alert("Please select a storage")
            return
        }
        if (gpu == null) {
            Alert.alert("Please select a GPU")
            return
        }

        goToNextStep()
    }

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
                            Select Storage
                        </Text>
                        {
                            gpu == 'RTX 3080' && (
                                <Text style={{color: 'red', fontSize: 12, marginBottom: 5}}>
                                    Minimum of 512GB Storage is required for RTX 3080 GPU
                                </Text>
                            )
                        }

                        {
                            storageOptions.map((eachOption, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{marginVertical: 10}}
                                        onPress={() => storageSelected(eachOption)}
                                    >
                                        <View
                                            style={[styles.baseModelBox, {
                                                borderColor: storage == eachOption.value ? '#000' : '#ccc'
                                            }]}
                                        >
                                            <Text
                                                style={{color: gpu == 'RTX 3080' && eachOption.value && eachOption.value < 512 ? '#ccc' : '#000'}}
                                            >
                                                {comma(eachOption.value ?? 0)}GB
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.pageHeaderText}>
                            Select GPU
                        </Text>

                        {
                            gpuOptions.map((eachOption, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{marginVertical: 10}}
                                        onPress={() => gpuSelected(eachOption)}
                                    >
                                        <View
                                            style={[styles.baseModelBox, {
                                                borderColor: gpu == eachOption ? '#000' : '#ccc'
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

export default StorageGpu