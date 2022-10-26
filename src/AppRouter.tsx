import React from 'react';
import './App.css';
import { Provider, useDispatch } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom'
// redux
import { storeConfig } from './Components/Store/store';
import LandingPage from './Components/utils/UI_Pages/LandingPage';

export const store = storeConfig();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

function AppRouter() {

  return (
    <React.Fragment>
      <Provider store={ store }>
        <HashRouter>
            <Switch>
            <Route
                path="/"
                component={ LandingPage }
                exact={ true }/>
            </Switch>
        </HashRouter>
        </Provider>
    </React.Fragment>
  )
}

export default AppRouter;
