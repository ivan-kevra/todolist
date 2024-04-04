import { authThunks } from "@/features/auth/model/auth.slice";
import { Button } from "../components/button";
import { useActions } from "../hooks/useActions";
import style from "./style.module.scss";
import { Typography } from "../components/typography";
import tasks from "./icons/tasks.svg";

export const Header = () => {
  const { logout } = useActions(authThunks);
  const logOutHandler = () => {
    logout();
  };
  return (
    <div className={style.container}>
      <Typography variant="h1" className={style.logo}>
        <img src={tasks} />
        Task manager
      </Typography>

      <Button onClick={logOutHandler} variant="secondary">
        <Typography variant="body1">Log out</Typography>
      </Button>
    </div>
  );
};
