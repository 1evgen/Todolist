import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "./todolistReducer";
import {tasksReducer} from "./task-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    let newTodolist: TodolistDomainType = {
        id: '1111',
        title: 'hello',
        filter: "all",
        addedDate: '111',
        order: 0
    }

    const action = addTodolistAC(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
            'todolistId1': [
                {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId:'todolistId1', description: "",
                    startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0},
                {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId:'todolistId1', description: "",
                    startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0},
                {id: '3', title: 'React', status: TaskStatuses.New, todoListId:'todolistId1', description: "",
                    startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0}
            ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId:'todolistId1', description: "",
                startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId:'todolistId1', description: "",
                startDate: '', deadline: '', addedDate: '', priority: TaskPriorities.Low, order:0}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        expect(endState['todolistId2']).not.toBeDefined()
})
