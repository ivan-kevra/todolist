import * as CheckboxRadix from "@radix-ui/react-checkbox";
import * as LabelRadix from "@radix-ui/react-label";
import clsx from "clsx";

import s from "./style.module.scss";

import { Typography } from "../typography/Typography";
import CheckIcon from "./checkIcon/CheckIcon";

export type CheckboxProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  onBlur?: () => void;
  onValueChange?: (checked: boolean) => void;
  position?: "left";
  required?: boolean;
  onCheckedChange?: (event: any) => void;
};
export const Checkbox = (props: CheckboxProps) => {
  const { checked = false, className, disabled = false, id, label = "", onValueChange, position, required } = props;

  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === "left" && s.left),
    container: clsx(s.container, className),
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
  };

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography as={"label"} className={classNames.label} variant={"body2"}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              checked={checked}
              className={classNames.root}
              disabled={disabled}
              id={id}
              onCheckedChange={onValueChange}
              required={required}
            >
              {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <CheckIcon />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </LabelRadix.Root>
    </div>
  );
};
