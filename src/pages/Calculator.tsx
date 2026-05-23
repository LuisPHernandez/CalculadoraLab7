import Screen from "../components/Screen"
import Keyboard from "../components/Keyboard"
import "./Calculator.css"
import useCalculator from "../hooks/useCalculator"

export default function Calculator() {
    const { displayNumber, handleButtonPress } = useCalculator()

    return (
        <div className="calculator">
            <Screen value={displayNumber} />
            <Keyboard onButtonPress={handleButtonPress} />
        </div>
    )
}