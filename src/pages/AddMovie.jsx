import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";


import FormAdd from "../components/FormAdd";
import Navbar from "../components/Navbar";
import LogoBB from "../assets/LogoBB.png";

const AddMovie = () => {

  const [title, setTitle] = useState(false);

  const { active } = useSelector((state) => state.movie);


  useEffect(() => {
    if(active.name.length > 0){
      setTitle(true)
    }
  }, [active])

  return (
    <Fragment>
      <Navbar />
      <div className="container ">
        {title ? (
          <h2 className="my-5">Editar Pelicula</h2>
        ) : (
          <h2 className="my-5">Registrar Pelicula</h2>
        )}
        <div className="row">
          <div className="col-md-7 text-center py-3 m-auto">
            <img
              src={LogoBB}
              className="App-logo mb-4"
              alt="logo"
              width="150px"
              height="auto"
            />
            <FormAdd active={active}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddMovie;
