import {Provider} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../features/todolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/todolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";
import thunkMiddleWare from "redux-thunk";
import {authReducer} from "../../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 0,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                entityStatus: 'idle'
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: true
    },
    auth: {
        isLoggedIn: false
    },

}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleWare))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}