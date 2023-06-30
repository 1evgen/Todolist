import {filterType, TodolistsType} from "../App";
import {v1} from "uuid";
import {debounce} from "@mui/material";


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
    filter: filterType
}

const initialState: Array<TodolistsType> = []

export type actionType = removeTodolistTypeAction | addTodolistTypeAction | changeTodolistTitle | ChangeTodolistFilter

export  const todolistsReducer = (state: Array<TodolistsType> = initialState, action: actionType): TodolistsType[] => {
        switch (action.type){
            case 'REMOVE-TODOLIST' :
                return state.filter((el)=> el.id !== action.id)
            case 'ADD-TODOLIST' :
                return [{id: action.todolistId, title: action.titleTodo , filter: 'all'},...state]
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
    console.log('a')
    debugger
    return {type: 'ADD-TODOLIST', titleTodo: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeFilterAC = (id: string, filter: filterType ): ChangeTodolistFilter => {
    return {type:'CHANGE-TODOLIST-FILTER', filter, id}
}