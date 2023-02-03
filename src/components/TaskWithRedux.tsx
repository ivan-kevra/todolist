import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../Todolist";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/tasks-reducer";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const TaskWithRedux = memo(({
                                       task,
                                       todolistId
                                   }: TaskPropsType) => {
    let {id, isDone, title} = {...task}

    const dispatch = useDispatch()

    const removeTaskHandler = () => dispatch(RemoveTaskAC(todolistId, id))
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        dispatch(ChangeTaskStatusAC(todolistId, id, newIsDoneValue))
    }
    const changeTaskTitleHandler = (newValue: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, id, newValue))
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

