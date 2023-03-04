import {FilterValuesType, TodolistsType} from "../AppWithRedux";
import {v1} from "uuid";
import {ActionType} from "./tasks-reducer";

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.todolistId)

        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: action.todolistId, title: action.title, filter: 'all'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => todolist.id === action.todolistId
                ? {...todolist, title: action.title}
                : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => todolist.id === action.todolistId
                ? {...todolist, filter: action.filter}
                : todolist)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    } as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title: newTodolistTitle
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter: newFilter
    } as const
}