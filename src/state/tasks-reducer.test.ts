import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../App'
import {addTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                todoListId: todolistId1,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '2',
                title: 'JS',
                todoListId: todolistId1,
                priority: TaskPriorities.Low,
                status: TaskStatuses.Completed,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '3',
                title: 'React',
                todoListId: todolistId1,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                todoListId: todolistId2,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '2',
                title: 'milk',
                todoListId: todolistId2,
                priority: TaskPriorities.Low,
                status: TaskStatuses.Completed,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '3',
                title: 'tea',
                todoListId: todolistId2,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            }
        ]
    }
})
test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))
    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                todoListId: todolistId1,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '2',
                title: 'JS',
                todoListId: todolistId1,
                priority: TaskPriorities.Low,
                status: TaskStatuses.Completed,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '3',
                title: 'React',
                todoListId: todolistId1,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                todoListId: todolistId2,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            },
            {
                id: '3',
                title: 'tea',
                todoListId: todolistId2,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                description: '',
                order: 0,
                startDate: '',
                addedDate: '',
                deadline: ''
            }
        ]
    })
})
test('correct task should be added to correct array', () => {
    const task = {
        id: '1',
        title: 'CSS',
        todoListId: todolistId1,
        priority: TaskPriorities.Low,
        status: TaskStatuses.New,
        description: '',
        order: 0,
        startDate: '',
        addedDate: '',
        deadline: ''
    }
    const action = addTaskAC(task)
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New)
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2', '2', 'juice')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].title).toBe('juice')
    expect(endState['todolistId1'][1].title).toBe('JS')
})
test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('new todolist'))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
