import { Alert, Animated, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { ProductConfiguratorContext } from '../../ProductConfiguratorContext'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../core/store'
import Text from '../components/Text'
import Steps from '../components/Steps'
import BaseModel from './BaseModel'
import RecommendedConfigurationBottomSheet from '../components/RecommendedConfigurationBottomSheet'
import CpuRam from './CpuRam'
import StorageGpu from './StorageGpu'
import DisplayCooling from './DisplayCooling'
import AccessoriesSoftware from './AccessoriesSoftware'
import { Button } from 'react-native-paper'
import UndoRedo from '../components/UndoRedo'
import { setActiveStep } from '../core/configuration/ConfigurationSlice'

const HomeScreen = ({navigation}: {navigation: any}) => {
    const dispatch = useDispatch()
    const theme = useContext(ProductConfiguratorContext)
    const {baseModel, activeStep} = useSelector((state: RootState) => state.configuration.present)
    const [displayConfigurationBottomSheet, setDisplayConfigurationBottomSheet] = useState(false)
    // const [activeStep, setActiveStep] = useState(0)

    const BaseModelOpacity = useRef(new Animated.Value(0)).current
    const CpuRamOpacity = useRef(new Animated.Value(0)).current
    const StorageGpuOpacity = useRef(new Animated.Value(0)).current
    const DisplayCoolingOpacity = useRef(new Animated.Value(0)).current
    const AccessoriesSoftwareOpacity = useRef(new Animated.Value(0)).current
   
    useEffect(() => {
        if (baseModel !== null) {
            setDisplayConfigurationBottomSheet(true)
        }
    }, [baseModel]) 

    // Memoize the hideAllSteps function
    const hideAllSteps = useCallback(() => {
        Animated.timing(BaseModelOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
        Animated.timing(CpuRamOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
        Animated.timing(StorageGpuOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
        Animated.timing(DisplayCoolingOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
        Animated.timing(AccessoriesSoftwareOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [
        BaseModelOpacity,
        CpuRamOpacity,
        StorageGpuOpacity,
        DisplayCoolingOpacity,
        AccessoriesSoftwareOpacity,
    ])

    // Memoize the steps rendering logic
    const stepsRendering = useMemo(() => {
        hideAllSteps()
        switch (activeStep) {
            case 0:
                Animated.timing(BaseModelOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start()
                break;        
            case 1:
                Animated.timing(CpuRamOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start()
                break;        
            case 2:
                Animated.timing(StorageGpuOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start()
                break;        
            case 3:
                Animated.timing(DisplayCoolingOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start()
                break;        
            case 4:
                Animated.timing(AccessoriesSoftwareOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start()
                break;        
            default:
                break;
        }
    }, [activeStep, hideAllSteps])

    useEffect(() => {
        stepsRendering
    }, [activeStep, stepsRendering])
    

    const goToPreviewScreen = () => {
        navigation.push("PreviewScreen")
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {/* <ToastManager /> */}
            <Steps
                activeStep={activeStep}
                totalSteps={5}
            />

            <UndoRedo />
            
            <View style={{flex: 1}}>
                <Animated.View style={{
                    opacity: BaseModelOpacity,
                    flex: 1,
                    display: activeStep == 0 ? 'flex' : 'none',
                }}>
                    <BaseModel
                        // goToPreviousStep={() => dispatch(setActiveStep(0))}
                        goToNextStep={() => dispatch(setActiveStep(1))}
                    />
                </Animated.View>

                <Animated.View style={{
                    opacity: CpuRamOpacity,
                    flex: 1,
                    display: activeStep == 1 ? 'flex' : 'none',
                }}>
                    <CpuRam
                        goToPreviousStep={() => dispatch(setActiveStep(0))}
                        goToNextStep={() => dispatch(setActiveStep(2))}
                    />
                </Animated.View>

                <Animated.View style={{
                    opacity: StorageGpuOpacity,
                    flex: 1,
                    display: activeStep == 2 ? 'flex' : 'none',
                }}>
                    <StorageGpu
                        goToPreviousStep={() => dispatch(setActiveStep(1))}
                        goToNextStep={() => dispatch(setActiveStep(3))}
                    />
                </Animated.View>

                <Animated.View style={{
                    opacity: DisplayCoolingOpacity,
                    flex: 1,
                    display: activeStep == 3 ? 'flex' : 'none',
                }}>
                    <DisplayCooling
                        goToPreviousStep={() => dispatch(setActiveStep(2))}
                        goToNextStep={() => dispatch(setActiveStep(4))}
                    />
                </Animated.View>

                <Animated.View style={{
                    opacity: AccessoriesSoftwareOpacity,
                    flex: 1,
                    display: activeStep == 4 ? 'flex' : 'none',
                }}>
                    <AccessoriesSoftware
                        goToPreviousStep={() => dispatch(setActiveStep(3))}
                        goToNextStep={goToPreviewScreen}
                    />
                </Animated.View>
            </View>

            {/* <RecommendedConfigurationBottomSheet
                display={displayConfigurationBottomSheet}
                // setDisplay={setDisplayConfigurationBottomSheet}
            /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    nextContainer: {
        padding: 20
    }
})

export default HomeScreen