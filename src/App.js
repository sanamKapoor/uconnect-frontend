import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import MobileNaviation from './Layout/components/Common/MobileNavigation';
import Loading from './Layout/components/Common/UIElements/Loading';
import { setCurrentUser, logOutUser } from './redux/actions/authActions';

// import HomePage from './Layout/Pages/HomePage';
// import ProfilePage from './Layout/Pages/ProfilePage';
// import CreatePost from './Layout/Pages/CreatePost';
// import SearchUsers from './Layout/Pages/SearchUsers';
// import AccountVerify from './Layout/Pages/AccountVerify';
// import Welcome from './Layout/Pages/Welcome';
// import Login from './Layout/Pages/Login';
// import SignUp from './Layout/Pages/SignUp';
// import ResetPassword from './Layout/Pages/ResetPassword';

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
  const { isLoggedIn, userId } = useSelector(state => state.auth);
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
      const currentTime = new Date();
      console.log(currentTime)
      if(decoded.exp * 1000 < currentTime.getTime()){
        //    Logout user
        // dispatch(logOutUser());
        // window.location.href = '/welcome';
      }

    }
  }, 1000)

  return () => {
    clearInterval(timmer);
  }
})

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
