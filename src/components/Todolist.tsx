import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Task} from "./task/Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {fetchTasksTC} from '../state/tasks-reducer';
import {useAppDispatch} from "../state/store";


type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const setAllHandler = useCallback(() => props.changeTodolistFilter(props.id, 'all'),
        [props.changeTodolistFilter, props.id])
    const setActiveHandler = useCallback(() => props.changeTodolistFilter(props.id, 'active'),
        [props.changeTodolistFilter, props.id])
    const setCompletedHandler = useCallback(() => props.changeTodolistFilter(props.id, 'completed'),
        [props.changeTodolistFilter, props.id])

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    let tasksForTodolist = props.tasks
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter((task) => task.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>
                {tasksForTodolist.map((task) => {

                    return <Task taskId={task.id} title={task.title} status={task.status} todolistId={props.id}
                                 changeTaskTitle={props.changeTaskTitle} changeTaskStatus={props.changeTaskStatus}
                                 removeTask={props.removeTask} key={task.id}/>
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "outlined" : "contained"} color='secondary'
                        onClick={setAllHandler}>All</Button>
                <Button variant={props.filter === 'active' ? "outlined" : "contained"} color='success'
                        onClick={setActiveHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color='error'
                        onClick={setCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
})

