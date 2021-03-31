import { Fragment, useState } from 'react'
import { useQuery } from 'react-query'

import { ToDoItem } from './ToDoItem'
import { testdata } from '../../testdata'
import type { Todo } from '@lib/types'

enum Filter {
    All = 'All',
    Active = 'Active',
    Done = 'Done',
}

export const ToDoContainer = () => {
    const { isLoading, error, data: todos } = useQuery<Todo[]>(
        'todos',
        fetchTodos
    )

    // default is so you can see all
    const [filter, setFilter] = useState(Filter.All)

    if (isLoading) {
        return <p>Loading..</p>
    }

    return (
        <div className="w-full border rounded-2xl shadow-lg px-3 py-2">
            {getFilteredTodos(filter, todos).map((todo) => (
                <Fragment key={todo._id}>
                    <ToDoItem
                        todo={todo}
                        onDoneChanged={() => {}} //Currently unused
                        onTitleChanged={() => {}} //Currently unused
                    />
                </Fragment>
            ))}
            <div className="w-full flex justify-between items-center">
                <div>
                    <p>{testdata.length} items left</p>
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

const fetchTodos = async () => {
    const res = await fetch('/api/todos', {
        method: 'GET',
    })
    return res.json()
}
