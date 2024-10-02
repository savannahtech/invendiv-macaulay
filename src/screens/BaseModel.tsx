import { Alert, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import Text from '../components/Text'
import { ConfigurationStateInterface, setBaseModel } from '../core/configuration/ConfigurationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { comma } from '../helpers'
import { RootState } from '../core/store'
import { Button } from 'react-native-paper'
import BackNext from '../components/BackNext'

interface BaseModelOptionInterface {
    label: "Starter" | "Pro" | "Elite"
    price: number
}

const BaseModel = memo(({
    // goToPreviousStep,
    goToNextStep
}: {
    // goToPreviousStep: () => void
    goToNextStep: () => void
}) => {
    const dispatch = useDispatch()
    const {baseModel} = useSelector((state: RootState) => state.configuration.present)
    // const baseModelOptions: ConfigurationStateInterface['baseModel'][] = ['Starter', 'Pro', 'Elite']
    const availableBaseModelOptions: BaseModelOptionInterface[] = [
        {
            label: 'Starter',
            price: 800
        },
        {
            label: 'Pro',
            price: 1200
        },
        {
            label: 'Elite',
            price: 1800
        },
    ]

    const baseModelSelected = useCallback((baseModel: BaseModelOptionInterface) => {
        dispatch(setBaseModel(baseModel.label))
    }, [dispatch])

    const nextPressed = useCallback(() => {
        if (baseModel == null) {
            Alert.alert("Please select a base model")
            return
        }

        goToNextStep()
    }, [baseModel, goToNextStep])

    return (
        <View
            style={styles.container}
        >
            <View style={{flex: 1, padding: 20}}>
                <Text style={styles.pageHeaderText}>
                    Choose Your Configuration Model
                </Text>

                {
                    availableBaseModelOptions.map((eachBaseModelOption, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{marginVertical: 10}}
                                onPress={() => baseModelSelected(eachBaseModelOption)}
                            >
                                <View
                                    style={[styles.baseModelBox, {
                                        borderColor: baseModel == eachBaseModelOption.label ? '#000' : '#ccc'
                                    }]}
                                >
                                    <Text style={styles.label}>
                                        {eachBaseModelOption.label}
                                    </Text>
                                    <Text style={styles.price}>
                                        ${comma(eachBaseModelOption.price)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <BackNext
                nextPressed={nextPressed}
            />
        </View>
    )
})

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
        fontSize: 24,
        marginBottom: 5
    },
    price: {
        fontSize: 18,
        color: '#666'
    }
})

export default BaseModel