import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
type SetTasksACType = ReturnType<typeof SetTasksAC>
type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsAC
    | SetTasksACType

export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask = action.task
            return {
                ...state,
                [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId
                        ? {...task, status: action.status}
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
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((todolist) => {
                copyState[todolist.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const AddTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(SetTasksAC(todolistId, res.data.items))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(RemoveTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(AddTaskAC(res.data.data.item))
            })
    }
}

