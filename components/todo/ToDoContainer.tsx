import { Fragment } from 'react'
import { ToDoItem } from './ToDoItem'
import { testdata } from '../../testdata'
export const ToDoContainer = () => {
    return (
        <div className="w-full border rounded-2xl shadow-lg px-3 py-2">
            {testdata.map((todo) => (
                <Fragment key={todo.title}>
                    <ToDoItem title={todo.title} isDone={todo.isDone} />
                </Fragment>
            ))}
        </div>
    )
}
