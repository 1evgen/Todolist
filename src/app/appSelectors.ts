import { AppRootStateType } from "app/store";


export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectInitialized = (state: AppRootStateType) => state.app.initialized;
export const selectedIsLogin = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectTodolist = (state: AppRootStateType) => state.todolist;
export const selectTasks = (state: AppRootStateType) => state.tasks;
