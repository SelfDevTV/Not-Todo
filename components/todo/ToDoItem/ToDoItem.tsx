import useToDo from '@lib/hooks/useToDo'
import { Todo } from '@lib/types'
import { useState } from 'react'
import { DotsIcon } from '../../icons/DotsIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import ToDoEdit from './ToDoEdit'

interface Props {
    todo: Todo
    onTitleChanged: (title: string) => void
    onDoneChanged: (done: boolean) => void
}

export const ToDoItem = ({ todo, onTitleChanged, onDoneChanged }: Props) => {
    const [menu, setMenu] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const { done, title, setTitle, switchDone } = useToDo(
        todo,
        onDoneChanged,
        onTitleChanged
    )

    const switchEdit = () => setEdit((current) => !current)

    return (
        <span className="flex justify-between border rounded-lg shadow-lg py-2 px-2 my-2 w-full">
            {!edit && <div onDoubleClick={switchEdit}>{title}</div>}
            {edit && (
                <ToDoEdit
                    initialValue={title}
                    onDoubleClick={switchEdit}
                    onSubmit={(newTitle) => {
                        if (title != newTitle) {
                            setTitle(newTitle)
                        }
                        switchEdit()
                    }}
                />
            )}
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
