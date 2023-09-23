export type ValuesFormLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type ErrorsFormLoginType = {
  email?: string;
  password?: string;
};

export const validate = (values: ValuesFormLoginType) => {
  const errors: ErrorsFormLoginType = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be more 6 characters";
  }
  return errors;
};
