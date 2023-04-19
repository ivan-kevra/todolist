import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {Task} from "./task/Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {TaskStatuses} from "../../../api/todolist-api";
import {fetchTasksTC, TaskDomainType} from '../tasks-reducer';
import {useAppDispatch} from "../../../app/store";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";


type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskDomainType>
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {


    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const setAllHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id, 'all'),
        [props.changeTodolistFilter, props.todolist.id])
    const setActiveHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id, 'active'),
        [props.changeTodolistFilter, props.todolist.id])
    const setCompletedHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id, 'completed'),
        [props.changeTodolistFilter, props.todolist.id])

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.removeTodolist, props.todolist.id])
    const changeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter((task) => task.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitleHandler}
                              disabled={props.todolist.entityStatus === 'loading'}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
            </div>
            <ul>
                {tasksForTodolist.map((task) => {

                    return <Task taskId={task.id} title={task.title} status={task.status} todolistId={props.todolist.id}
                                 changeTaskTitle={props.changeTaskTitle} changeTaskStatus={props.changeTaskStatus}
                                 removeTask={props.removeTask} key={task.id} disabled={task.entityStatus === 'loading'}
                    />
                })}
            </ul>
            <div>
                <Button variant={props.todolist.filter === 'all' ? "outlined" : "contained"} color='secondary'
                        onClick={setAllHandler}>All</Button>
                <Button variant={props.todolist.filter === 'active' ? "outlined" : "contained"} color='success'
                        onClick={setActiveHandler}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? "outlined" : "contained"} color='error'
                        onClick={setCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
})

