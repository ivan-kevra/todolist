import type { Meta, StoryObj } from "@storybook/react";
import { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";
import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

const meta = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {},
    onClick: {
      description: "Clicked button inside form",
      action: "name was changed",
    },
  },
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditableSpanStory: Story = {
  args: {
    value: "editable span",
  },
};
