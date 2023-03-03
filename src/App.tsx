import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AppHeader} from "./components/appHeader/AppHeader";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((task) => task.id === taskId
                ? {...task, isDone}
                : task)
        })
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((task) => task.id === taskId
                ? {...task, title}
                : task)
        })
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map((todolist) => todolist.id === todolistId
            ? {...todolist, filter: value}
            : todolist))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        let todolistId = v1()
        setTodolists([{id: todolistId, title, filter: 'all'}, ...todolists])
        setTasks({
            [todolistId]: [], ...tasks
        })
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map((todolist) => todolist.id === todolistId
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
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
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
