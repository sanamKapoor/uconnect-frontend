import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div className="error-content-bg">
        <div className="error-content shadow bg-light px-2">
            <h1 className="display-2 font-weight-bolder">404</h1>
            <Link to="/" className="btn btn-outline-info rounded-pill px-3 px-sm-4">Back To Home <i className="fa fa-long-arrow-right ml-2"></i></Link>
        </div>
    </div>
    )
}

export default ErrorPage
