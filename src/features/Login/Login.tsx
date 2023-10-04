import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { validate } from "utils/validateFormLogin";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import { loginTC } from "./auth-reducer";
import { Navigate } from "react-router-dom";
import { selectedIsLogin } from "app/app-selectors/appSelectors";
import { ResponseType } from 'api/todolist-api'

export type FormValues = {
  email: string,
  password: string,
  rememberMe: boolean,
}

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLogin = useSelector(selectedIsLogin);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate,
    onSubmit: async (values, formikHelpers: FormikHelpers<FormValues>) => {
      const result = await dispatch(loginTC(values));
      if (loginTC.rejected.match(result)) {
        const err = result.payload as { fieldsErrors: Array<{ field: string, error: string }> }
        if (err.fieldsErrors && err.fieldsErrors[0]) {
          formikHelpers.setFieldError(err.fieldsErrors[0].field, err.fieldsErrors[0].error);
        }
      }
    }
  });

  if (isLogin) {
    return <Navigate to="/" />;
  }
  return (
      <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>
                <p>
                  To log in get registered
                  <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                    {" "}
                    here
                  </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>
              <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <FormControlLabel
                    label={"Remember me"}
                    control={<Checkbox />}
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                />
                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
  );
};