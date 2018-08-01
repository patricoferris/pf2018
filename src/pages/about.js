import React from 'react';
import Link from 'gatsby-link';
import Blogpost from '../components/Blogpost';

const About = () => (
  <div style={{
    padding: `40px 100px`,
    lineHeight: `1.5em`
  }}>
    <div className='image-holder'>
      <div id='home-image'></div>
    </div>
    <p> Hi, my name is Patrick Ferris and Im a second year computer science student at <a href='https://www.cambridge.ac.uk'>University of Cambridge</a>.</p>
    <p> Outside of programming and tech I enjoy playing and listening to music, trail running and taking part in projects which help the community. </p>
    <p> Some of the important I'm currently enjoying are: Editor-in-Chief and Juniour Treasurer of the <a href='https://medium.com/hackers-at-cambridge'>Hacker's at Cambridge</a> blog (also contributing from time to time)
     and web developer and sponsorship arranger for <a href='https://www.hackcambridge.com'>Hack Cambridge</a></p>
    <h4> This website it mainly aimed at being... </h4>
    <ul>
      <li> A centralised hub for all of my projects and ideas </li>
      <li> A way for people to contact me if they want to </li>
      <li> A learning experience for building static sites using GatsbyJS, ReactJS, Graphql and SASS </li>
    </ul>
  </div>
);

export default About;
