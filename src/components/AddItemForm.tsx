import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <input value={title} onChange={onChangeTitle} onKeyUp={onEnterHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

