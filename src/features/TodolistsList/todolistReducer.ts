import {todolistApi, TodolistType} from "api/todolist-api";
import {RequestStatusType, setAppStatus} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasks} from "features/TodolistsList/task-reducer";
import {createAppAsyncThunk} from "utils/create-app-asynk";
import axios from "axios";

const initialState: Array<TodolistDomainType> = [];
export const fetchTodolistsTC = createAppAsyncThunk('todolist/fetchTodo', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        let response = await todolistApi.getTodolist()
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
        response.data.forEach(tl => thunkAPI.dispatch(fetchTasks(tl.id)))
        return {todolist: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(thunkAPI.dispatch, error.message);
        } else {
            throw Error('is error')
        }
    }
})

export const removeTodolistTC = createAppAsyncThunk('todolist/removeTodolist', async (todolistId: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        thunkAPI.dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "loading"}));
        let response = await todolistApi.removeTodolist(todolistId);
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
            return {todolistId}
        } else {
            handleServerAppError(thunkAPI.dispatch, response.data);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(thunkAPI.dispatch, error.message);
            return thunkAPI.rejectWithValue(null)
        } else {
            throw Error('is Error!')
        }
    } finally {
        thunkAPI.dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "idle"}));
    }
})

export const addTodolistTC = createAppAsyncThunk('todolist/addTodolist', async (title: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        let response = await todolistApi.createTodolist(title)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
            return {todolist: response.data.data.item}
        } else {
            handleServerAppError(thunkAPI.dispatch, response.data);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(thunkAPI.dispatch, error.message);
            return thunkAPI.rejectWithValue(null)
        }
    }
})

export const changeTodolistTC = createAppAsyncThunk('todolist/changeTodo',
    async (arg: { todolistId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        try {
            let response = await todolistApi.updateTodolist(arg.todolistId, arg.title)
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
                return {todolistId: arg.todolistId, title: arg.title}
            } else {
                handleServerAppError(thunkAPI.dispatch, response.data);
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                handleServerNetworkError(thunkAPI.dispatch, error.message);
                return thunkAPI.rejectWithValue(null)}}
    })

export const sliceTodolists = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<{ id: string; filter: FilterValueType }>) {
            let todo = state.find((el) => el.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
            let todo = state.find((el) => el.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
        clearTotdos(state, action: PayloadAction) {
            state.splice(0, state.length);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                if (action.payload) {
                    action.payload.todolist.forEach((tl) => {
                        state.push({...tl, filter: 'all', entityStatus: 'idle'})
                    })
                }
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                let index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
                }
            })
            .addCase(changeTodolistTC.fulfilled, (state, action) => {
                if (action.payload) {
                    const {todolistId, title} = action.payload
                    let todo = state.find((el) => el.id === todolistId)
                    if (todo) {
                        todo.title = title}}
            })}
});

export const todolistsReducer = sliceTodolists.reducer;
export const {
    changeTodolistEntityStatus,
    changeFilter,
    clearTotdos,
} = sliceTodolists.actions;

export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType;
    entityStatus: RequestStatusType;
};


// export const fetchTodolistsTC_ = (): AppThunk => (dispatch: any) => {
//     dispatch(setAppStatus({status: "loading"}));
//     todolistApi
//         .getTodolist()
//         .then((response) => {
//             dispatch(setAppStatus({status: "succeeded"}));
//             return response.data;
//         })
//         .then((todos) => {
//             todos.forEach((tl) => dispatch(fetchTasks(tl.id)));
//         })
//         .catch((error) => {
//             handleServerNetworkError(dispatch, error.message);
//         });
// };

// export const removeTodolistTC =
//     (todolistId: string): AppThunk =>
//         (dispatch: Dispatch) => {
//             dispatch(setAppStatus({status: "loading"}));
//             dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "loading"}));
//             todolistApi
//                 .removeTodolist(todolistId)
//                 .then((response) => {
//                     if (response.data.resultCode === 0) {
//                         dispatch(removeTodolist({id: todolistId}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, response.data);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error.message);
//                 })
//                 .finally(() => {
//                     dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "idle"}));
//                 });
//         };

// export const addTodolistTC =
//     (title: string): AppThunk =>
//         (dispatch: Dispatch) => {
//             dispatch(setAppStatus({status: "loading"}));
//             todolistApi
//                 .createTodolist(title)
//                 .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(addTodolist({todolist: res.data.data.item}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, res.data);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error.message);
//                 });
//         };

// export const changeTodolistTC_ =
//     (todolistId: string, title: string): AppThunk =>
//         (dispatch: Dispatch) => {
//             dispatch(setAppStatus({status: "loading"}));
//             todolistApi
//                 .updateTodolist(todolistId, title)
//                 .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(changeTodolistTitle({id: todolistId, title}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, res.data);
//                     }
//                 })
//                 .catch((e) => {
//                     handleServerNetworkError(dispatch, e.message);
//                 });
//         };
