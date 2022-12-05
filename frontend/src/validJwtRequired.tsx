import { useEffect, ReactElement } from 'react';

import Loading from './components/Loading';

import useUser from './hooks/useUser';
import useApi from './hooks/useApi';
import useToken from './hooks/useToken';
import { useNavigate } from 'react-router-dom';

function ValidJwtRequired({ children }: { children: ReactElement }) {
    const navigate = useNavigate();

    const { user, setUser } = useUser();
    const { token } = useToken();
    const { call } = useApi();

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                navigate('/login');
            } else if (!user) {
                const { data } = await call<{ user: User }>(
                    '/api/profile',
                    'GET'
                );
                setUser(data.user);
            }
        };
        fetchUser();
    }, [token]);

    return <>{user ? children : <Loading />}</>;
}

export default ValidJwtRequired;
