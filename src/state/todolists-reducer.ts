import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolistAPI";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.id, title: action.title, filter: 'all', order: 0, addedDate: ''}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map((todolist) => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist)
        case "CHANGE-TODOLIST-FILTER":
            return state.map((todolist) => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist)
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({
                ...todolist,
                filter: 'all'
            }))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id: id} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', id: v1(), title} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
