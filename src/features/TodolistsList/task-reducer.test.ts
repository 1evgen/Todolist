import { TasksStateType } from "trash/App";
import { TaskPriorities, TaskStatuses, UpdateTaskModelType } from "api/todolist-api";
import {addTaskTC, removeTaskTC, updateTaskTC} from "features/TodolistsList/task-actions";
import {tasksReducer} from "features/TodolistsList/task-reducer";
import {TodolistDomainType} from "features/TodolistsList/todolistReducer";
import {addTodolistTC} from "features/TodolistsList/todolist-actions";

let startState: TasksStateType;
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTaskTC.fulfilled({ taskId: "2", todolistId: "todolistId2"},
      'requestId', {taskId: "2", todolistId: "todolistId2"});
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
      },
    ],
  });
});
test("correct task should be added to correct array", () => {
  let newTask = {
    id: "1",
    title: "bread",
    status: TaskStatuses.New,
    todoListId: "todolistId1",
    description: "",
    startDate: "",
    deadline: "",
    addedDate: "",
    priority: TaskPriorities.Low,
    order: 0,
  };
  const action = addTaskTC.fulfilled({ task: newTask }, 'requestId', {todolistId: newTask.todoListId, title: newTask.title});
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId1"][0].id).toBeDefined();
  expect(endState["todolistId1"][0].title).toBe("bread");
  expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New);
});
test("status of specified task should be changed", () => {
  const model: UpdateTaskModelType = {
    title: "CSS",
    deadline: "",
    status: TaskStatuses.Completed,
    description: "",
    priority: TaskPriorities.Low,
    startDate: "",
  };
  const action = updateTaskTC.fulfilled({ todolistId: "todolistId1", taskId: "1",  model}, 'requestId',
      { todolistId: "todolistId1", taskId: "1", domainModel: model} );
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});
test("change task title", () => {
  const model: UpdateTaskModelType = {
    title: "Angular",
    deadline: "",
    status: TaskStatuses.Completed,
    description: "",
    priority: TaskPriorities.Low,
    startDate: "",
  };
  const action = updateTaskTC.fulfilled({ todolistId: "todolistId1", taskId: "1", model },
      'requestID', { todolistId: "todolistId1", taskId: "1", domainModel: model });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][0].title).toBe("Angular");
  expect(endState["todolistId1"][1].title).toBe("JS");
});
test("new array should be added when new todolist is added", () => {
  let newTodolist: TodolistDomainType = {
    id: "1111",
    title: "hello",
    filter: "all",
    addedDate: "111",
    order: 0,
    entityStatus: "idle",
  };
  const action = addTodolistTC.fulfilled({ todolist: newTodolist}, 'requestId', 'hello');
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
