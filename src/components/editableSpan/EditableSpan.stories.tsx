import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";

import {EditableSpan} from './EditableSpan';
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        title: 'Editable span',
        onChange: action('editable mode waas changed')
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanExample: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};



