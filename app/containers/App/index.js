/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import HostDashboard from 'containers/HostDashboard/Loadable';
import RenteeDashboard from 'containers/RenteeDashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <div className="site">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/host-dashboard" component={HostDashboard} />
          <Route exact path="/rentee-dashboard" component={RenteeDashboard} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <GlobalStyle />
    </div>
  );
}
