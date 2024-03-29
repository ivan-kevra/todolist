import { BaseResponseType } from "common/types/types";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useAddItemForm = (addItem: (title: string) => Promise<unknown>) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isTaskDisabled: boolean | undefined = !title.length || title.length > 1000;
  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title)
        .then((res) => {
          setTitle("");
        })
        .catch((err: BaseResponseType) => {
          if (err?.resultCode) {
            setError(err.messages[0]);
          }
          return err;
        });
    } else {
      setError("Title is required");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError("");
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    !isTaskDisabled && e.key === "Enter" && addItemHandler();
  };
  return {
    title,
    error,
    onChangeHandler,
    onKeyDownHandler,
    isTaskDisabled,
    addItemHandler,
  };
};
