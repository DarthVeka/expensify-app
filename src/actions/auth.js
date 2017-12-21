import { firebase, googleProvider, facebookProvider, githubProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startGoogleLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleProvider);
    }
}

export const startFacebookLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(facebookProvider);
    }
}

export const startGithubLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(githubProvider);
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
}