import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "./todolistReducer";
import {tasksReducer} from "./task-reducer";
import {TaskPriorities, TaskStatues} from "../api/todolist-api";


test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
            'todolistId1': [
                {id: '1', title: 'CSS', status: TaskStatues.New, todoListId:'todolistId1', description: "",
                    startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0},
                {id: '2', title: 'JS', status: TaskStatues.Completed, todoListId:'todolistId1', description: "",
                    startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0},
                {id: '3', title: 'React', status: TaskStatues.New, todoListId:'todolistId1', description: "",
                    startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0}
            ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatues.New, todoListId:'todolistId1', description: "",
                startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0},
            {id: '3', title: 'tea', status: TaskStatues.New, todoListId:'todolistId1', description: "",
                startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

     expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
