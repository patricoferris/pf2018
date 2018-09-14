import React from 'react';
import Link from 'gatsby-link';

import NavButton from './NavButton';

const navigation = [
  {
    column: `2`,
    name: `Blogs`,
    link: `/blog-page`
  },
  {
    column: `3`,
    name: `About`,
    link: `/about`
  },
  {
    column: `4`,
    name: `Contact`,
    link: `/contact`
  }
];

const Header = ({ siteTitle, subTitle }) => (
  <div className='header-container'>
    <div style={{
      gridColumnStart: `1`,
      gridColumnEnd: `1`,
    }}>
      <Link style={{textDecoration: `none`}} to='/'>
        <h1 className='title' style={{
          fontFamily: `Helvetica Neue, Arial, sans-serif`,
        }}> {siteTitle} </h1>
      </Link>
      <h3 className='subtitle' style={{
        fontFamily: `Helvetica Neue, Arial, sans-serif`,
        fontSize: `0.9em`
      }}> {subTitle.toUpperCase()} </h3>
    </div>
    {navigation.map(nav =>
        <div key={nav.column} style={{
          gridColumnStart: nav.column,
          gridColumnEnd: nav.column
        }}>
          <NavButton to={nav.link} name={nav.name}/>
        </div>
    )}
  </div>
);

export default Header;
