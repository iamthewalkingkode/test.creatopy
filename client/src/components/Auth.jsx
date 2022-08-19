/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Login from './Login';
import Reset from './Reset';
import Signup from './Signup';

const Auth = () => {

    const [view, setView] = React.useState('login');

    return (
        <React.Fragment>
            <div id="App" className="flex justify-center items-center px-5">
                <div className="w-full">
                    <img src="creatopy-logo.svg" alt="Creatopy" style={{ margin: "0 auto" }} />
                    {view === 'login' && (
                        <Login setView={setView} />
                    )}
                    {view === 'signup' && (
                        <Signup setView={setView} />
                    )}
                    {view === 'reset' && (
                        <Reset setView={setView} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );

}

export default Auth;