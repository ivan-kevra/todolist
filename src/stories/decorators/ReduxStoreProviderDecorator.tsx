import React from 'react'
import {Provider} from "react-redux";

import {combineReducers, legacy_createStore} from "redux";

import {v1} from "uuid";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {AppRootStateType} from "../../state/store";
import {TaskPriorities, TaskStatuses} from "../../api/todolistAPI";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
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
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
