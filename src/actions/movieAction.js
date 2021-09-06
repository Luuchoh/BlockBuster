import Swal from "sweetalert2";

import { types } from "../types/types";
import { FileUpload } from "../helpers/FileUpload";
import { db } from '../firebase/firebase-config';
import { load } from "../helpers/load";
import { videoUpload } from "../helpers/videoUpload";
import { loadTopRating } from "../helpers/loadTopRating";
import { loadLowestRating } from "../helpers/loadLowestRating";

let fileUrl = [];

//ENVIA LA IMAGEN A CLOUDINARY Y LA SUBE
export const startUploadingImage = (file) => {

    return async () => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        fileUrl = await FileUpload(file)
           
        // console.log(fileUrl);
        Swal.close()
       return fileUrl
    }
}


//ENVIA EL VIDEO A CLOUDINARY Y LO SUBE
export const startUploadingVideo = (file) => {

    return async () => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        fileUrl = await videoUpload(file)
           
        // console.log(fileUrl);
        Swal.close()
       return fileUrl
    }
}


//CREA NUEVA MOVIE

export const movieNew = (movie) => {
    console.log(movie)
    return async (dispatch) => {
      
        const newDog= {
            name: movie.name,
            rating: movie.rating,
            urlVideo: movie.urlVideo,
            urlImage: movie.urlImage,
            sinopsis: movie.sinopsis
        }

        try {
           await db.collection(`/Movies`).doc().set(newDog)
            Swal.fire({
                position: 'top-end',
                text: 'Pelicula Creada',
                icon: 'success',
                title: movie.name ,
                showConfirmButton: false,
                timer: 1500
              })
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e,
                footer: ''
              })
        }
        dispatch(addNewMovie(newDog))
        dispatch(Listar())
    }
}

export const addNewMovie = (movie) => ({
    type: types.movieAddNew,
    payload: {
        ...movie
    }
})


//LISTAR PELICULAS DE FIREBASE
//LISTA SOLO UNA
export const ListarSearch = (searchText) => { 
    return async (dispatch) =>{
        const movieListOne =  await load(searchText);
        dispatch(setCards(movieListOne))
    }
}
//LISTA TAL COMO SE INGRESARON
export const Listar = () => {
    return async (dispatch) =>{
        const movieList =  await load();
        dispatch(setCards(movieList))
    }
}

//LISTA POR MAYOR RATING
export const listarTop = () => {
    return async (dispatch) =>{
        const movieListTop =  await loadTopRating();
        console.log(movieListTop)
        dispatch(setCards(movieListTop))
    }
}
//LISTA POR MENOR RATING
export const listarLowest = () => {
    return async (dispatch) =>{
        const movieListLowest =  await loadLowestRating();
        dispatch(setCards(movieListLowest))
    }
}
//FUNCION SINCRONICA
export const setCards = (movie) => {
    return {
        type: types.movieLoad,
        payload: movie
    }
}


//EDITAR MOVIE

export const edit = (movie) => {
    return async (dispatch) => {
        
        if (!movie.url) {
            delete movie.url;
        }

        const EditMovie = {
            name: movie.name,
            rating: movie.rating,
            urlVideo: movie.urlVideo,
            urlImage: movie.urlImage,
            sinopsis: movie.sinopsis
        }

        const MovieFire = { ...EditMovie  }
        delete MovieFire.id

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

           await db.doc(`/Movies/${movie.id}`).update(EditMovie)

        Swal.fire('Saved', movie.name, 'success');
        dispatch(Listar())
    }
}

//BORRAR UNA CARD

export const Delete = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/Card/data/${id}`).delete();

        dispatch(deleteCard(id));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Delete',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(Listar(uid))
    }
}

export const deleteCard = (id) => ({
    type: types.cardDelete,
    payload: id
});



//FUNCIONES SINCRONICAS


export const movieActive = (movie) => {
    return{
        type:types.movieActive,
        payload:{
            ...movie
        }
    }
}


export const movieActiveClear = () => {
    return {
        type: types.movieActiveClear
    }
}