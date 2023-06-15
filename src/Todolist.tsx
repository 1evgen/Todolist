import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
import {filterType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (id: string)=> void
    filterTasks: (titleButton: filterType)=> void
    addTask:(title: string)=> void
}

export const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState('')

    const removeTaskHandler = (id: string) => {props.removeTodolist(id)}
    const onClickButtonAll = ()=>props.filterTasks('all')
    const onClickButtonActive = ()=> props.filterTasks('active')
    const onClickButtonCompleted = () => props.filterTasks('completed')
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>  setTitle(e.currentTarget.value)

    const addTaskHandler = (title: string)=> {
            props.addTask(title.trim())
            setTitle('')
    }
    const onClickEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter'){
              props.addTask(title)
          }
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={changeTitleHandler}
                           onKeyUp={onClickEnterHandler}
                    />
                    <button onClick={()=> addTaskHandler(title)}>+</button>
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

