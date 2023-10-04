import {appActions, setAppError, setAppStatus} from "app/app-reducer";
import { Dispatch } from "redux";
import { ResponseType } from "api/todolist-api";
import axios from "axios";
import { AppDispatch } from "app/store";


export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }));
  } else {
    dispatch(setAppError({ error: "Some error occurred" }));
  }

  dispatch(setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch):void => {
  let errorMessage = "Some error occurred";
  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    console.log(err)
    errorMessage = `Native error: ${err.message[0]}`;
  } else {
    errorMessage = JSON.stringify(err);
  }
  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
