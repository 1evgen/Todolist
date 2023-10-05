import {AppThunk} from "app/store";
import {setAppStatus} from "app/app-reducer";
import {authAPI} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTotdos} from "../TodolistsList/todolistReducer";
import {clearAllTasks} from "../TodolistsList/task-reducer";
import {createAppAsyncThunk} from "utils/create-app-asynk";


export const loginTC = createAppAsyncThunk('auth/login', async (data: DataFormType, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        const response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
            return {isLogged: true}
        } else {
            handleServerAppError(thunkAPI.dispatch, response.data);
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return  thunkAPI.rejectWithValue("Some Error")
    } finally {
        thunkAPI.dispatch(setAppStatus({status: "idle"}));
    }
})

export const logoutTC =createAppAsyncThunk('logout/login',async (isLoggedOut: boolean, thunkAPI) => {
    try{
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        const response = await authAPI.logout()
        if(response.data.resultCode === 0){
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
                thunkAPI.dispatch(clearTotdos());
                thunkAPI.dispatch(clearAllTasks());
                return {isLogged: false}
        }else {
            handleServerAppError(thunkAPI.dispatch, response.data);
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (error){
        handleServerNetworkError(error, thunkAPI.dispatch)
        return  thunkAPI.rejectWithValue(null)
    }
})

export const sliceAuth = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                if(action.payload){
                    state.isLoggedIn = action.payload.isLogged
                }
            })
            .addCase(logoutTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLogged
            })
    }
});

export const authReducer = sliceAuth.reducer;
export const {setIsLoggedIn} = sliceAuth.actions;
export const AuthActions = sliceAuth.actions;

//type

type DataFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

// export const loginTC_ =
//     (data: DataFormType): AppThunk =>
//         (dispatch) => {
//             dispatch(setAppStatus({status: "loading"}));
//             authAPI
//                 .login(data)
//                 .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(setIsLoggedIn({value: true}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, res.data);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error.message);
//                 })
//                 .finally(() => {
//                     dispatch(setAppStatus({status: "idle"}));
//                 });
//         };
// export const logoutTC_ = (): AppThunk => (dispatch) => {
//     dispatch(setAppStatus({status: "loading"}));
//     authAPI
//         .logout()
//         .then((resp) => {
//             if (resp.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: false}));
//                 dispatch(setAppStatus({status: "succeeded"}));
//                 dispatch(clearTotdos());
//                 dispatch(clearAllTasks());
//             } else {
//                 handleServerAppError(dispatch, resp.data);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(dispatch, error.message);
//         });
// };