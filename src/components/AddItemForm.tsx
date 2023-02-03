import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from "@mui/material/Button/";
import TextField from '@mui/material/TextField';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
    let [error, setError] = useState<string | null>('')
    let [title, setTitle] = useState('')
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
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
})
