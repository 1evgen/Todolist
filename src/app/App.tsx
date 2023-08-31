import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type AppPropsType = {
    demo: boolean
}

const App = React.memo(({demo = false, ...props}:AppPropsType ) => {
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
             <ErrorSnackbar/>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>

            {status === 'loading' &&  <LinearProgress/>}
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
})

export default App;

