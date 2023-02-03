import React, {ChangeEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(!editMode)
        setTitle(props.title);
    }
    const activateTextMode = () => {
        setEditMode(!editMode)
        props.onChange(title);
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        <span>
            {editMode
                ? <TextField value={title} onBlur={activateTextMode} onChange={changeTitle} autoFocus
                             size={'small'}
                             id='outlined-basic'
                             label='outlined'
                             variant='outlined'
                />
                : <span onDoubleClick={activateEditMode}>{props.title}</span>

            }
        </span>
    )
        ;
})
