import { useState } from 'react'
import { DotsIcon } from '../icons/DotsIcon'
import { TrashIcon } from '../icons/TrashIcon'
export const ToDoItem = ({ title, isDone }) => {
    const [completed, setCompleted] = useState(isDone)
    const [menu, setMenu] = useState()

    return (
        <span className="flex justify-between border rounded-lg shadow-lg py-2 px-2 my-2 w-full">
            <div>{title}</div>
            <div className="flex">
                <input
                    type="checkbox"
                    className="self-center focus:outline-none mr-2"
                    checked={completed ? 'checked' : ''}
                    onChange={() => setCompleted(!completed)}
                />

                {menu ? (
                    <div className="self-center">
                        <button
                            className={`flex rounded-lg focus:outline-none ml-2  transform hover:scale-110 duration-500 ease-in-out`}
                            onClick={() => setMenu(!menu)}
                        >
                            <TrashIcon />
                        </button>
                    </div>
                ) : null}
                <button
                    className={`focus:outline-none mx-2 duration-500 ${
                        menu ? 'transform -rotate-90 ' : ''
                    }`}
                    onClick={() => setMenu(!menu)}
                >
                    <DotsIcon />
                </button>
            </div>
        </span>
    )
}
