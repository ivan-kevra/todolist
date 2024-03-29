import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";
import { ChangeEvent, useState } from "react";

const meta = {
  title: "COMPONENTS/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const EmptyInput = () => {
  const [value, setValue] = useState("");
  return (
    <TextField
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
      name="email"
      type="email"
    />
  );
};

export const EmptyInputStory = () => <EmptyInput />;

export const FilledInput: Story = {
  args: { value: "Some text", name: "password", type: "password", onValueChange: () => {} },
};
