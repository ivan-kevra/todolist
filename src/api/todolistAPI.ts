import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9a6c26a3-7c0a-407d-ba38-123ea04fe40d',
    },
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: TaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {task})
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}
type ResponseType<D = {}> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}


