import { Fragment } from 'react'
import { ToDoItem } from './ToDoItem'
import { testdata } from '../../testdata'
import { useState } from 'react'

enum Filter {
    All = 'All',
    Active = 'Active',
    Done = 'Done',
}

export const ToDoContainer = () => {
    const [filter, setFilter] = useState(Filter.All)

    const renderFilteredTodos = () => {
        switch (filter) {
            case Filter.All:
                return testdata
            case Filter.Active:
                return testdata.filter((todo) => !todo.isDone)
            case Filter.Done:
                return testdata.filter((todo) => todo.isDone)
        }
    }

    return (
        <div className="w-full border rounded-2xl shadow-lg px-3 py-2">
            {renderFilteredTodos().map((todo) => (
                <Fragment key={todo.title}>
                    <ToDoItem title={todo.title} isDone={todo.isDone} />
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
