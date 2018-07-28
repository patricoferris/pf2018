import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import './index.scss';
import 'prismjs/themes/prism.css';

const Layout = ({ children, data }) => (
  <div className='container'>
    <Helmet
      title={data.site.siteMetadata.title}
      subtitle={data.site.siteMetadata.subtitle}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} subTitle={data.site.siteMetadata.subtitle}/>
    {children()}
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
