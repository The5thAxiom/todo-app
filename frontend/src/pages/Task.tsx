import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Task() {
    const params = useParams();
    const [id, setId] = useState<string>();

    useEffect(() => {
        setId(params.id);
    }, [params.id]);

    return <>Task no {id}</>;
}

export default Task;
