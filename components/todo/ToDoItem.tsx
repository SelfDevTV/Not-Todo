import useToDo from '@lib/hooks/useToDo'
import { Todo } from '@lib/types'
import { useState } from 'react'
import { DotsIcon } from '../icons/DotsIcon'
import { TrashIcon } from '../icons/TrashIcon'

interface Props {
    todo: Todo
    onTitleChanged: (title: string) => void
    onDoneChanged: (done: boolean) => void
}

export const ToDoItem = ({ todo, onTitleChanged, onDoneChanged }: Props) => {
    const { done, title, setTitle, switchDone } = useToDo(
        todo,
        onDoneChanged,
        onTitleChanged
    )
    const [menu, setMenu] = useState<boolean>(false)

    return (
        <span className="flex justify-between border rounded-lg shadow-lg py-2 px-2 my-2 w-full">
            <div>{title}</div>
            <div className="flex">
                <input
                    type="checkbox"
                    className="self-center focus:outline-none mr-2"
                    checked={done}
                    onChange={() => switchDone()}
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
