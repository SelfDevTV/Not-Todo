import { useState } from 'react'

interface Props {
    initialValue: string
    onSubmit: (newValue: string) => void
    onDoubleClick: () => void
}

const ToDoEdit = ({ initialValue, onDoubleClick, onSubmit }: Props) => {
    const [value, setValue] = useState(initialValue)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit(value)
            }}
            className="grid grid-rows-1 grid-cols-1 w-3/4"
        >
            {/* Change grid-cols-1 to grid-cols-2 if button is needed*/}
            <input
                className="border rounded-lg shadow-lg py-2 px-2 my-2 w-full mr-2"
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                onDoubleClick={() => onDoubleClick()}
            ></input>
            {/* <button className="border rounded-lg shadow-lg py-2 px-2 my-2 w-full">
                Save
            </button> */}
        </form>
    )
}

export default ToDoEdit
