/**
 * Webpack configuration file. Will be imported when running "npm run build" / "npm run webpack" and when running server in development mode with "npm run dev".
 */
// const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// Bugged af
// const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries'); /* Will avoid creating a style.js output file, default behavior for entries in webpack.*/

/**
 * Improved replace of webpack-fix-style-only-entries that was bugged. Will delete js files created by mistake by webpack when bundling scss files.
 */
/* class DeleteJsStyleFilesPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Remove js style files', () => {
      if (fs.existsSync('./public/dist/style.js')) fs.unlinkSync('./public/dist/style.js')
    });
  }
} */
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mainStyleCSSBundle = new ExtractTextPlugin('[name].css');

module.exports = {
  mode: ((process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? 'development' : 'production'), /* Documentation: https://webpack.js.org/concepts/mode/ */
  entry: {
    'home': './src/src-home.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: '/umm/dist/'
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
  },
  target: 'web', /* Documentation: https://webpack.js.org/configuration/target/ */
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        include: [/components/]
      },
      {
        test: /\.scss$/,
        use: mainStyleCSSBundle.extract({
          use: ['css-loader', 'sass-loader']
        }),
        exclude: [/components/]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      }
    ]
  },
  plugins: [
    mainStyleCSSBundle,
    /* The next env variables will be replaced in bundle with strings. Since the bundle can't read environment variables because it's run in the browser. */
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL), // JSON.stringify adds the "" because it's replaced literal.
    }),
    new VueLoaderPlugin(),
    // new FixStyleOnlyEntriesPlugin({ ignore: './src/sections/src-calendar-timeline.js' }), // webpack by default is exporting style scss as a js file too. Somehow this plugins identifies calendar-timeline as a style file too.
    // new DeleteJsStyleFilesPlugin(),
  ],
  performance: { hints: false } /* If it's not disabled will warning that the bundle file is too big, but we need that asset. */
};
