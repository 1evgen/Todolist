import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type filterType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: filterType
}
function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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


    const changeTaskStatus = ( todolistID: string, id: string, isStatus: boolean) => {
            setTasks({...tasks,
                [todolistID]:
                    tasks[todolistID].map((el)=> el.id === id ? {...el, isDone: isStatus}: el)})
    }
    const removeTodolist = (todolistID: string, id: string) => {
        setTasks({...tasks,
            [todolistID]: tasks[todolistID].filter((el)=> el.id !== id)})
    }

     const changeFilter = (todolistID: string,titleButton:filterType) => {
            setTodolists(todolists.map((el)=> el.id === todolistID ? {...el, filter: titleButton}: el))
     }

     const addTask = (todolistID: string, title: string)=> {
           let newTask = {id: v1(), title, isDone: false}
            setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
     }



    return (
        <div className="App">
            {
                todolists.map((t)=>{
                    let taskfiltred = tasks[t.id];
                    if(t.filter === 'active'){
                        taskfiltred  = taskfiltred.filter((el)=> !el.isDone)
                    }
                    if(t.filter === 'completed'){
                        taskfiltred  =   taskfiltred.filter((el)=> el.isDone )
                    }

             return <Todolist title={t.title}
                              id={t.id}
                              tasks={taskfiltred}
                              removeTodolist={removeTodolist}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter = {t.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
