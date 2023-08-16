import {useEffect, useState} from "react";
import axios from "axios";
import {todolistApi} from "../../api/todolist-api";


export default {
    title: "API"
}

export const GetTodolists = () => {
const [state, setState] = useState<any>(null)
    useEffect(()=> {
       todolistApi.getTodolist().then((response)=> setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
        let title = "How countries would you like to see"
        useEffect(()=> {
            todolistApi.createTodolist(title)
                .then((res)=> setState(res.data))
        },[])
    return <div>{JSON.stringify(state)}</div>
}

export const RemoveTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "1cec56a4-489a-4031-93bd-8cef2408b4df"
    useEffect(()=> {
            todolistApi.removeTodolist(todolistId)
            .then((res)=> setState(res.data))

    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "c9a6be08-204e-41f2-bb95-603a2b748ce1"
    let title = "Do you like playing computer games"
    useEffect(()=> {
        todolistApi.updateTodolist(todolistId, title)
            .then((res)=> setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "b7968193-99da-4103-b972-7a90dba1b993"
    useEffect(()=> {
        todolistApi.getTasks(todolistId).then((resp) => setState(resp.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "b7968193-99da-4103-b972-7a90dba1b993"
    let title = "Sweden"
    useEffect(()=> {
        todolistApi.createTask(todolistId, title).then((resp) => setState(resp.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}


export const RemoveTask = ()=> {
    const [state, setState]= useState<any>(null)
        useEffect(()=> {
            let todolistId = 'b7968193-99da-4103-b972-7a90dba1b993'
            let taskId = 'c3d9b24d-37ba-4071-a787-fc48b158f44b'
            todolistApi.removeTask(todolistId, taskId)
                .then((response)=> setState(response.data))
        },[])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = ()=> {
    const [state, setState]= useState<any>(null)

    useEffect(()=> {
        let todolistId = 'b7968193-99da-4103-b972-7a90dba1b993'
        let taskId = '43f54ecb-90d9-4d2e-8537-d849d167310e'
        let newTask = 'GERMANY'

        todolistApi.updateTask(todolistId, taskId, newTask)
            .then((response)=> setState(response.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}