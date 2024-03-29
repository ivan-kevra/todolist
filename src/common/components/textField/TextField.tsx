import { ChangeEvent, ComponentProps, forwardRef } from "react";

import { clsx } from "clsx";

import s from "./style.module.scss";
import { Typography } from "../typography/Typography";

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
  };

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
        />
      </div>
      <Typography className={classNames.errorText} variant={"caption"}>
        {errorMessage && errorMessage}
      </Typography>
    </div>
  );
});
