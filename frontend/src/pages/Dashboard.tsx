import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import useApi from '../hooks/useApi';

function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>(null as any);
    const apiCall = useApi();

    useEffect(() => {
        const fetchTodos = async () => {
            const {
                data: { msg, todos }
            } = await apiCall<{ todos: Todo[] }>('/api/todos');
            console.log({ msg, todos });
            setTodos(todos);
        };
        fetchTodos();
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Add a todo:</h2>
            form here
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
