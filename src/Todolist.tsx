import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {Task} from "./components/task/Task";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])
    const setAllFilterHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const setActiveFilterHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const setCompletedFilterHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodolist.map(task => {

                    return (
                        <Task todolistId={props.id}
                              taskId={task.id}
                              title={task.title}
                              isDone={task.isDone}
                              removeTask={props.removeTask}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}/>
                    )
                })}
            </ul>
            <div>
                <button onClick={setAllFilterHandler} className={props.filter === 'all' ? 'active-filter' : ''}>
                    All
                </button>
                <button onClick={setActiveFilterHandler} className={props.filter === 'active' ? 'active-filter' : ''}>
                    Active
                </button>
                <button onClick={setCompletedFilterHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>
                    Completed
                </button>
            </div>
        </div>
    );
}


