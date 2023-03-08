import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AppHeader} from "./components/appHeader/AppHeader";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api"

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [])
    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [])
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, status))
    }, [])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, title))
    }, [])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }, [])
    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
        delete tasks[todoListId]
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todoListId, title))
    }, [])

    return (
        <div className={'App'}>
            <AppHeader/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasks[todolist.id]}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                        addTodolist={addTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

