import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    let [editMode, setEditMode] = useState(true)
    let [title, setTitle] = useState(props.title)

    const activateEditMode =() => {
        setEditMode(!editMode)
    }
    const activateTextMode = () => {
        setEditMode(!editMode)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.currentTarget.value)
    }
    return (
        <span>
            {editMode
                ? <span onDoubleClick={activateEditMode}>{title}</span>
                : <input value={title} onBlur={activateTextMode} onChange={onChangeHandler} autoFocus/>}
        </span>
)
    ;
};
