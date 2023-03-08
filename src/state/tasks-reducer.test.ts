import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../AppWithRedux'
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let todoListId1: string
let todoListId2: string
let startState: TasksStateType

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = {
        'todoListId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ],
        'todoListId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todoListId2', '2'))

    expect(endState).toEqual({
        'todoListId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ],
        'todoListId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ]
    })
})
test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC('todoListId2', 'juce'))

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('juce')
    expect(endState['todoListId2'][0].status).toBe(false)
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('todoListId2', '2', TaskStatuses.New))

    expect(endState['todoListId2'][1].status).toBe(false)
    expect(endState['todoListId1'][1].status).toBe(true)
})
test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC('2', 'new title', 'todoListId2'))

    expect(endState['todoListId2'][1].title).toBe('new title')
    expect(endState['todoListId1'][1].title).toBe('JS')
})


