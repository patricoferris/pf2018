import React from 'react';
import Link from 'gatsby-link';
import Blogpost from '../components/Blogpost';

const About = () => (
  <div className='about'>
    <div className='image-holder'>
      <div id='home-image'></div>
    </div>
    <p> Hi, my name is Patrick Ferris and Im a second year computer science student at <a href='https://www.cambridge.ac.uk'>University of Cambridge</a>.</p>
    <p> Outside of programming and tech I enjoy playing and listening to music, trail running and taking part in projects which help the community. </p>
    <p> Some of the important work I'm current doing include: Editor-in-Chief of the <a href='https://medium.com/hackers-at-cambridge'>Hacker's at Cambridge</a> blog (also contributing from time to time)
     , the Juniour Treasurer of Cambridge's Tech Society and a member of the web development and sponsorship teams for <a href='https://www.hackcambridge.com'>Hack Cambridge</a>.</p>
    <h4> This website is mainly aimed at being... </h4>
    <ul>
      <li> A centralised hub for all of my projects and ideas </li>
      <li> A way for people to contact me if they want to </li>
      <li> A learning experience for building static sites using GatsbyJS, ReactJS, Graphql and SASS </li>
    </ul>
  </div>
);

export default About;
