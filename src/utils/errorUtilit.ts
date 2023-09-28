import { setAppError, setAppStatus } from "app/app-reducer";
import { Dispatch } from "redux";
import { ResponseType } from "api/todolist-api";

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }));
  } else {
    dispatch(setAppError({ error: "Some error occurred" }));
  }
  dispatch(setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
  dispatch(setAppError({ error }));
  dispatch(setAppStatus({ status: "failed" }));
};
