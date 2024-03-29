import { Button } from "../button";
import { TextField } from "../textField";
import { Typography } from "../typography";
import { useAddItemForm } from "./hooks/useAddItemForm";
import style from "./style.module.scss";

type Props = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean | undefined;
};
export const AddItemForm = ({ addItem, disabled = false }: Props) => {
  const { title, error, onChangeHandler, onKeyDownHandler, isTaskDisabled, addItemHandler } = useAddItemForm(addItem);

  return (
    <div className={style.container}>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="Enter new task"
        disabled={disabled}
      />
      <Button disabled={isTaskDisabled} onClick={addItemHandler}>
        +
      </Button>
      <Typography style={{ color: "red" }} variant="caption">
        {error}
      </Typography>
    </div>
  );
};
