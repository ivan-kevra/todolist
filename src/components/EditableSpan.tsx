import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    onChange: (title: string) => void
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const changeMode = () => {
        setEditMode(!editMode)
        props.onChange(title)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode
                ? <input value={title} onBlur={changeMode} autoFocus onChange={changeTitleHandler}/>
                : <span onDoubleClick={changeMode}>{title}</span>
            }
        </>
    );
};
