import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onClick: {
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
};

const Template1: ComponentStory<typeof AddItemForm> = (args) => {
    let [error, setError] = useState<string | null>('Title is required')
    let [title, setTitle] = useState('')
    const addItem = () => {
        if (title.trim() !== '') {
            args.addItem(title.trim())
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    const onKeyupHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (event.key === 'Enter') {
            addItem()
        }

    }
    const buttonStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }

    return (
        <div>
            <TextField
                size={'small'}
                value={title}
                onChange={onChangeTitleHandler}
                onKeyUp={onKeyupHandler}
                id='outlined-basic'
                label={error ? 'Title is required' : 'add title'}
                variant='outlined'
                error={!!error}/>
            <Button variant="contained" color='primary' onClick={addItem} style={buttonStyles}>+</Button>
        </div>
    )
}

export const AddItemFormWithErrorStory = Template1.bind({});
