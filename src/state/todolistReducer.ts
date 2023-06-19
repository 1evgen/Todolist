import {filterType, TodolistsType} from "../App";
import {v1} from "uuid";
import {debounce} from "@mui/material";


type removeTodolistTypeAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type addTodolistTypeAction = {
    type: 'ADD-TODOLIST'
    titleTodo: string
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



export type actionType = removeTodolistTypeAction | addTodolistTypeAction | changeTodolistTitle | ChangeTodolistFilter

export  const todolistsReducer = (state: Array<TodolistsType>, action: actionType): TodolistsType[] => {
        switch (action.type){
            case 'REMOVE-TODOLIST' :
                return state.filter((el)=> el.id !== action.id)
            case 'ADD-TODOLIST' :
                return [{id: v1(), title: action.titleTodo , filter: 'all'},...state]
            case 'CHANGE-TODOLIST-TITLE' :
                 return  state.map((el)=> el.id === action.id ? {...el, title: action.title}: el)
            case 'CHANGE-TODOLIST-FILTER' :
                return state.map((el)=> el.id === action.id ? {...el, filter: action.filter}: el)

            default: return state
        }
}

export  const removeTodolistAC = (id: string): actionType=> {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): actionType => {
    return {type: 'ADD-TODOLIST', titleTodo: title}
}

export const changeTodoAC = (id: string, title: string): actionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

// export const changetFilterAC = (id: string, filter: filterType )=> {
//     return {type:'CHANGE-TODOLIST-FILTER', id, filter: filter}
// }