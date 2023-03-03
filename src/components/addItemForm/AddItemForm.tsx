import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../todolist/Todolist.module.css";

type AddItemFormPropsType = {
    addTask: (id: string, title: string) => void
    id: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<String | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title.trim())
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeTaskTitleHandler}
                   onKeyDown={onEnterAddTaskHandler}
                   className={error === 'Title is required' ? style.error : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error === 'Title is required' && <div className={style.errorMessage}>Title is required</div>}
        </div>
    );
};

