import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeFilterAC, changeTodolistTC,
    changeTodolistTitleAC, fetchTodolistsTC, FilterValueType,
    removeTodolistTC, TodolistDomainType,
} from "./state/todolistReducer";
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskTS, updateTaskTC
} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {Todolist} from "./Todolist";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux  = React.memo( () =>  {

    const todolists = useSelector<AppRootStateType,Array<TodolistDomainType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch: AppDispatch = useDispatch();

    useEffect(()=> {
            dispatch(fetchTodolistsTC())
    },[])


    const changeTaskStatus = useCallback ((todolistID: string, status: TaskStatuses, id: string,) => {
        dispatch(updateTaskTC(todolistID, id, {status}))
    }, [dispatch])

    const removeTasks = useCallback ((todolistID: string, id: string) => {
        dispatch(removeTaskTS(todolistID, id))
    },[dispatch])

    const changeFilter = useCallback ((todolistID: string, titleButton: FilterValueType) => {
        dispatch(changeFilterAC(todolistID, titleButton))
    },[dispatch])

    const addTask = useCallback ((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID,title))
    },[dispatch])

    const removeTodolist = useCallback ((TodolistID: string) => {
        dispatch(removeTodolistTC(TodolistID))
    },[dispatch])

    const addTodolist = useCallback ((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)
    },[dispatch])

    const changeTaskTitle = useCallback ((id: string,  newValue: string, todolistID: string) => {
        dispatch(updateTaskTC(todolistID, id, {title: newValue}))},[dispatch])

    const changeTodolistTitle = useCallback( (todolistID: string, newValue: string)=> {
        dispatch(changeTodolistTC(todolistID, newValue))
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
                    return <Grid item>
                        <Paper style= {{padding: "20px"}}>
                        <Todolist     title={tl.title}
                                     id={tl.id}
                                     tasks={tasks[tl.id]}
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
