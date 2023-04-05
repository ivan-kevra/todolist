import React, {ChangeEvent, useCallback, useState} from 'react';

type EditableSpanPropsType = {
    onChange: (title: string) => void
    title: string
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const changeMode = useCallback(() => {
        setEditMode(!editMode)
        props.onChange(title)
    }, [props.onChange])
    const changeTitleHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }, [])

    return (
        <>
            {editMode
                ? <input value={title} onBlur={changeMode} autoFocus onChange={changeTitleHandler}/>
                : <span onDoubleClick={changeMode}>{title}</span>
            }
        </>
    );
})
