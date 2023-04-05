import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    removeTask: (todolistId: string, taskId: string) => void
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = (props: TaskPropsType) => {
    const removeTaskHandler = () => props.removeTask(props.todolistId, props.taskId)
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.taskId, newIsDoneValue)
    }
    const changeTaskTitleHandler = () => props.changeTaskTitle(props.todolistId, props.taskId, props.title)
    return (
        <li className={props.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={props.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan title={props.title} onChange={changeTaskTitleHandler}/>
            <button onClick={removeTaskHandler}>X</button>
        </li>
    );
};

