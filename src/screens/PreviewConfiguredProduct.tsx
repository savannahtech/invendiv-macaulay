import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import Text from '../components/Text'
import { useSelector } from 'react-redux'
import { RootState } from '../core/store'
import { usePriceCalculator } from '../hooks'
import { comma } from '../helpers'

// No need to memoize this component as it's already memoized by Redux's useSelector
const PreviewConfiguredProduct = () => {
    const {baseModel, cpu, ram, storage, gpu, cooling, display, accessories, software} = useSelector((state: RootState) => state.configuration.present)
    const [baseFee, accessoriesFee, baseFeeWithAccessories, accessoriesDiscount, amountDue, softwareFee] = usePriceCalculator()

    // Memoize the derived state to prevent recalculations on every render
    const selectedAccesories = useMemo(() => {
        const selected = []
        if (accessories.gamingHeadset) {
            selected.push({
                label: "Gaming Headset",
                price: 150
            })
        }
        if (accessories.mechanicalKeyboard) {
            selected.push({
                label: "Mechanical Keyboard",
                price: 100
            })
        }
        if (accessories.gamingMouse) {
            selected.push({
                label: "Gaming Mouse",
                price: 50
            })
        }
        return selected
    }, [accessories]); // Only recalculate if `accessories` changes

    const selectedSoftware = useMemo(() => {
        const selected = []
        if (software.officeSuite) {
            selected.push({
                label: "Office Suite",
                price: 100
            })
        }
        if (software.videoEditingSuite) {
            selected.push({
                label: "Video Editing Suite",
                price: 200
            })
        }
        return selected
    }, [software]); // Only recalculate if `software` changes

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        Base Model
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {baseModel}
                    </Text>
                    <Text style={[styles.previewBoxContent, {fontWeight: 'bold'}]}>
                        (${comma(baseFee)})
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        CPU
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {cpu}
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        RAM
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {ram}GP
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        Storage
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {ram}GB
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        GPU
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {gpu}
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        Display
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {display}
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        Accessories
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {selectedAccesories.length > 0 ? selectedAccesories.map((each) => each.label).join(', ') : 'None'}
                    </Text>
                    <Text style={[styles.previewBoxContent, {fontWeight: 'bold'}]}>
                        (${comma(accessoriesFee)})
                    </Text>
                </View>
                <View style={styles.previewBox}>
                    <Text style={styles.previewBoxTitle}>
                        Software
                    </Text>
                    <Text style={styles.previewBoxContent}>
                        {selectedSoftware.length > 0 ? selectedSoftware.map((each) => each.label).join(', ') : 'None'}
                    </Text>
                    <Text style={[styles.previewBoxContent, {fontWeight: 'bold'}]}>
                        (${comma(softwareFee)})
                    </Text>
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={styles.previewBoxTitle}>
                        Total
                    </Text>
                    <Text style={{fontSize: 30, fontWeight: 'normal'}}>
                        ${comma(baseFeeWithAccessories)}
                    </Text>
                </View>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.previewBoxTitle}>
                        Discount
                    </Text>
                    <Text style={{fontSize: 30, fontWeight: 'normal'}}>
                        {accessoriesDiscount > 0 && '-'}${comma(accessoriesDiscount)}
                    </Text>
                </View>
                <View style={{borderTopWidth: 1, paddingTop: 15}}>
                    <Text style={styles.previewBoxTitle}>
                        Final Amount Due
                    </Text>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                        ${comma(amountDue)}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    previewBox: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingTop: 10,
        paddingBottom: 20
    },
    previewBoxTitle: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#888',
        marginBottom: 5
    },
    previewBoxContent: {

    }
})

export default PreviewConfiguredProduct