import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { ChangeEvent, useState } from "react";

const meta = {
  title: "COMPONENTS/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const EmptyInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      handleChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
      name="email"
      type="email"
    />
  );
};

export const EmptyInputStory = () => <EmptyInput />;

export const FilledInput: Story = {
  args: { value: "Some text", name: "password", type: "password", handleChange: () => {} },
};
