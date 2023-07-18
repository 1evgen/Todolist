import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {v1} from "uuid";


export type filterType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistsType = {
    id: string
    title: string
    filter: filterType
}

const AppWithRedux  = React.memo( () =>  {
    console.log('render App')
    const todolists = useSelector<AppRootStateType,Array<TodolistsType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const changeTaskStatus = useCallback ((todolistID: string,  status: boolean, id: string,) => {
        dispatch(changeTaskStatusAC(todolistID, status, id))
    }, [dispatch])
    const removeTasks = useCallback ((todolistID: string, id: string) => {
        dispatch(removeTaskAC(id, todolistID))
    },[dispatch])

    const changeFilter = useCallback ((todolistID: string, titleButton: filterType) => {
        dispatch(changeFilterAC(todolistID, titleButton))
    },[dispatch])

    const addTask = useCallback ((todolistID: string, title: string) => {
        dispatch(addTaskAC(title, todolistID))
    },[dispatch])

    const removeTodolist = useCallback ((TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatch(action)
    },[dispatch])

    const addTodolist = useCallback ((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    },[dispatch])

    const changeTaskTitle = useCallback ((id: string,  newValue: string, todolistID: string) => {
        debugger
        dispatch(changeTaskTitleAC(id,newValue,todolistID))},[dispatch])

    const changeTodolistTitle = useCallback( (todolistID: string, newValue: string)=> {
        dispatch(changeTodolistTitleAC(todolistID, newValue))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed >
                <Grid container style={{margin: '10px'}} >
            <AddItemForm addItemForm={addTodolist}/>
                </Grid>
                <Grid container spacing={10} >
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                     let tasksForTodolist = allTodolistTasks;
                    return <Grid item>
                        <Paper style= {{padding: "20px"}}>
                    <Todolist        title={tl.title}
                                     todolistId={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTasks={removeTasks}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodolistTitle={changeTodolistTitle}
                    />
                        </Paper>
                        </Grid>
                })

            }
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithRedux;
