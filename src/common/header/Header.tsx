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
        <Button variant="link">
          <img src={tasks} />
          <Typography variant="body1">Tasks</Typography>
        </Button>

        <Button variant="link">
          <img src={calendar} />
          <Typography variant="body1">Calendar</Typography>
        </Button>
      </div>

      <Button onClick={logOutHandler} variant="secondary">
        <Typography variant="body1">Log out</Typography>
      </Button>
    </div>
  );
};
