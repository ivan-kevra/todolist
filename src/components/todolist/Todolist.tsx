import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import style from './Todolist.module.css'
import {AddItemForm} from "../addItemForm/AddItemForm";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const onChangeAllHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const onChangeActiveHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const onChangeCompletedHandler = () => {
        props.changeFilter(props.id, 'completed')
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

            <AddItemForm addTask={props.addTask} id={props.id}/>
            <ul>
                {props.tasks.map((task) => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.id, task.id)
                    }
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(props.id, task.id, newIsDoneValue)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? style.isDone : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.filter === 'all' ? style.activeFilter : ''} onClick={onChangeAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? style.activeFilter : ''}
                        onClick={onChangeActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? style.activeFilter : ''}
                        onClick={onChangeCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
};
