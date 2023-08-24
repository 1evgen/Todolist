import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../state/task-reducer";
import {todolistsReducer} from "../../state/todolistReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>

const initialGlobalState = {
    todolist: [
        {id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, todoListId:"todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
            },
            {id: v1(),  title: 'JS', status: TaskStatuses.Completed, todoListId:"todolistId1", startDate: '',
                deadline: '',addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ],
        ["todolistId2"]: [
            {id: v1(), title: 'Car', status: TaskStatuses.New, todoListId:"todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'apartment',status: TaskStatuses.Completed, todoListId:"todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
