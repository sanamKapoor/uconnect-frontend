import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CreatePostModal from '../Modal/CreatePostModal';

function MainNavLinks() {
    const [createPost, setCreatePost] = useState(false);
    const { userId } = useSelector(state => state.user)

    return (
      <>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <div className="d-none d-lg-flex">
            <li className="nav-item">
              <span className="nav-link icon mx-2 btn">
                <i className="fas fa-upload fa-1x" onClick={() => setCreatePost(true)}></i>
              </span>
            </li>
            <li className="nav-item">
              <NavLink to={`/profile/${userId}`} className="nav-link icon mx-2">
                <i className="far fa-user fa-1x"></i>
              </NavLink>
            </li>
          </div>
            <li className="nav-item align-self-center">
                <a className="nav-link mx-2" href="/">
                    Logout
                </a>
            </li>
          </ul>
        </div>

        <CreatePostModal 
          show={createPost}
          onHide={() => setCreatePost(false)}
          />
      </>
    )
}

export default MainNavLinks
