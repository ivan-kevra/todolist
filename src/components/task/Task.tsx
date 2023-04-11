import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../editableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from "../../api/todolist-api";

type TaskPropsType = {
    removeTask: (todolistId: string, taskId: string) => void
    todolistId: string
    taskId: string
    title: string
    status: TaskStatuses
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = (props: TaskPropsType) => {
    const removeTaskHandler = () => props.removeTask(props.todolistId, props.taskId)
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.Completed)
    }
    const changeTaskTitleHandler = () => props.changeTaskTitle(props.todolistId, props.taskId, props.title)
    return (
        <li className={props.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color="primary" checked={props.status === TaskStatuses.Completed}
                      onChange={changeTaskStatusHandler}/>
            <EditableSpan title={props.title} onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete">
                <DeleteIcon onClick={removeTaskHandler}/>
            </IconButton>
        </li>
    );
};

