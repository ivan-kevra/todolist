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
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}/>
        <button onClick={getTasks}>Get tasks</button>
        {JSON.stringify(state)}
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const createTask = () => {
        todolistAPI.createTask(todolistId, 'NEW TASK')
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}/>
        <button onClick={createTask}>Create task</button>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
                setTodolistId(event.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(event) => {
                setTaskId(event.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>DeleteTask</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const model = {
        title: title,
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
    }

    const updateTaskTitle = () => {
        todolistAPI.updateTask(todolistId, taskId, model).then((res) => {
            setState(res.data)
        })
    }

    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}/>
        <input placeholder={'taskId'} value={taskId} onChange={(event) => {
            setTaskId(event.currentTarget.value)
        }}/>
        <input placeholder={'task title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}/>
        <button onClick={updateTaskTitle}>Update task title</button>
        {JSON.stringify(state)}
    </div>
}

