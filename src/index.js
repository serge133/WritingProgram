import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Workspace from './Screens/Workspace';
// ! import SplitScreen from './SplitScreen';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homescreen from './Screens/Homescreen/Homescreen';

const routing = (
  <Router>
    <Route exact path='/' component={Homescreen} />
    <Route path='/workspace/:documentId/:blockId' component={Workspace} />
    {/* <Route exact path='/workspace/split/:blockID/:id' component={SplitScreen} /> */}
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
