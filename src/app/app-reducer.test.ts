import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

test('check to set status load', ()=> {
    let initialState: InitialStateType = {
        status: 'loading',
        error: null
    }
   let result = appReducer(initialState, setAppStatusAC('succeeded'))
    expect(result.status).toBe('succeeded')
})

test('check get message error', ()=> {
    let initialState: InitialStateType = {
        status: 'loading',
        error: null
    }
    let result = appReducer(initialState, setAppErrorAC('Error!!'))
    expect(result.error).toBe('Error!!')
})