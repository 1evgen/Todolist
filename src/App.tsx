import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type filterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks]= useState ([
        { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false },
            { id: 4, title: "Rest API", isDone: false },
            { id: 5, title: "Angular", isDone: false }
        ])

    const [filter, setFilter] = useState<filterType>('all')

    const removeTodolist = (id: number) => {
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

    return (
        <div className="App">
         <Todolist title={"What to learn"}
                   tasks={taskfiltred}
                   removeTodolist={removeTodolist}
                   filterTasks={filterTasks}
         />
        </div>
    );
}

export default App;
