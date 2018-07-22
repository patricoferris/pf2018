import React from 'react';
import Link from 'gatsby-link';
import Highlight from 'react-highlight';
import styles from './atom-one-light.css'

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
    <div id='code'>
      <Highlight className='javascript'>
        {`let todos = {
  todoArray: [
    {
      todo: 'Learn more ReactJS,
              GatbsyJS and Meteor',
      timeFrame: 'As long as is needed',
      priority: 'HIGH',
      tag: 'Web Development'
    },
    {
      todo: 'Deep dive into Tensorflow
              and Machine Learning',
      timeFrame: 'import timeFrame as tf',
      priority: 'HIGH',
      tag: 'Python'
    },
    {
      todo: 'Write articles to
              help explain the projects
                I am doing',
      timeFrame: 'Forever',
      priority: 'HIGH',
      tag: 'Sharing Ideas'
    }
    ]
}`}
      </Highlight>
    </div>
  </div>
)

export default IndexPage
