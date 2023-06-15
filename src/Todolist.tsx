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
    changeTaskStatus: (id: string, isStatus: boolean)=> void
    filter: filterType
}

export const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState('')
    const [error, setError]= useState( '')


    const removeTaskHandler = (id: string) => {props.removeTodolist(id)}
    const onClickButtonAll = ()=>props.filterTasks('all')
    const onClickButtonActive = ()=> props.filterTasks('active')
    const onClickButtonCompleted = () => props.filterTasks('completed')
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setTitle(e.currentTarget.value)
        setError('')
    }


    const addTaskHandler = (title: string)=> {
          if(title.trim() !== ''){
              props.addTask(title.trim())
              setTitle('')
          } else {
              setError('Title is required')
          }

    }
    const onClickEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter'){
              props.addTask(title)
          }
    }
   const changeStatusHandler =  (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(id, e.currentTarget.checked );
   }


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div >
                    <input value={title}
                           onChange={changeTitleHandler}
                           onKeyUp={onClickEnterHandler}
                           className={error ? 'error': ''}
                    />
                    <button onClick={()=> addTaskHandler(title)}>+</button>
                    {error &&  <div  className='error-message'>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((t)=>
                        <li key={t.id}>
                            <input className={t.isDone ? 'is-done': ''}
                                   type="checkbox"
                                   onChange={(e)=>changeStatusHandler(t.id, e)}
                                   checked={t.isDone}
                            /><span>{t.title}</span>
                            <button className= 'buttonsDelete' onClick={()=>removeTaskHandler(t.id)}>✖️</button>

                        </li>)}
                </ul>
                <div>
                    <button className={props.filter === 'all'? 'active-filter': ''} onClick={onClickButtonAll}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onClickButtonActive}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickButtonCompleted}>Completed</button>
                </div>
            </div>
        </div>
    );
};

