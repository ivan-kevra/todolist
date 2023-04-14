import type {Meta, StoryObj} from '@storybook/react';

import {App} from './App';
import React from "react";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        demo: true
    },
};

export default meta;
type Story = StoryObj<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};



