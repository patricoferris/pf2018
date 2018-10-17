import React, { Component } from 'react';
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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 10,
      isNotMobile: true,
      menuDisplay: false
    }

    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }

  updateDimensions() {
    let tempMobileBool = false;

    console.log(window.innerWidth);
    

    if(window.innerWidth > 600) {
      tempMobileBool = true;
    }

    this.setState({width: window.innerWidth, height: window.innerHeight, isNotMobile: true});
  }

  updateMenu() {
    let menu = document.querySelector('.menu');

    console.log(this.state.menuDisplayed);

    if(!this.state.menuDisplayed) {
      menu.style.transform = `translateX(0)`;
    } else {
      menu.style.transform = `translateX(-100%)`;
    }

    this.setState({menuDisplayed: !this.state.menuDisplayed});
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
      return this.state.isNotMobile ? (
      <div className='header-container'>
        <div style={{
          gridColumnStart: `1`,
          gridColumnEnd: `1`,
        }}>
        <Link style={{textDecoration: `none`}} to='/'>
          <h1 className='title' style={{
            fontFamily: `Helvetica Neue, Arial, sans-serif`,
          }}> {this.props.siteTitle} </h1>
        </Link>
        <h3 className='subtitle' style={{
          fontFamily: `Helvetica Neue, Arial, sans-serif`,
          fontSize: `0.9em`
        }}> {this.props.subTitle.toUpperCase()} </h3>
      </div>
       { navigation.map(nav =>
        <div key={nav.column} style={{
          gridColumnStart: nav.column,
          gridColumnEnd: nav.column
        }}>
          <NavButton to={nav.link} name={nav.name}/>
        </div>
      ) } 
      </div>) :
       <div className='mobile-header-container'>
        <div style={{
          gridColumnStart: `1`,
          gridColumnEnd: `1`,
        }}>
          <Link style={{textDecoration: `none`}} to='/'>
            <h1 className='title' style={{
              fontFamily: `Helvetica Neue, Arial, sans-serif`,
              color: `white`,
              fontSize: `150%`
            }}> {this.props.siteTitle} </h1>
          </Link>
        </div>
        <button className='menu-button' onClick={this.updateMenu}>MENU</button>
       </div>;
  }
}

export default Header;
