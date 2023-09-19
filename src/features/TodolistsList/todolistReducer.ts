
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtilit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTaskTC} from "./task-reducer";

const initialState: Array<TodolistDomainType> = []


export const sliceTodolists = createSlice(({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolist (state, action: PayloadAction<{id: string}>) {
            let index = state.findIndex((tl => tl.id === action.payload.id))
            if(index !== -1){
                state.splice(index, 1)
            }
        },
        addTodolist (state, action: PayloadAction<{todolist: TodolistType}>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitle (state, action: PayloadAction<{id: string, title: string}>) {
            let todo = state.find((el)=> el.id === action.payload.id)
            if(todo){
                todo.title = action.payload.title
            }
        },
        changeFilter (state, action: PayloadAction<{id: string, filter: FilterValueType}>) {
            let todo = state.find((el)=> el.id === action.payload.id)
            if(todo){
                todo.filter = action.payload.filter
            }
        },
        setTodolist (state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
            action.payload.todolists.forEach((tl)=>
            {state.push({...tl, filter: 'all', entityStatus: 'idle'})} )
        },
        changeTodolistEntityStatus (state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
           let todo = state.find(el => el.id === action.payload.id)
            if(todo){
                todo.entityStatus = action.payload.entityStatus
            }
        },
        clearTotdos (state, action: PayloadAction) {
            state.splice(0, state.length)
        }
    }
}))

export  const  todolistsReducer = sliceTodolists.reducer
export const {changeTodolistEntityStatus, changeTodolistTitle,changeFilter,setTodolist,addTodolist,removeTodolist,clearTotdos} = sliceTodolists.actions

// thunk
export const fetchTodolistsTC = ():AppThunk => (dispatch)=> {
    dispatch(setAppStatus({status:  'loading'}))
    todolistApi.getTodolist()
        .then(response=>  {
            dispatch(setTodolist({todolists: response.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
            return response.data
        }).then((todos)=> {
            todos.forEach((tl)=>   dispatch(fetchTaskTC(tl.id)))
    }).catch(error => {
            handleServerNetworkError(dispatch, error.message)
    })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch)=> {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: 'loading'}))
    todolistApi.removeTodolist(todolistId)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(removeTodolist({id: todolistId}))
                dispatch(setAppStatus({status: 'succeeded'}))
            }else {
                handleServerAppError(dispatch, response.data)
            }})
        .catch((error)=> {
            handleServerNetworkError(dispatch, error.message)
    }).finally(()=> {
        dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus:  'idle'}))
    })
}
export const addTodolistTC = (title: string):AppThunk => (dispatch: Dispatch)=> {
    dispatch(setAppStatus({status: 'loading'}))
    todolistApi.createTodolist(title).then(res => {
        if(res.data.resultCode === 0){
            dispatch(addTodolist({todolist: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        }else {
           handleServerAppError(dispatch, res.data)
        }
    }).catch((error)=> {
        handleServerNetworkError(dispatch, error.message)
    })
}
export const changeTodolistTC = (todolistId: string,title: string ): AppThunk => (dispatch:Dispatch)=> {
    dispatch(setAppStatus({status: 'loading'}))
    todolistApi.updateTodolist(todolistId, title)
        .then(res => {
                    if(res.data.resultCode === 0){
                        dispatch(changeTodolistTitle({id: todolistId, title}))
                        dispatch(setAppStatus({status: 'succeeded'}))
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






//React-redux
// export  const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType): TodolistDomainType[] => {
//         switch (action.type){
//             // case 'REMOVE-TODOLIST' :return state.filter((el)=> el.id !== action.id)
//             // case 'ADD-TODOLIST' :
//             //     return [{...action.todolist, filter: "all", entityStatus: 'idle'},...state]
//             // case 'CHANGE-TODOLIST-TITLE' :
//             //      return  state.map((el)=> el.id === action.id ? {...el, title: action.title}: el)
//             // case 'CHANGE-TODOLIST-FILTER' :
//             //     return state.map((el)=> el.id === action.id ? {...el, filter: action.filter}: el)
//             // case "SET-TODOLISTS" : return  action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
//             case "CHANGE-TODOLIST-ENTITY-STATUS":
//                 return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus}: el)
//             default: return state
//         }
// }
/// actions
// export  const removeTodolist = (id: string): removeTodolistTypeAction => ({type: 'REMOVE-TODOLIST', id})
// export const addTodolist = (todolist: TodolistType):  addTodolistTypeAction => ({type: 'ADD-TODOLIST', todolist})
// export const changeTodolistTitle = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
// export const changeFilter = (id: string, filter: FilterValueType ) => ({type:'CHANGE-TODOLIST-FILTER', filter, id}as const)
// export const setTodolist = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists})
// export const changeTodolistEntityStatus = (id: string, entityStatus: RequestStatusType ) =>
//     ({type: "CHANGE-TODOLIST-ENTITY-STATUS", id, entityStatus} as const)
// export type TodolistActionType = removeTodolistTypeAction
//     | addTodolistTypeAction
//     | ReturnType<typeof  changeFilter>
//     | ReturnType<typeof changeTodolistTitle>
//     | SetTodolistType
//     | ReturnType<typeof changeTodolistEntityStatus>