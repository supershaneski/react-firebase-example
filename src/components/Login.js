import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export const LoginTypes = {
    Google: 'Google',
    Anonymous: 'Anonymous',
    SignOut: 'SignOut',
}

export const LoginModes = {
    LoggedOut: 0,
    LoggedIn: 1,
}

function Login({ mode, onClick }) {
    return (
        <React.Fragment>
            {
                mode === LoginModes.LoggedOut &&
                <React.Fragment>
                    <Button onClick={() => onClick(LoginTypes.Google)}>Sign In with Google</Button>
                    <Button data-testid="signin-anon" onClick={() => onClick(LoginTypes.Anonymous)}>Sign In Anonymously</Button>
                </React.Fragment>
            }
            {
                mode === LoginModes.LoggedIn &&
                <Button onClick={() => onClick(LoginTypes.SignOut)}>Sign Out</Button>
            }
        </React.Fragment>
    )
}

Login.defaultProps = {
    mode: LoginModes.LoggedOut,
}

Login.propTypes = {
    mode: PropTypes.number,
    onClick: PropTypes.func
}


export default Login;