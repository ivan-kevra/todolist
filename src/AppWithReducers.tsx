import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppHeader} from "./components/AppHeader";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const AppWithReducers = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        const action = RemoveTaskAC(todolistId, taskId)
        dispatchToTasks(action)
    }
    const addTask = (todolistId: string, title: string) => {
        const action = AddTaskAC(todolistId, title)
        dispatchToTasks(action)
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        const action = ChangeTaskStatusAC(todolistId, taskId, newIsDone)
        dispatchToTasks(action)
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, newTitle)
        dispatchToTasks(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = ChangeTodolistTitleAC(todolistId, title)
        dispatchToTodolists(action)
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

    return (
        <div className="App">
            <AppHeader/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        let tasksForTodolist = tasks[todolist.id]
                        if (todolist.filter === 'active') {
                            tasksForTodolist = tasks[todolist.id].filter((task) => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = tasks[todolist.id].filter((task) => task.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        todolistId={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        tasks={tasksForTodolist}

                                        // removeTask={removeTask}
                                        addTask={addTask}
                                        // changeTaskTitle={changeTaskTitle}
                                        // changeTaskStatus={changeTaskStatus}

                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeFilter={changeFilter}
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

