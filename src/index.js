import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Workspace from './Screens/Workspace/Workspace';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homescreen from './Screens/Homescreen/Homescreen';
import FolderScreen from './Screens/FolderScreen/FolderScreen';

const routing = (
  <Router>
    <Route exact path='/' component={Homescreen} />
    <Route path='/workspace/:documentId/:blockId' component={Workspace} />
    {/* <Route path='/folder/:folderId' component={FolderScreen} /> */}
    {/* <Route exact path='/workspace/split/:blockID/:id' component={SplitScreen} /> */}
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
