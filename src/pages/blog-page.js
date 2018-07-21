import React from 'react';
import Link from 'gatsby-link';
import Blogpost from '../components/Blogpost';

const BlogPage = ({ data }) => (
  <div>
    <h1>Blogs</h1>
    <Link to="/">Go back to the homepage</Link>
    {data.allMarkdownRemark.edges.map(post =>
      <Blogpost data={post.node.frontmatter}></Blogpost>
    )}

  </div>
);

export const pageQuery = graphql`
  query PostsQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`;

export default BlogPage;
