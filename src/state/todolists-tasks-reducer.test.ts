import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId1',
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
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
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
                todoListId: 'todolistId2',
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

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})