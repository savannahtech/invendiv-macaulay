import { useSelector } from "react-redux"
import { RootState } from "./core/store"

export const usePriceCalculator = () => {
    const {baseModel, cpu, ram, storage, gpu, cooling, display, accessories, software} = useSelector((state: RootState) => state.configuration.present)

    let baseFee = 0
    let accessoriesFee = 0
    let softwareFee = 0
    let discount = 0

    switch (baseModel) {
        case 'Starter':
            baseFee += 800
            break;
            
        case 'Pro':
            baseFee += 1200
            break;
            
        case 'Elite':
            baseFee += 1800
            break;
            
        default:
            break;
    }

    if (accessories.gamingMouse) {
        accessoriesFee += 50
    }

    if (accessories.mechanicalKeyboard) {
        accessoriesFee += 100
    }

    if (accessories.gamingHeadset) {
        accessoriesFee += 150
    }

    if (software.videoEditingSuite) {
        softwareFee += 200
    }

    if (software.officeSuite) {
        softwareFee += 100
    }

    if (accessories.gamingHeadset && accessories.gamingMouse && accessories.mechanicalKeyboard) {
        discount = .10 * (accessoriesFee)
    }

    return [baseFee, accessoriesFee, baseFee + accessoriesFee + softwareFee, discount, baseFee + accessoriesFee + softwareFee - discount, softwareFee]
}