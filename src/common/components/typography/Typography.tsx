import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { clsx } from "clsx";

import s from "./style.module.scss";

type Props<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  variant:
    | "body1"
    | "body2"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "link1"
    | "link2"
    | "overline"
    | "subtitle1"
    | "subtitle2";
};

export const Typography = <T extends ElementType = "p">(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
) => {
  const { as, className, variant = "body1", ...rest } = props;

  const Component = as || "p";
  const classNames = clsx(s[variant], className);

  return <Component className={classNames} {...rest} />;
};
