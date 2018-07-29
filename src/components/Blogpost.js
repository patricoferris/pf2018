import React from 'react';


const Blogpost = ({ data }) => (
  <div className='blog-block'>
    <h3 style={{
      padding: `0px 20px`
    }}>{ data.title }</h3>
    <h4 style={{
      marginTop: `-10px`,
      padding: `0px 20px`
    }}>{ data.subtitle }</h4>
    <p style={{
      padding: `0px 20px`
    }}>{ data.date }</p>
  </div>
);

export default Blogpost;
