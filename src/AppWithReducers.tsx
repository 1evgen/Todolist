import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {TaskPriorities, TaskStatues, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}



function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all',addedDate: '', order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS',  status: TaskStatues.Completed, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'JS',  status: TaskStatues.Completed, todoListId: todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Car',  status: TaskStatues.Completed, todoListId: todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'Wine',  status: TaskStatues.Completed, todoListId:todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},

        ]
    })



    const changeTaskStatus = (todolistID: string,  status: TaskStatues, id: string,) => {
        dispatchToTasks(changeTaskStatusAC(todolistID, status, id))
    }
    const removeTasks = (todolistID: string, id: string) => {
            dispatchToTasks(removeTaskAC(id, todolistID))
    }

    const changeFilter = (todolistID: string, titleButton: FilterValueType) => {
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
                        taskfiltred = taskfiltred.filter((el) => el.status === TaskStatues.New)
                    }
                    if (t.filter === 'completed') {
                        taskfiltred = taskfiltred.filter((el) => el.status === TaskStatues.Completed)
                    }

                    return <Grid item>
                        <Paper style= {{padding: "20px"}}>
                    <Todolist        title={t.title}
                                     id={t.id}
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
