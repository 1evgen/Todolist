import {ActionCreatorsMapObject, AnyAction, combineReducers} from "redux";
import { tasksReducer } from "features/TodolistsList/task-reducer";
import { todolistsReducer } from "features/TodolistsList/todolistReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer} from "./app-reducer";
import {authReducer } from "features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";



export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export type RootReducerType = typeof rootReducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type AppRootStateType = ReturnType<RootReducerType>;
export type AppDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>;
export type AppDispatchAdditional = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
 export const useAppDispatch = () =>  useDispatch<AppDispatchAdditional>()

