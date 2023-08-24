import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolistReducer";

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistDomainType> ;

beforeEach(()=> {
     startState  = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate:'', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate:'', order: 0}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    console.log(endState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', ()=> {
    let newTodolist: TodolistDomainType = {
        id: '1111',
        title: 'hello',
        filter: "all",
        addedDate: '111',
        order: 0
    }


    const endState = todolistsReducer(startState, addTodolistAC(newTodolist) )

    expect(endState.length).toBe(4)

})


test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState,changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')

})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed'
    const endState = todolistsReducer(startState,  changeFilterAC(todolistId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})

test('set todolist with server', ()=> {
    const initialState = {
    id: todolistId1, title: 'What to learn'
    }


})