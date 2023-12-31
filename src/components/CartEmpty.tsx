import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => (
  <div
    className="
      cart
      cart--empty
    "
  >
    <h2>
      Cart is empty <span>😕</span>
    </h2>

    <p>
      Most likely, you haven't ordered pizza yet.

      <br />
      
      To order pizza, please go to the homepage.
    </p>

    <img
      src={cartEmptyImg}
      alt="Empty cart"
    />

    <Link
      to="/"
      className="
        button 
        button--black
      "
    >
      <span>Go back</span>

    </Link>
  </div>
);
