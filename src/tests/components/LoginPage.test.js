import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';
import { wrap } from 'module';

let startGoogleLogin, startFacebookLogin, startGithubLogin, wrapper;

beforeEach(() => {
    startGoogleLogin = jest.fn();
    startFacebookLogin = jest.fn();
    startGithubLogin = jest.fn();
    wrapper = shallow(
        <LoginPage 
            startGoogleLogin={startGoogleLogin} 
            startFacebookLogin={startFacebookLogin}
            startGithubLogin={startGithubLogin}
        />);    
});

test('should render LoginPage correctly', () => {
    wrapper = shallow(<LoginPage />);    
    expect(wrapper).toMatchSnapshot();
});

test('should call startGoogleLogin on button click', () => {
    wrapper.find('button').first().simulate('click');
    expect(startGoogleLogin).toHaveBeenCalled();
});

test('should call startFacebookLogin on button click', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(startFacebookLogin).toHaveBeenCalled();
});

test('should call startGithubLogin on button click', () => {
    wrapper.find('button').last().simulate('click');
    expect(startGithubLogin).toHaveBeenCalled();
});