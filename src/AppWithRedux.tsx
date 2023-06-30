import React, {useReducer, useState} from 'react';
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

function AppWithRedux() {

    // let todolistID1 = v1()
    // let todolistID2 = v1()

    // let [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Angular', isDone: false},
    //         {id: v1(), title: 'Bootstrap', isDone: false},
    //
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Car', isDone: true},
    //         {id: v1(), title: 'apartment', isDone: false},
    //         {id: v1(), title: 'building site', isDone: false},
    //     ]
    // })

    const todolists = useSelector<AppRootStateType,Array<TodolistsType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const changeTaskStatus = (todolistID: string,  status: boolean, id: string,) => {
        dispatch(changeTaskStatusAC(todolistID, status, id))
    }
    const removeTasks = (todolistID: string, id: string) => {
            dispatch(removeTaskAC(id, todolistID))
    }

    const changeFilter = (todolistID: string, titleButton: filterType) => {
        dispatch(changeFilterAC(todolistID, titleButton))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(title, todolistID))
    }

    const removeTodolist = (TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatch(action)

    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }

    const changeTaskTitle = (id: string,  newValue: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(id,newValue,todolistID))
    }

    const changeTodolistTitle = (todolistID: string, newValue: string)=> {
       dispatch(changeTodolistTitleAC(todolistID, newValue))
    }

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

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }


                    return <Grid item>
                        <Paper style= {{padding: "20px"}}>
                    <Todolist        title={tl.title}
                                     id={tl.id}
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
}

export default AppWithRedux;