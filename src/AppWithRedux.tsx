import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(AddTaskAC(todolistId, title))

    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])
    const changeTodolistFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        tasks={tasks[todolist.id]}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}

        </div>
    );
}

