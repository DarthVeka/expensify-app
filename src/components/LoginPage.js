import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, startFacebookLogin, startGithubLogin } from '../actions/auth';

export const LoginPage = ({ startGoogleLogin, startFacebookLogin, startGithubLogin }) => (
    <div className='box-layout' >
        <div className='box-layout__box'>
            <h1 className='box-layout__title'>Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <button className='button button--login' onClick={startGoogleLogin} >Login with Google</button>                
            <button className='button button__facebook button--login' onClick={startFacebookLogin} >Login with Facebook</button>                
            <button className='button button__github button--login' onClick={startGithubLogin} >Login with Github</button>                
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    startFacebookLogin: () => dispatch(startFacebookLogin()),
    startGithubLogin: () => dispatch(startGithubLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);