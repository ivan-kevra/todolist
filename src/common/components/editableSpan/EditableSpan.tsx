import { ChangeEvent, FC, memo, useState } from "react";

type EditableSpanPropsType = {
  value: string;
  onClick: (value: string) => void;
  disabled?: boolean;
};

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ value, onClick, disabled = false }) => {
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
      <input disabled={disabled} value={title} onBlur={activateViewMode} autoFocus onChange={changeTitleHandler} />
      {title.length === 0 && <div>title shouldn`d be empty</div>}
      {title.length > 99 && <div>maximum number of characters reached (100/100)</div>}
    </>
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
});
