const UmbracoHeadless = require('umbraco-headless')
const umbracoConfig = require('./umbraco.config')

module.exports = {

  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'umbraco-nuxt',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'An Umbraco + Nuxt project'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },

  /*
   ** Import modules
   */
  modules: [
    '@nuxtjs/axios'
  ],

  /*
   ** Import plugins
   */
  plugins: [
    '@/plugins/umbraco-headless',
    '@/plugins/components'
  ],

  /*
   ** Middleware
   */
  router: {
    middleware: 'preview-middleware',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'dynamic-routes',
        path: '*',
        component: resolve(__dirname, 'pages/_.vue')
      })
    }
  },

  /*
   ** Build configuration
   */
  build: {

    extend(config, {
      isDev,
      isClient
    }) {

      // Fixes some webback issues???
      config.node = {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      }

      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

    }
  },

  /*
   ** Generate configuration
   */
  generate: {
    routes(callback) {

      let routes = [];

      let umbraco = new UmbracoHeadless.HeadlessService(umbracoConfig);

      umbraco.site = umbraco.getById(1064);
      umbraco.IsAuthenticated = true;
      umbraco.BaseUrl = umbracoConfig.url;



      // the returned node contains all properties

      // Get the homepage
      site.getAll().then(homeResponse => {

        let homeNode = homeResponse.results[0];

        routes.push({
          route: homeNode.url,
          payload: homeNode
        })







        site.getChildren(homeNode).then(descendantsResponse => {

          descendantsResponse.results.forEach(node => {
            routes.push({
              route: node.url,
              payload: node
            })
          });

          callback(null, routes);

        })





      }).catch(callback)

    }
  }
}

