import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import {  startUploadingImage } from "../../actions/movieAction";

const Registro = () => {
  // HOOK useDispatch react-redux
  const dispatch = useDispatch();

  // Formik y YUP
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password1: "",
      password2: "",
      LinkImg:"",
    },
    validationSchema: Yup.object({
      nombre: Yup
        .string()
        .min(9, 'Tu nombre debe tener mas 9 caracteres')
        .required("Debes escribir tu nombre"),
      email: Yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      password1: Yup
        .string()
        .min(8, "La contraseña es muy corta - debe tener minimo 8 caracteres.")
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S/, "La contraseña debe tener un numero, una mayuscula y un minuscula.")
        .required("Escribe tu contraseña."),
      password2: Yup
        .string()
        .oneOf([Yup.ref("password1"), null], "Las contraseñas deben ser iguales")
        .required("Escribe tu contraseña."),
    }),
    onSubmit: () => {
      dispatch(startRegisterWithEmailPasswordName(email, password1, nombre, LinkImg));
    },
  });

  const { nombre, email, password1, password2, LinkImg } = formik.values;

  const handleFileChange = async(e)=>{
    // console.log(e);
    const file =e.target.files[0];
    if(file){
      let fileURL = await dispatch(startUploadingImage(file));
      let inputURl = document.querySelector("#floatingURL");
      inputURl.value = fileURL;
      formik.values.LinkImg = fileURL;

    }

}
const handleClickFile = () =>{
    document.querySelector('#fileSelector').click();
}

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
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="nombre"
                      value={nombre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <label htmlFor="floatingInput">Nombres completo</label>
                  </div>

                  {formik.touched.nombre && formik.errors.nombre ? (
                    <div className="text-danger mb-3">
                      {formik.errors.nombre}
                    </div>
                  ) : null}

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <label htmlFor="floatingInput">Correo electronico</label>
                  </div>

                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger mb-3">
                      {formik.errors.email}
                    </div>
                  ) : null}

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword1"
                      placeholder="name@example.com"
                      name="password1"
                      value={password1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <label htmlFor="floatingInput">Contraseña</label>
                  </div>

                  {formik.touched.password1 && formik.errors.password1 ? (
                    <div className="text-danger mb-3">
                      {formik.errors.password1}
                    </div>
                  ) : null}

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword2"
                      placeholder="Password"
                      name="password2"
                      value={password2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <label htmlFor="floatingPassword">
                      Confirma tu contraseña
                    </label>
                  </div>

                  {formik.touched.password2 && formik.errors.password2 ? (
                    <div className="text-danger mb-3">
                      {formik.errors.password2}
                    </div>
                  ) : null}

                  <div className="form-floating">
                    <input
                      type="url"
                      className="form-control"
                      id="floatingURL"
                      placeholder="url"
                      name="LinkImg"
                      value={LinkImg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      required
                    />
                    <label htmlFor="floatingPassword">
                      Imagen de perfil / avatar
                    </label>
                  </div>

                  <input
                    id="fileSelector"
                    type="file"
                    name="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div className="btn btn-primary btn-register text-uppercase fw-bold">
                    <input
                      type="button"
                      className="btn text-white fw-bold"
                      value="Picture"
                      onClick={handleClickFile}
                    />
                  </div>

                  <hr className="my-4" />

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Registrar
                    </button>
                  </div>

                  <div className="w-100 text-center mt-4">
                    <Link
                      to="/auth/login"
                      className="text-decoration-none text-black"
                    >
                      Ya estas registrado.
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

export default Registro;
