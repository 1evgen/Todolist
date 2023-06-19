import {v1} from "uuid";
import {TodolistType} from "../Todolist";
import {filterType, TodolistsType} from "../App";
import {addTodolistAC, changetFilterAC, changeTodoAC, removeTodolistAC, todolistsReducer} from "./todolistReducer";




test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistsType>  = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', ()=> {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistsType>  = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    let newTodolistTitle = 'New todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle) )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)

})


test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState,changeTodoAC(todolistId2, newTodolistTitle)  )

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')

})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: filterType = 'completed'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type:'CHANGE-TODOLIST-FILTER', id: todolistId1, filter: newFilter})

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})