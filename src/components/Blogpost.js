import React from 'react';


const Blogpost = ({ data }) => (
  <div className='blog-block'>
    <h3 style={{
      padding: `10px 20px`
    }}>{ data.title }</h3>
  </div>
);

export default Blogpost;
