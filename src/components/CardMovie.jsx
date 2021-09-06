import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Link } from "react-router-dom";
import { movieActive } from "../actions/movieAction";

const CardMovie = ({ movieAPI }) => {
  const { movie } = useSelector((state) => state.movie);

  const [videoMovie, setVideoMovie] = useState([]);
  const [contentVideo, setcontentVideo] = useState(false)

  const dispatch = useDispatch();

  const handleEdit = async (movie) => {
    await dispatch(movieActive(movie));
    console.log(movie);
  };

  const handleDelete = async (id) => {
    // await dispatch(Delete(id));
  };

  const video = async (idMovie) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${idMovie}}/videos?api_key=5c894abf69b18cd1d56a30a29f491a82`
      );
      console.log(data.results);
      setVideoMovie(data.results);
      setcontentVideo(true)
    } catch (error) {
      console.log(error);
    }
  };

  
  console.log(videoMovie)
  console.log(contentVideo)

  return (
    <div className="containerCard">
      {movie.map((movie, index) => (
        <div
          className="cardMovie"
          key={`${index}-${movie.id}`}
          data-bs-toggle="modal"
          data-bs-target={`#exampleModal${movie.id}`}
        >
          <div className="img">
            <img src={movie.urlImage} alt={movie.name} />
            <div className="rating">
              <i className="bi bi-star-fill"></i>
              <span>{movie.rating}</span>
            </div>
          </div>

          <div className="modal text-dark" id={`exampleModal${movie.id}`}>
            <div
              className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{movie.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true"></span>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="w-50">
                      <img
                        className="mx-5"
                        width="80%"
                        src={movie.urlImage}
                        alt={movie.name}
                      />
                    </div>
                    <div className="w-50">
                      <p>{movie.sinopsis}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-target={`#exampleModal${movie.id}2`}
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Ver trailer
                  </button>
                  <Link
                    type="button"
                    className="btn btn-primary"
                    to="/edit"
                    onClick={() => handleEdit(movie)}
                  >
                    Editar
                  </Link>
                  <Link
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    to="/"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Eliminar
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id={`exampleModal${movie.id}2`}
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel2"
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <video
                      className="w-100 h-100"
                      src={movie.urlVideo}
                      controls
                    ></video>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      volver al detalle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {movieAPI.map((movie, index) => (
        <div
          className="cardMovie"
          key={`${index}-${movie.id}`}
          data-bs-toggle="modal"
          data-bs-target={`#exampleModal${movie.id}`}
        >
          <div className="img">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.name}
            />
            <div className="rating">
              <i className="bi bi-star-fill"></i>
              <span>{movie.vote_average}</span>
            </div>
          </div>

          <div className="modal text-dark" id={`exampleModal${movie.id}`}>
            <div
              className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{movie.original_title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true"></span>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="w-50">
                      <img
                        className="mx-5"
                        width="80%"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.original_title}
                      />
                    </div>
                    <div className="w-50">
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-target={`#exampleModal${movie.id}2`}
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    onClick={() => video(movie.id)}
                  >
                    Ver trailer
                  </button>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id={`exampleModal${movie.id}2`}
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel2"
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                  {
                    contentVideo&&
                    <iframe
                      className="w-100 h-100"
                      src={`https://www.youtube.com/embed/${videoMovie[0].key}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  }
                    
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      volver al detalle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardMovie;
