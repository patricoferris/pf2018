import React from 'react';
import Link from 'gatsby-link';
import GistEmbed from '../components/GistEmbed';

const IndexPage = () => (
  <div className='main-grid'>
    <div className='image-holder'>
      <div id='home-image'></div>
    </div>
    <div className='text-holder'>
      <h2 style={{fontFamily: `Courier`}}>Greetings...</h2>
      <p>My name is Patrick Ferris and I am a nineteen year old programmer, blogger and all-round tech enthusiast. I am currently Editor in Chief of the Hacker's at Cambridge blog.</p>
      <p>In the blog section you can check out all of my recent ideas and interests including the Medium articles I've been reading recently</p>
      <p>My highly-changeable todos:</p>
    </div>
    <GistEmbed gistId='patricoferris/5b6e45e71fc94d37fe1eec1c90707db5'/>
  </div>
)

export default IndexPage
