import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API/TODOLISTS',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('NEW TODOLIST')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9fe645e4-babb-455e-85b9-cd6949e6cff1'
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {

                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8990d03f-d478-472a-ae3c-7c6fdb385092'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
