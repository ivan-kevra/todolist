import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
    addTask: (title: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState('')
    const setAllFilterHandler = () => props.changeFilter('all')
    const setActiveFilterHandler = () => props.changeFilter('active')
    const setCompletedFilterHandler = () => props.changeFilter('completed')

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        }
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitle} onKeyUp={onEnterHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                        const removeTaskHandler = () => {
                            props.removeTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                    }
                )
                }

            </ul>
            <div>
                <button onClick={setAllFilterHandler}>All</button>
                <button onClick={setActiveFilterHandler}>Active</button>
                <button onClick={setCompletedFilterHandler}>Completed</button>
            </div>
        </div>
    );
};

