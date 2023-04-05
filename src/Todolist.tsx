import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Task} from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

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
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter((task) => task.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter((task) => !task.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>
                {tasksForTodolist.map((task) => {

                    return <Task taskId={task.id} title={task.title} isDone={task.isDone} todolistId={props.id}
                                 changeTaskTitle={props.changeTaskTitle} changeTaskStatus={props.changeTaskStatus}
                                 removeTask={props.removeTask} key={task.id}/>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={setAllHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={setActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={setCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
})

