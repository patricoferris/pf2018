import React from 'react';
import Link from 'gatsby-link';
import Blogpost from '../components/Blogpost';

const BlogPage = ({ data }) => (
  <div className='blog-block-container'>
    {data.allMarkdownRemark.edges.map(post =>
      <a  key={post.node.frontmatter.date} href={post.node.frontmatter.path}>
        <Blogpost data={post.node.frontmatter}></Blogpost>
      </a>
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
            subtitle
            date
          }
        }
      }
    }
  }
`;

export default BlogPage;
