import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
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
        dispatchToTasks(RemoveTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(AddTaskAC(todolistId, title))

    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(ChangeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(ChangeTaskTitleAC(todolistId, taskId, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchToTodolists(RemoveTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }
    const changeTodolistFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId, value))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodolist}/>
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

