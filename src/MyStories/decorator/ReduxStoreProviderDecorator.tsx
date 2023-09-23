import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "../../features/TodolistsList/task-reducer";
import { todolistsReducer } from "../../features/TodolistsList/todolistReducer";
import { TaskPriorities, TaskStatuses } from "../../api/todolist-api";
import thunk from "redux-thunk";
import { appReducer } from "../../app/app-reducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistsReducer,
  app: appReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

const initialGlobalState: AppRootStateType = {
  todolist: [
    { id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading" },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
      {
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
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Car",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
      {
        id: v1(),
        title: "apartment",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
      },
    ],
  },
  app: {
    status: "loading",
    error: null,
    initialized: false,
  },
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

//initialGlobalState as AppRootStateType
export const ReduxStoreProviderDecorator = (storyFn: () => any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
