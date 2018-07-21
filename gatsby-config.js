module.exports = {
  siteMetadata: {
    title: 'Patrick Ferris',
    subtitle: 'Second Year Computer Science Student @ Cambridge University'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'pages'
      }
    },
    'gatsby-transformer-remark'
  ],
}
