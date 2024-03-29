import style from "./Button.module.css";

type Props = {
  isSubmitting: boolean;
  type: string;
};

export const Button = ({ isSubmitting }: Props) => {
  return (
    <button className={style.container} disabled={isSubmitting} type="submit">
      Войти
    </button>
  );
};
