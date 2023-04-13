import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";

import {Task} from './Task';
import React from "react";
import {TaskStatuses} from "../../../../api/todolist-api";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        title: 'Task is done',
        status: TaskStatuses.Completed,
        changeTaskStatus: action('Change task status button was clicked'),
        changeTaskTitle: action('Change task title button was clicked'),
        removeTask: action('remove task button was clicked')
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDone: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const TaskIsNotDone: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        title: 'Task is not done',
        status: TaskStatuses.New,
    },
};

