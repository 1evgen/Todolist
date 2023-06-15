import React from 'react';
import {filterType} from "./App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (id: number)=> void
    filterTasks: (titleButton: filterType)=> void
}

export const Todolist = (props: TodolistType) => {
    const removeTaskHandler = (id: number) => {props.removeTodolist(id)}
    const onClickButtonAll = ()=>props.filterTasks('all')
    const onClickButtonActive = ()=> props.filterTasks('active')
    const onClickButtonCompleted = () => props.filterTasks('completed')

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((t)=>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={()=>removeTaskHandler(t.id)}>✖️</button>

                        </li>)}
                </ul>
                <div>
                    <button onClick={onClickButtonAll}>All</button>
                    <button onClick={onClickButtonActive}>Active</button>
                    <button onClick={onClickButtonCompleted}>Completed</button>
                </div>
            </div>
        </div>
    );
};

