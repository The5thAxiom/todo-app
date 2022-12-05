import {
    useEffect,
    useState,
    ChangeEvent,
    FormEvent,
    useCallback
} from 'react';
import Loading from '../components/Loading';
import useApi from '../hooks/useApi';

function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>(null as any);
    const apiCall = useApi();

    const fetchTodos = useCallback(async () => {
        const {
            data: { msg, todos }
        } = await apiCall<{ todos: Todo[] }>('/api/todos');
        console.log({ msg, todos });
        setTodos(todos);
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    type NewTodoData = {
        creationDateTime: Date;
        collaborators: User[]; // later
        tags: string[]; // later
        title: string;
        description?: string;
        priority?: 'high' | 'medium' | 'low';
        hasDate?: boolean;
        hasTime?: boolean;
        dateTime?: Date;
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
        <>
            <h1>Dashboard</h1>
            <h2>Add a todo:</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='title'>Title</label>:{' '}
                    <input
                        required
                        name='title'
                        onChange={inputChangeHandler}
                    />
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
            <h2>Your todos:</h2>
            <ul>
                {todos ? (
                    todos.length === 0 ? (
                        <>no todos found</>
                    ) : (
                        todos.map(todo => (
                            <li key={todo._id}>
                                {todo.title}: {todo.description} (created on{' '}
                                {new Date(todo.creationDateTime).toDateString()}
                                )
                            </li>
                        ))
                    )
                ) : (
                    <Loading />
                )}
            </ul>
        </>
    );
}

export default Dashboard;
