import {v1} from "uuid";
import {filterType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistReducer";

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistsType> ;

beforeEach(()=> {
     startState  = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', ()=> {
    let newTodolistTitle = 'New todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle) )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)

})


test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState,changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')

})

test('correct filter of todolist should be changed', () => {
    let newFilter: filterType = 'completed'
    const endState = todolistsReducer(startState,  changeFilterAC(todolistId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})