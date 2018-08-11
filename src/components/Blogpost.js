import React from 'react';


const Blogpost = ({ data }) => (
  <div className='blog-block' style={{
    width: `100%`,
    height: `100%`,
    backgroundImage: `url(${data.imageUrl})`,
    backgroundPosition: `center`}}
    >
    <div className="text">
      <h3 style={{
        padding: `0px 20px`,
        textShadow: `2px 2px 8px lightgrey`
      }}>{ data.title }</h3>
      <h4 style={{
        marginTop: `-10px`,
        padding: `0px 20px`,
        textShadow: `2px 2px 8px lightgrey`
      }}>{ data.subtitle }</h4>
      <p style={{
        padding: `0px 20px`,
        textShadow: `2px 2px 8px grey`
      }}>{ data.date }</p>
    </div>
  </div>
);

export default Blogpost;
