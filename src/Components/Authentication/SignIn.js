import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../api/axios';
import { useNavigate, Navigate } from 'react-router-dom';


const SignIn = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [errMessage, setErrMessage] = useState();
    const [success, setSuccess] = useState();

    useEffect(() => {
        setErrMessage('');
    }, [userName, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/authentication', { userName: userName, password: password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            setSuccess(true);
            const accessToken = response?.data?.accessToken;
            const idUser = response?.data?.idUser;
            const email = response?.data?.email;
            const roles = response?.data?.roles;
            setAuth({ accessToken, idUser, userName, email, roles })
            navigate('/dashboard');
            console.log(response.data);
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                setErrMessage('An error occured')
            } else {
                setErrMessage(err?.response?.data?.message);
            }
        }
    }
    return (

        <>
            <div className="flex-form-container">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor='userName' className='offscreen'  >Username : </label>
                    <input
                        type='text'
                        id='userName'
                        placeholder='User name'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    >
                    </input>

                    <label htmlFor='password' className='offscreen'>Password : </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <span className={errMessage ? "error-message text-center" : "display-none"}>{errMessage}</span>
                    <button type='submit'>Log in</button>
                </form>
            </div>
        </>

    );
};

export default SignIn;