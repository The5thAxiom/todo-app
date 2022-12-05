import { useState, FormEventHandler, ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useFetch';

function Login() {
    type LoginFormData = {
        email: string;
        password: string;
    };
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const { call } = useApi();
    const navigate = useNavigate();

    const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData({ ...formData, [name]: value });
    };

    const submitForm: FormEventHandler = async e => {
        e.preventDefault();
        const {
            data: { msg },
            status
        } = await call('/api/login', 'POST', formData);
        console.log(msg);
        console.log(status);
        if (status === 202) {
            navigate('/profile');
        } else {
            alert(msg);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor='email'>Email</label>:{' '}
                    <input
                        name='email'
                        type='email'
                        onChange={inputChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>:{' '}
                    <input
                        name='password'
                        type='password'
                        onChange={inputChangeHandler}
                    />
                </div>
                <button type='submit'>Log in</button>
            </form>
        </>
    );
}

export default Login;
