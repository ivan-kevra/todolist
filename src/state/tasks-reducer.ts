import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolistAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId
                    ? {...task, status: action.status}
                    : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.id]: []
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistId,
    taskId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    status
} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title
} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasks = getState().tasks[todolistId].find((task) => task.id === taskId)

    }


type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>




