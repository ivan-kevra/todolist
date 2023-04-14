import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>('')

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
            addItem(title.trim())
        } else {
            setError('title is required')
        }
        setTitle('')
    }

    const buttonSettings = {
        maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px',
    }

    return (
        <div>
            <TextField disabled={disabled}
                       id="outlined-basic"
                       label={error ? "Title is required" : "Please type out..."}
                       variant="outlined"
                       value={title}
                       onChange={setTitleHandler}
                       onKeyDown={addTaskEnterHandler}
                       error={!!error}
                       size="small"
            />
            <Button variant="contained" onClick={addTaskHandler} disabled={disabled}
                    style={buttonSettings}>+</Button>
        </div>
    );
})

