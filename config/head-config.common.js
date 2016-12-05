/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [
    /** <link> tags for favicons **/
    { rel: 'icon', type: 'image/png', href: '/assets/icon/faviconFuel.png' },

    // Add Tooltip and CodeHighlighter support
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism-coy.css' }, //for code-highlighter
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.4.1/hint.min.css' }, //for tooltip
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#E24932' },
    { name: 'theme-color', content: '#E24932' }
  ]
};
