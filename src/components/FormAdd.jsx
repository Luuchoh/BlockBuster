import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  edit,
  movieNew,
  startUploadingImage,
  startUploadingVideo,
} from "../actions/movieAction";

const FormAdd = ({active}) => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      ...active,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "El nombre es muy corto")
        .required("Escribe nombre de la pelicula."),
      rating: Yup.string()
        .min(3, "Debe contener mas de 2 numeros")
        .max(3, "Np debe contener mas de 3 caracteres")
        .matches(/[0-9]{1}[.]{1}[0-9]{1}/, 'Ejemplo 2.2, 8.9, ')
        .required("Rating requerido"),
      urlVideo: Yup.string().url().required("URL requerido"),
      urlImage: Yup.string().url().required("URL requerido"),

      sinopsis: Yup.string()
        .min(25, "Porfavor especifica mas tu mascota")
        .required("Mensaje requerido!"),
    }),
    onSubmit: () => {
      // console.log('hace dispatch');
      if (active.name === "") {
        dispatch(movieNew(formik.values));
        formik.resetForm();
      } else if (active.id !== "") {
        dispatch(edit(formik.values));
      }
    },
  });

  const { name, rating, urlVideo, urlImage, sinopsis } = formik.values;

  // CARGAR IMAGEN
  const handleClickFile = () => {
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = async (e) => {
    // console.log(e);
    const file = e.target.files[0];
    if (file) {
      let fileURL = await dispatch(startUploadingImage(file));
      let urlImage = document.querySelector("#urlImage");
      urlImage.value = fileURL;
      formik.values.urlImage = fileURL;
    }
  };

  // CARGAR VIDEO
  const handleClickFileVideo = () => {
    document.querySelector("#VideoSelector").click();
  };
  const handleFileVideoChange = async (e) => {
    // console.log(e);
    const file = e.target.files[0];
    if (file) {
      let fileURL = await dispatch(startUploadingVideo(file));
      let urlVideo = document.querySelector("#urlVideo");
      urlVideo.value = fileURL;
      formik.values.urlVideo = fileURL;
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="card card-body border-primary py-4 px-5"
    >
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="bi bi-person-square"></i>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {formik.touched.name && formik.errors.name ? (
        <div className="text-danger mb-3">{formik.errors.name}</div>
      ) : null}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="bi bi-star-fill"></i>
        </div>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          className="form-control"
          value={rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {formik.touched.rating && formik.errors.rating ? (
        <div className="text-danger mb-3">{formik.errors.rating}</div>
      ) : null}

      <div className="form-group input-group ">
        <div className="input-group-text bg-light ">
          <i className="bi bi-link-45deg"></i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Video trailer"
          name="urlVideo"
          id="urlVideo"
          value={urlVideo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
        />
      </div>

      <input
        id="VideoSelector"
        type="file"
        name="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleFileVideoChange}
      />
      <div className="w-50 btn btn-dark p-0 my-2 text-uppercase fw-bold">
        <input
          type="button"
          className="btn text-white fw-bold"
          value="Video"
          onClick={handleClickFileVideo}
        />
      </div>

      {formik.touched.urlVideo && formik.errors.urlVideo ? (
        <div className="text-danger mb-3">{formik.errors.urlVideo}</div>
      ) : null}

      <div className="form-group input-group ">
        <div className="input-group-text bg-light ">
          <i className="bi bi-link-45deg"></i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Imagen"
          name="urlImage"
          id="urlImage"
          value={urlImage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
        />
      </div>

      <input
        id="fileSelector"
        type="file"
        name="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="w-50 btn btn-dark p-0 my-2 text-uppercase fw-bold">
        <input
          type="button"
          className="btn text-white fw-bold"
          value="Picture"
          onClick={handleClickFile}
        />
      </div>

      {formik.touched.urlImage && formik.errors.urlImage ? (
        <div className="text-danger mb-3">{formik.errors.urlImage}</div>
      ) : null}

      <div className="form-group mt-3">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Sinopsis"
          name="sinopsis"
          value={sinopsis}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
      </div>

      {formik.touched.sinopsis && formik.errors.sinopsis ? (
        <div className="text-danger mb-3">{formik.errors.sinopsis}</div>
      ) : null}

      <button type="submit" className="btn btn-dark mt-3">
        Save
      </button>
    </form>
  );
};

export default FormAdd;
