import React from 'react';
import Link from 'gatsby-link';
import Blogpost from '../components/Blogpost';

const BlogPage = () => (
  <div>
    <h1>Blogs</h1>
    <Link to="/">Go back to the homepage</Link>
    <Blogpost metablog='Testing'>
    </Blogpost>
  </div>
);

export default BlogPage;
