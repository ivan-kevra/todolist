import { useAddItemForm } from "./hooks/useAddItemForm";
import style from "./AddItemForm.module.css";

type Props = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean | undefined;
};
export const AddItemForm = ({ addItem, disabled = false }: Props) => {
  const { title, error, onChangeHandler, onKeyDownHandler, isTaskDisabled, addItemHandler } = useAddItemForm(addItem);

  return (
    <div>
      <input
        className={error === "" ? "" : style.error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="Enter new task"
        disabled={disabled}
      />
      <button disabled={isTaskDisabled} onClick={addItemHandler}>
        +
      </button>
      <div style={{ color: "red" }}> {error}</div>
    </div>
  );
};
