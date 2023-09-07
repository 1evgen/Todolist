//app-reducer.tsx

import {authAPI} from "../api/todolist-api";
import {AppThunk} from "./store";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: CommonFeatureForAppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
                return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
                return {...state, initialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setInitializedAC = (value:boolean)=> ({type:"APP/SET-INITIALIZED", value} as const)


export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.authMe().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
        dispatch(setInitializedAC(true))
    })
}



export type CommonFeatureForAppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setInitializedAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export  type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

