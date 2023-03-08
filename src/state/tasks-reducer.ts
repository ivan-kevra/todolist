import {TasksStateType} from "../AppWithRedux";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


export type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter((task) => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    todoListId: action.todoListId,
                    priority: TaskPriorities.Low,
                    description: '',
                    order: 0,
                    addedDate: '',
                    deadline: '',
                    startDate: ''
                }, ...state[action.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((task) => task.id === action.taskId
                    ? {...task, status: action.status}
                    : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map((task) => task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            }
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todoListId,
        taskId
    } as const
}
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    } as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoListId,
        taskId,
        status,
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListId,
        taskId,
        title,

    } as const
}