import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    let [error, setError] = useState('')
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
        setError('')
        if (event.key === 'Enter') {
            addItem()
        }
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitleHandler}
                onKeyUp={onKeyupHandler}
                className={error ? 'error' : ''}/>
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
