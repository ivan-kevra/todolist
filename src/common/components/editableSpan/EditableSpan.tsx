import { ChangeEvent, FC, memo, useState } from "react";
import { TextField } from "../textField";

import style from "./style.module.scss";
import { Typography, TypographyVariantType } from "../typography";

type EditableSpanPropsType = {
  value: string;
  onClick: (value: string) => void;
  disabled?: boolean;
  variant: TypographyVariantType;
};

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ value, onClick, disabled = false, variant }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = () => {
    if (title === "") {
      return;
    }
    setEditMode(false);
    onClick(title);
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value.length <= 100 && setTitle(event.currentTarget.value);
  };
  return editMode ? (
    <>
      <TextField
        disabled={disabled}
        value={title}
        onBlur={activateViewMode}
        autoFocus
        onChange={changeTitleHandler}
        className={style.input}
      />
      {title.length === 0 && <div>title shouldn`d be empty</div>}
      {title.length > 99 && <div>maximum number of characters reached (100/100)</div>}
    </>
  ) : (
    <Typography variant={variant} onDoubleClick={activateEditMode}>
      {title}
    </Typography>
  );
});
