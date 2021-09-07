import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { startLogOut } from "../actions/auth";
import { ListarSearch, setCards } from "../actions/movieAction";

import LogoBB from "../assets/LogoBB.png";

const URLIMG = "https://image.tmdb.org/t/p/original";

const Navbar = () => {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: Yup.object({
      search: Yup.string().required("Email requerido"),
    }),
    onSubmit: async () => {
      dispatch(ListarSearch(search));

      const dataDispatch = [];
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=5c894abf69b18cd1d56a30a29f491a82&language=es&query=${search}&include_adult=false`
        );
        // console.log(results);

        results.forEach((e) => {
          dataDispatch.push({
            id: e.id,
            name: e.original_title,
            rating: e.vote_average,
            urlVideo: "",
            urlImage: URLIMG + e.poster_path,
            sinopsis: e.overview,
          });
        });
        // console.log(dataDispatch);
        dispatch(setCards(dataDispatch))
      } catch (error) {
        console.log(error);
      }

    },
  });

  const { search } = formik.values;

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav">
      <div className="container-fluid">
        <button
          className="navbar-toggler border-dark bg-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
          <Link className="" to="/">
            <img src={LogoBB} alt="logo" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="link nav-link active" aria-current="page" to="/">
                Todas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link nav-link" to="/TopMovies">
                Más valoradas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link nav-link" to="/LowestMovies">
                Menos valoradas
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={formik.handleSubmit}>
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
              value={search}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="btn-group">
            <div
              className="mx-2 dropdown-toggle "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={auth.avatar}
                alt=""
                width="50px"
                height="50px"
                className="rounded-circle"
              />
            </div>
            <ul className="dropdown-menu dropdown-menu-end text-black">
              <li>
                <Link className="dropA dropdown-item" to="/profile">
                  Perfil
                </Link>
              </li>
              <li>
                <Link className="dropA dropdown-item" to="/add">
                  Agregar pelicula
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropA dropdown-item text-black"
                  to="#"
                  onClick={() => dispatch(startLogOut())}
                >
                  Cerrar sesion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
