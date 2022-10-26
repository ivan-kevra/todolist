import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    const removeTask = (id: number) => {
        tasks = tasks.filter(tasks => tasks.id !== id)
        console.log('task deleted')
        setTasks(tasks)
    }
    let [filter, setFilter] = useState<filterValuesType>('all')
    let taskForTotolist = tasks
    if (filter === 'active') {
        taskForTotolist = tasks.filter(tasks => tasks.isDone === false)
    }
    if (filter === 'completed') {
        taskForTotolist = tasks.filter(tasks => tasks.isDone === true)
    }
    const changeFilter = (value: filterValuesType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={taskForTotolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
