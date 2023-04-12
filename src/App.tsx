import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    fetchTodolistsTC,
    RemoveTodolistAC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {
    AddTaskAC,
    addTaskTC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    removeTaskTC
} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TaskStatuses, TaskType, todolistAPI} from './api/todolist-api';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, status))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
        delete tasks[todolistId]
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])
    const changeTodolistFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }, [])

    return (
        <div className={'App'}>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}}>
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
                                </Paper>

                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

