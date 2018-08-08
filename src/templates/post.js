import React from 'react';
import Helmet from 'react-helmet';
import rehypeReact from 'rehype-react';
import Highlight from 'react-highlight';

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return(
    <div>
      <div className='blog-post'>
        <h1 className='blog-title'>{post.frontmatter.title}</h1>
        <h2 className='blog-subtitle'>{post.frontmatter.subtitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        subtitle
        date
        imageUrl
      }
    }
  }
`;
