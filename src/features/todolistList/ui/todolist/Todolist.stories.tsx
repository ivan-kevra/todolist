import type { Meta, StoryObj } from "@storybook/react";

import { ReduxStoreProviderDecorator } from "../../../../stories/decorators/ReduxStoreProviderDecorator";
import { Todolist } from "./Todolist";

const meta = {
  title: "TODOLISTS/Todolist",
  component: Todolist,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    todolist: {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  },
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof Todolist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TodolistStory: Story = {};
export const ActiveTodolistStory: Story = {
  args: {
    todolist: {
      id: "todolistId1",
      title: "What to learn",
      filter: "active",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  },
};
export const CompletedTodolistStory: Story = {
  args: {
    todolist: {
      id: "todolistId1",
      title: "What to learn",
      filter: "completed",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  },
};
