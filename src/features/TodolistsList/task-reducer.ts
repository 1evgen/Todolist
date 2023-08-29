import {TasksStateType,} from "../../trash/App";
import {addTodolistTypeAction, removeTodolistTypeAction, SetTodolistType} from "./todolistReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../../app/store";

// Reducer
export const tasksReducer = (state: TasksStateType = {}, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((el) => el.id !== action.taskID)
            }
        case 'ADD_TASK': return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId],]}
        case 'ADD-TODOLIST' : return {...state, [action.todolist.id]: [] }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks}
        }
        case "UPDATE-TASK":
            return  {...state, [action.todolistId]:
             state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model}: t)}
        default:
            return state
    }
}

/// action
export const removeTaskAC = (taskID: string, todolistID: string)  => ({type: "REMOVE-TASK", taskID, todolistID} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD_TASK", task} as const)
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string,) => ({type: "SET-TASKS", todolistId, tasks} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
    ({type: "UPDATE-TASK", todolistId, taskId, model} as const)

///thunk
export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(response => {
            dispatch(setTaskAC(response.data.items, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, title)
        .then((resp) => dispatch(addTaskAC(resp.data.data.item)))
}
export const removeTaskTS = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch) => {
    todolistApi.removeTask(todolistId, taskId)
        .then((response) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk  =>
    (dispatch:Dispatch, getState: ()=> AppRootStateType)=>  {
    let state = getState().tasks[todolistId].find((el)=> el.id === taskId)
        if(!state){
                return new Error('something wrong!')
        }
    const modele: UpdateTaskModelType = {
                title: state.title,
                deadline: state.deadline,
                status: state.status,
                description: state.description,
                priority: state.priority,
                startDate: state.startDate,
                ...domainModel
    }
        todolistApi.updateTask(todolistId, taskId,modele)
            .then(res=> {
                dispatch(updateTaskAC(todolistId, taskId, modele))
            })
}


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC>    |
    ReturnType<typeof setTaskAC>    |
    ReturnType<typeof updateTaskAC> |
    addTodolistTypeAction           |
    removeTodolistTypeAction        |
    SetTodolistType
