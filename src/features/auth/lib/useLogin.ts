import { useActions } from "@/common/hooks/useActions";
import { useAppSelector } from "@/common/hooks/useAppDispatch";
import { BaseResponseType } from "@/common/types/types";
import { LoginParamsType } from "../api/auth.api";
import { authThunks } from "../model/auth.slice";
import { isLoggedinSelector } from "../model/login.selector";
import { FormikErrorType, FormValues } from "../ui/Login";
import { FormikHelpers } from "formik/dist/types";

export const useLogin = () => {
  const isLoggedIn = useAppSelector(isLoggedinSelector);
  const { login } = useActions(authThunks);
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const validate = (values: LoginParamsType) => {
    const errors: FormikErrorType = {
      email: "",
      password: "",
    };
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Password too short";
    }
  };
  const onSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    formikHelpers.setSubmitting(true);
    await login(values)
      .unwrap()
      .catch((error: BaseResponseType) => {
        error.fieldsErrors?.forEach((fieldError) => {
          formikHelpers.setFieldError(fieldError.field, fieldError.error);
        });
      });
    formikHelpers.setSubmitting(false);
  };

  return { initialValues, validate, onSubmit, isLoggedIn };
};
