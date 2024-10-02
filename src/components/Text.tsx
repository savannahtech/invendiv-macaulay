import { StyleSheet, Text as NativeText, View, TextStyle } from 'react-native'
import React, { useContext, memo } from 'react'
import { ProductConfiguratorContext } from '../../ProductConfiguratorContext'

const Text = ({
    children,
    style,
    ...props
}: {
    children?: React.ReactNode | undefined
    style?: TextStyle | TextStyle[]
}) => {
    const theme = useContext(ProductConfiguratorContext)

    // Memoize the style object
    const memoizedStyle = React.useMemo(() => ({
        color: theme == 'light' ?  'black' : 'white',
        ...style,
    }), [theme, style]) 

    return (
        <NativeText
            {...props}
            style={memoizedStyle} 
        >
            {children}
        </NativeText>
    )
}

const styles = StyleSheet.create({})

export default memo(Text)