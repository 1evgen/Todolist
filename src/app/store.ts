import { AnyAction, combineReducers } from "redux";
import { tasksReducer } from "../features/TodolistsList/task-reducer";
import { todolistsReducer } from "../features/TodolistsList/todolistReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer, CommonFeatureForAppActionsType } from "./app-reducer";
import { AuthActionsType, authReducer } from "../features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

// export const store =  legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

// Объявляем reduxStore на объекте window
declare global {
  interface Window {
    store: typeof store; // Подставьте тип вашего store
    getState: () => ReturnType<typeof store.getState>; // Добавляем getState
  }
}
// Теперь можно присвоить store в window
window.store = store;
// Создаем функцию-обертку, чтобы получить доступ к getState из консоли браузера
window.getState = () => window.store.getState();

// type AppActionsType = TodolistActionType
//     | TasksActionType
//     | CommonFeatureForAppActionsType
//     | AuthActionsType
