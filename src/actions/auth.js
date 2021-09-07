import Swal from "sweetalert2";

import { types } from "../types/types";
import { firebase, googleAuthProvider, facebookAuthProvider } from "../firebase/firebase-config";


//CREA USUARIO CON CORREO Y CONTRASEÑA
export const startRegisterWithEmailPasswordName = (email, password, name, urlImage) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async({user}) => {

        // console.log(user);

        await user.updateProfile({displayName: name, photoURL: urlImage})

        dispatch(
          register(user.uid, user.displayName, user.photoURL)
        )
        // console.log(user);

        Swal.fire({
          position: 'top-end',
          text: 'Usuario creado',
          title: user.displayName,
          showConfirmButton: false,
          timer: 1500
        })

      })
      .catch(e =>{
        console.log(e);
        Swal.fire({
          icon: 'error',
          text:  e,
          title: 'Oops ....',
          showConfirmButton: true,
          footer: ''
        })
      })
  }
}

//INICIA SESION CON CORREO Y CONTRASEÑA
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        // console.log('hola');
        // console.log(user);
        dispatch(
          login(user.uid, user.displayName, user.photoURL)
        )
        
      })
      .catch(e =>{
        console.log(e);
      })
  }
}


//INICIA SESION CON GOOGLE
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({user}) => {
        dispatch(
          login(user.uid, user.displayName, user.photoURL)
        )
        console.log(user);
      })
      .catch(e =>{
        console.log(e);
      })
  }

}

//INICIA SESION CON FACEBOOK
export const startFacebookLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.photoURL));
      });
  };
};

//CIERRA SESION EN FIREBASE
export const startLogOut = () =>{
  return async(dispatch) =>{
    await firebase.auth().signOut();
    dispatch(logout());
  }
}

export const login = (uid, displayname, imageUrl) => {

  // console.log(uid, displayname);

    return {
      type: types.logIn,
      payload: {
        uid,
        displayname,
        imageUrl,
      },
    };
  };

  export const register = (uid, displayname, imageUrl) => {
    return {
      type: types.logIn,
      payload: {
        uid,
        displayname,
        imageUrl,
      },
    };
  };

  export const logout = () =>({
    type: types.logOut
  })