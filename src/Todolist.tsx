import React, {ChangeEvent, useCallback} from 'react';
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterButtons} from "./FilterButtons";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type TodolistType = {
    todolistId: string
    title: string
    filter: filterType
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, titleButton: filterType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, status: boolean,id: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newValue: string) => void
}

export const Todolist = React.memo( (props: TodolistType) => {
    console.log('render Todolist')
    // const onClickButtonAll = () => props.changeFilter(props.id, 'all')
    // const onClickButtonActive = () => props.changeFilter(props.id, 'active')
    // const onClickButtonCompleted = () => props.changeFilter(props.id, 'completed')

    const removeTodolistHandler = useCallback( () => props.removeTodolist(props.todolistId),
        [props.removeTodolist,props.todolistId])

    const addTask = useCallback( (title: string) => props.addTask(props.todolistId, title),
        [props.addTask, props.todolistId])

    const changeTodolistHandler = useCallback( (newValue: string)=> {
        props.changeTodolistTitle(props.todolistId, newValue)},[props.changeTodolistTitle, props.todolistId])


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodolistHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodolistHandler} >
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItemForm={addTask}/>
                <ul>
                    {tasksForTodolist.map((t) => ( <Task changeTaskTitle={props.changeTaskTitle}
                                                         changeTaskStatus={props.changeTaskStatus}
                                                         removeTasks={props.removeTasks}
                                                         todolistId={props.todolistId}
                                                         task={t}
                                                         key={t.id}
                    />))}
                </ul>

                <FilterButtons filter={props.filter} changeFilter={props.changeFilter} id={props.todolistId}/>
                {/*<div>*/}
                {/*    <Button variant={props.filter === 'all' ? 'contained' : 'text'}*/}
                {/*            onClick={onClickButtonAll}>All*/}
                {/*    </Button>*/}
                {/*    <Button color={'primary'}*/}
                {/*            variant={props.filter === 'active' ? 'contained' : 'text'}*/}
                {/*            onClick={onClickButtonActive}>Active*/}
                {/*    </Button>*/}
                {/*    <Button color={'secondary'}*/}
                {/*            variant={props.filter === 'completed' ? 'contained' : 'text'}*/}
                {/*            onClick={onClickButtonCompleted}>Completed*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
});





