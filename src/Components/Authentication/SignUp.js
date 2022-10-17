import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';
import api from '../../api/axios';


const SignUp = () => {

    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState(false);

    const [mailFocus, setMailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [validUserName, setValidUserName] = useState(false);
    const [validMail, setValidMail] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [success, setSuccess] = useState();
    const [errMessage, setErrMessage] = useState();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const isUserNameValid = USERNAME_REGEX.test(userName);
        const isPasswordValid = PASSWORD_REGEX.test(password);
        if (!isUserNameValid || !isPasswordValid) {
            setErrMessage("Invalid Entry");
            return;
        }
        try {
            const response = await api.post('/registration', { userName: userName, email: mail, password: password });
            if (response.status === 200) {
                setSuccess(true);
            }
            else {
                console.log(response)
                setErrMessage(response.data)
            }
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                setErrMessage('An error occured')
            } else {
                setErrMessage(err?.response?.data?.message)
            }
        }
    }
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();


    // Validition regex

    const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const MAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;


    // Use effect hooks 

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUserName(USERNAME_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setValidMail(MAIL_REGEX.test(mail));
    }, [mail])

    useEffect(() => {
        setErrMessage('');
    }, [userName, password, matchPassword])

    return (
        <>
            {
                success ? (
                    <main>
                        <h1>Success!</h1>
                        <p>
                            Registration succeed, you will be redirected to the log-in page...<br />
                            If it doesn't work click here : <Link to='/signIn'>Sign in</Link>
                        </p>
                    </main>) : (
                    <main>
                        <div className="flex-form-container">
                            <form onSubmit={handleSubmit} className="form">
                                <label htmlFor='userName' className="offscreen">User name : </label>
                                <input
                                    id="userName"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    autoComplete="off"
                                    ref={userRef}
                                    aria-invalid={validUserName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    placeholder="User name"
                                    onFocus={() => setUserNameFocus(true)}
                                    onBlur={() => setUserNameFocus(false)}
                                    required
                                />
                                <span id="uidnote" className={userNameFocus && userName && !validUserName ? "instructions" : "offscreen"}>
                                    <IoAlertCircleOutline />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </span>

                                <label htmlFor='mail' className="offscreen">Email : </label>
                                <input
                                    id="mail"
                                    type="email"
                                    onChange={(e) => setMail(e.target.value)}
                                    onFocus={() => setMailFocus(true)}
                                    onBlur={() => setMailFocus(false)}
                                    autoComplete="off"
                                    placeholder="Mail"
                                    required
                                />

                                <span id="uidnote" className={mailFocus && mail && !validMail ? "instructions" : "offscreen"}>
                                    <IoAlertCircleOutline />
                                    A @  and .com or .org (or others) are required <br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </span>


                                <label htmlFor='password' className="offscreen">Password : </label>
                                <input
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    placeholder="Password"
                                    required
                                />

                                <span id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"} >
                                    <IoAlertCircleOutline />
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </span>

                                <label htmlFor="confirm_password" className="offscreen"> Confirm Password: </label>

                                <input
                                    type="password"
                                    id="confirm_password"
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    placeholder="Confirm password"

                                />
                                <span id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <IoAlertCircleOutline />
                                    Must match the first password input field.
                                </span>
                                <span className={errMessage ? "error-message" : "display-none"}>
                                    {errMessage}
                                </span>
                                <button disabled={!validUserName || !validPassword || !validMatch ? true : false} type="submit">Sign-up</button>
                            </form >
                        </div>
                    </main>
                )
            }

        </>
    );
};

export default SignUp;