import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "COMPONENTS/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const EmptyInput = () => {
  return <Button isSubmitting={false} type="submit" />;
};

export const EmptyInputStory = () => <EmptyInput />;

export const FilledInput: Story = {
  args: { isSubmitting: false, type: "submit" },
};
