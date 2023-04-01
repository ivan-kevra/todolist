import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

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
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter((task) => task.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (todolistId: string, title: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [{id: v1(), title, isDone: false}, ...todolistTasks]
        setTasks({...tasks})

    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map((todolist) => todolist.id === todolistId
            ? {...todolist, filter: value}
            : todolist))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.map((task) => task.id === taskId ? {...task, isDone} : task)
        setTasks({...tasks})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists((todolists.filter((todolist) => todolist.id !== todolistId)))
        delete tasks[todolistId]
    }


    return (
        <div className={'App'}>

            {todolists.map((todolist) => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks
                if (todolist.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
                }
                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

