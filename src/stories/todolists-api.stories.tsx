import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => [
                setState(res.data)
            ])

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
        <div>
            <input placeholder={'title'} value={title} onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={createTodolist}>add todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <button onClick={deleteTodolist}>delete todolist</button>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(event) => settodoListId(event.currentTarget.value)}/>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const [title, setTitle] = useState<any>(null)
    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todoListId, title)
            .then((res) => setState(res.data))
    }
    return <div>
        <div>
            <button onClick={updateTodolistTitle}>update todolist title</button>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(event) => settodoListId(event.currentTarget.value)}/>
            <input placeholder={'title'} value={title} onChange={(event) => setTitle(event.currentTarget.value)}/>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const getTasks = () => {
        todolistAPI.getTasks(todoListId)
            .then((res) => setState(res.data))
    }
    return <div>
        <div>
            <button onClick={getTasks}>get tasks</button>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(event) => settodoListId(event.currentTarget.value)}/>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const [todoListId, settodoListId] = useState<string>('')
    const createTask = () => {
        todolistAPI.createTask(todoListId, title)
            .then((res) => setState(res.data))
    }
    return <div>
        <div>
            <button onClick={createTask}>create task</button>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(event) => settodoListId(event.currentTarget.value)}/>
            <input placeholder={'title'} value={title} onChange={(event) => setTitle(event.currentTarget.value)}/>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, settodoListId] = useState<string>('')
    const deleteTask = () => {
        todolistAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(event) => settodoListId(event.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(event) => setTaskId(event.currentTarget.value)}/>
            <button onClick={deleteTask}>delete Task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, settodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTaskTitle = () => {
        todolistAPI.updateTask(todoListId, taskId, title)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(event) => settodoListId(event.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(event) => setTaskId(event.currentTarget.value)}/>
            <input placeholder={'title'} value={title}
                   onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={updateTaskTitle}>update task title</button>
        </div>
    </div>
}