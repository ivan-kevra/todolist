import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, SetTasksAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../App'
import {AddTodolistAC, RemoveTodolistAC, SetTodolistsAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

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
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = RemoveTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low
            }
        ]
    })
})
test('correct task should be added to correct array', () => {

    const action = AddTaskAC({
        todoListId: 'todolistId2',
        title: 'juice',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        id: 'exists'
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const action = ChangeTaskStatusAC('todolistId2', '2', TaskStatuses.New)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {

    const action = ChangeTaskTitleAC('todolistId2', '2', 'title')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('CSS')
    expect(endState['todolistId2'][1].title).toBe('title')
})
test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', () => {
    const action = SetTodolistsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''},
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})

test('tasks should be added for todolists', () => {

    const action = SetTasksAC('todolistId1', startState['todolistId1'])

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})