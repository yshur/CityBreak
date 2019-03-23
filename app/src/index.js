import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router'

ReactDOM.render(
  <Router>
        <ReactRouter/>
  </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
=======
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactRouter from './router/router'

ReactDOM.render(
        <Router>
            <ReactRouter/>
        </Router>
    , document.getElementById('root'));
registerServiceWorker();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import GoogleLogin from 'react-google-login';
// // or
// import { GoogleLogin } from 'react-google-login';
 
 
// const responseGoogle = (response) => {
//   console.log(response);
// }
 
// ReactDOM.render(
//   <GoogleLogin
//     clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//     buttonText="Login"
//     onSuccess={responseGoogle}
//     onFailure={responseGoogle}
//   />,
//   document.getElementById('googleButton')
// );
>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06
