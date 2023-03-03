import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode
                ? <input value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler}/>
                : <span onDoubleClick={activateEditMode}>{title}</span>}
        </>
    );
};

