import React from 'react';
import Link from 'gatsby-link';

const Header = ({ siteTitle }) => (
  <div style={{
    width: `100%`,
    padding: `20px 100px`,
    borderBottom: `solid black 10px`
  }}>
    <h1> {siteTitle} </h1>
  </div>
);

export default Header;
