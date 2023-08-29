
import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";

const initialState: Array<TodolistDomainType> = []

export type TodolistActionType =
    removeTodolistTypeAction                 |
    addTodolistTypeAction                    |
    ReturnType<typeof  changeFilterAC>       |
    ReturnType<typeof changeTodolistTitleAC> |
    SetTodolistType

export  const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType): TodolistDomainType[] => {
        switch (action.type){
            case 'REMOVE-TODOLIST' :return state.filter((el)=> el.id !== action.id)
            case 'ADD-TODOLIST' :
                return [{...action.todolist, filter: "all"},...state]
            case 'CHANGE-TODOLIST-TITLE' :
                 return  state.map((el)=> el.id === action.id ? {...el, title: action.title}: el)
            case 'CHANGE-TODOLIST-FILTER' :
                return state.map((el)=> el.id === action.id ? {...el, filter: action.filter}: el)
            case "SET-TODOLISTS" : return  action.todolists.map(tl => ({...tl, filter: 'all'}))
            default: return state
        }
}

/// actions
export  const removeTodolistAC = (id: string): removeTodolistTypeAction => ({type: 'REMOVE-TODOLIST', id})
export const addTodolistAC = (todolist: TodolistType):  addTodolistTypeAction => ({type: 'ADD-TODOLIST', todolist})
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeFilterAC = (id: string, filter: FilterValueType ) => ({type:'CHANGE-TODOLIST-FILTER', filter, id}  as const)
export const setTodolistAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists})


// thunk
export const fetchTodolistsTC = ():AppThunk => (dispatch:Dispatch)=> {
    todolistApi.getTodolist()
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
    filter: FilterValueType
}