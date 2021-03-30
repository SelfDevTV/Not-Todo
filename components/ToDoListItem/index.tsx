import { useState } from "react";
import useToDo from "@lib/hooks/useToDo";
import { Todo } from "@lib/types";

interface Props {
    item: Todo;
    onTitleChanged: (string) => void;
    onDoneChanged: (boolean) => void;
}

const ToDoListItem = ({ item, onTitleChanged, onDoneChanged }: Props) => {
    const [edit, setEdit] = useState(false);
    const { title, done, setTitle, switchDone } = useToDo(
        item,
        onTitleChanged,
        onDoneChanged
    );

    return (
        <div className="flex flex-row border mt-6 p-2 border-black rounded">
            <div
                className="border p-2 border-black mr-2 rounded-full"
                onClick={switchDone}
            >
                {done ? "+" : " "}
            </div>

            <p
                className={`${done && "line-through"}`}
                onDoubleClick={() => setEdit((current) => !current)}
            >
                {title}
            </p>
        </div>
    );
};

export default ToDoListItem;
