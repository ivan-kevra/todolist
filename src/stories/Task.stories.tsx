import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";

import {Task} from "../components/Task";

export default {
    title: 'TODOLISTS/Task',
    component: Task
} as ComponentMeta<typeof Task>;

const removeTask = action('Remove button inside Task was clicked')
const changeTaskStatus = action('Status changed inside Task')
const changeTaskTitle = action('Title changed inside Task')

const baseArgs = {
    removeTask: removeTask,
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
}

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
}


