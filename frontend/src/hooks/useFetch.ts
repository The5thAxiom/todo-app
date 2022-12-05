import axios, { Method } from 'axios';
import useToken from './useToken';

type ApiResponse = {
    msg: string;
};

const useApi = () => {
    const setToken = useToken(state => state.setToken);
    const call = async <T>(endpoint: string, method: Method, data?: any) => {
        const response = await axios({
            method,
            url: endpoint,
            data
        });
        if (response.data.token) {
            const newToken = response.data.token;
            setToken(newToken);
            delete response.data.token;
        }
        return { ...response, data: response.data as ApiResponse & T };
    };
    return { call };
};

export default useApi;