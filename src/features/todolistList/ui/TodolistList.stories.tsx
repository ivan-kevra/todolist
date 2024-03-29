import type { Meta, StoryObj } from "@storybook/react";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { TodolistList } from "./TodolistList";

const meta = {
  title: "FEATURES/TodolistList",
  component: TodolistList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    demo: false,
  },
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof TodolistList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTodolistList: Story = {};
