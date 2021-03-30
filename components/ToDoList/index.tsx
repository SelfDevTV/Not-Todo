import { useState } from "react";
import ToDoListItem from "@components/ToDoListItem";
import { Todo } from "@lib/types";

const mockToDos: Todo[] = [
    {
        title: "Buy Milk",
        done: false,
    },
    {
        title: "Go Home",
        done: true,
    },
];

const ToDoList = () => {
    const [mock, setmock] = useState(mockToDos);

    const [newItem, setNewItem] = useState<string>("");
    //Currently used with no id, so we assume that title is unique. No change implemented yet
    const onTitleChanged = (oldTitle: string) => (newTitle: string) => {
        const todo = mockToDos.find((x) => x.title === oldTitle);
        todo.title = newTitle;
    };

    const onDoneChanged = (oldTitle: string) => (done: boolean) => {
        const id = mockToDos.findIndex((x) => x.title === oldTitle);
        mockToDos[id].done = done;
    };

    return (
        <>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                className="border border-4"
                onClick={() => mockToDos.push({ title: newItem, done: false })}
            >
                add
            </button>
            <div className="flex flex-col justify-around">
                {mockToDos.map((x) => (
                    <ToDoListItem
                        key={x.title}
                        item={x}
                        onTitleChanged={onTitleChanged(x.title)}
                        onDoneChanged={onDoneChanged(x.title)}
                    />
                ))}
            </div>
        </>
    );
};

export default ToDoList;
