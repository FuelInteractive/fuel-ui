/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const autoprefixer = require('autoprefixer');

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'Fuel-UI',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  isProd = options.env === 'production';
  return {

    /*
    * Cache generated modules and chunks to improve performance for multiple incremental builds.
    * This is enabled by default in watch mode.
    * You can pass false to disable it.
    *
    * See: http://webpack.github.io/docs/configuration.html#cache
    */
    //cache: false,

    /*
    * The entry point for the bundle
    * Our Angular.js app
    *
    * See: http://webpack.github.io/docs/configuration.html#entry
    */
    entry: [
      './src/polyfills.browser.ts',
      isProd ? './src/vendor.aot.ts' : './src/vendor.browser.ts',
      'font-awesome-sass!./src/font-awesome-sass.config.js',
      isProd ? './src/main.aot.ts' : './src/main.browser.ts'
    ],

    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    resolve: {

      /*
      * An array of extensions that should be used to resolve modules.
      *
      * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
      */
      extensions: ['.ts', '.js', '.json'],

      // remove other default values
      modules: [helpers.root('src'), 'node_modules'],

    },

    /*
    * Options affecting the normal modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#module
    */
    module: {
      /*
      * An array of automatically applied loaders.
      *
      * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
      * This means they are not resolved relative to the configuration file.
      *
      * See: http://webpack.github.io/docs/configuration.html#module-loaders
      */
      loaders: [

        /*
        * Typescript loader support for .ts and Angular 2 async routes via .async.ts
        * Replace templateUrl and stylesUrl with require()
        *
        * See: https://github.com/s-panferov/awesome-typescript-loader
        * See: https://github.com/TheLarkInn/angular2-template-loader
        */
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /*
        * Json loader support for *.json files.
        *
        * See: https://github.com/webpack/json-loader
        */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        /*
        * to string and css loader support for *.css files
        * Returns file content as string
        *
        */
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },

        /* Raw loader support for *.html
        * Returns file content as string
        *
        * See: https://github.com/webpack/raw-loader
        */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /* File loader for supporting images, for example, in CSS files.
        */
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },
        { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        }
      ]

    },

    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: [

      /*
      * Plugin: ForkCheckerPlugin
      * Description: Do type checking in a separate process, so webpack don't need to wait.
      *
      * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
      */
      new ForkCheckerPlugin(),

      /* Plugin: ContentReplacementPlugin
      *  Description: fix systemjs resolver warning message from update to 2.0.0
      */
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname
      ),

      /*
      * Plugin: CopyWebpackPlugin
      * Description: Copy files and directories in webpack.
      *
      * Copies project static assets.
      *
      * See: https://www.npmjs.com/package/copy-webpack-plugin
      */
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),

      /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        inject: 'head',
        title: METADATA.title,
        metadata: METADATA,
      }),

      /*
      * Plugin: HtmlHeadConfigPlugin
      * Description: Generate html tags based on javascript maps.
      *
      * If a publicPath is set in the webpack output configuration, it will be automatically added to
      * href attributes, you can disable that by adding a "=href": false property.
      * You can also enable it to other attribute by settings "=attName": true.
      *
      * The configuration supplied is map between a location (key) and an element definition object (value)
      * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
      *
      * Example:
      *  Adding this plugin configuration
      *  new HtmlElementsPlugin({
      *    headTags: { ... }
      *  })
      *
      *  Means we can use it in the template like this:
      *  <%= webpackConfig.htmlElements.headTags %>
      *
      * Dependencies: HtmlWebpackPlugin
      */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: false,
        options: {
          output: { path: helpers.root('dist') }, // legacy path for bootstrap-loader

          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors: true,
            failOnHint: true,
            resourcePath: 'src'
          },

          postcss: [autoprefixer],

          sassLoader: {
              includePaths: ['src', helpers.root('node_modules/bootstrap/scss')]
          },
          context: '/',

          /**
           * Html loader advanced options
           *
           * See: https://github.com/webpack/html-loader#advanced-options
           */
          // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
          htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
              [/#/, /(?:)/],
              [/\*/, /(?:)/],
              [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
          },

        }
      }),
    ],

    /*
    * Include polyfills or mocks for various node stuff
    * Description: Node configuration
    *
    * See: https://webpack.github.io/docs/configuration.html#node
    */
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  }
};
