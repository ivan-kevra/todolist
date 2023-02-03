import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppHeader} from "./components/AppHeader";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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

    const removeTask = (todolistId: string, taskID: string) => {
        setTasks({
                ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskID)
            }
        )
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        // setTasks([newTask, ...tasks])
        setTasks({
            ...tasks, [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(task => task.id === taskId ? {...task, isDone: newIsDone} : task)
        })

    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(task => task.id === taskId ? {...task, title: newTitle} : task)
        })
    }


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [newTodolistId]: []
        })
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find(todolist => todolist.id === todolistId);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, filter: value}
            : todolist
        ))
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

export default App;
