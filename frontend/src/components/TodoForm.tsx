import { useState, ChangeEvent, FormEvent } from 'react';
import useApi from '../hooks/useApi';

function TodoForm({ fetchTodos }: { fetchTodos: () => Promise<void> }) {
    const apiCall = useApi();

    type NewTodoData = {
        creationDateTime: Date;
        collaborators: User[]; // later
        tags: string[]; // later
        title: string;
        description?: string;
        priority?: 'high' | 'medium' | 'low';
        hasDate?: boolean; // later
        hasTime?: boolean; // later
        dateTime?: Date; // later
    };

    const emptyTodo: NewTodoData = {
        title: '',
        creationDateTime: new Date(),
        tags: [],
        collaborators: [],
        priority: 'medium'
    };
    const [newTodo, setNewTodo] = useState<NewTodoData>(emptyTodo);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value =
            e.target.tagName === 'checkbox' ? e.target.checked : e.target.value;
        setNewTodo({ ...newTodo, [name]: value });
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const {
            data: { msg },
            status
        } = await apiCall('/api/todos', 'POST', newTodo);
        if (status === 201) {
            setNewTodo(emptyTodo);
            alert('added');
            await fetchTodos();
        } else {
            alert(msg);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='title'>Title</label>:{' '}
                <input required name='title' onChange={inputChangeHandler} />
            </div>
            <div>
                <label htmlFor='description'>Description</label>:{' '}
                <input
                    required
                    name='description'
                    onChange={inputChangeHandler}
                />
            </div>
            <div>
                <label htmlFor='priority'>Priority</label>:{' '}
                <select defaultValue='medium' name='priority'>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                </select>
            </div>
            <button type='submit'>Add todo</button>
        </form>
    );
}

export default TodoForm;
