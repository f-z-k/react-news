import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Routers from './routers/index'
import registerServiceWorker from './registerServiceWorker';
// 666666
ReactDOM.render(<Routers/>, document.getElementById('root'));
registerServiceWorker();
