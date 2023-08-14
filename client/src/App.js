import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Schedules from './containers/Schedules'
import Home from './containers/Home'
import Users from './containers/Users'

import NavBar from './components/navbar/NavBar'

import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">

        <Switch>
          <Route exact path='/'><NavBar component={<Home />} /></Route>
          <Route path='/schedules'><Schedules /> </Route>
          <Route path='/users'><Users /></Route>
          <Route > Error. No page found</Route>
        </Switch>
      </div>
    </SnackbarProvider>
  );
}

export default App;
