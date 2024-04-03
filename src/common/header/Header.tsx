import { authThunks } from "@/features/auth/model/auth.slice";
import { Button } from "../components/button";
import { useActions } from "../hooks/useActions";
import style from "./style.module.scss";
import { Typography } from "../components/typography";
import tasks from "./icons/tasks.svg";
import calendar from "./icons/calendar.svg";

export const Header = () => {
  const { logout } = useActions(authThunks);
  const logOutHandler = () => {
    logout();
  };
  return (
    <div className={style.container}>
      <div className={style.buttons}>
        <Button variant="white">
          <img src={tasks} />
          <Typography variant="header">Tasks</Typography>
        </Button>

        <Button variant="white">
          <img src={calendar} />
          <Typography variant="header">Calendar</Typography>
        </Button>
      </div>

      <Button onClick={logOutHandler} variant="white">
        <Typography variant="header">Log out</Typography>
      </Button>
    </div>
  );
};
