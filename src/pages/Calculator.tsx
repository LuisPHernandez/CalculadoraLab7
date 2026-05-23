import Screen from "../components/Screen"
import Keyboard from "../components/Keyboard"
import { useState } from "react"
import "./Calculator.css"

export default function Calculator() {
    const [displayNumber, setDisplayNumber] = useState("0")
    const [firstOperand, setFirstOperand] = useState<number | null>(null)
    const [restartDisplayNumber, setRestartDisplayNumber] = useState(false)
    const [operation, setOperation] = useState("")  

    const MAX_DISPLAY_LENGTH = 9
    const MAX_DISPLAY_VALUE = 999999999

    const handleButtonPress = (value: string) => {
        console.log("Button pressed:", value)
        if (!Number.isNaN(Number(value))) {
            if (displayNumber === "ERROR") {
                setDisplayNumber("0")
                return
            }
            if (restartDisplayNumber) {
                setDisplayNumber("0")
                setRestartDisplayNumber(false)
            }

            setDisplayNumber((prev) => {
                if (prev.length >= MAX_DISPLAY_LENGTH) {
                    return prev
                }

                return prev === "0" ? value : prev + value
            })
        } else if (value === "C") {
            setDisplayNumber("0")
            setFirstOperand(null)
            setRestartDisplayNumber(false)
            setOperation("")
        } else if (value === "back") {
            if (displayNumber === "ERROR" || displayNumber === "NaN") {
                setDisplayNumber("0")
                return
            } 
            setDisplayNumber((prev) => prev.length > 1 ? prev.slice(0, -1) : "0")
        } else if (value === "+/-") {
            if (displayNumber === "ERROR" || displayNumber === "NaN") {
                setDisplayNumber("0")
                return
            }
            setDisplayNumber((prev) => prev.startsWith("-") ? prev.slice(1) : "-" + prev)
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            if (displayNumber === "ERROR" || displayNumber === "NaN") {
                setDisplayNumber("0")
                return
            }

            const currentNumber = Number(displayNumber)

            if (firstOperand !== null) {
                const result = calculate(firstOperand, currentNumber, operation)
                const formattedResult = formatDisplayValue(result)

                setDisplayNumber(formattedResult)
                setFirstOperand(formattedResult === "ERROR" ? null : Number(formattedResult))
            } else {
                setFirstOperand(currentNumber)
            }
            setOperation(value)
            setRestartDisplayNumber(true)
        } else if (value === "=") {
            if (displayNumber === "ERROR" || displayNumber === "NaN") {
                setDisplayNumber("0")
                return
            }
            if (firstOperand !== null) {
                const result = calculate(firstOperand, Number(displayNumber), operation)

                setDisplayNumber(formatDisplayValue(result))
                setFirstOperand(null)
                setOperation("")
                setRestartDisplayNumber(true)
            }
        } else if (value === ".") {
            if (displayNumber === "ERROR" || displayNumber === "NaN") {
                setDisplayNumber("0")
                return
            }
            if (!displayNumber.includes(".") && displayNumber.length < MAX_DISPLAY_LENGTH) {
                setDisplayNumber((prev) => prev + ".")
            }
        }
    }

    const calculate = (operand1: number, operand2: number, op: string) => {
        switch (op) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "*":
                return operand1 * operand2;
            case "/":
                return operand1 / operand2;
            default:
                return 0;
        }
    }

    const formatDisplayValue = (value: number) => {
        if (value < 0 || value > MAX_DISPLAY_VALUE) {
            return "ERROR"
        }

        const textValue = String(value)

        if (textValue.length <= MAX_DISPLAY_LENGTH) {
            return textValue
        }

        const integerLength = String(Math.trunc(value)).length

        if (integerLength >= MAX_DISPLAY_LENGTH) {
            return "ERROR"
        }

        const decimalsAllowed = MAX_DISPLAY_LENGTH - integerLength - 1
        const roundedValue = value.toFixed(decimalsAllowed)

        return roundedValue.length <= MAX_DISPLAY_LENGTH ? roundedValue : "ERROR"
    }

    return (
        <div className="calculator">
            <Screen value={displayNumber} />
            <Keyboard onButtonPress={handleButtonPress} />
        </div>
    )
}