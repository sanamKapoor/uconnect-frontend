import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authErrorMsg, authSuccessMsg, authEndPoint } from '../../../../redux/actions/authActions';
import ShowToast from './ShowToast';

function AuthEssentials({ icon, heading, inputText, btnText, txt, token, url, forWhat, showInputs, backToLogin }) {

    const dispatch = useDispatch();
    const { authSuccess, authError } = useSelector(state => state.auth);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        dispatch(authErrorMsg(''))
        dispatch(authSuccessMsg(''))
    }, [dispatch])

    useEffect(() => {
        if(authSuccess !== '' && authError === ''){
            setEmail('')
            setPassword('')
        }
    }, [authSuccess, authError])

    useEffect(() => {
        const timmer = setTimeout(() => {
            authError && dispatch(authErrorMsg(''))
            authSuccess && dispatch(authSuccessMsg(''))
        }, 3000)

        return () => {
            clearTimeout(timmer)
        }
    })

    useEffect(() => {
        const timmer = setTimeout(() => {
            if(redirect && backToLogin){
                window.location.href = '/login'
            }
        }, 3300);

        return () => {
            clearTimeout(timmer)
        }
    }, [redirect, backToLogin])

    const activeAccount = () => {
        if(inputText === 'Email' && email.trim() === '') return;
        if(inputText === 'Password' && password.trim() === '') return;

        let formData; 
        switch(forWhat){
            case 'new-password':
                formData = JSON.stringify({ password, token })
                break;
            case 'reset-password-link':
                formData = JSON.stringify({ email })
                break;
            case 'account-verify':
                formData = JSON.stringify({ token })
                break;
            default:
                return;
        }

        dispatch(authEndPoint(url, 'POST', formData, { 'Content-Type': 'application/json' }))
        setRedirect(true);
    }

    return (
    <>
    { (authSuccess) && <ShowToast msg={authSuccess} />}
    { (authError) && <ShowToast msg={authError} />}

    <div className="another-bg">
        <div className="error-content-bg"></div>
        <div className="error-content-container d-flex justify-content-center align-items-center">
        <div className="content-centered m-auto shadow p-3 p-sm-4 bg-light border rounded text-center">
            <i className={`${icon} fa-3x mb-2`}></i>
            <h4>{heading}</h4>
            <div className="mt-4 mt-sm-5">
            {txt && <p className="text-muted my-2">{txt}</p> }
            {
                showInputs &&
                <>
                {
                token ?
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder={inputText} 
                    className="form-control mt-2 mt-sm-3" 
                />
                :
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder={inputText} 
                    className="form-control mt-2 mt-sm-3" 
                />
                }
                </>
            }
            <button onClick={activeAccount} className={`btn btn-info btn-sm ${!txt && 'btn-block mt-2'}`}>
                {btnText}
            </button>
            </div>
        </div>
        </div>
    </div>
    </>
    )
}

export default AuthEssentials
