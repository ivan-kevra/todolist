import { Input, TextField } from "../../../common/components/textField/TextField";
import { LoginParamsType } from "../api/auth.api";
import { useLogin } from "../lib/useLogin";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import copy from "./icons/copy.svg";
import { Button } from "@/common/components/button/Button";
import style from "./style.module.scss";
export type FormValues = Omit<LoginParamsType, "captcha">;
export type FormikErrorType = Omit<FormValues, "rememberMe">;

export const Login = () => {
  const { initialValues, validate, onSubmit, isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div className={style.h2}>make your work planning</div>
        <div className={style.h1}>easier</div>
      </div>
      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={style.formContainer}>
            <div className={style.header}>
              Test login:
              <div>
                <div className={style.item}>
                  login: free@samuraijs.com <img src={copy} />
                </div>
                <div className={style.item}>
                  password: free <img src={copy} />
                </div>
              </div>
            </div>
            <div className={style.form}>
              <div className={style.inputContainer}>
                E-mail
                <TextField type="email" name="email" onValueChange={handleChange} value={values.email} />
                {errors.email && touched.email && errors.email}
              </div>
              <div className={style.inputContainer}>
                Password
                <TextField value={values.password} type="password" name="password" onValueChange={handleChange} />
                {errors.password && touched.password && errors.password}
              </div>
              <div className={style.rememberMe}>
                <div className={style.h2}>Remember Me</div>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  className={style.checkbox}
                />
              </div>
              <Button disabled={isSubmitting} type="submit" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
