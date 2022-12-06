import axios, { AxiosError, Method } from 'axios';
import useToken from './useToken';
import useUser from './useUser';

type ApiResponse = {
    msg: string;
};

const useApi = () => {
    const { token, setToken, unsetToken } = useToken();
    const { unsetUser } = useUser();
    const apiCall = async <T>(
        endpoint: string,
        method: Method = 'GET',
        data?: any
    ) => {
        const response = await axios({
            method,
            url: endpoint,
            data,
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: status => status !== 404 || status < 500
        });
        if (response.status === 401) {
            unsetToken();
            unsetUser();
        } else if (response.data.token) {
            const newToken = response.data.token;
            setToken(newToken);
            delete response.data.token;
        }
        return { ...response, data: response.data as ApiResponse & T };
    };
    return apiCall;
};

export default useApi;
