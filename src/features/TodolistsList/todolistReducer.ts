
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtilit";

const initialState: Array<TodolistDomainType> = []

export type TodolistActionType = removeTodolistTypeAction
    | addTodolistTypeAction
    | ReturnType<typeof  changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistType
    | ReturnType<typeof changeTodolistEntityStatusAC>


export  const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType): TodolistDomainType[] => {
        switch (action.type){
            case 'REMOVE-TODOLIST' :return state.filter((el)=> el.id !== action.id)
            case 'ADD-TODOLIST' :
                return [{...action.todolist, filter: "all", entityStatus: 'idle'},...state]
            case 'CHANGE-TODOLIST-TITLE' :
                 return  state.map((el)=> el.id === action.id ? {...el, title: action.title}: el)
            case 'CHANGE-TODOLIST-FILTER' :
                return state.map((el)=> el.id === action.id ? {...el, filter: action.filter}: el)
            case "SET-TODOLISTS" : return  action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
            case "CHANGE-TODOLIST-ENTITY-STATUS":
                return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus}: el)
            default: return state
        }
}
/// actions
export  const removeTodolistAC = (id: string): removeTodolistTypeAction => ({type: 'REMOVE-TODOLIST', id})
export const addTodolistAC = (todolist: TodolistType):  addTodolistTypeAction => ({type: 'ADD-TODOLIST', todolist})
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeFilterAC = (id: string, filter: FilterValueType ) => ({type:'CHANGE-TODOLIST-FILTER', filter, id}as const)
export const setTodolistAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists})
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType ) =>
    ({type: "CHANGE-TODOLIST-ENTITY-STATUS", id, entityStatus} as const)

// thunk
export const fetchTodolistsTC = ():AppThunk => (dispatch:Dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolist()
        .then(response=>  {
            dispatch(setTodolistAC(response.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => {
            handleServerNetworkError(dispatch, error.message)
    })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistApi.removeTodolist(todolistId)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            }else {
                handleServerAppError(dispatch, response.data)
            }})
        .catch((error)=> {
            handleServerNetworkError(dispatch, error.message)
    }).finally(()=> {
        dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
    })
}

export const addTodolistTC = (title: string):AppThunk => (dispatch: Dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodolist(title).then(res => {
        if(res.data.resultCode === 0){
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        }else {
           handleServerAppError(dispatch, res.data)
        }
    }).catch((error)=> {
        handleServerNetworkError(dispatch, error.message)
    })
}

export const changeTodolistTC = (todolistId: string,title: string ): AppThunk => (dispatch:Dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodolist(todolistId, title)
        .then(res => {
                    if(res.data.resultCode === 0){
                        dispatch(changeTodolistTitleAC(todolistId, title))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                       handleServerAppError(dispatch, res.data)
                    }}).catch((e) =>  {
                    handleServerNetworkError(dispatch,e.message)
             })}


/// Types
export type removeTodolistTypeAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export  type addTodolistTypeAction = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type SetTodolistType = {
    type: "SET-TODOLISTS"
    todolists: Array<TodolistType>
}

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType,
    entityStatus: RequestStatusType
}

