import React from 'react';
import Helmet from 'react-helmet';
import rehypeReact from 'rehype-react';
import Highlight from 'react-highlight';


const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "high-light": Highlight },
}).Compiler

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return(
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div className='blog-post'>{renderAst(post.htmlAst)}</div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        title
      }
    }
  }
`;
