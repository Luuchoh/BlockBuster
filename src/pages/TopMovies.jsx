import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { listarTop } from "../actions/movieAction";
import CardMovie from "../components/CardMovie";
import Navbar from "../components/Navbar";
import SlideBar from "../components/SlideBar";

const TopMovies = () => {

    const dispatch = useDispatch();

    dispatch(listarTop())

    const [movie, setMovie] = useState([])

    useEffect(() => {
        const consultarData = async () => {
          try {
            const { data } = await axios.get(
              "https://api.themoviedb.org/3/movie/top_rated?api_key=5c894abf69b18cd1d56a30a29f491a82&language=es-ES&page=1"
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
      <h2 className="my-5">Peliculas Menos Valoradas</h2>
      <div className="col-md-12 m-auto">
        <div className="row">
            <CardMovie  movieAPI={movie}/>
        </div>
      </div>
    </Fragment>
  );
};

export default TopMovies;
