import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import MobileNaviation from './Layout/components/Common/MobileNavigation';
import Loading from './Layout/components/Common/UIElements/Loading';
import { setCurrentUser, logOutUser } from './redux/actions/authActions';

const HomePage = React.lazy(() => import('./Layout/Pages/HomePage'))
const ProfilePage = React.lazy(() => import('./Layout/Pages/ProfilePage'))
const CreatePost = React.lazy(() => import('./Layout/Pages/CreatePost'))
const SearchUsers = React.lazy(() => import('./Layout/Pages/SearchUsers'))
const AccountVerify = React.lazy(() => import('./Layout/Pages/AccountVerify'))
const Welcome = React.lazy(() => import('./Layout/Pages/Welcome'))
const Login = React.lazy(() => import('./Layout/Pages/Login'))
const SignUp = React.lazy(() => import('./Layout/Pages/SignUp'))
const ResetPassword = React.lazy(() => import('./Layout/Pages/ResetPassword'))

const App = () => {

  const dispatch = useDispatch();
  const { isLoggedIn, userId, authError } = useSelector(state => state.auth);
  const { postError } = useSelector(state => state.post)
  const { userError } = useSelector(state => state.user)
  const { modalErrorMsg } = useSelector(state => state.modal)
  const [routes, setRoutes] = useState('');

  useEffect(() => {

    const timmer = setInterval(() => {

    //      Check for token
    if(localStorage.jwtToken){
    
      const decoded = jwt_decode(localStorage.jwtToken);
      //     Set user and isAuth
      let user = decoded.userId;
      userId === null && dispatch(setCurrentUser(user, true));

      //      Check for expire token
      const remainTimer = localStorage.getItem('expTime') - 1;
      localStorage.setItem('expTime', remainTimer);

      if(remainTimer <= 0){
        dispatch(logOutUser());
        window.location.href = '/welcome';
      }
    }
  }, 1000)

  return () => {
    clearInterval(timmer);
  }
})

  useEffect(() => {
    if(
        authError === 'Unexpected token U in JSON at position 0' ||
        modalErrorMsg === 'Unexpected token U in JSON at position 0' ||
        postError === 'Unexpected token U in JSON at position 0' ||
        userError === 'Unexpected token U in JSON at position 0'
      ) {
        dispatch(logOutUser());
        window.location.href = '/welcome';
      }
  }, [dispatch, authError, modalErrorMsg, postError, userError])

  useEffect(() => {

    if(!isLoggedIn && userId === null){
      setRoutes(
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path='/authentication/active/:token' component={AccountVerify} />
          <Route path='/resetPassword/:token?' component={ResetPassword} />
          <Redirect to="/welcome" />
        </Switch>
      )
    } else {
      setRoutes(
        <>
        <MobileNaviation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile/:id" component={ProfilePage} />
          <Route exact path="/search" component={SearchUsers} />
          <Route exact path="/post" component={CreatePost} />
          <Redirect to="/" />
        </Switch>
        </>
      )
    }

  }, [isLoggedIn, userId])

  return (
      <Router>
        <Suspense fallback={<div className="vw-100 vh-100 d-flex justify-content-center align-items-center"><Loading /></div>}>
          {
            routes
          }
        </Suspense>
      </Router>
  );
}

export default App;
