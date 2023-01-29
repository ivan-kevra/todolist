import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    type TodolistsType = {
        id: string
        title: string
        filter: FilterValuesType
    }
    type TasksStateType = {
        [key: string]: TaskType[]
    }

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

    const removeTask = (todolistId: string, taskID: string) => {
        setTasks({
                ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskID)
            }
        )
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId
            ? {...todolist, filter: value}
            : todolist
        ))
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        // setTasks([newTask, ...tasks])
        setTasks({
            ...tasks, [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }
    const changeTaskStatus = (todolistId: string, taskID: string, newIsDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(task => task.id === taskID ? {...task, isDone: newIsDone} : task)
        })

    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [newTodolistId]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                let tasksForTodolist = tasks[todolist.id]
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter((task) => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter((task) => task.isDone)
                }
                return (
                    <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        addTodolist={addTodolist}/>
                )
            })}

        </div>
    );
}

export default App;
