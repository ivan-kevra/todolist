import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId
                        ? {...task, isDone: action.isDone}
                        : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId
                        ? {...task, title: action.title}
                        : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const AddTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}