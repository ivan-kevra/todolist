import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map((todolist) => todolist.id === action.todolistId
                ? {...todolist, title: action.title}
                : todolist)
        case "CHANGE-TODOLIST-STATUS":
            return state.map((todolist) => todolist.id === action.todolistId
                ? {...todolist, filter: action.filter}
                : todolist)
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    todolistId: v1(),
    title
} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    todolistId,
    filter
} as const)


type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>



