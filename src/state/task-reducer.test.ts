import {TasksStateType} from '../App'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer,} from "./task-reducer";


import {addTodolistAC} from "./todolistReducer";
import {TaskPriorities, TaskStatues} from "../api/todolist-api";

let startState: TasksStateType ;
beforeEach(()=> {
    startState = {
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
})



test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
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
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatues.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', TaskStatues.New, '2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatues.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatues.Completed)
})

test('change task title', ()=> {

    const action = changeTaskTitleAC('2', "butter", 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).not.toBe('butter')
    expect(endState['todolistId2'][1].title).toBe('butter')
})


test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
