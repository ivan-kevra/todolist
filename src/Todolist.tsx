import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
        const setAllFilterHandler = () => props.changeFilter(props.id, 'all')
        const setActiveFilterHandler = () => props.changeFilter(props.id, 'active')
        const setCompletedFilterHandler = () => props.changeFilter(props.id, 'completed')
        const removeTodolistHandler = () => {
            props.removeTodolist(props.id)
        }
        const addTaskHandler = (title: string) => {
            props.addTask(props.id, title)
        }
        const onChangeTodolistTitle = (title: string) => {
            props.changeTodolistTitle(props.id, title)
        }
        return (
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
                    <button onClick={removeTodolistHandler}>X</button>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <ul>
                    {props.tasks.map(task => {
                            const removeTaskHandler = () => {
                                props.removeTask(props.id, task.id)
                            }
                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.id, task.id, event.currentTarget.checked)
                            }
                            const changeTaskTitleHandler = () => {
                                props.changeTaskTitle(props.id, task.id, task.title)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
                                    <button onClick={removeTaskHandler}>X</button>
                                </li>)
                        }
                    )
                    }
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
;

