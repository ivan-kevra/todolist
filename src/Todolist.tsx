import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const setAllHandler = () => props.changeFilter(props.id, 'all')
    const setActiveHandler = () => props.changeFilter(props.id, 'active')
    const setCompletedHandler = () => props.changeFilter(props.id, 'completed')

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title.trim())
        } else {
            setError('title is required')
        }
        setTitle('')
    }
    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }
    const addTaskEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <div>
                <input value={title} onChange={setTitleHandler} onKeyDown={addTaskEnterHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const removeTaskHandler = () => props.removeTask(props.id, task.id)
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(props.id, task.id, newIsDoneValue)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={setAllHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={setActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={setCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
};

