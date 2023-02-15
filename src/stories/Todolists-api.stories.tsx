import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolist-api'


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            todolistsAPI.createTodolist('Todolist 1')
                .then((res) => {
                    setState(res.data)
                })
        },
        []
    )

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "f7ddf9fb-b68b-4baa-8c62-5f84175d4151"
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "f7ddf9fb-b68b-4baa-8c62-5f84175d4151"
        todolistsAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "3b59899d-c687-448f-81d3-bd640f1025d1"
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "3b59899d-c687-448f-81d3-bd640f1025d1"
        todolistsAPI.createTask(todolistId, 'NEW TASK')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "3b59899d-c687-448f-81d3-bd640f1025d1"
        const taskId = "10db08f0-3dc9-4f2d-a716-4e7b2022a45d"
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "3b59899d-c687-448f-81d3-bd640f1025d1"
        const taskId = "74970826-c232-4d80-b992-452cd7d325ae"
        todolistsAPI.updateTask(todolistId, taskId, 'SOME NEW TASK')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

