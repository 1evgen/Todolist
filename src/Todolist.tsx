import React, {ChangeEvent} from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type TodolistType = {
    id: string
    title: string
    filter: filterType
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, titleButton: filterType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, id: string, isStatus: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newValue: string) => void
}

export const Todolist = (props: TodolistType) => {

    const removeTaskHandler = (id: string) => {
        props.removeTasks(props.id, id)
    }
    const onClickButtonAll = () => props.changeFilter(props.id, 'all')
    const onClickButtonActive = () => props.changeFilter(props.id, 'active')
    const onClickButtonCompleted = () => props.changeFilter(props.id, 'completed')

    const changeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, id, e.currentTarget.checked);
    }
    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const addTask = (title: string) => props.addTask(props.id, title)
    const changeTodolistHandler = (newValue: string)=> {
        props.changeTodolistTitle(props.id, newValue)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodolistHandler}/>
                    <button onClick={removeTodolistHandler}>-</button>
                </h3>
                <AddItemForm addItemForm={addTask}/>
                <ul>
                    {props.tasks.map((t) => {
                            const onChange = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li key={t.id}>
                            <input className={t.isDone ? 'is-done' : ''}
                                   type="checkbox"
                                   onChange={(e) => changeStatusHandler(t.id, e)}
                                   checked={t.isDone}
                            />
                            <EditableSpan title={t.title}
                                          onChange={onChange}
                            />

                            <button className='buttonsDelete'
                                    onClick={() => removeTaskHandler(t.id)}>✖️</button>
                        </li>
                    })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickButtonAll}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onClickButtonActive}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onClickButtonCompleted}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};


