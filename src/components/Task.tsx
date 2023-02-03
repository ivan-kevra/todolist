import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../Todolist";
import Checkbox from "@mui/material/Checkbox";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo(({
                              task,
                              removeTask,
                              changeTaskTitle,
                              changeTaskStatus
                          }: TaskPropsType) => {
    let {id, isDone, title} = {...task}
    const removeTaskHandler = () => removeTask(id)
    const changeTaskTitleHandler = (newValue: string) => changeTaskTitle(id, newValue);
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        changeTaskStatus(id, newIsDoneValue)
    }
    return (
        <li className={isDone ? 'is-done' : ''}>
            <Checkbox checked={isDone} onChange={changeTaskStatusHandler} color='primary'/>
            <EditableSpan title={title} onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})

