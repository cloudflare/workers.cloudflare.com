require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Cloudflare Workers®`,
    description: `Build your next application with Cloudflare Workers`,
    author: `@cloudflaredev`,
    socialImage:
      "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "0s2zavz0",
        dataset: "production",
        watchMode: process.env.NODE_ENV == "development" ? true : false,
        overlayDrafts: process.env.NODE_ENV == "development" ? true : false,
        token: process.env.SANITY_READ_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/, // See https://www.gatsbyjs.org/packages/gatsby-plugin-react-svg
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PKQFGQB",
        dataLayerName: "cfDataLayer",
      },
    },
  ],
}
