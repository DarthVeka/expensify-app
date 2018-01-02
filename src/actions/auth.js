import { firebase, googleProvider, facebookProvider, githubProvider, auth } from '../firebase/firebase';
import swal from 'sweetalert2';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

const renderAlertBox = (res) => {
    const provider = res[0].split('.');
    swal({
        position: 'center',
        type: 'error',
        title: 'Opps',
        text: `An account already exists with the same email address. Try login with ${provider[0]}.`,
        showConfirmButton: false,
        showCloseButton: true,
        width: 400,
        padding: 30,
        timer: 5555
    });
}

export const startGoogleLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleProvider).then((res) => {

        }).catch((err) => {
            firebase.auth().fetchProvidersForEmail(err.email).then((res) => renderAlertBox(res));
        });
    }
}

export const startFacebookLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(facebookProvider).then((res) => {

        }).catch((err) => {
            firebase.auth().fetchProvidersForEmail(err.email).then((res) => renderAlertBox(res));
        });
    }
}

export const startGithubLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(githubProvider).then((res) => {

        }).catch((err) => {
            firebase.auth().fetchProvidersForEmail(err.email).then((res) => renderAlertBox(res));
        });
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