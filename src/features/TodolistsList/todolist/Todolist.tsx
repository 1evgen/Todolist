import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/editableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterButtons} from "../../../Components/FilterButton/FilterButtons";
import {Task} from "./task/Task";
import {FilterValueType, TodolistDomainType} from "../todolistReducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../app/store";
import {fetchTaskTC} from "../task-reducer";


export type TodolistType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, titleButton: FilterValueType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, status: TaskStatuses, id: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newValue: string) => void
    demo?: boolean
}

export const Todolist = React.memo( ({demo = false,...props}: TodolistType) => {
    let dispatch: AppDispatch = useDispatch()


    useEffect(()=> {
        if (!demo) {
            return;
        }
        dispatch(fetchTaskTC(props.todolist.id))
    },[])

    const removeTodolistHandler = useCallback( () => props.removeTodolist(props.todolist.id),
        [props.removeTodolist,props.todolist.id])

    const addTask = useCallback( (title: string) => props.addTask(props.todolist.id, title),
        [props.addTask, props.todolist.id])

    const changeTodolistHandler = useCallback( (newValue: string)=> {
        props.changeTodolistTitle(props.todolist.id, newValue)},[props.changeTodolistTitle, props.todolist.id])

    let tasksForTodolist = props.tasks;
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.todolist.title} onChange={changeTodolistHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodolistHandler}
                                disabled={props.todolist.entityStatus === "loading"} >
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItemForm={addTask} disabled={props.todolist.entityStatus === "loading"}/>
                <ul>
                    {tasksForTodolist.map((t) => ( <Task changeTaskTitle={props.changeTaskTitle}
                                                         changeTaskStatus={props.changeTaskStatus}
                                                         removeTasks={props.removeTasks}
                                                         id={props.todolist.id}
                                                         task={t}
                                                         key={t.id}
                    />))}
                </ul>

                <FilterButtons filter={props.todolist.filter}
                               changeFilter={props.changeFilter}
                               id={props.todolist.id}/>
            </div>
        </div>
    );
});





