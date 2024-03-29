import { ChangeEvent } from "react";
import style from "./Input.module.scss";

type Props = {
  value: string;
  type: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ value, handleChange, name, type }: Props) => {
  return (
    <input className={style.input} placeholder={name} value={value} onChange={handleChange} name={name} type={type} />
  );
};
