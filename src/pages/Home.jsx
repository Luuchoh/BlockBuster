import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Listar } from "../actions/movieAction";
import CardMovie from "../components/CardMovie";
import Navbar from "../components/Navbar";
import SlideBar from "../components/SlideBar";

const Home = () => {

  const dispatch = useDispatch();

  dispatch(Listar())

  const [movie, setMovie] = useState([])

    useEffect(() => {
          const consultarData = async () => {
            try {
              const { data } = await axios.get(
                "https://api.themoviedb.org/3/movie/popular?api_key=5c894abf69b18cd1d56a30a29f491a82"
              );
              // console.log(data.results);
              setMovie(data.results);
            } catch (error) {
              console.log(error)
            }
          };
      
          consultarData();
        }, []);
      

  return (
    <Fragment>
      <Navbar />
      <SlideBar />
        <h2 className="my-5">Todas las peliculas</h2>
        <div className="col-md-12 m-auto">
          <div className="row">
            <CardMovie movieAPI={movie}/>
          </div>
        </div>
    </Fragment>
  );
};

export default Home;
