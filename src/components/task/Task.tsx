import React, {ChangeEvent, useCallback} from 'react';
import style from "../todolist/Todolist.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {TaskAlt} from "@mui/icons-material";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id])
    const changeTaskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.changeTaskStatus, props.task.id])
    const changeTaskTitleHandler = useCallback(() => {
        props.changeTaskTitle(props.task.id, props.task.title)
    }, [props.changeTaskTitle, props.task.id])
    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? style.isDone : ''}>
            <Checkbox color='primary'
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={props.task.title} onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
})

