import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {RequestStatusType} from "../../app/app-reducer";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, addTodolistAC({
        id: '1',
        title: 'New Todolist',
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = 'loading'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, newStatus))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})
test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})
