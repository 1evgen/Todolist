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
    removeTodolist: (todolistID: string, id: string)=> void
    changeFilter: (todolistID: string,titleButton:filterType)=> void
    addTask:(todolistID: string,title: string)=> void
    changeTaskStatus: (todolistID: string, id: string, isStatus: boolean)=> void
    filter: filterType
    id: string
}

export const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState('')
    const [error, setError]= useState( '')


    const removeTaskHandler = (id: string) => {props.removeTodolist(props.id,id)}
    const onClickButtonAll = ()=>props.changeFilter(props.id,'all')
    const onClickButtonActive = ()=> {
        debugger
        props.changeFilter(props.id, 'active')
    }
    const onClickButtonCompleted = () => props.changeFilter(props.id,'completed')
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setTitle(e.currentTarget.value)
        setError('')
    }


    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    };
    const onClickEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(props.id, title);
        }
    };




   const changeStatusHandler =  (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, id, e.currentTarget.checked );
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
                    <button onClick={addTaskHandler}>+</button>
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

