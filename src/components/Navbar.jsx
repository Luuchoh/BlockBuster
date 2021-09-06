import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { startLogOut } from "../actions/auth";
import { ListarSearch } from "../actions/movieAction";

import LogoBB from "../assets/LogoBB.png";

const Navbar = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: Yup.object({
      search: Yup.string().required("Email requerido"),
    }),
    onSubmit: () => {
      dispatch(ListarSearch(search))
    },
  });

  const { search } = formik.values

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
              name='search'
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
              <img src={LogoBB} alt="" width="50px" height="50px" className="rounded-circle"/>
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
