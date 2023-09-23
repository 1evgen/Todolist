import {TasksStateType} from "trash/App";
import {
    addTodolist,
    addTodolistTypeAction,
    changeTodolistEntityStatus,
    removeTodolist,
    removeTodolistTypeAction,
    setTodolist,
    SetTodolistType,
} from "./todolistReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "app/store";
import {setAppStatus} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Reducer
const initialState: TasksStateType = {};

const sliceTask = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string; todolistID: string }>) {
            let index = state[action.payload.todolistID].findIndex((el) => el.id === action.payload.taskID);
            if (index > -1) {
                state[action.payload.todolistID].splice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        setTaskAC(state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
        clearAllTasks(state, action: PayloadAction) {
            for (let elem in state) {
                state[elem] = [];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolist, (state, action) => {
            action.payload.todolists.forEach((tl) => (state[tl.id] = []));
        });
    },
});

export const tasksReducer = sliceTask.reducer;
export const {removeTaskAC, setTaskAC, addTaskAC, updateTaskAC, clearAllTasks} = sliceTask.actions;

///thunk
export const fetchTaskTC =
    (todolistId: string): AppThunk =>
        (dispatch: Dispatch) => {
            dispatch(setAppStatus({status: "loading"}));
            todolistApi
                .getTasks(todolistId)
                .then((response) => {
                    console.log(response);
                    dispatch(setTaskAC({tasks: response.data.items, todolistId}));
                    dispatch(setAppStatus({status: "succeeded"}));
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error);
                });
        };
export const addTaskTC =
    (todolistId: string, title: string): AppThunk =>
        (dispatch) => {
            dispatch(setAppStatus({status: "loading"}));
            todolistApi
                .createTask(todolistId, title)
                .then((resp) => {
                    if (resp.data.resultCode === 0) {
                        dispatch(addTaskAC({task: resp.data.data.item}));
                        dispatch(setAppStatus({status: "succeeded"}));
                    } else {
                        handleServerAppError(dispatch, resp.data);
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error.message);
                });
        };

export const removeTaskTS =
    (todolistId: string, taskId: string): AppThunk =>
        (dispatch: Dispatch) => {
            dispatch(setAppStatus({status: "loading"}));
            dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "loading"}));
            todolistApi
                .removeTask(todolistId, taskId)
                .then((response) => {
                    if (response.data.resultCode === 0) {
                        dispatch(removeTaskAC({taskID: taskId, todolistID: todolistId}));
                        dispatch(setAppStatus({status: "succeeded"}));
                    } else {
                        handleServerAppError(dispatch, response.data);
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error.message);
                })
                .finally(() => {
                    dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "idle"}));
                });
        };

export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
        (dispatch: Dispatch, getState: () => AppRootStateType) => {
            let state = getState().tasks[todolistId].find((el) => el.id === taskId);
            if (!state) {
                return new Error("something wrong!");
            }
            const model: UpdateTaskModelType = {
                title: state.title,
                deadline: state.deadline,
                status: state.status,
                description: state.description,
                priority: state.priority,
                startDate: state.startDate,
                ...domainModel,
            };
            dispatch(setAppStatus({status: "loading"}));
            todolistApi
                .updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({todolistId, taskId, model}));
                        dispatch(setAppStatus({status: "succeeded"}));
                    } else {
                        handleServerAppError(dispatch, res.data);
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error);
                });
        };

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};

export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof updateTaskAC>
    | addTodolistTypeAction
    | removeTodolistTypeAction
    | SetTodolistType;
