import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionType, tasksReducer} from "../features/TodolistsList/task-reducer";
import {TodolistActionType, todolistsReducer} from "../features/TodolistsList/todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, CommonFeatureForAppActionsType} from "./app-reducer";


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer,
    app: appReducer
})

export const store =  legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer >



type AppActionsType = TodolistActionType
    | TasksActionType
    | CommonFeatureForAppActionsType

export type AppDispatch = ThunkDispatch<AppRootStateType, void, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown,  AppActionsType>

