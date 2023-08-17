import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FilterValueType, TodolistDomainType} from "./state/todolistReducer";
import {TaskPriorities, TaskStatues, TaskType} from "./api/todolist-api";
import {Todolist} from "./Todolist";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatues.Completed, todoListId:todolistID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
            },
            {id: v1(),  title: 'JS', status: TaskStatues.Completed, todoListId:todolistID1, startDate: '',
                deadline: '',addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},


        ],
        [todolistID2]: [
            {id: v1(), title: 'Car', status: TaskStatues.Completed, todoListId:todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'apartment',status: TaskStatues.Completed, todoListId:todolistID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ]
    })


    const changeTaskStatus = (todolistID: string, status: TaskStatues, id: string) => {
        setTasks({
            ...tasks,
            [todolistID]:
                tasks[todolistID].map((el) => el.id === id ? {...el, status: status} : el)
        })
    }
    const removeTasks = (todolistID: string, id: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].filter((el) => el.id !== id)
        })
    }

    const changeFilter = (todolistID: string, titleButton: FilterValueType) => {
        setTodolists(todolists.map((el) => el.id === todolistID ? {...el, filter: titleButton} : el))
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title, status: TaskStatues.New, todoListId:todolistID, startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const removeTodolist = (TodolistID: string) => {
        setTodolists(todolists.filter((el) => el.id !== TodolistID))
        delete tasks[TodolistID]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolist: TodolistDomainType = {id: v1(), title, filter: 'all', addedDate: '', order: 0}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }

    const changeTaskTitle = (id: string, newValue: string, todolistID: string) => {
        debugger
        setTasks({
            ...tasks,
            [todolistID]:
                tasks[todolistID].map((el) => el.id === id ? {...el, title: newValue} : el)
        })
    }

    const changeTodolistTitle = (todolistID: string, newValue: string)=> {
     setTodolists(todolists.map((el)=> el.id === todolistID ? {...el, title: newValue}: el))
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
                        <Todolist    title={t.title}
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

export default App;
