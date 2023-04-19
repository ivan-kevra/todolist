import React, {ChangeEvent, useCallback, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    onChange: (title: string) => void
    title: string
    disabled?: boolean
}

export const EditableSpan = React.memo(({disabled = false, ...props}: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)


    const activateEditMode = () => {
        if (disabled === false) {
            setEditMode(true);
            setTitle(props.title);
        }
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitleHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }, [])

    return (
        <>
            {editMode
                ? <TextField id="outlined-basic"
                             label="Outlined"
                             variant="outlined"
                             size="small"
                             value={title}
                             onBlur={activateViewMode}
                             autoFocus
                             onChange={changeTitleHandler}

                />
                : <span onDoubleClick={activateEditMode}>{title}</span>
            }
        </>
    );
})
