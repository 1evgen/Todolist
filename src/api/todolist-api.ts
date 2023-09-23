import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "2075f7da-a7fe-49a8-9778-1b19c73defb0",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New,
  InProgress = 1,
  Completed,
  Draft,
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type TaskType = {
  id: string;
  todoListId: string;
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  order: number;
  addedDate: string;
};

type GetTaskResponse = {
  items: Array<TaskType>;
  totalCount: number;
  error: string | null;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export const todolistApi = {
  getTodolist: () => {
    return instance.get<Array<TodolistType>>("todo-lists", settings);
  },
  createTodolist: (title: string) => {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists/", { title });
  },
  removeTodolist: (todolistId: string) => {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist: (todolistId: string, title: string) => {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask: (todolistId: string, title: string) => {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  removeTask: (todolistId: string, taskId: string) => {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

type dataLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const authAPI = {
  login(data: dataLoginType) {
    return instance.post<ResponseType<{ userId: number }>>(`/auth/login`, data);
  },
  authMe() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("/auth/me");
  },
  logout() {
    return instance.delete<ResponseType>("/auth/login");
  },
};
