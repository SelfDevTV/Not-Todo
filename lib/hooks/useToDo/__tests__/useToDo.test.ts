import { renderHook, act } from "@testing-library/react-hooks";
import useToDo from "../index";
import { Todo } from "@lib/types";

describe("useToDo", () => {
    it("returns initial state", () => {
        const onTitleChanged = jest.fn((_) => {});
        const onDoneChanged = jest.fn((_) => {});

        const initial: Todo = { title: "Buy milk", done: false };

        const { result } = renderHook(() =>
            useToDo(initial, onDoneChanged, onTitleChanged)
        );
        const { title, done } = result.current;

        expect(title).toBe(initial.title);
        expect(done).toBe(initial.done);
    });
    it("sets title without errors", () => {
        const onTitleChanged = jest.fn((_) => {});
        const onDoneChanged = (_) => {};

        const initial: Todo = { title: "Buy milk", done: false };

        const { result } = renderHook(() =>
            useToDo(initial, onDoneChanged, onTitleChanged)
        );

        //!!!WARNING!!! DO NOT DESTRUCUTRE RESULT, IT WILL CAUSE STATE UPDATE ISSUES
        const newTitle = "Go to shop";
        act(() => result.current.setTitle(newTitle));

        expect(result.current.title).toBe(newTitle);
        expect(onTitleChanged.mock.calls[0][0]).toBe(newTitle);
    });
    it("switches 'done' status", () => {
        const onTitleChanged = (_) => {};
        const onDoneChanged = jest.fn((_) => {});

        const initial: Todo = { title: "Buy milk", done: false };
        const { result } = renderHook(() =>
            useToDo(initial, onDoneChanged, onTitleChanged)
        );
        //!!!WARNING!!! DO NOT DESTRUCUTRE RESULT, IT WILL CAUSE STATE UPDATE ISSUES
        act(() => result.current.switchDone());

        expect(result.current.done).toBe(true);
        expect(onDoneChanged.mock.calls[0][0]).toBe(true);
    });
});
