import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";
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
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithReducers = () => {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
            }
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
        const action = removeTaskAC(todoListId, taskId)
        dispatchToTasks(action)
    }
    const addTask = (todoListId: string, title: string) => {
        const action = addTaskAC(todoListId, title)
        dispatchToTasks(action)
    }
    const changeTaskStatus = (todoListId: string, taskId: string, status: TaskStatuses) => {
        const action = changeTaskStatusAC(todoListId, taskId, status)
        dispatchToTasks(action)
    }
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(todoListId, taskId, title)
        dispatchToTasks(action)
    }

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatchToTodolists(action)
    }
    const removeTodolist = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchToTodolists(action)
        delete tasks[todoListId]
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todoListId: string, title: string) => {
        const action = changeTodolistTitleAC(todoListId, title)
        dispatchToTodolists(action)
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
                            tasksForTodolist = tasks[todolist.id].filter((task: TaskType) => task.status === TaskStatuses.New)
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = tasks[todolist.id].filter((task: TaskType) => task.status === TaskStatuses.Completed)
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

