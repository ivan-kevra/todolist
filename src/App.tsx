import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AppHeader} from "./components/appHeader/AppHeader";
import {TasksStateType} from "./AppWithRedux";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";


const App = () => {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed,
                todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: v1(), title: 'ReactJS', status: TaskStatuses.New,
                todoListId: todoListId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },

        ],
        [todoListId2]: [
            {
                id: v1(), title: 'Rest API', status: TaskStatuses.Completed,
                todoListId: todoListId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'GraphQL', status: TaskStatuses.New,
                todoListId: todoListId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ]
    })


    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
    }
    const addTask = (todoListId: string, title: string) => {
        setTasks({
            ...tasks, [todoListId]: [{
                id: v1(), title, status: TaskStatuses.New,
                todoListId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }, ...tasks[todoListId]]
        })
    }
    const changeTaskStatus = (todoListId: string, taskId: string, status: TaskStatuses) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((task) => task.id === taskId
                ? {...task, status}
                : task)
        })
    }
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((task) => task.id === taskId
                ? {...task, title}
                : task)
        })
    }

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        setTodolists(todolists.map((todolist) => todolist.id === todoListId
            ? {...todolist, filter: value}
            : todolist))
    }
    const removeTodolist = (todoListId: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodolist = (title: string) => {
        let todoListId = v1()
        setTodolists([{id: todoListId, title, filter: 'all', addedDate: '', order: 0}, ...todolists])
        setTasks({
            [todoListId]: [], ...tasks
        })
    }
    const changeTodolistTitle = (todoListId: string, title: string) => {
        setTodolists(todolists.map((todolist) => todolist.id === todoListId
            ? {...todolist, title}
            : todolist))
    }

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

export default App;
