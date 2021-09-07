import React from "react";
import Mulan from "../assets/mulan.png";
import Raya from "../assets/raya.png";
import Unidos from "../assets/unidos.png";


const SlideBar = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner slider">
        <div className="carousel-item active">
          <img src={Mulan} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
          </div>
        </div>
        <div className="carousel-item">
          <img src={Raya} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
          </div>
        </div>
        <div className="carousel-item">
          <img src={Unidos} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default SlideBar;
