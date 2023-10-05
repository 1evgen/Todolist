import {v1} from "uuid";
import {changeFilter, changeTodolistEntityStatus, FilterValueType, TodolistDomainType, todolistsReducer,} from "./todolistReducer";
import {addTodolistTC, changeTodolistTC, removeTodolistTC} from "features/TodolistsList/todolist-actions";


let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
    ];
});

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({todolistId: todolistId1},
        'requestId', todolistId1));
    console.log(endState);
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let newTodolist: TodolistDomainType = {
        id: "1111",
        title: "hello",
        filter: "all",
        entityStatus: "idle",
        addedDate: "111",
        order: 0,
    };

    const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist: newTodolist}, 'requestId', 'hello'));
    expect(endState.length).toBe(3);
});

test("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, changeTodolistTC.fulfilled({todolistId: todolistId2, title: newTodolistTitle},
        'requestId', {todolistId: todolistId2, title: newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
});

test("correct filter of todolist should be changed", () => {
    let newFilter: FilterValueType = "completed";
    const endState = todolistsReducer(startState, changeFilter({id: todolistId1, filter: newFilter}));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe("all");
});

test("The entity status should be change", () => {
    let result = todolistsReducer(startState, changeTodolistEntityStatus({id: todolistId1, entityStatus: "loading"}));

    expect(result[0].entityStatus).toBe("loading");
    expect(result[1].entityStatus).toBe("idle");
});
