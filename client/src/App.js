import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    fetch('/sex').then((res)=>{
      return res.text();
    }).then((data)=>{
      console.log(data);
    });
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        {localStorage.getItem('token') && 
        <Route path='/profile'>
          <UserProfile />
        </Route>
        }
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
