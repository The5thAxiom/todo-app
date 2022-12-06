import { useEffect, useState, useCallback } from 'react';

import TodoForm from '../components/TodoForm';
import Todos from '../components/Todos';

import useApi from '../hooks/useApi';

function Dashboard() {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const apiCall = useApi();

    const fetchTodos = useCallback(async () => {
        const {
            data: { todos }
        } = await apiCall<{ todos: Todo[] | null }>('/api/todos');
        if (todos) setTodos(todos);
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Add a todo:</h2>
            <TodoForm fetchTodos={fetchTodos} />
            <h2>Your todos:</h2>
            <Todos todos={todos} />
        </>
    );
}

export default Dashboard;
