import {AppThunk} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {authAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtilit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTotdos} from "../TodolistsList/todolistReducer";
import {clearAllTasks} from "../TodolistsList/task-reducer";

export const sliceAuth = createSlice(({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn (state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
}))

export const authReducer = sliceAuth.reducer
export const {setIsLoggedIn} = sliceAuth.actions
export const AuthActions = sliceAuth.actions

export  const loginTC = (data: DataFormType):AppThunk => (dispatch)=> {
   dispatch(setAppStatus({status:'loading'}))
    authAPI.login(data).then(res => {
        if(res.data.resultCode === 0){
            dispatch(setIsLoggedIn({value: true}))
           dispatch(setAppStatus({status: "succeeded"}))
        }else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch(error => {
        handleServerNetworkError(dispatch, error.message)
    }).finally(()=> {
        dispatch(setAppStatus({status: "idle"}))
    })
}
export const logoutTC = (): AppThunk => (dispatch)=> {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout().then(resp => {
        if(resp.data.resultCode === 0){
            debugger
            dispatch(setIsLoggedIn({value: false}))
            dispatch(setAppStatus({status: "succeeded"}))
            dispatch(clearTotdos())
            dispatch(clearAllTasks())
        }else {
            handleServerAppError(dispatch,resp.data)
        }
    }).catch(error => {
        handleServerNetworkError(dispatch,error.message)
    })
}


//type

// type InitialStateType =  typeof initialState
export type AuthActionsType = ReturnType<typeof setIsLoggedIn>
type DataFormType = {
    email: string,
    password: string,
    rememberMe: boolean
}




// react-redux
// export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType=> {
//         switch (action.type){
//             case "AUTH/SET-IS-LOGGED-IN":
//                 return {...state, isLoggedIn: action.value}
//             default: return state
//         }
// }
//
// export const setIsLoggedIn = (value: boolean)=> ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)