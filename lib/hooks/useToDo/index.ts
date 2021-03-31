import { useReducer } from 'react'
import type { Todo } from '@lib/types'
import { ActionType, Action } from './types'

type onDone = (boolean) => void
type onTitle = (string) => void

const useToDo = (
    todo: Todo,
    onDoneChanged: onDone,
    onTitleChanged: onTitle
) => {
    const reducer = (state: Todo, action: Action) => {
        switch (action.type) {
            case ActionType.SET_TITLE:
                return { ...state, title: action.payload }
            case ActionType.SET_DONE:
                return { ...state, done: action.payload }
            case ActionType.SWITCH_DONE:
                return { ...state, done: !state.done }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, todo)

    const setTitle = (title: string) => {
        dispatch({ type: ActionType.SET_TITLE, payload: title })

        onTitleChanged(title)
    }

    const switchDone = () => {
        dispatch({ type: ActionType.SWITCH_DONE })
        onDoneChanged(!state.done)
    }

    return { setTitle, switchDone, title: state.title, done: state.done }
}

export default useToDo
