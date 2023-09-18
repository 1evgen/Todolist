import {appReducer, InitialStateType, setAppError, setAppStatus} from "./app-reducer";

test('check to set status load', ()=> {
    let initialState: InitialStateType = {
        status: 'loading',
        error: null,
        initialized: false
    }
   let result = appReducer(initialState, setAppStatus({status: 'succeeded'}))
    expect(result.status).toBe('succeeded')
})

test('check get message error', ()=> {
    let initialState: InitialStateType = {
        status: 'loading',
        error: null,
        initialized: false
    }
    let result = appReducer(initialState, setAppError({error: 'Error!!'}))
    expect(result.error).toBe('Error!!')
})