import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";


export type filterType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type TodolistsType = {
    id: string
    title: string
    filter: filterType
}

function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
            {id: v1(), title: 'Bootstrap', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Car', isDone: true},
            {id: v1(), title: 'apartment', isDone: false},
            {id: v1(), title: 'building site', isDone: false},
        ]
    })


    const changeTaskStatus = (todolistID: string,  status: boolean, id: string,) => {
        dispatchToTasks(changeTaskStatusAC(todolistID, status, id))
    }
    const removeTasks = (todolistID: string, id: string) => {
            dispatchToTasks(removeTaskAC(id, todolistID))
    }

    const changeFilter = (todolistID: string, titleButton: filterType) => {
        dispatchToTodolist(changeFilterAC(todolistID, titleButton))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatchToTasks(addTaskAC(title, todolistID))
    }

    const removeTodolist = (TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (id: string,  newValue: string, todolistID: string) => {
        dispatchToTasks(changeTaskTitleAC(id,newValue,todolistID))
    }

    const changeTodolistTitle = (todolistID: string, newValue: string)=> {
       dispatchToTodolist(changeTodolistTitleAC(todolistID, newValue))
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
                todolists.map((t) => {
                    let taskfiltred = tasks[t.id];
                    if (t.filter === 'active') {
                        taskfiltred = taskfiltred.filter((el) => !el.isDone)
                    }
                    if (t.filter === 'completed') {
                        taskfiltred = taskfiltred.filter((el) => el.isDone)
                    }

                    return <Grid item>
                        <Paper style= {{padding: "20px"}}>
                    <Todolist        title={t.title}
                                     todolistId={t.id}
                                     tasks={taskfiltred}
                                     removeTasks={removeTasks}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={t.filter}
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

export default AppWithReducers;
