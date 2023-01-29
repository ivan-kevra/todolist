import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskID: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string,) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    addTodolist: (title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const setAllHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const setActiveHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const setCompletedHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = () => {
        props.addTask(props.todolistId, props.title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistId, task.id)
                    }
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <EditableSpan title={task.title}/>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
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
};
