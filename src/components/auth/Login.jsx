import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { startFacebookLogin, startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

import "../../styles/login-styles.css";

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup
        .string()
        .min(8, "La contraseña es muy corta - debe tener minimo 8 caracteres.")
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S/, "La contraseña debe tener un numero, una mayuscula y un minuscula.")
        .required("Excribe tu contraseña."),
    }),
    onSubmit: () => {

      dispatch(startLoginEmailPassword(email, password));
        
    },
  });

  const { email, password } = formik.values;

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  const handleFacebookLogin = () => {
    dispatch(startFacebookLogin());
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row w-100">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5 text-black">
                <h5 className="card-title text-center mb-5 fw-bold fs-5 text-black">
                  Inicia sesion
                </h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  {
                    formik.touched.email && formik.errors.email 
                    ? (
                      <div className="text-danger mb-3">{formik.errors.email}</div>
                     ) 
                     : null
                  }
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  {
                    formik.touched.password && formik.errors.password 
                    ? (
                      <div className="text-danger mb-3">{formik.errors.password}</div>
                     ) 
                     : null
                  }

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Ingresa
                    </button>
                  </div>
                  <hr className="my-4" />
                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-google btn-login text-uppercase fw-bold"
                      type="submit"
                      onClick={handleGoogleLogin}
                    >
                      <i className="fab fa-google me-2"></i> Ingresa con Google
                    </button>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-facebook btn-login text-uppercase fw-bold"
                      type="submit"
                      onClick={handleFacebookLogin}

                    >
                      <i className="fab fa-facebook-f me-2"></i> Ingresa con Facebook
                    </button>
                  </div>
                  <div className="w-100 text-center mt-4">
                    <Link
                      to="/auth/register"
                      className="text-decoration-none text-black"
                    >
                      Aún no tienes cuenta?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
