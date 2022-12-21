import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    let [title, setTitle] = useState('')
    const onFilterAllHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onFilterActiveHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onFilterCompletedHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim())
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
            setTitle('')
        }
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    let [error, setError] = useState<string | null>(null)


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}

            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(props.todolistId, task.id)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onFilterAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onFilterActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onFilterCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
};

