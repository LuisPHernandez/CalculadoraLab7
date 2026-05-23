import './Screen.css'

export default function Screen({ value }: { value: string }) {
    return (
        <div className="screen" data-testid="display">
            {value}
        </div>
    )
}