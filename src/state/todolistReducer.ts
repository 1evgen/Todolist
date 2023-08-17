
import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";


export type removeTodolistTypeAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export  type addTodolistTypeAction = {
    type: 'ADD-TODOLIST'
    titleTodo: string
    todolistId: string
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


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}


const initialState: Array<TodolistDomainType> = []

export type actionType = removeTodolistTypeAction | addTodolistTypeAction | changeTodolistTitle | ChangeTodolistFilter

export  const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionType): TodolistDomainType[] => {
        switch (action.type){
            case 'REMOVE-TODOLIST' :
                return state.filter((el)=> el.id !== action.id)
            case 'ADD-TODOLIST' :
                return [{id: action.todolistId, title: action.titleTodo , filter: 'all', addedDate: '', order:0},...state]
            case 'CHANGE-TODOLIST-TITLE' :
                 return  state.map((el)=> el.id === action.id ? {...el, title: action.title}: el)
            case 'CHANGE-TODOLIST-FILTER' :
                return state.map((el)=> el.id === action.id ? {...el, filter: action.filter}: el)

            default: return state
        }
}

export  const removeTodolistAC = (id: string): removeTodolistTypeAction => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string):  addTodolistTypeAction => {
    return {type: 'ADD-TODOLIST', titleTodo: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeFilterAC = (id: string, filter: FilterValueType ): ChangeTodolistFilter => {
    return {type:'CHANGE-TODOLIST-FILTER', filter, id}
}