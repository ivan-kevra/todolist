import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const setAllHandler = () => props.changeTodolistFilter(props.id, 'all')
    const setActiveHandler = () => props.changeTodolistFilter(props.id, 'active')
    const setCompletedHandler = () => props.changeTodolistFilter(props.id, 'completed')

    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const removeTaskHandler = () => props.removeTask(props.id, task.id)
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(props.id, task.id, newIsDoneValue)
                    }
                    const changeTaskTitleHandler = () => props.changeTaskTitle(props.id, task.id, task.title)
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
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

