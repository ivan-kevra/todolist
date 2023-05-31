import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../editableSpan/EditableSpan";
import {TaskStatuses} from "../../api/todolistAPI";

type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    status: TaskStatuses
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTask = useCallback(() => {
        props.removeTask(props.todolistId, props.taskId)
    }, [props.removeTask, props.todolistId, props.taskId])
    const changeTaskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
        console.log(newIsDoneValue)
    }, [props.changeTaskStatus, props.todolistId, props.taskId])
    const changeTaskTitleHandler = useCallback(() => {
            props.changeTaskTitle(props.todolistId, props.taskId, props.title)
        }, [props.changeTaskTitle, props.todolistId, props.title]
    )

    return (
        <li key={props.taskId} className={props.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <input type="checkbox" checked={props.status === TaskStatuses.Completed}
                   onChange={changeTaskStatusHandler}/>
            <EditableSpan title={props.title} onChange={changeTaskTitleHandler}/>
            <button onClick={removeTask}>X</button>
        </li>
    );
})

