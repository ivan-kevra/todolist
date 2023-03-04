import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button/";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<String | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addItemHandler()
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
                onChange={onChangeTaskTitleHandler}
                onKeyUp={onEnterAddTaskHandler}
                id='outlined-basic'
                label={error ? 'Title is required' : 'add title'}
                variant='outlined'
                error={!!error}/>
            <Button variant="contained"
                    color='primary'
                    onClick={addItemHandler}
                    style={buttonStyles}>+</Button>
        </div>
    );
})

