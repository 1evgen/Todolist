import axios from "axios";
//const axios = require('axios');

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2075f7da-a7fe-49a8-9778-1b19c73defb0'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatues {
    New,
    InProgress = 1,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string
    status: TaskStatues
    priority: TaskPriorities
    startDate: string
    deadline: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type UpdateCreateTaskResponse =  {
        data: {}
        items: Array<TaskType>
        resultCode: number
        messages: Array<string>
}



export const todolistApi = {
    getTodolist: ()=> {
        return instance.get<Array<TodolistType>>('todo-lists', settings)
    },
    createTodolist: (title: string)=> {
        return  instance.post<ResponseType<{item: TodolistType}>>("todo-lists/", {title})
    },
    removeTodolist: (todolistId: string)=> {
      return  instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist: (todolistId:string, title: string)=> {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,{title})
    },
    getTasks: (todolistId: string)=> {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string)=> {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask: (todolistId: string, taskId: string)=> {
        return instance.delete<ResponseType>( `todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId:string, taskId: string, newTitle: string)=> {
            const newTask = {
                title: '',
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: ''
            }
        return instance.put<UpdateCreateTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, {...newTask,title: newTitle})
    }
}