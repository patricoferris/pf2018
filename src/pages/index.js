import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div className='main-grid'>
    <div style={{
      gridColumnStart: `1`,
      gridColumnEnd: `1`,
      height: `100%`
    }}>
      <div id='home-image'></div>
    </div>
    <div style={{
      gridColumnStart: `2`,
      gridColumnEnd: `2`
    }}>
      <h2>Greetings...</h2>
      <p>My name is Patrick Ferris and I am an eighteen year old programmer, blogger and all-round tech enthusiast.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </div>
)

export default IndexPage
