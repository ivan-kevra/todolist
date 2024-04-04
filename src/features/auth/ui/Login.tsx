import { TextField } from "../../../common/components/textField/TextField";
import { LoginParamsType } from "../api/auth.api";
import { useLogin } from "../lib/useLogin";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import { Button } from "@/common/components/button/Button";
import style from "./style.module.scss";
import { Typography } from "@/common/components/typography";
export type FormValues = Omit<LoginParamsType, "captcha">;
export type FormikErrorType = Omit<FormValues, "rememberMe">;

export const Login = () => {
  const { initialValues, validate, onSubmit, isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/todolist"} />;
  }

  return (
    <div className={style.container}>
      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={style.formContainer}>
            <div className={style.header}>
              <Typography variant="h1"> Test authorization</Typography>
              <Typography variant="body2">login: free@samuraijs.com</Typography>
              <Typography variant="body2">password: free</Typography>
            </div>
            <div className={style.form}>
              <div className={style.inputContainer}>
                E-mail
                <TextField type="email" name="email" onChange={handleChange} value={values.email} />
                {errors.email && touched.email && errors.email}
              </div>
              <div className={style.inputContainer}>
                Password
                <TextField value={values.password} type="password" name="password" onChange={handleChange} />
                {errors.password && touched.password && errors.password}
              </div>
              <Button disabled={isSubmitting} type="submit">
                Sign in
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
