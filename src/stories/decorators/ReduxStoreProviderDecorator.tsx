import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todoListId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ],
        ['todoListId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)