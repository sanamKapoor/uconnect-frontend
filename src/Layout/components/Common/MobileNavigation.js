import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MobileNavigation() {

    const { userId } = useSelector(state => state.user)

    return (
        <main className="d-block d-lg-none shadow-lg">
            <div className="row text-center py-2">
            <div className="col">
                <NavLink to="/">
                    <i className="fas fa-home fa-1x text-dark"></i>        
                </NavLink>
            </div>
            <div className="col">
                <NavLink to="/search">
                    <i className="fas fa-search fa-1x text-dark"></i>
                </NavLink>
            </div>
            <div className="col">
                <NavLink to="/post">
                    <i className="fas fa-upload fa-1x text-dark"></i>        
                </NavLink>
            </div>
            <div className="col">
                <NavLink to={`/profile/${userId}`}>
                    <i className="fas fa-user fa-1x text-dark"></i>
                </NavLink>
            </div>
            </div>
        </main>
    )
}

export default MobileNavigation
