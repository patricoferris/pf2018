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
  <div style={{
    width: `100%`,
    borderBottom: `solid lightgrey 3px`,
    display: `grid`,
    gridTemplateColumns: `70% 10% 10% 10%`,
    gridTemplateRows: `100%`
  }}>
    <div style={{
      gridColumnStart: `1`,
      gridColumnEnd: `1`,
    }}>
      <h1 style={{
        fontFamily: `Helvetica Neue`,
        marginBottom: `0px`
      }}> {siteTitle} </h1>
      <h3 className='subtitle' style={{
        fontFamily: `Helvetica Neue`,
        fontSize: `0.9em`,
        marginTop: `0px`
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
