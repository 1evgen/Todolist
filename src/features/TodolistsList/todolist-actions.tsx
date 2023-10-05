import {createAppAsyncThunk} from "utils/create-app-asynk";
import {setAppStatus} from "app/app-reducer";
import {todolistApi} from "api/todolist-api";
import {fetchTasks} from "features/TodolistsList/task-actions";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";
import {changeTodolistEntityStatus} from "features/TodolistsList/todolistReducer";


export const fetchTodolistsTC = createAppAsyncThunk('todolist/fetchTodo', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        let response = await todolistApi.getTodolist()
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
        response.data.forEach(tl => thunkAPI.dispatch(fetchTasks(tl.id)))
        return {todolist: response.data}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
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
        handleServerNetworkError(error, thunkAPI.dispatch)
        return  thunkAPI.rejectWithValue("Some Error")
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
        handleServerNetworkError(error, thunkAPI.dispatch)
        return  thunkAPI.rejectWithValue("Some Error")
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
            handleServerNetworkError(error, thunkAPI.dispatch)
            return  thunkAPI.rejectWithValue("Some Error")
        }
    })