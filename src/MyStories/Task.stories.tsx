import type { Meta, StoryObj } from "@storybook/react";
import { Task, TasksTypeProps } from "features/TodolistsList/todolist/task/Task";
import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "api/todolist-api";
import {ReduxStoreProviderDecorator} from "MyStories/decorator/ReduxStoreProviderDecorator";
import {withRouter} from "storybook-addon-react-router-v6";

const meta: Meta<typeof Task> = {
  title: "Todolist/Task",
  component: Task,
  tags: ["autodocs"],
  argTypes: {},
    decorators: [ReduxStoreProviderDecorator, withRouter],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskStories: Story = {
  args: {
    task: {
      id: v1(),
      title: "JS",
      status: TaskStatuses.Completed,
      todoListId: "todolistId1",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
      description: "",
    },
    changeTaskTitle: action("change task title"),
    changeTaskStatus: action("will be change status"),
  },
};

export const TaskStories_2: Story = {
  render: (args) => (
    <Task
      changeTaskTitle={action("change story")}
      changeTaskStatus={action("change status")}
      id={"swdedf22d1"}
      task={{
        id: "2",
        title: "TypeScript",
        status: TaskStatuses.New,
        todoListId: "swdedf22d1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      }}
      disabled={true}
    />
  ),
};

export const TasksStory_3: Story = {
  render: (args) => (
    <div>
      <Task
        changeTaskTitle={action("change story")}
        changeTaskStatus={action("change status")}
        id={"swdedf22d1"}
        task={{
          id: "2",
          title: "TypeScript",
          status: TaskStatuses.New,
          todoListId: "swdedf22d1",
          startDate: "",
          deadline: "",
          addedDate: "",
          order: 0,
          priority: TaskPriorities.Low,
          description: "",
        }}
        disabled={true}
      />
      <Task
        changeTaskTitle={action("change story")}
        changeTaskStatus={action("change status")}
        id={"swdedf22d2"}
        task={{
          id: v1(),
          title: "HTML&CSS",
          status: TaskStatuses.Completed,
          todoListId: "todolistId1",
          startDate: "",
          deadline: "",
          addedDate: "",
          order: 0,
          priority: TaskPriorities.Low,
          description: "",
        }}
        disabled={false}
      />
    </div>
  ),
};

const TaskWithHook: React.FC<TasksTypeProps> = (args) => {
  const [tasks, setTasks] = useState(args.task);
  const changeTaskTitle = (id: string, title: string) => {
    setTasks({ ...tasks, title });
  };
  const changeTaskStatus = (id: string) => {
    setTasks({ ...tasks, status: TaskStatuses.New });
  };

  return (
    <Task
      changeTaskTitle={changeTaskTitle}
      changeTaskStatus={changeTaskStatus}
      // removeTasks={args.removeTasks}
      id={args.id}
      task={tasks}
      disabled={true}
    />
  );
};

export const uncontrolledTask: Story = {
  args: {
    id: "ewew2-112w-2123",
    task: {
      id: v1(),
      title: "JS",
      status: TaskStatuses.Completed,
      todoListId: "todolistId1",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
      description: "",
    },
  },

  render: (args) => (
    <TaskWithHook
      changeTaskTitle={args.changeTaskTitle}
      changeTaskStatus={args.changeTaskStatus}
      id={args.id}
      task={args.task}
      disabled={true}
    />
  ),
};
