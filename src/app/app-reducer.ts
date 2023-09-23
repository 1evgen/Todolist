//app-reducer.tsx
import { authAPI } from "../api/todolist-api";
import { AppThunk } from "./store";
import { setIsLoggedIn } from "../features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  initialized: false,
};

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
      state.initialized = action.payload.value;
    },
  },
});
export const { setAppStatus, setAppError, setInitialized } = slice.actions;
export const appReducer = slice.reducer;
export const appActions = slice.actions;

export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.authMe().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ value: true }));
    } else {
    }
    dispatch(setInitialized({ value: true }));
  });
};

export type CommonFeatureForAppActionsType =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setInitialized>;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  initialized: boolean;
};

/// React-redux
// export const appReducer = (state: InitialStateType = initialState, action: CommonFeatureForAppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//                 return {...state, error: action.error}
//         case "APP/SET-INITIALIZED":
//                 return {...state, initialized: action.value}
//         default:
//             return state
//     }
// }
// export const setAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setAppError = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const setInitialized = (value:boolean)=> ({type:"APP/SET-INITIALIZED", value} as const)
