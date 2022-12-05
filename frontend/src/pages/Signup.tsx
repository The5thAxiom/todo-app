import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import useApi from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

function Signup() {
    type SignupFormData = {
        name: string;
        email: string;
        password: string;
    };
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: ''
    });
    const apiCall = useApi();
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
        } = await apiCall('/api/signup', 'POST', formData);
        if (status === 201) {
            navigate('/login');
        } else {
            alert(msg);
        }
    };

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor='name'>Name</label>:{' '}
                    <input
                        name='name'
                        type='text'
                        onChange={inputChangeHandler}
                    />
                </div>
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
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default Signup;
