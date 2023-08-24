import {TasksStateType,} from "../App";
import {v1} from "uuid";
import {addTodolistTypeAction, removeTodolistTypeAction, setTodolistAC, SetTodolistType} from "./todolistReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "./store";


type removeTaskTypeAction = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string

}
type addTaskTypeAction = {
    type: 'ADD_TASK'
    task: TaskType

}

type changeTaskStatus = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    status: TaskStatuses,
    taskID: string
}

type changeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistID: string
}

type setTaskType = {
    type: "SET-TASKS"
    todolistId: string
    tasks: Array<TaskType>
}

type updateTaskType = {
    type: "UPDATE-TASK"
    todolistId: string,
    taskId: string,
    model: UpdateTaskModelType
}

export type TasksActionType = removeTaskTypeAction |
    addTaskTypeAction |
    changeTaskStatus |
    changeTaskTitle |
    addTodolistTypeAction |
    removeTodolistTypeAction |
    SetTodolistType |
    setTaskType |
    updateTaskType

export const tasksReducer = (state: TasksStateType = {}, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((el) => el.id !== action.taskID)
            }
        case 'ADD_TASK':
            let newTask = action.task
            return {
                ...state,
                [action.task.todoListId]: [newTask, ...state[action.task.todoListId],]
            }

        case 'CHANGE-TASK-STATUS' :
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map((el) => el.id === action.taskID ? {...el, status: action.status} : el)
            }

        case  'CHANGE-TASK-TITLE' :
            debugger
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map((el) => el.id === action.taskID ?
                        {...el, title: action.title} : el)
            }
        case 'ADD-TODOLIST' :
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy

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


export const removeTaskAC = (taskID: string, todolistID: string): removeTaskTypeAction => {
    return {type: "REMOVE-TASK", taskID, todolistID}
}

export const addTaskAC = (task: TaskType): addTaskTypeAction => {
    return {type: "ADD_TASK", task}

}
export const changeTaskStatusAC = (todolistID: string, status: TaskStatuses, taskID: string): changeTaskStatus => {
    return {type: "CHANGE-TASK-STATUS", todolistID, status, taskID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): changeTaskTitle => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}

export const setTaskAC = (tasks: Array<TaskType>, todolistId: string,) => {
    return {type: "SET-TASKS", todolistId, tasks}
}

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {type: "UPDATE-TASK", todolistId, taskId, model}
}




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


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
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