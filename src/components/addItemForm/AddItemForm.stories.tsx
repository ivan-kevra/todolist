import type {ComponentStory, Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";

import {AddItemForm} from './AddItemForm';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemDefault: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        addItem: action('Button clicked inside form')
    },
};

export const AddItemError: ComponentStory<typeof AddItemForm> = (args) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>('Title is required')

    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }
    const addTaskEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
        if (error !== null) {
            setError(null)
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            args.addItem(title.trim())
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const buttonSettings = {
        maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px',
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? "Title is required" : "Please type out..."}
                       variant="outlined"
                       value={title}
                       onChange={setTitleHandler}
                       onKeyDown={addTaskEnterHandler}
                       error={!!error}
                       size="small"
            />
            <Button variant="contained" onClick={addTaskHandler}
                    style={buttonSettings}>+</Button>
        </div>
    );
}

export const AddItemDisabled: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        addItem: action('Button clicked inside form'),
        disabled: true
    },
};