import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks]= useState ([
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "Angular", isDone: false }
        ])

    const [filter, setFilter] = useState<filterType>('all')

    const removeTodolist = (id: string) => {
           let upDateTasks = tasks.filter((t)=> t.id !== id)
            setTasks(upDateTasks);
    }


     const filterTasks = (titleButton:filterType) => {
        setFilter(titleButton);
     }
        let taskfiltred = tasks;
            if(filter === 'active'){
                taskfiltred  = taskfiltred.filter((el)=> !el.isDone)
            }
            if(filter === 'completed'){
                taskfiltred  =   taskfiltred.filter((el)=> el.isDone )
            }
            if(filter === 'all'){
                taskfiltred  =  taskfiltred
            }

     const addTask = (title: string)=> {
           let newTask = {id: v1(), title, isDone: false}
            setTasks([newTask,...tasks])
     }


    return (
        <div className="App">
         <Todolist title={"What to learn"}
                   tasks={taskfiltred}
                   removeTodolist={removeTodolist}
                   filterTasks={filterTasks}
                   addTask={addTask}
         />
        </div>
    );
}

export default App;
