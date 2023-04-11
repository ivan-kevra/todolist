import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API/TASKS'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9a6c26a3-7c0a-407d-ba38-123ea04fe40d'
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '8070978c-a2e0-4f9a-a173-1bb31fff2a65'
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '01b828d6-7d55-425c-a38b-d7b175e9f5b1'
    useEffect(() => {
        todolistAPI.createTask(todolistId, 'NEW TASK')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '01b828d6-7d55-425c-a38b-d7b175e9f5b1'
    const taskId = '567df93d-d5f0-4a01-89d0-4407244ba08d'
    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '01b828d6-7d55-425c-a38b-d7b175e9f5b1'
    const taskId = "7753dbb2-afe3-4c22-a4d3-f716b5d53ecf"

    useEffect(() => {
        todolistAPI.updateTask(todolistId, taskId, 'SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

