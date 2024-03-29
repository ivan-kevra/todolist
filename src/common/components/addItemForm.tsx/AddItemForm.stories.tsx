import type { Meta, StoryObj } from "@storybook/react";
import { AddItemForm } from "./AddItemForm";
import { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";

type Props = {
  onClick: (title: string) => void;
  disabled?: boolean | undefined;
};

const meta = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    addItem: {
      description: "Clicked button inside form",
      action: "cliked",
    },
  },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemFormStory: Story = {
  args: {
    disabled: false,
    addItem: (title: string) =>
      Promise.resolve().finally(() => {
        console.log(title);
      }),
  },
};

const ErrorEmptyAddItemForm: FC<Props> = memo(({ onClick }) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(true);

  const isTaskDisabled: boolean = !title.length || title.length > 15;

  const addTaskHandler = (): void => {
    title.trim() ? onClick(title) : setError(true);
    setTitle("");
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    !isTaskDisabled && e.key === "Enter" && addTaskHandler();
  };

  const validationMessage: JSX.Element = error ? (
    <div
      style={{
        color: "red",
      }}
    >
      Your title is empty
    </div>
  ) : !title.length ? (
    <div>Enter new title</div>
  ) : title.length > 15 ? (
    <div
      style={{
        color: "red",
      }}
    >
      Your task is too long
    </div>
  ) : (
    <div></div>
  );

  return (
    <div>
      <input className={error ? "error" : ""} value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
      <button disabled={isTaskDisabled} onClick={addTaskHandler}>
        +
      </button>
      {validationMessage}
    </div>
  );
});
export const ErrorEmptyAddItemFormStory = () => (
  <ErrorEmptyAddItemForm onClick={() => alert("clicked add button")} disabled={false} />
);

const ErrorLongAddItemForm: FC<Props> = memo(({ onClick }) => {
  const [title, setTitle] = useState<string>("Very long title consists of more than 15 symbols");
  const [error, setError] = useState<boolean>(true);

  const isTaskDisabled: boolean = !title.length || title.length > 15;

  const addTaskHandler = (): void => {
    title.trim() ? onClick(title) : setError(true);
    setTitle("");
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    !isTaskDisabled && e.key === "Enter" && addTaskHandler();
  };

  const validationMessage: JSX.Element = error ? (
    <div
      style={{
        color: "red",
      }}
    >
      Your title is empty
    </div>
  ) : !title.length ? (
    <div>Enter new title</div>
  ) : title.length > 15 ? (
    <div
      style={{
        color: "red",
      }}
    >
      Your task is too long
    </div>
  ) : (
    <div></div>
  );
  return (
    <div>
      <input className={error ? "error" : ""} value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
      <button disabled={isTaskDisabled} onClick={addTaskHandler}>
        +
      </button>
      {validationMessage}
    </div>
  );
});

export const ErrorLongAddItemFormStory = () => (
  <ErrorLongAddItemForm onClick={() => alert("clicked add button")} disabled={false} />
);
