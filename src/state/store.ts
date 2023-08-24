import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionType, tasksReducer} from "./task-reducer";
import {TodolistactionType, todolistsReducer} from "./todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})

export const store =  legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer >



type AppActionsType = TodolistactionType | TasksActionType
export type AppDispatch = ThunkDispatch<AppRootStateType, void, AppActionsType>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

