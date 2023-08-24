
import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";


export type removeTodolistTypeAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export  type addTodolistTypeAction = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType

}

type changeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type SetTodolistType = {
    type: "SET-TODOLISTS"
    todolists: Array<TodolistType>
}



export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}


const initialState: Array<TodolistDomainType> = []

export type TodolistactionType = removeTodolistTypeAction |
    addTodolistTypeAction |
    changeTodolistTitle |
    ChangeTodolistFilter |
    SetTodolistType

export  const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistactionType): TodolistDomainType[] => {
        switch (action.type){
            case 'REMOVE-TODOLIST' :
                return state.filter((el)=> el.id !== action.id)
            case 'ADD-TODOLIST' :
                return [{...action.todolist, filter: "all"},...state]
            case 'CHANGE-TODOLIST-TITLE' :
                 return  state.map((el)=> el.id === action.id ? {...el, title: action.title}: el)
            case 'CHANGE-TODOLIST-FILTER' :
                return state.map((el)=> el.id === action.id ? {...el, filter: action.filter}: el)
            case "SET-TODOLISTS" :
                return  action.todolists.map(tl => ({...tl, filter: 'all'}))
            default: return state
        }
}

export  const removeTodolistAC = (id: string): removeTodolistTypeAction => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (todolist: TodolistType):  addTodolistTypeAction => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeFilterAC = (id: string, filter: FilterValueType ): ChangeTodolistFilter => {
    return {type:'CHANGE-TODOLIST-FILTER', filter, id}
}

export const setTodolistAC = (todolists: Array<TodolistType>) => {
    return {type: "SET-TODOLISTS", todolists}
}

export const fetchTodolistsTC = ():AppThunk => (dispatch:Dispatch)=> {
    return todolistApi.getTodolist()
        .then((response)=> dispatch(setTodolistAC(response.data)))
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch)=> {
    todolistApi.removeTodolist(todolistId)
        .then(response => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string):AppThunk => (dispatch: Dispatch)=> {
    todolistApi.createTodolist(title).then(res => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}

export const changeTodolistTC = (todolistId: string,title: string ): AppThunk => (dispatch:Dispatch)=> {
    todolistApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}