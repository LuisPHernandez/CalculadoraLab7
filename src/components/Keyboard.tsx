import Button from "./Button";
import "./Keyboard.css";

export default function Keyboard({ onButtonPress }: { onButtonPress: (value: string) => void }) {
    const keys = ["C", "back", "+/-", "/", "7", "8", "9", "*", "4", "5", "6", "+", "1", "2", "3", "-", "0", ".", "="];

    return (
        <div className="keyboard">
            {keys.map((key) => (
                <Button 
                    key={key} 
                    label={key} 
                    onPress={() => onButtonPress(key)}
                    isNumber={!Number.isNaN(Number(key))}
                    isZero={key === "0"} 
                />
            ))}
        </div>
    )
}