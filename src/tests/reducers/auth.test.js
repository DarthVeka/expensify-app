import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const randomUid = 'qwertzuiop';
    const action = {
        type: 'LOGIN',
        uid: randomUid
    };
    const state = authReducer(null, action);
    expect(state).toEqual({ uid: randomUid });
});

test('should remove uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'inhsedoifhsoi' }, action);
    expect(state).toEqual({});
});