import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    return (
        <>
            {editMode
                ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
                : <span onDoubleClick={activateEditMode}>{title}</span>
            }
        </>
    )
        ;
})

