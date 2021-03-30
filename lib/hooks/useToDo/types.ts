export enum ActionType {
    SET_TITLE = "set_title",
    SET_DONE = "set_done",
    SWITCH_DONE = "switch_done",
}

export type Action = SetTitleAction | SetDoneAction | SwitchDoneAction;

interface SetTitleAction {
    type: ActionType.SET_TITLE;
    payload: string;
}

interface SetDoneAction {
    type: ActionType.SET_DONE;
    payload: boolean;
}

interface SwitchDoneAction {
    type: ActionType.SWITCH_DONE;
}
