module.exports = {
  getPackageJson: answers =>
`{
  "name": "${answers.name}",
  "version": "0.0.1",
  "description": "${answers.description}",
  "main": "dist/index.js",
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "transpile": "babel src -d dist --copy-files",
    "prepublishOnly": "npm run transpile",
    "build": "webpack --mode production",
    "deploy": "gh-pages -d examples/dist",
    "publish-demo": "npm run build && npm run deploy"
  },
  "author": "${answers.author}",
  "license": "${answers.license}"
}`,
//   getPackageJson: answers =>
// `{
//   "name": "${answers.name}",
//   "version": "1.0.0",
//   "description": "${answers.description}",
//   "main": "dist/index.js",
//   "scripts": {
//     "start": "webpack-dev-server --mode development --open --hot",
//     "transpile": "babel src -d dist --copy-files",
//     "prepublishOnly": "npm run transpile",
//     "build": "webpack --mode production",
//     "deploy": "gh-pages -d examples/dist",
//     "publish-demo": "npm run build && npm run deploy"
//   },
//   "author": "${answers.author}",
//   "license": "${answers.license}",
//   "peerDependencies": {
//     "react": "^16.8.0",
//     "react-dom": "^16.8.0"
//   },
//   "devDependencies": {
//     "babel-cli": "^6.26.0",
//     "babel-core": "^6.26.3",
//     "babel-loader": "^7.1.4",
//     "babel-preset-env": "^1.7.0",
//     "babel-preset-react": "^6.24.1",
//     "css-loader": "^2.1.1",
//     "gh-pages": "^2.0.1",
//     "html-webpack-plugin": "^3.2.0",
//     "react": "^16.8.4",
//     "react-dom": "^16.8.4",
//     "style-loader": "^0.23.1",
//     "webpack": "^4.29.6",
//     "webpack-cli": "^3.3.0",
//     "webpack-dev-server": "^3.2.1"
//   }
// }`,

  getWebpackConfig: typescript =>
`/*** webpack.config.js ***/
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }${typescript ? `,
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader"
      }` : ''}
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"${typescript ? ', ".ts", ".tsx"' : ''}]
  },
  devServer: {
    port: 3001
  }
};`
  ,

  babelrc:
`{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}`,

  gitIgnore:
`# .gitignore

node_modules
dist`,

  getNpmIgnore: typescript =>
`# .npmignore 

src
examples
.babelrc
.gitignore
${typescript ? 'tsconfig.json' : ''}
webpack.config.js`
  ,

  getReadMe: repoName => `# ${repoName}`,

  src: {
    getIndex: typescript =>
`/*** src/index.js   ***/

import React, { Component } from 'react';
import './styles.css';
${typescript ? `interface State {
  color: string
}
interface Props {
  message: string
}` : ''}

class HelloWorld extends Component${typescript ? '<State, Props>' : ''} {
  constructor(props) {
    super(props)

    this.state = {
      color: 'red'
    }
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default HelloWorld`
    ,
    
    style:
`/*** src/style.css ***/

h1 {
  color: red;
}`
  },

  examples: {
    src: {
      indexHTML:
`<!-- examples/src/index.html -->

<html>
<head>
    <title>Hello World</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
</body>
</html>`,

      indexJS:
`/***  examples/src/index.js ***/

import React from 'react';
import { render} from 'react-dom';
import HelloWorld from '../../src';

render(<HelloWorld message='Now start building!'/>, document.getElementById("root"));`,
    }
  }
}