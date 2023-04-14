import {addTodolistAC, removeTodolistAC, setTodolistsAC, TasksStateType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";


export const tasksReducer = (state: TasksStateType = {}, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId ? {...task, ...action.model} : task)
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
            return {...state, [action.todolistId]: action.tasks}
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

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
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
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
            dispatch(setAppStatusAC('succeeded'))
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
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
type ThunkDispatch = Dispatch<ActionsType>