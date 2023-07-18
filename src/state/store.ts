import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todolistsReducer} from "./todolistReducer";


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})

export const store =  legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

