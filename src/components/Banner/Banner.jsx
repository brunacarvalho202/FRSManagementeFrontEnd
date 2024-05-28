import React from 'react';
import './Banner.css';
import car from '../../assets/car-image.svg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
      <div className="banner">
          <div className="banner-content">
              <div className="banner-text1">Análise e Gerenciamento</div>
              <div className="banner-text2">da sua EMPRESA</div>
              <div className="banner-text3">Comece por aqui,</div>
              <Link to="/opcoes" className="banner-button">ENTRAR</Link>
          </div>
          <div className="banner-image-container">
              <img className="banner-image" src={car} alt="Red Car" />
          </div>
      </div>
  );
};

export default Banner;
