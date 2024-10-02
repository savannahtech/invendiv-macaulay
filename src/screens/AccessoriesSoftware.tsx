import { Alert, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Text from '../components/Text'
import { ConfigurationStateInterface, setBaseModel, setCooling, setCpu, setDisplay, setGamingHeadset, setGamingMouse, setGpu, setMechanicalKeyboard, setOfficeSuite, setRam, setStorage, setVideoEditingSuite } from '../core/configuration/ConfigurationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { RootState } from '../core/store'
import { comma } from '../helpers'
import BackNext from '../components/BackNext'

interface OptionInterface {
    key: string
    label: string
    price: number
}

const AccessoriesSoftware = ({
    goToPreviousStep,
    goToNextStep
}: {
    goToPreviousStep: () => void
    goToNextStep: () => void
}) => {
    const dispatch = useDispatch()
    const {accessories, software} = useSelector((state: RootState) => state.configuration.present)
    const accessoriesOptions: OptionInterface[] = [
        {
            key: 'gamingMouse',
            label: 'Gaming Mouse',
            price: 50
        },
        {
            key: 'mechanicalKeyboard',
            label: 'Mechanical Keyboard',
            price: 100
        },
        {
            key: 'gamingHeadset',
            label: 'Gaming Headset',
            price: 150
        }
    ]
    const softwareOptions: OptionInterface[] = [
        {
            key: 'officeSuite',
            label: 'Office Suite',
            price: 100
        },
        {
            key: 'videoEditingSuite',
            label: 'Professional Video Editing Suite',
            price: 200
        }
    ]

    const accessoriesSelected = (selectedOption: OptionInterface) => {
        switch (selectedOption.key)
        {
            case 'gamingMouse':
                dispatch(setGamingMouse(!accessories.gamingMouse))
                break;
            case 'mechanicalKeyboard':
                dispatch(setMechanicalKeyboard(!accessories.mechanicalKeyboard))
                break;
            case 'gamingHeadset':
                dispatch(setGamingHeadset(!accessories.gamingHeadset))
                break;
            default:
                break;
        }
    }

    const softwareSelected = (selectedOption: OptionInterface) => {
        switch (selectedOption.key)
        {
            case 'officeSuite':
                dispatch(setOfficeSuite(!software.officeSuite))
                break;
            case 'videoEditingSuite':
                dispatch(setVideoEditingSuite(!software.videoEditingSuite))
                break;
            default:
                break;
        }
    }

    const nextPressed = () => {
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
                            Select Accessories
                        </Text>
                        <Text style={styles.pageHeaderSubtext}>
                            (Optional)
                        </Text>

                        {
                            accessoriesOptions.map((eachOption, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{marginVertical: 10}}
                                        onPress={() => accessoriesSelected(eachOption)}
                                    >
                                        <View
                                            style={[styles.baseModelBox, {
                                                borderColor: accessories[eachOption.key] ? '#000' : '#ccc'
                                            }]}
                                        >
                                            <Text style={styles.label}>
                                                {eachOption.label}
                                            </Text>
                                            <Text style={styles.price}>
                                                ${comma(eachOption.price)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.pageHeaderText}>
                            Select Software Options
                        </Text>
                        <Text style={styles.pageHeaderSubtext}>
                            (Optional)
                        </Text>

                        {
                            softwareOptions.map((eachOption, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{marginVertical: 10}}
                                        onPress={() => softwareSelected(eachOption)}
                                    >
                                        <View
                                            style={[styles.baseModelBox, {
                                                borderColor: software[eachOption.key] ? '#000' : '#ccc'
                                            }]}
                                        >
                                            <Text style={styles.label}>
                                                {eachOption.label}
                                            </Text>
                                            <Text style={styles.price}>
                                                ${comma(eachOption.price)}
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
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    pageHeaderSubtext: {
        fontSize: 12,
        color: '#888'
    }
})

export default AccessoriesSoftware