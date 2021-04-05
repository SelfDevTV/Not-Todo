import { Fragment, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ToDoItem } from './ToDoItem'
import { testdata } from '../../testdata'
import type { Todo } from '@lib/types'

enum Filter {
    All = 'All',
    Active = 'Active',
    Done = 'Done',
}

interface Props {
    serverSideToDos?: Todo[]
}

export const ToDoContainer = ({ serverSideToDos }: Props) => {
    const { isLoading, error, data: todos } = useQuery<Todo[]>(
        'todos',
        fetchTodos,
        { initialData: serverSideToDos }
    )
    //Use this mutation to update particular ToDo
    const putToDo = useMutation((changedToDo: Todo) =>
        fetch('/api/todos', {
            method: 'PUT',
            body: JSON.stringify(changedToDo),
        })
    )

    // default is so you can see all
    const [filter, setFilter] = useState(Filter.All)

    return (
        <div className="w-full border rounded-2xl shadow-lg px-3 py-2 w-1/3">
            {getFilteredTodos(filter, todos).map((todo) => (
                <Fragment key={todo._id}>
                    <ToDoItem
                        todo={todo}
                        onDoneChanged={(newDone) => {
                            putToDo.mutate({ ...todo, done: newDone })
                        }}
                        onTitleChanged={(newTitle) => {
                            putToDo.mutate({ ...todo, title: newTitle })
                        }} //Currently unused
                    />
                </Fragment>
            ))}
            <div className="w-full flex justify-between items-center">
                <div>
                    <p>{todos.length} items left</p>
                </div>
                <div className="flex w-1/2 justify-between">
                    <button
                        className={`${
                            filter === Filter.All ? 'border' : null
                        } p-2 focus:outline-none`}
                        onClick={() => setFilter(Filter.All)}
                    >
                        All
                    </button>
                    <button
                        className={`${
                            filter === Filter.Active ? 'border' : null
                        } p-2 focus:outline-none`}
                        onClick={() => setFilter(Filter.Active)}
                    >
                        Active
                    </button>
                    <button
                        className={`${
                            filter === Filter.Done ? 'border' : null
                        } p-2 focus:outline-none`}
                        onClick={() => setFilter(Filter.Done)}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}

// gets the correct list of todos to render
const getFilteredTodos = (filter: Filter, todos: Todo[]) => {
    switch (filter) {
        case Filter.All:
            return todos
        case Filter.Active:
            return todos.filter((todo) => !todo.done)
        case Filter.Done:
            return todos.filter((todo) => todo.done)
    }
}

export const fetchTodos = async () => {
    const res = await fetch('/api/todos', {
        method: 'GET',
    })
    return res.json()
}
