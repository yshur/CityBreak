import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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