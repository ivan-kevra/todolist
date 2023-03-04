import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "../../AppWithRedux";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "../task/Task";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void

    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void

    changeFilter: (todolistId: string, value: FilterValuesType) => void

    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    addTodolist: (title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const onChangeAllHandler = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [props.changeFilter, props.id])
    const onChangeActiveHandler = useCallback(() => {
        props.changeFilter(props.id, 'active')
    }, [props.changeFilter, props.id])
    const onChangeCompletedHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    }, [props.changeFilter, props.id])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitleHandler = useCallback(() => {
        props.changeTodolistTitle(props.id, props.title)
    }, [props.changeTodolistTitle, props.id])
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {props.tasks.map((task) => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.id, task.id)
                    }
                    const changeTaskStatusHandler = (taskId: string, newIsDoneValue: boolean) => {
                        props.changeTaskStatus(props.id, taskId, newIsDoneValue)
                    }
                    const changeTaskTitleHandler = () => {
                        props.changeTaskTitle(props.id, task.id, task.title)
                    }
                    return (
                        <Task task={task} key={task.id}
                              removeTask={removeTaskHandler}
                              changeTaskStatus={changeTaskStatusHandler}
                              changeTaskTitle={changeTaskTitleHandler}
                        />
                    )
                })}

            </ul>
            <div>
                <Button title={'all'} onClick={onChangeAllHandler} color={'inherit'}
                        variant={props.filter === 'all' ? 'outlined' : 'contained'}>All</Button>
                <Button title={'active'} onClick={onChangeActiveHandler} color={'error'}
                        variant={props.filter === 'active' ? 'outlined' : 'contained'}>Active</Button>
                <Button title={'completed'} onClick={onChangeCompletedHandler} color={'secondary'}
                        variant={props.filter === 'completed' ? 'outlined' : 'contained'}>Completed</Button>

            </div>
        </div>
    );
};
