import Screen from "../components/Screen"
import Keyboard from "../components/Keyboard"
import { useState } from "react"
import "./Calculator.css"

export default function Calculator() {
    const [displayNumber, setDisplayNumber] = useState("0")
    const [firstOperand, setFirstOperand] = useState<number | null>(null)
    const [restartDisplayNumber, setRestartDisplayNumber] = useState(false)
    const [operation, setOperation] = useState("")  

    const hanleButtonPress = (value: string) => {
        console.log("Button pressed:", value)
        if (!Number.isNaN(Number(value))) {
            if (restartDisplayNumber) {
                setDisplayNumber("0")
                setRestartDisplayNumber(false)
            }
            setDisplayNumber((prev) => prev === "0" ? value : prev + value)
        } else if (value === "C") {
            setDisplayNumber("0")
            setFirstOperand(null)
            setRestartDisplayNumber(false)
            setOperation("")
        } else if (value === "back") {
            setDisplayNumber((prev) => prev.length > 1 ? prev.slice(0, -1) : "0")
        } else if (value === "+/-") {
            setDisplayNumber((prev) => prev.startsWith("-") ? prev.slice(1) : "-" + prev)
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            if (firstOperand !== null) {
                setDisplayNumber(String(calculate(firstOperand, Number(displayNumber), operation)))
                setFirstOperand(null)
            } else {
                setFirstOperand(Number(displayNumber))
                setOperation(value)
                setRestartDisplayNumber(true)
                console.log("First operand set to:", Number(displayNumber), "Operation set to:", value)
            }
        } else if (value === "=") {
            if (firstOperand !== null) {
                setDisplayNumber(String(calculate(firstOperand, Number(displayNumber), operation)))
                setFirstOperand(null)
                setOperation("")
            }
        } else if (value === ".") {
            if (!displayNumber.includes(".")) {
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

    return (
        <div className="calculator">
            <Screen value={displayNumber} />
            <Keyboard onButtonPress={hanleButtonPress} />
        </div>
    )
}