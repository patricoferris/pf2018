import React from 'react';
import Link from 'gatsby-link';
import Highlight from 'react-highlight';
import styles from './atom-one-light.css';

const IndexPage = () => (
  <div className='main-grid'>
    <div className='image-holder'>
      <div id='circle-image'></div>
    </div>
    <div className='text-holder'>
      <h2 className='ttitle'>Greetings</h2>
      <h4 className='ssubtitle'>WELCOME TO MY SPACE ON THE WEB</h4>
      <p>My name is Patrick Ferris and I am a nineteen year old programmer, blogger and all-round tech enthusiast. I am currently Editor in Chief of the Hacker's at Cambridge blog.</p>
      <p>In the blog section you can check out all of my recent ideas and interests including the Medium articles I've been reading recently</p>
      <p>My highly-changeable todos:</p>
    </div>
    <div className='site-description'>
    <p> The point of my website is not only to make myself a home on the internet for my projects, ideas and blogs but also to learn web development </p>
    <p> Here are some of the awesome bits of tech working hard so you can read this (and which I wanted to learn): </p>
      <p style={{
        textAlign: `center`,
        listStyleType: `none`,
        fontSize: `2em`
      }}>
        <a href='https://www.gatsbyjs.org/'>
          <img className='logos' src="https://res.cloudinary.com/patricoferris/image/upload/v1532377832/gatsby.svg"/>
        </a>
        <a href='https://www.graphql.org/'>
          <img className='logos' src="https://res.cloudinary.com/patricoferris/image/upload/v1532377832/graphql.png"/>
        </a>
        <a href='https://www.reactjs.org/'>
          <img className='logos' src="https://res.cloudinary.com/patricoferris/image/upload/c_thumb,w_200,g_face/v1532377927/react.png"/>
        </a>
        <a href='https://www.sass-lang.com/'>
          <img className='logos' src="https://res.cloudinary.com/patricoferris/image/upload/v1532377832/sass.png"/>
        </a>
      </p>
      <h1 style={{textAlign: `center`}}>
        <a style={{textDecoration: `none`, color: `rgb(238, 144, 53)`}} href='https://res.cloudinary.com/patricoferris/image/upload/v1535061267/pf2018/cv.pdf'>CV</a>
      </h1>
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
