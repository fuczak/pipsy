import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {
    App,
    Boardgames,
    Pubs,
    Home,
    NotFound,
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      { /* Routes */ }
      <Route path="boardgames" component={Boardgames}/>
      <Route path="pubs" component={Pubs}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
