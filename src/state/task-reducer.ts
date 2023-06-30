import {filterType, TasksStateType, TodolistsType} from "../App";
import {v1} from "uuid";
import {debounce} from "@mui/material";
import {TaskType} from "../Todolist";
import {addTodolistTypeAction, removeTodolistTypeAction} from "./todolistReducer";


type removeTaskTypeAction = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string

}
type addTaskTypeAction  = {
    type: 'ADD_TASK'
    todolistID: string
    titleTodo: string

}

type changeTaskStatus = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    status: boolean,
    taskID: string
}

type changeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistID: string
}



export type actionType = removeTaskTypeAction | addTaskTypeAction | changeTaskStatus
    | changeTaskTitle | addTodolistTypeAction | removeTodolistTypeAction

export  const tasksReducer = (state: TasksStateType = {}, action: actionType): TasksStateType => {
    switch (action.type){
        case 'REMOVE-TASK' :
            return {...state,
            [action.todolistID]: state[action.todolistID].filter((el)=> el.id !== action.taskID)}
        case 'ADD_TASK':
            let newTask = {id: v1(), title: action.titleTodo, isDone: false}
            return  {...state,
            [action.todolistID]: [newTask,...state[action.todolistID],]}

        case 'CHANGE-TASK-STATUS' :
            return {...state,
                [action.todolistID]:
                    state[action.todolistID].map((el)=> el.id === action.taskID ? {...el, isDone: action.status}:el)
            }

        case  'CHANGE-TASK-TITLE' :
            return {...state,
                [action.todolistID]:
                state[action.todolistID].map((el)=> el.id === action.taskID ?
                    {...el, title: action.title}: el)
            }
        case 'ADD-TODOLIST' :
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default: return state
            }
}


export  const removeTaskAC = (taskID: string, todolistID: string): removeTaskTypeAction => {
    return {type: "REMOVE-TASK", taskID, todolistID }
}

export const addTaskAC = (titleTodo: string, todolistID: string):addTaskTypeAction => {
    return {type: "ADD_TASK", titleTodo, todolistID}

}
export const changeTaskStatusAC = (todolistID: string, status: boolean,taskID: string): changeTaskStatus => {
        return {type: "CHANGE-TASK-STATUS", todolistID, status, taskID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): changeTaskTitle=> {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID  }
}

