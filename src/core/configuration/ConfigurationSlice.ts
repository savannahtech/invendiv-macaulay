import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ConfigurationStateInterface {
    activeStep: number
    baseModel: null | 'Starter' | 'Pro' | 'Elite'
    cpu: null | 'i5' | 'i7' | 'i9'
    ram: null | 8 | 16 | 32 | 64
    storage: null | 256 | 512 | 1024 | 2048
    gpu: null | 'Integrated' | 'RTX 3060' | 'RTX 3070' | 'RTX 3080'
    display: null | '1080p 144Hz' | '1440p 165Hz' | '4K 60Hz'
    cooling: null | 'Standard' | 'Advanced' | 'Liquid'
    accessories: {
        gamingMouse: boolean;
        mechanicalKeyboard: boolean;
        gamingHeadset: boolean;
    }
    software: {
        officeSuite: boolean;
        videoEditingSuite: boolean;
    }
}

const initialState: ConfigurationStateInterface = {
    activeStep: 0,
    baseModel: null,
    cpu: null,
    ram: null,
    storage: null,
    gpu: null,
    display: null,
    cooling: null,
    accessories: {
        gamingMouse: false,
        mechanicalKeyboard: false,
        gamingHeadset: false,
    },
    software: {
        officeSuite: false,
        videoEditingSuite: false,
    }
}

export const {
    reducer: ConfigurationReducer,
    actions
} =  createSlice({
    name: 'ConfigurationReducer',
    initialState,
    reducers: {
        setActiveStep: (state, action: PayloadAction<number>) => {
            state.activeStep = action.payload
        },
        setBaseModel: (state, action: PayloadAction<ConfigurationStateInterface['baseModel']>) => {
            state.baseModel = action.payload
        },
        setCpu: (state, action: PayloadAction<ConfigurationStateInterface['cpu']>) => {
            state.cpu = action.payload
        },
        setRam: (state, action: PayloadAction<ConfigurationStateInterface['ram']>) => {
            state.ram = action.payload
        },
        setStorage: (state, action: PayloadAction<ConfigurationStateInterface['storage']>) => {
            state.storage = action.payload
        },
        setGpu: (state, action: PayloadAction<ConfigurationStateInterface['gpu']>) => {
            state.gpu = action.payload
        },
        setDisplay: (state, action: PayloadAction<ConfigurationStateInterface['display']>) => {
            state.display = action.payload
        },
        setCooling: (state, action: PayloadAction<ConfigurationStateInterface['cooling']>) => {
            state.cooling = action.payload
        },
        setGamingMouse: (state, action: PayloadAction<boolean>) => {
            state.accessories.gamingMouse = action.payload
        },
        setMechanicalKeyboard: (state, action: PayloadAction<boolean>) => {
            state.accessories.mechanicalKeyboard = action.payload
        },
        setGamingHeadset: (state, action: PayloadAction<boolean>) => {
            state.accessories.gamingHeadset = action.payload
        },
        setOfficeSuite: (state, action: PayloadAction<boolean>) => {
            state.software.officeSuite = action.payload
        },
        setVideoEditingSuite: (state, action: PayloadAction<boolean>) => {
            state.software.videoEditingSuite = action.payload
        },
    },
})

export const { 
    setBaseModel, 
    setCpu, 
    setRam, 
    setStorage, 
    setGpu, 
    setDisplay, 
    setCooling,
    setGamingMouse,
    setMechanicalKeyboard,
    setGamingHeadset,
    setOfficeSuite,
    setVideoEditingSuite ,
    setActiveStep
} = actions