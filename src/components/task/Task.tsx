import React, {ChangeEvent, memo} from 'react';
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

export const Task: React.FC<TaskPropsType> = (props) => {
    const removeTaskHandler = () => {
        props.removeTask(props.task.id)
    }
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue)
    }
    const changeTaskTitleHandler = () => {
        props.changeTaskTitle(props.task.id, props.task.title)
    }
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
}

