import {
    addTodolistAC,
    clearTodolistsDataAC,
    removeTodolistAC,
    setTodolistsAC,
    TasksStateType
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";


export const tasksReducer = (state: TasksStateType = {}, action: TasksActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId ? {...task, entityStatus: action.status} : task)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((todolist) => copyState[todolist.id] = [])
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks.map((task) => ({...task, entityStatus: 'idle'}))}
        case 'ClEAR-DATA':
            return {}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model}) as const
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: 'SET-TASKS', todolistId, tasks}) as const
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return ({type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, status} as const)
}

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handlerServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handlerServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handlerServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handlerServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(task => task.id === taskId)
    if (!task) {
        console.warn('task not fount in state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        priority: task.priority,
        description: task.description,
        startDate: task.startDate,
        status: task.status,
        ...domainModel
    }
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handlerServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handlerServerNetworkError(error, dispatch)
        })
}


//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ReturnType<typeof clearTodolistsDataAC>
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}