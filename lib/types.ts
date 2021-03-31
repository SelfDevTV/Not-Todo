export interface User {
    name: string
    email: string
    id: string
    todos: Todo[]
}

export interface Todo {
    _id: string
    title: string
    done: boolean
}
