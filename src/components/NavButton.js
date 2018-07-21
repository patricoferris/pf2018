import React from 'react';
import Link from 'gatsby-link';

const NavButton = ({ to, name }) => (
  <div style={{
    width: `100%`,
    height: `100%`,
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `column`,
  }}>
    <Link style={{
      textDecoration: `none`,
      color: `black`
    }} to={to}>
      <h3 className='nav'>{name}</h3>
    </Link>
  </div>
);

export default NavButton;
