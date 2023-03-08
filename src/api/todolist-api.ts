import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<String>
    data: D
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
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
    description: string
    startDate: string
    deadline: string
    addedDate: string
    order: number
    priority: TaskPriorities
}
export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type ResponseTaskType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<String>
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9a6c26a3-7c0a-407d-ba38-123ea04fe40d',
    },
})

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists/`,)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, {title},
        )
        return promise
    },
    deleteTodolist(todoListId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todoListId}`,)
        return promise
    },
    updateTodolist(todoListId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todoListId}`, {title},)
        return promise
    },
    getTasks(todoListId: string) {
        const promise = instance.get<Array<TaskType>>(`/todo-lists/${todoListId}/tasks`)
        return promise
    },
    createTask(todoListId: string, title: string) {
        const promise = instance.post<ResponseTaskType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title},
        )
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise = instance.delete<ResponseTaskType>(`/todo-lists/${todoListId}/tasks/${taskId}`,)
        return promise
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseTaskType<{ item: UpdateTaskType }>>(`/todo-lists/${todoListId}/tasks/${taskId}`, {title})
        return promise
    },
}

