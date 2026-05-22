import './Screen.css'

export default function Screen({ value }: { value: string }) {
    return (
        <div className="screen">
            {value}
        </div>
    )
}