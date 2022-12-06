import Loading from './Loading';

function Todos({ todos }: { todos: Todo[] }) {
    return (
        <ul>
            {todos ? (
                todos.length === 0 ? (
                    <>no todos found</>
                ) : (
                    todos.map(todo => (
                        <li key={todo._id}>
                            {todo.title}: {todo.description} (created on{' '}
                            {new Date(todo.creationDateTime).toDateString()})
                        </li>
                    ))
                )
            ) : (
                <Loading />
            )}
        </ul>
    );
}

export default Todos;
