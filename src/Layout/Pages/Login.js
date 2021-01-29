import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import InputElement from '../components/Common/UIElements/InputElement';
import { authEndPoint, authErrorMsg } from '../../redux/actions/authActions';

function Login() {
    
    const dispatch = useDispatch();
    const { authError, authSuccess } = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(authSuccess !== '' && authError === ''){
            setEmail('')
            setPassword('')
        }
    }, [authError, authSuccess])

    useEffect(() => {
        dispatch(authErrorMsg(''))
    }, [dispatch])

    useEffect(() => {
        const timer = setTimeout(() => {
            authError && dispatch(authErrorMsg(''))
          }, 2000)
    
          return () => {
            clearTimeout(timer);
          }
    }, [dispatch, authError])

    const submitHandler = e => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            dispatch(authErrorMsg('Please provide auth credentials'))
            return;
        }

        const formData = JSON.stringify({
            email,
            password
        })

        dispatch(authEndPoint('/auth/login', 'POST', formData, { 'Content-Type': 'application/json' }))

    }

    return (
        <div className="auth-section">
        <section className="login">
            <form onSubmit={submitHandler} className="form p-3 p-sm-4 p-md-5 text-center bg-light mx-2 my-3">
                <div className="pb-md-4 pb-sm-3 pb-2">
                    <div className="logo">
                        <h1>UConnect </h1>
                    </div>
                    <p className="text-muted w-75 mx-auto welcome-p">Share your enjoying moments with friends and family!</p>
                    <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`} className="btn btn-light rounded-pill shadow"><i className="fab fa-google text-secondary mr-1 mr-sm-2"></i> Login with Google</a>
                </div>
                <div>
                    <InputElement 
                        inputType="email" 
                        inputName="email" 
                        inputValue={email}
                        onChangeHandler={e => setEmail(e.target.value)}
                        inputText="📧  Email" 
                        classes="form-control my-3" 
                    />
                    <InputElement 
                        inputType="password" 
                        inputName="password" 
                        inputText="🔒  Password" 
                        classes="form-control my-3"
                        inputValue={password}
                        onChangeHandler={e => setPassword(e.target.value)} 
                        minLength={5}
                        maxLength={20}
                    />
                    {
                        authError && 
                        <span className="text-danger text-center"> 
                            {authError}
                        </span>
                    }
                    <button type="submit" className="btn btn-block btn-secondary shadow my-3">Login</button>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/signup" className="text-secondary">Create an account?</Link>
                    {/* <Link to="/resetPassword" className="text-secondary">Forget Password?</Link> */}
                </div>
            </form>
        </section>
        </div>
    )
}

export default Login
