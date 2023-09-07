import {AppThunk} from "../../app/store";
import {setAppStatusAC, setInitializedAC} from "../../app/app-reducer";
import {authAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtilit";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

type DataFormType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType=> {
        switch (action.type){
            case "AUTH/SET-IS-LOGGED-IN":
                return {...state, isLoggedIn: action.value}
            default: return state
        }
}

export const setIsLoggedInAC = (value: boolean)=> ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)

export  const loginTC = (data: DataFormType):AppThunk => (dispatch)=> {
   dispatch(setAppStatusAC('loading'))
    authAPI.login(data).then(res => {
        if(res.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
           dispatch(setAppStatusAC("succeeded"))
        }else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch(error => {
        handleServerNetworkError(dispatch, error.message)
    }).finally(()=> {
        dispatch(setAppStatusAC("idle"))
    })
}
export const logoutTC = (): AppThunk => (dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout().then(resp => {
        if(resp.data.resultCode === 0){
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("succeeded"))
        }else {
            handleServerAppError(dispatch,resp.data)
        }
    }).catch(error => {
        handleServerNetworkError(dispatch,error.message)
    })
}