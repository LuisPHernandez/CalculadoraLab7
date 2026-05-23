import "./Button.css"

type ButtonProps = {
  isNumber: boolean
  isZero: boolean
  label: string
  onPress: () => void
};

export default function Button({ label, onPress, isNumber, isZero }: ButtonProps) {
    return (
        <div className={"button-container" + (isZero ? " zero-button-container" : "")}>
            <button onClick={onPress} className={isNumber ? "number-button" : "operator-button"}>
                {label}
            </button>
        </div>
    )
}