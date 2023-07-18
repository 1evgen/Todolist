import type { Meta, StoryObj } from '@storybook/react';
import {Task, TasksTypeProps} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskType} from "../Todolist";
import React, {useState} from "react";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes:  {},

};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskStories: Story = {
     args: {
            task: {id: '1', title: 'JS', isDone: true},
            changeTaskTitle: action('change task title'),
            changeTaskStatus: action('will be change status'),
            removeTasks: action('will be remove task')
     },
};

export const TaskStories_2: Story = {
    render: (args)=> <Task
        changeTaskTitle={action('change story')}
        changeTaskStatus={action('change status')}
        removeTasks={action('remove task')}
        todolistId={'swdedf22d1'}
        task={{id: '2', title: 'TypeScript', isDone: false}}/>
};

export const TasksStory_3: Story = {
    render:(args)=> (
        <div>
            <Task
                changeTaskTitle={action('change story')}
                changeTaskStatus={action('change status')}
                removeTasks={action('remove task')}
                todolistId={'swdedf22d1'}
                task={{id: '1', title: 'TypeScript', isDone: true}}/>
            <Task
                changeTaskTitle={action('change story')}
                changeTaskStatus={action('change status')}
                removeTasks={action('remove task')}
                todolistId={'swdedf22d2'}
                task={{id: '2', title: 'JS', isDone: false}}/>
        </div>
    )
}

const  TaskWithHook: React.FC<TasksTypeProps> = (args)=> {
        const [tasks, setTasks]= useState(args.task)
        const changeTaskTitle = (id: string,title: string)=> {setTasks({...tasks, title})}
        const changeTaskStatus = (id: string) => {setTasks({...tasks, isDone: !tasks.isDone})}


        return <Task changeTaskTitle={changeTaskTitle}
                     changeTaskStatus={changeTaskStatus}
                     removeTasks={args.removeTasks}
                     todolistId={args.todolistId}
                     task={tasks}
        />
}

export const uncontrolledTask: Story = {
    args: {
        todolistId: "ewew2-112w-2123",
        task: {id: "we22-as6l-12dd", title: 'JS', isDone: true},
        removeTasks: action("delete task")
    },

    render: (args)=> <TaskWithHook changeTaskTitle={args.changeTaskTitle}
                       changeTaskStatus={args.changeTaskStatus}
                       removeTasks={args.removeTasks}
                       todolistId={args.todolistId}
                       task={args.task}/>

}

