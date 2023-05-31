import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTaskAC,
    createTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    deleteTaskTC
} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolistAPI";


export type TasksStateType = {
    [key: string]: TaskType[]
}
export const App = () => {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])


    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [])
    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks
                return (
                    <Todolist id={todolist.id}
                              key={todolist.id}
                              title={todolist.title}
                              filter={todolist.filter}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              removeTodolist={removeTodolist}
                              changeTodolistTitle={changeTodolistTitle}/>
                )
            })}
        </div>
    );
}


