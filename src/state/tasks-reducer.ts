import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

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

const initialState: TasksStateType = {
    ['1']: [
        {
            id: v1(),
            title: 'HTML&CSS',
            status: TaskStatuses.Completed,
            todoListId: '1',
            addedDate: '',
            deadline: '',
            startDate: '',
            order: 0,
            description: '',
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'JS',
            status: TaskStatuses.Completed,
            todoListId: '1',
            addedDate: '',
            deadline: '',
            startDate: '',
            order: 0,
            description: '',
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'ReactJS',
            status: TaskStatuses.New,
            todoListId: '1',
            addedDate: '',
            deadline: '',
            startDate: '',
            order: 0,
            description: '',

            priority: TaskPriorities.Low
        },
    ],
    ['2']: [
        {
            id: v1(),
            title: 'Rest API',
            status: TaskStatuses.Completed,
            todoListId: '1',
            addedDate: '',
            deadline: '',
            startDate: '',
            order: 0,
            description: '',
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'GraphQL',
            status: TaskStatuses.New,
            todoListId: '1',
            addedDate: '',
            deadline: '',
            startDate: '',
            order: 0,
            description: '',
            priority: TaskPriorities.Low
        },
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
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
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}