import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';
import * as ROUTES from '../../constants/routes';

const Landing = () => {
  return (
    <div className="landing-container">
      <h2 className="landing-title">
        Hey, welcome to QuickSnacks!
        <span role="img" aria-label="Egg emoji">
          🍳
        </span>
      </h2>
      <p className="landing-description">
        QuickSnacks is a personal digital cookbook built with simplicity in
        mind. Sign up for an account now and get started!
      </p>
      <div className="landing-signup-card">
        <Link to={ROUTES.SIGN_UP} className="landing-signup-card_link">
          Sign up!
        </Link>
      </div>
    </div>
  );
};

export default Landing;
