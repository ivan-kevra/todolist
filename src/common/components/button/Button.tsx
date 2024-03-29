import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { clsx } from "clsx";

import s from "./style.module.scss";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: "link" | "primary" | "secondary" | "tertiary";
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const { as: Component = "button", children, className, fullWidth, variant = "primary", ...rest } = props;

  const classNames = { root: clsx(s.button, s[variant], fullWidth && s.fullWidth, className) };

  return (
    <Component className={classNames.root} {...rest}>
      {children}
    </Component>
  );
};
