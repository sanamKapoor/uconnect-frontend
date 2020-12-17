import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import queryString from "query-string";
import jwt_decode from 'jwt-decode';

import { setCurrentUser } from '../../redux/actions/authActions';

function Welcome(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        let query = queryString.parse(props.location.search);
        if(query.token){
            const decoded = jwt_decode(query.token);
            dispatch(setCurrentUser(decoded.userId, true))
            localStorage.setItem('jwtToken', query.token);
        }
    }, [props, dispatch])

    return (
    <div className="auth-section">
    <section className="welcome">
        <div className="login-options p-3 p-sm-4 p-md-5 text-center bg-light m-2">
            <div className="pb-md-4 pb-sm-3 pb-2">
            <div className="logo">
                <h1>DevConnect </h1>
            </div>
            <p className="text-muted w-75 mx-auto welcome-p">Share your enjoying moments with friends and family!</p>
            </div>
                <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`} className="btn btn-block btn-light shadow p-2">
                     <i className="fab fa-google text-secondary mr-2"></i>  
                     Login with Google
                </a>
                <br />
                <Link to="/login" className="btn btn-block btn-secondary shadow p-2">
                <i className="far fa-envelope mr-2"></i> Login with Email
                </Link>
        </div>
    </section>
    </div>
    )
}

export default Welcome
