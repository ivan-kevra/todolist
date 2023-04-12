import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API/TODOLIST'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9a6c26a3-7c0a-407d-ba38-123ea04fe40d'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <input placeholder={'title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}/>
        <button onClick={createTodolist}>Create todolist</button>
        {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}/>
        <button onClick={deleteTodolist}>Create todolist</button>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistId, title).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}/>
        <input placeholder={'title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}/>
        <button onClick={updateTodolistTitle}>Update todolist title</button>
        {JSON.stringify(state)}
    </div>
}



