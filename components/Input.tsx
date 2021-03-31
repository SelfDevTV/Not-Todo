interface Props {
    value: string
    onChange: (newValue: string) => void
}

const Input = ({ value, onChange }: Props) => {
    return (
        <input
            className="border rounded-lg shadow-lg py-2 px-2 my-2 w-full"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        ></input>
    )
}

export default Input
