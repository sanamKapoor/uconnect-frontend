import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import HomePage from './Layout/Pages/HomePage';
import ProfilePage from './Layout/Pages/ProfilePage';
import MobileNaviation from './Layout/components/Common/MobileNavigation';
import CreatePost from './Layout/Pages/CreatePost';
import SearchUsers from './Layout/Pages/SearchUsers';
import ErrorPage from './Layout/Pages/ErrorPage';

const App = () => {

  return (
      <Router>
        <Provider store={store}>
          <MobileNaviation />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile/:id" component={ProfilePage} />
            <Route exact path="/search" component={SearchUsers} />
            <Route exact path="/post" component={CreatePost} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Provider>
      </Router>
  );
}

export default App;
