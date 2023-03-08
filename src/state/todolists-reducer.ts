import {v1} from "uuid";
import {ActionType} from "./tasks-reducer";
import {TodolistType} from "../api/todolist-api";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.todoListId)

        case 'ADD-TODOLIST':
            return [
                ...state,
                {
                    id: action.todoListId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => todolist.id === action.todoListId
                ? {...todolist, title: action.title}
                : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => todolist.id === action.todoListId
                ? {...todolist, filter: action.filter}
                : todolist)
        default:
            return state
    }
}

export const removeTodolistAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListId
    } as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todoListId: v1()
    } as const
}
export const changeTodolistTitleAC = (todoListId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListId,
        title: newTodolistTitle
    } as const
}
export const changeTodolistFilterAC = (todoListId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListId,
        filter: newFilter
    } as const
}