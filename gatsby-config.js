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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        resolve: "gatsby-remark-component",
        options: { components: ['Highlight']}
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/pf.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    }
  ],
}
