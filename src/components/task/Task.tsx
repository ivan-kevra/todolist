import React, {ChangeEvent, memo, useCallback} from 'react';
import style from "../todolist/Todolist.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../AppWithRedux";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id])
    const changeTaskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue)
    }, [props.changeTaskStatus, props.task.id])
    const changeTaskTitleHandler = useCallback(() => {
        props.changeTaskTitle(props.task.id, props.task.title)
    }, [props.changeTaskTitle, props.task.id])
    return (
        <li key={props.task.id} className={props.task.isDone ? style.isDone : ''}>
            <Checkbox color='primary'
                      checked={props.task.isDone}
                      onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={props.task.title} onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
})

