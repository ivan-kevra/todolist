import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }
    const addTaskEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
        } else {
            setError('title is required')
        }
        setTitle('')
    }

    return (
        <div>
            <input value={title} onChange={setTitleHandler} onKeyDown={addTaskEnterHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

