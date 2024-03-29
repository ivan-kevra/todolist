import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
  },
  component: Checkbox,
  tags: ["autodocs"],
  title: "Components/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    disabled: false,
    label: "Default",
  },
};
export const DefaultNoCheck: Story = {
  args: {
    checked: false,
    disabled: false,
    label: "Default no check",
  },
};
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: "Disabled",
  },
};
export const DisabledNoCheck: Story = {
  args: {
    checked: false,
    disabled: true,
    label: "Disabled no check",
  },
};
