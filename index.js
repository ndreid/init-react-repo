#!/usr/bin/env node

const chalk          = require('chalk')
const clear          = require('clear')
const files          = require('./lib/files')
const inquirer       = require('./lib/inquirer')
const fileTextHelper = require('./lib/fileTextHelper')
const CLI            = require('clui');
const Spinner        = CLI.Spinner;

clear();
console.log(
  chalk.yellow('init-react-repo')
);

const run = async () => {
  const status = new Spinner('...Initializing React Repository');
  try {
    let answers = await inquirer.askRepoDetails()
    
    status.start();

    let directoryBaseAlreadyCreated = answers.name === files.getCurrentDirectoryBase()

    if (!directoryBaseAlreadyCreated) {
      files.createDirectorySync(answers.name)
      process.chdir(answers.name)
    }
  
    files.writeFile('package.json', fileTextHelper.getPackageJson(answers))
    files.writeFile('webpack.config.js', fileTextHelper.webpackConfig)
    files.writeFile('.babelrc', fileTextHelper.babelrc)
    files.writeFile('.gitignore', fileTextHelper.gitIgnore)
    files.writeFile('.npmignore', fileTextHelper.npmIgnore)
    files.writeFile('README.md', fileTextHelper.getReadMe(answers.name))
  
    files.createDirectory('src').then(() => {
      files.writeFile('src/index.js', fileTextHelper.src.index)
      files.writeFile('src/styles.css', fileTextHelper.src.styles)
    })
  
    files.createDirectory('examples').then(() => {
      files.createDirectory('examples/src').then(() => {
        files.writeFile('examples/src/index.html', fileTextHelper.examples.src.indexHTML)
        files.writeFile('examples/src/index.js', fileTextHelper.examples.src.indexJS)
      })
    })
    status.stop()


    console.log()
    console.log(chalk.green('Successfully created repository ') + chalk.blue(answers.name))
    console.log()
    console.log('********************************************')
    console.log('*  Recommended commands to run:')
    if (!directoryBaseAlreadyCreated)
      console.log('*      - cd "' + answers.name + '"')
    console.log('*      - npm install')
    console.log('*      - npm start')
    console.log('********************************************')
  }
  catch (err) {
    status.stop()
    console.log(err)
  }
}

run()
