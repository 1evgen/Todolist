import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../state/task-reducer";
import {todolistsReducer} from "../../state/todolistReducer";


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})


const initialGlobalState = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};
export type AppRootStateType = ReturnType<typeof rootReducer>
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
