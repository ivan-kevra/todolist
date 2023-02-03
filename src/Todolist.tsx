import React, {memo, useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from "./components/Task";
import {ButtonWithMemo} from "./components/ButtonWithMemo";
import {TaskWithRedux} from "./components/TaskWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (todolistId: string, title: string,) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void

}

export const Todolist: React.FC<TodolistPropsType> = memo((props) => {
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }, [props.changeTodolistTitle, props.todolistId])
    const setAllHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'all')
    }, [props.changeFilter, props.todolistId])
    const setActiveHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'active')
    }, [props.changeFilter, props.todolistId])
    const setCompletedHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'completed')
    }, [props.changeFilter, props.todolistId])

    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = tasks.filter((task) => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter((task) => task.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map((task) => {
                    return (
                        <TaskWithRedux
                            key={task.id}
                            task={task}
                            todolistId={props.todolistId}/>
                    )
                })}
            </ul>
            <div>
                <ButtonWithMemo title={'all'} onClick={setAllHandler} color={'inherit'}
                                variant={props.filter === 'all' ? 'outlined' : 'contained'}/>
                <ButtonWithMemo title={'active'} onClick={setActiveHandler} color={'error'}
                                variant={props.filter === 'active' ? 'outlined' : 'contained'}/>
                <ButtonWithMemo title={'completed'} onClick={setCompletedHandler} color={'secondary'}
                                variant={props.filter === 'completed' ? 'outlined' : 'contained'}/>
            </div>
        </div>
    )
})
