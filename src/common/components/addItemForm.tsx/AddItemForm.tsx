import { Button } from "../button";
import { TextField } from "../textField";
import { Typography } from "../typography";
import { useAddItemForm } from "./hooks/useAddItemForm";
import style from "./style.module.scss";

type Props = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean | undefined;
  placeholder?: string;
};
export const AddItemForm = ({ addItem, disabled = false, placeholder }: Props) => {
  const { title, error, onChangeHandler, onKeyDownHandler, isTaskDisabled, addItemHandler } = useAddItemForm(addItem);

  return (
    <div className={style.container}>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder={placeholder}
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
