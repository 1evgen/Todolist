import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterButtons} from "./FilterButtons";
import {Task} from "./Task";
import {FilterValueType} from "./state/todolistReducer";
import {TaskStatues, TaskType} from "./api/todolist-api";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTasks: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, titleButton: FilterValueType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, status: TaskStatues,id: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newValue: string) => void
}

export const Todolist = React.memo( (props: TodolistType) => {
    console.log('render Todolist')
    const removeTodolistHandler = useCallback( () => props.removeTodolist(props.id),
        [props.removeTodolist,props.id])

    const addTask = useCallback( (title: string) => props.addTask(props.id, title),
        [props.addTask, props.id])

    const changeTodolistHandler = useCallback( (newValue: string)=> {
        props.changeTodolistTitle(props.id, newValue)},[props.changeTodolistTitle, props.id])


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatues.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatues.Completed);
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
                                                         id={props.id}
                                                         task={t}
                                                         key={t.id}
                    />))}
                </ul>

                <FilterButtons filter={props.filter} changeFilter={props.changeFilter} id={props.id}/>
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





