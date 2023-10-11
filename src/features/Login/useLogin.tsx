import {FormikHelpers, useFormik} from "formik";
import {validate} from "utils/validateFormLogin";
import {loginTC} from "features/Login/auth-reducer";
import {AppDispatch} from "app/store";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {selectedIsLogin} from "app/appSelectors";

export type FormValues = {
    email: string,
    password: string,
    rememberMe: boolean,
}

export const useLogin = () => {
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

    return {formik, isLogin}
}