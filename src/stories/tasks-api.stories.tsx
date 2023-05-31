import React, {useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API/TASKS',
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '458e9708-ff07-4c2d-8869-f48ded2bfa09'
        todolistAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '458e9708-ff07-4c2d-8869-f48ded2bfa09'
        todolistAPI.createTask(todolistId, 'NEW TASK')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '458e9708-ff07-4c2d-8869-f48ded2bfa09'
        const taskId = '8531378c-f7a5-4ccc-b7fa-805f5f5bce4f'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '458e9708-ff07-4c2d-8869-f48ded2bfa09'
        const taskId = '21a3b4f7-f961-4b0f-a480-8a8917f20946'
        todolistAPI.updateTask(todolistId, taskId, {
            id: taskId,
            title: 'title',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            deadline: '',
            addedDate: '',
            startDate: '',
            order: 0,
            todoListId: todolistId,
            description: ''
        })
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}