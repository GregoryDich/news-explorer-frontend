import React from "react";
import "./About.css";
import myPhoto from "../../images/my-photo.JPG";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={myPhoto} alt="oleg tabachnikow" />
      <article className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hello! I am Gregory, Full Stack developer from Israel!
        </p>
        <p className="about__text">
          I develop SPA projects using ReactJS and handle backend with Express
        </p>
      </article>
    </section>
  );
}

export default About;
