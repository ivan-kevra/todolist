import { ChangeEvent, ComponentProps, forwardRef, useState } from "react";

import { clsx } from "clsx";

import s from "./style.module.scss";
import { Typography } from "../typography/Typography";
import on from "./icons/showPassword.svg";
import off from "./icons/hidePassword.svg";

export type Props = {
  className?: string;
  errorMessage?: string;
  label?: string;
  onValueChange?: (value: string) => void;
} & ComponentProps<"input">;

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, errorMessage, label = "", onValueChange, placeholder, type, ...restProps } = props;

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange && onValueChange(event?.currentTarget.value);
  };

  const classNames = {
    errorText: clsx(s.errorText),
    input: clsx(type === "search" && s.search, type === "text" && s.text, type === "password" && s.password, s.input),
    inputContainer: clsx(s.inputContainer),
    root: clsx(errorMessage && s.error, className, s.container),
    icon: clsx(s.showPassword),
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classNames.root}>
      <Typography as={"label"} className={s.title} variant={"body2"}>
        {label}
      </Typography>
      <div className={classNames.inputContainer}>
        <input
          className={classNames.input}
          onChange={onChangeTitle}
          placeholder={placeholder}
          ref={ref}
          {...restProps}
          type={!showPassword ? type : "text"}
        />
        {type === "password" && (
          <img
            src={showPassword ? off : on}
            onClick={() => setShowPassword(!showPassword)}
            className={classNames.icon}
          />
        )}
      </div>
      <Typography className={classNames.errorText} variant={"caption"}>
        {errorMessage && errorMessage}
      </Typography>
    </div>
  );
});
