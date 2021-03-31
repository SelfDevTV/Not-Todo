export interface User {
    name: string;
    email: string;
    id: string;
    todos: Todo[];
}

export interface Todo {
    title: string;
    done: boolean;
}
