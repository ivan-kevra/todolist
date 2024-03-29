import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "@/stories/decorators/ReduxStoreProviderDecorator";

const meta = {
  title: "TODOLISTS/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    taskId: "taskId1",
    todolistId: "todolistId1",
  },
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskStatusStory: Story = {};
export const TaskIsNotDoneStory: Story = {
  args: {
    taskId: "taskId2",
    todolistId: "todolistId1",
  },
};
